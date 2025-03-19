import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một người dùng cho bảng
export function updateAccountData(idAccountSelected) {
  // Phải truy vấn từ CSDL thông qua idAccountSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-account");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một người dùng
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("account");
  updateDialog.style.width = "772px";
  // - Ghi nội dung dialog
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
              <button>Chọn</button>
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Tên tài khoản</label>
              <input type="text" id="add-account-username" readonly />
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
                  <option value="1">Quản lý</option>
                  <option value="2">Nhân viên thủ kho</option>
                  <option value="3">Nhân viên bán hàng</option>
                  <option value="4">Khách hàng</option>
              </select>
            </div>
            <div class="dialog__form-group">
              <label>Trạng thái</label>
              <select id="add-account-status" disabled>
                <option value="" selected>Chọn Trạng thái</option>
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

  // Thêm vào body
  document.body.appendChild(updateDialog);

  // Hiển thị updateDialog
  updateDialog.showModal();

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });

  // Gán sự kiện cho nút "Sửa" dialog
  document
    .getElementById("update-account-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const fullname = document.getElementById("update-account-fullname");
      const phone = document.getElementById("update-account-phone");
      const email = document.getElementById("update-account-email");
      const address = document.getElementById("update-account-address");
      const password = document.getElementById("update-account-password");
      const privilege = document.getElementById("update-account-privilege");
      // - Chi tiết quyền

      // ... (Xử lý tiếp ở đây)
      console.log(fullname.value);
      console.log(phone.value);
      console.log(email.value);
      console.log(address.value);
      console.log(password.value);
      console.log(phone.value);
      console.log(email.value);
      console.log(privilege.value);
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-account-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
