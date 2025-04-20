import { isNotFirstItemSelected } from "../selectEvents.js";
import { updateAddressSelect } from "../../../api/address/updateAddressSelect.js";
import { renderAccountTable } from "./renderAccountTable.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
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
            <button class="address">Chọn</button>
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
    const addressButton = document.querySelector(
      ".dialog__form-group > button.address"
    );
    addressButton.addEventListener("click", (e) => {
      // - Loại bỏ giá trị mặc định
      e.preventDefault();

      // -
      showAddressSelectDialog();
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
          // { condition: !address, message: "Vui lòng nhập địa chỉ." },
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

        let yes = await showNotification("Bạn có đồng ý thêm sách này không?");
        const formData = new FormData();
        if (yes) {
          // Nếu hợp lệ thì tiếp tục gửi dữ liệu
          formData.append("accountEmail", email);
          formData.append("accountPhone", phone);
          formData.append("accountFullName", fullname);
          // formData.append("accountAddress", address);
          formData.append("accountName", username);
          formData.append("accountPassword", password);
          formData.append("accountRole", parseInt(privilege));
          formData.append("accountStatus", status);
        }

        try {
          const response = await fetch("api/account/add_account.php", {
            method: "POST",
            body: formData,
          });

          const result = await response.json();
          console.log(result);

          if (result.success) {
            // alert("Thêm sách thành công!");
            toast({
              title: "Thành công",
              message: `Thêm sách thành công`,
              type: "success",
              duration: 3000,
            });
          } else {
            // alert("Lỗi thêm sách: " + (result.error || "Không rõ nguyên nhân"));
            toast({
              title: "Cảnh báo",
              message: `${result.message}`,
              type: "warning",
              duration: 3000,
            });
          }
        } catch (error) {
          console.error("Lỗi fetch API:", error);
          // alert("Không thể kết nối đến server!");
          toast({
            title: "Lỗi",
            message: `Lỗi fetch API:${error}`,
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
