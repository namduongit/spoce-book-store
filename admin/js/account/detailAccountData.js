import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một người dùng cho bảng
export function detailAccountData(idAccountSelected) {
  // Phải truy vấn từ CSDL thông qua idAccountSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Chi tiết"
  const detailButton = document.getElementById("detail-button-account");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  detailButton.classList.add("active");

  // Tạo một dialog để sửa một người dùng
  const detailDialog = document.createElement("dialog");
  // - Định dạng dialog
  detailDialog.classList.add("dialog");
  detailDialog.classList.add("account");
  detailDialog.style.width = "772px";
  // - Ghi nội dung dialog
  detailDialog.innerHTML = `
          <h1 class="dialog__title">Chi tiết người dùng</h1>
          <button id="close-account-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Mã người dùng</label>
              <input type="text" id="detail-account-id" readonly />
            </div>
            <div class="dialog__form-group">
              <label>Họ và tên</label>
              <input type="text" id="detail-account-fullname" readonly />
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Số điện thoại</label>
              <input type="text" id="detail-account-phone" readonly />
            </div>
            <div class="dialog__form-group">
              <label>Email</label>
              <input type="text" id="detail-account-email" readonly />
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group full">
              <label>Địa chỉ</label>
              <input type="text" id="detail-account-address" readonly />
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Tên tài khoản</label>
              <input type="text" id="detail-account-username" readonly />
            </div>
            <div class="dialog__form-group">
              <label>Mật khẩu</label>
              <input type="text" id="detail-account-password" readonly />
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Phân quyền</label>
              <select id="detail-account-privilege" disabled>
                  <option value="" selected>Chọn Phân quyền</option>
                  <option value="1">Quản lý</option>
                  <option value="2">Nhân viên</option>
                  <option value="3">Khách hàng</option>
              </select>
              <button>Chi tiết</button>
            </div>
            <div class="dialog__form-group">
              <label>Trạng thái</label>
              <select id="detail-account-status" disabled>
                <option value="" selected>Chọn Trạng thái</option>
                <option value="1">Hoạt động</option>
                <option value="0">Tạm dừng</option>
              </select>
            </div>
          </div>
    `;

  // Thêm vào body
  document.body.appendChild(detailDialog);

  // Hiển thị detailDialog
  detailDialog.showModal();

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-account-button")
    .addEventListener("click", () => {
      // Xoá dialog
      detailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      detailButton.classList.remove("active");
    });
}
