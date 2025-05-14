import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderAccountTable } from "./renderAccountTable.js";
// import { getRolePrivilege } from "./changeMainContent.js";
async function getRolePrivilege() {
  try {
    const response = await fetch("api/roles/list.php");
    const data = await response.json(); // nếu server trả JSON
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
async function renderPrivilegesAccount(id) {
  console.log("hi");

  const privileges = await getRolePrivilege();
  console.log("privileges", privileges);

  if (!privileges) return;

  const privilegeSelect = document.getElementById("add-account-privilege");
  console.log("privilegeSelect", privilegeSelect);

  if (!privilegeSelect) return;

  // Xóa hết option cũ đi
  privilegeSelect.innerHTML = "";

  // Thêm option mặc định "Chọn nhóm quyền"
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Chọn Nhóm quyền";
  privilegeSelect.appendChild(defaultOption);

  // Thêm các quyền từ API
  privileges.data.forEach((privilege) => {
    const option = document.createElement("option");
    option.value = privilege.id;
    option.textContent = privilege.name;

    // Kiểm tra nếu id trùng với value của option thì đánh dấu selected
    if (privilege.id == id) {
      option.selected = true;
    }

    privilegeSelect.appendChild(option);
  });

  // Thêm dòng "Chưa có quyền" nếu id là null hoặc rỗng
  const nullOption = document.createElement("option");
  nullOption.value = "null";
  nullOption.textContent = "Chưa có quyền";

  // Nếu id rỗng hoặc null, chọn dòng "Chưa có quyền"
  if (!id) {
    nullOption.selected = true;
  }

  privilegeSelect.appendChild(nullOption);
}

// Hàm thiết lập sự kiện Sửa một người dùng cho bảng
export function updateAccountData(idAccountSelected) {
  const id = idAccountSelected.textContent;

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-account");
  updateButton.classList.add("active");

  // Tạo dialog
  const updateDialog = document.createElement("dialog");
  updateDialog.classList.add("dialog", "account");
  updateDialog.style.width = "772px";
  document.body.appendChild(updateDialog);
  updateDialog.showModal();

  // Gọi API
  Promise.all([
    fetch(`api/address/get_address.php?maNguoiDung=${id}`).then((res) =>
      res.json()
    ),
    fetch(`api/account/detail_account.php?id=${id}`).then((res) => res.json()),
  ])
    .then(([addressData, userData]) => {
      if (userData.status !== "success") return;

      const user = userData.data;
      const address = addressData.data;
      console.log("address", address);
      console.log("user", user);
      const fullAddress =
        address && address.length > 0
          ? [
              address[0].street,
              address[0].ward,
              address[0].district,
              address[0].province,
            ]
              .filter(
                (part) =>
                  part &&
                  part.trim() !== "" &&
                  part !== "undefined" &&
                  part !== "null" &&
                  part !== "Chưa có địa chỉ"
              )
              .join(", ")
          : "Chưa có địa chỉ";

      // Gán nội dung dialog
      updateDialog.innerHTML = `
        <h1 class="dialog__title">Sửa người dùng</h1>
        <button id="close-account-button" class="dialog__close">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="dialog__line"></div>
        <form method="post" class="dialog__form">
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Mã người dùng</label>
              <input type="text" id="add-account-id" readonly value="${user.maNguoiDung}" />
            </div>
            <div class="dialog__form-group">
              <label>Họ và tên</label>
              <input type="text" id="add-account-fullname" value="${user.hoVaTen}" />
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Số điện thoại</label>
              <input type="text" id="add-account-phone" value="${user.soDT}" />
            </div>
            <div class="dialog__form-group">
              <label>Email</label>
              <input type="text" id="add-account-email" value="${user.email}" />
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group full">
              <label>Địa chỉ</label>
              <input type="text" id="add-account-address" value="${fullAddress}" />
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Tên tài khoản</label>
              <input type="text" id="add-account-username" readonly value="${user.tenTaiKhoan}" />
            </div>
            <div class="dialog__form-group">
              <label>Mật khẩu</label>
              <input type="text" id="add-account-password" value="${user.matKhau}" />
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Nhóm quyền</label>
              <select id="add-account-privilege">
                <option value="" disabled>Chọn Nhóm quyền</option>
                <option value="1">Quản lý</option>
                <option value="2">Nhân viên thủ kho</option>
                <option value="3">Nhân viên bán hàng</option>
                <option value="4">Khách hàng</option>
              </select>
            </div>
            <div class="dialog__form-group">
              <label>Trạng thái</label>
              <select id="add-account-status" disabled>
                <option value="" disabled>Chọn Trạng thái</option>
                <option value="1">Hoạt động</option>
                <option value="0">Tạm dừng</option>
              </select>
            </div>
          </div>
          <div class="dialog__buttons">
            <button id="update-account-button" class="update">Sửa</button>
          </div>
        </form>
      `;
      renderPrivilegesAccount(user.maQuyen);
      // ✅ Gán giá trị select sau khi DOM đã được render
      document.getElementById("add-account-privilege").value =
        user.maQuyen.toString();
      document.getElementById("add-account-status").value =
        user.trangThai === "Hoạt động" ? "1" : "0";

      // Gán sự kiện đóng
      document
        .getElementById("close-account-button")
        .addEventListener("click", () => {
          updateDialog.remove();
          updateButton.classList.remove("active");
        });

      // Gán sự kiện sửa
      document
        .getElementById("update-account-button")
        .addEventListener("click", async (e) => {
          e.preventDefault();
          // Lấy giá trị từ các ô input
          const id = document.getElementById("add-account-id").value;
          const fullname = document
            .getElementById("add-account-fullname")
            .value.trim();
          const phone = document
            .getElementById("add-account-phone")
            .value.trim();
          const email = document
            .getElementById("add-account-email")
            .value.trim();
          const address = document
            .getElementById("add-account-address")
            .value.trim();
          const password = document
            .getElementById("add-account-password")
            .value.trim();
          const privilege = document
            .getElementById("add-account-privilege")
            .value.trim();
          const username = document
            .getElementById("add-account-username")
            .value.trim();
          console.log("quyền chọn", privilege);

          // Regex kiểm tra định dạng địa chỉ (có thể điều chỉnh)
          const addressFormatRegex =
            /^.+?,\s*(phường|Phường)\s+.+?,\s*(quận|Quận|huyện|Huyện|tp|TP|Thành Phố|Thành phố)\s+.+?,\s*(tỉnh|Tỉnh|tp|TP|Thành Phố|Thành phố)\.?\s+.+$/;
          const addressUser = address.split(",");
          const numberHomeAndStreetName = addressUser[0];
          const province = addressUser[3];
          const district = addressUser[2];
          const ward = addressUser[1];
          // Validate dữ liệu
          const validations = [
            { condition: !fullname, message: "Vui lòng nhập họ và tên." },
            // { condition: !phone, message: "Vui lòng nhập số điện thoại." },
            {
              condition: !/^\d{10,11}$/.test(phone) && phone.length > 0,
              message: "Số điện thoại không hợp lệ.",
            },
            // { condition: !email, message: "Vui lòng nhập email." },
            {
              condition:
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length > 0,
              message: "Email không hợp lệ.",
            },
            // { condition: !address, message: "Vui lòng nhập địa chỉ." },
            {
              condition:
                address !== "Chưa có địa chỉ" &&
                !addressFormatRegex.test(address),
              message:
                "Địa chỉ không đúng định dạng. Ví dụ: '12 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh'",
            },
            { condition: !username, message: "Vui lòng nhập tên tài khoản." },
            { condition: !password, message: "Vui lòng nhập mật khẩu." },
            { condition: !privilege, message: "Vui lòng chọn nhóm quyền." },
          ];

          for (const v of validations) {
            if (v.condition) {
              toast({
                title: "Lỗi",
                message: v.message,
                type: "warning",
                duration: 3000,
              });
              return;
            }
          }

          // Confirm sửa
          let yes = await showNotification(
            "Bạn có đồng ý sửa người dùng này không?"
          );
          if (!yes) return;

          // Tạo dữ liệu để gửi đi
          let data = new URLSearchParams();
          data.append("maNguoiDung", id);
          data.append("accountFullName", fullname);
          data.append("accountPhone", phone);
          data.append("accountEmail", email);
          data.append("accountPassword", password);
          if (privilege !== "null") {
            data.append("accountRole", privilege);
          }

          data.append("accountName", username);

          // duyệt từng key trong data
          for (let [key, value] of data) {
            console.log(`${key}: ${value}`);
          }
          console.log(data.toString());

          // Gọi API cập nhật
          try {
            const response = await fetch("api/account/update_account.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: data.toString(),
            });

            const result = await response.json();

            if (result.status === "success") {
              const id = result.id;
              console.log(id);

              // Cập nhật địa chỉ
              const addressData = new URLSearchParams();
              addressData.append("idUser", id);
              addressData.append("houseAddress", numberHomeAndStreetName);
              addressData.append("provinceAddress", province);
              addressData.append("cityAddress", district);
              addressData.append("wardAddress", ward);

              const addressRes = await fetch("api/address/updateAddress.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: addressData,
              });
              const addressResult = await addressRes.json();
              console.log(addressResult);

              if (!addressResult.success) {
                toast({
                  title: "Lỗi",
                  message: "Không thể cập nhật địa chỉ.",
                  type: "error",
                  duration: 3000,
                });
              } else {
                toast({
                  title: "Thành công",
                  message: "Sửa người dùng thành công",
                  type: "success",
                  duration: 3000,
                });
              }
              // Có thể reload lại dữ liệu ở đây
              updateDialog.remove(); // Nếu muốn đóng dialog sau khi sửa
              renderAccountTable();
            } else {
              toast({
                title: "Lỗi",
                message: result.message || "Có lỗi xảy ra khi cập nhật.",
                type: "error",
                duration: 3000,
              });
            }
          } catch (error) {
            console.error("Lỗi khi gọi API cập nhật:", error);
            toast({
              title: "Lỗi",
              message: "Không thể kết nối tới máy chủ.",
              type: "error",
              duration: 3000,
            });
          }
        });

      // Xử lý màu sắc nếu cần (selectEvents)
      const selects = updateDialog.querySelectorAll("select");
      selects.forEach((select) => isNotFirstItemSelected(select));
    })
    .catch((err) => {
      console.error("Lỗi khi tải dữ liệu người dùng:", err);
    });
}
