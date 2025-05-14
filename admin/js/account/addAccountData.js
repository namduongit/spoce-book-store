import { isNotFirstItemSelected } from "../selectEvents.js";
import { updateAddressSelect } from "../../../api/address/updateAddressSelect.js";
import { renderAccountTable } from "./renderAccountTable.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
// import { getRolePrivilege } from "../changeMainContent.js";
async function getRolePrivilege() {
  try {
    const response = await fetch("api/roles/list.php");
    const data = await response.json(); // nếu server trả JSON
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
// Hàm hiện dialog cho việc "chọn" địa chỉ
function showAddressSelectDialog() {
  // Tạo một dialog để thêm một người dùng
  const addDialog = document.createElement("dialog");
  // - Định dạng dialog
  addDialog.classList.add("dialog");
  addDialog.classList.add("address-select");
  addDialog.style.width = "464px";
  // - Ghi nội dung dialog
  addDialog.innerHTML = `
    <button id="close-address-select-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Số nhà và tên đường</label>
        <input
          type="text" id="number-home-and-street-name-input"
          placeholder="Nhập Số nhà và tên đường"
        />
      </div>
    </div>

    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Tỉnh thành </label>
        <select id="province-select">
        </select>
      </div>
    </div>

    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Quận / Huyện</label>
        <select id="district-select">
        </select>
      </div>
    </div>

    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Phường / Xã</label>
        <select id="ward-select">
        </select>
      </div>
    </div>

    <div class="dialog__buttons">
      <button id="address-select-button" class="yes">Đồng ý</button>
    </div>
  `;

  // Thêm vào body
  document.body.appendChild(addDialog);

  // Hiển thị addDialog
  addDialog.showModal();

  // Gọi Update địa chỉ
  updateAddressSelect("province-select", "district-select", "ward-select");

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-address-select-button")
    .addEventListener("click", () => {
      // Xoá dialog
      addDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      addButton.classList.remove("active");
    });
}

// Hàm thiết lập sự kiện thêm một người dùng cho bảng
export async function addAccountData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-account");
  if (!addButton) return;

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một người dùng
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("account");
    addDialog.style.width = "772px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
      <h1 class="dialog__title">Thêm người dùng</h1>
      <button id="close-account-button" class="dialog__close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="dialog__line"></div>
      <form method="post" class="dialog__form">
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Mã người dùng</label>
            <input type="text" id="add-account-id" readonly />
          </div>
          <div class="dialog__form-group">
            <label>Họ và tên</label>
            <input type="text" id="add-account-fullname" placeholder="Nhập Họ và tên" autofocus/>
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Số điện thoại</label>
            <input type="text" id="add-account-phone" placeholder="Nhập Số điện thoại" />
          </div>
          <div class="dialog__form-group">
            <label>Email</label>
            <input type="text" id="add-account-email" placeholder="Nhập Email"/>
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group full">
            <label>Địa chỉ</label>
            <input type="text" id="add-account-address" placeholder="Nhập Địa chỉ" />
            <button type="button" class="address">Chọn</button>
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Tên tài khoản</label>
            <input type="text" id="add-account-username" placeholder="Nhập Tên tài khoản" />
          </div>
          <div class="dialog__form-group">
            <label>Mật khẩu</label>
            <input type="text" id="add-account-password" placeholder="Nhập Mật khẩu" />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Nhóm quyền</label>
            <select id="add-account-privilege">
                <option value="" selected>Chọn Nhóm quyền</option>
                <option value="2">Quản lý</option>
                <option value="3">Nhân viên thủ kho</option>
                <option value="1">Nhân viên bán hàng</option>
                <option value="4">Khách hàng</option>
            </select>
          </div>
          <div class="dialog__form-group">
            <label>Trạng thái</label>
            <select id="add-account-status">
              <option value="" selected>Chọn Trạng thái</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Tạm dừng">Tạm dừng</option>
            </select>
          </div>
        </div>
        <div class="dialog__buttons">
          <button id="add-account-button" class="add">Thêm</button>
        </div>
      </form>
    `;

    // Thêm vào body
    document.body.appendChild(addDialog);
    renderPrivilegesSelect();
    // Hiển thị addDialog
    addDialog.showModal();

    // Sự kiện cho các thành phần trong dialog
    // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
    const selectElement = document.querySelectorAll(
      ".dialog__form-group > select"
    );
    selectElement.forEach((select) => {
      isNotFirstItemSelected(select);
    });
    // - Nút hiển thị dialog cho phép chọn được địa chỉ gần hợp lệ
    let fullAddress = ""; // Biến chứa địa chỉ đầy đủ
    const addressButton = document.querySelector(
      ".dialog__form-group > button.address"
    );

    addressButton.addEventListener("click", (e) => {
      // - Loại bỏ giá trị mặc định
      e.preventDefault();

      showAddressSelectDialog();
      document
        .getElementById("address-select-button")
        .addEventListener("click", (e) => {
          e.preventDefault();
          console.log("ok");

          const numberHomeAndStreetName = document.getElementById(
            "number-home-and-street-name-input"
          ).value;

          const provinceSelect = document.getElementById("province-select");
          const districtSelect = document.getElementById("district-select");
          const wardSelect = document.getElementById("ward-select");

          const province =
            provinceSelect.selectedOptions.length > 0
              ? provinceSelect.selectedOptions[0].textContent.trim()
              : "";
          const district =
            districtSelect.selectedOptions.length > 0
              ? districtSelect.selectedOptions[0].textContent.trim()
              : "";
          const ward =
            wardSelect.selectedOptions.length > 0
              ? wardSelect.selectedOptions[0].textContent.trim()
              : "";

          if (!numberHomeAndStreetName || !province || !district || !ward) {
            toast({
              title: "Lỗi",
              message: "Vui lòng chọn đầy đủ thông tin.",
              type: "warning",
              duration: 3000,
            });
            return;
          }

          fullAddress = `${numberHomeAndStreetName}, ${ward}, ${district}, ${province}`;
          document.getElementById("add-account-address").value = fullAddress;

          // Tự đóng dialog địa chỉ
          const addressDialog = document.querySelector("dialog.address-select");
          if (addressDialog) addressDialog.remove();
        });
    });

    // Gán sự kiện cho nút "Thêm" dialog
    document
      .getElementsByClassName("add")[0]
      .addEventListener("click", async (e) => {
        e.preventDefault();

        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const id = document.getElementById("add-account-id").value.trim();
        const fullname = document
          .getElementById("add-account-fullname")
          .value.trim();
        const phone = document.getElementById("add-account-phone").value.trim();
        const email = document.getElementById("add-account-email").value.trim();
        const address = document
          .getElementById("add-account-address")
          .value.trim();
        console.log(address);

        const username = document
          .getElementById("add-account-username")
          .value.trim();
        const password = document
          .getElementById("add-account-password")
          .value.trim();
        const privilege = document
          .getElementById("add-account-privilege")
          .value.trim();
        // - Chi tiết quyền
        const status = document
          .getElementById("add-account-status")
          .value.trim();
        // Regex kiểm tra địa chỉ hợp lệ: "Số nhà Tên đường, Phường ..., Quận/Huyện ..., Tỉnh/TP ..."
        const addressFormatRegex =
          /^.+?,\s*(phường|Phường)\s+.+?,\s*(quận|Quận|huyện|Huyện|tp|TP|Thành Phố|Thành phố)\s+.+?,\s*(tỉnh|Tỉnh|tp|TP|Thành Phố|Thành phố)\.?\s+.+$/;

        const addressUser = address.split(",");
        const numberHomeAndStreetName = addressUser[0];
        const province = addressUser[3];
        const district = addressUser[2];
        const ward = addressUser[1];
        // Kiểm tra tính hợp lệ của các biến
        const validations = [
          { condition: !fullname, message: "Vui lòng nhập họ và tên." },
          { condition: !phone, message: "Vui lòng nhập số điện thoại." },
          {
            condition: !/^\d{10,11}$/.test(phone),
            message: "Số điện thoại không hợp lệ.",
          },
          { condition: !email, message: "Vui lòng nhập email." },
          {
            condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: "Email không hợp lệ.",
          },
          // {
          //   // condition: address && !addressFormatRegex.test(address),
          //   message:
          //     "Địa chỉ không đúng định dạng. Ví dụ: '12 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh'",
          // },
          { condition: !username, message: "Vui lòng nhập tên tài khoản." },
          { condition: !password, message: "Vui lòng nhập mật khẩu." },
          { condition: !privilege, message: "Vui lòng chọn nhóm quyền." },
          { condition: !status, message: "Vui lòng chọn trạng thái." },
        ];

        // Duyệt qua từng điều kiện và hiển thị toast nếu có lỗi
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

        let yes = await showNotification(
          "Bạn có đồng ý thêm người dùng này không?"
        );
        if (!yes) return;

        const formData = new URLSearchParams();
        formData.append("accountEmail", email);
        formData.append("accountPhone", phone);
        formData.append("accountFullName", fullname);
        formData.append("accountName", username);
        formData.append("accountPassword", password);
        if (privilege !== null && privilege !== "null") {
          formData.append("accountRole", parseInt(privilege));
        }
        formData.append("accountStatus", status);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        try {
          // Gửi form tạo người dùng
          const response = await fetch("api/account/add_account.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
          });

          const result = await response.json();

          if (result.status.trim() === "success" && address) {
            const id = result.id; // Lấy ID người dùng vừa tạo từ phản hồi
            console.log("ok", id);

            // Gửi form tạo địa chỉ
            const addressData = new URLSearchParams();
            addressData.append("idUser", id);
            addressData.append("numberHouse", numberHomeAndStreetName.trim());
            addressData.append("province", province.trim());
            addressData.append("city", district.trim());
            addressData.append("ward", ward.trim());

            const addressRes = await fetch("api/address/insertAddress.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: addressData,
            });

            const addressResult = await addressRes.json();

            if (addressResult.success) {
            } else {
              toast({
                title: "Lỗi địa chỉ",
                message: addressResult.message,
                type: "warning",
                duration: 3000,
              });
            }
          }
          toast({
            title: "Thành công",
            message: "Thêm người dùng thành công",
            type: "success",
            duration: 3000,
          });
        } catch (error) {
          console.error("Lỗi fetch API:", error);
          toast({
            title: "Lỗi",
            message: `Lỗi fetch API: ${error}`,
            type: "error",
            duration: 3000,
          });
        }

        addDialog.remove();
        addButton.classList.remove("active");
        renderAccountTable();
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-account-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
async function renderPrivilegesSelect() {
  try {
    const privileges = await getRolePrivilege();
    if (!privileges) return;

    const privilegeSelect = document.getElementById("add-account-privilege");

    if (!privilegeSelect) return;
    privilegeSelect.innerHTML =
      '<option value="" selected>Chọn Nhóm quyền</option>';

    privileges.data.forEach((privilege) => {
      const option = document.createElement("option");
      option.value = privilege.id || "";
      option.textContent = privilege.name || "Không có tên";
      privilegeSelect.appendChild(option);
    });
    const nullOption = document.createElement("option");
    nullOption.value = "null";
    nullOption.textContent = "Chưa có quyền";
    privilegeSelect.appendChild(nullOption);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu quyền:", error);
  }
}
