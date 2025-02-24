import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một nhà cung cấp cho bảng
export function updateSuppliesData(idSuppliesSelected) {
  // Phải truy vấn từ CSDL thông qua idSuppliesSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-supplies");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một nhà cung cấp
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("supplies");
  updateDialog.style.width = "672px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
            <h1 class="dialog__title">Sửa nhà cung cấp</h1>
            <button id="close-supplies-button" class="dialog__close">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <div class="dialog__row">
                <div class="dialog__form-group">
                    <label>Mã nhà cung cấp</label>
                    <input type="text" id="add-supplies-id" readonly />
                </div>
                <div class="dialog__form-group">
                    <label>Tên nhà cung cấp</label>
                    <input type="text" id="add-supplies-name" placeholder="Nhập Tên nhà cung cấp" autofocus/>
                </div>
            </div>
            <div class="dialog__row">
                <div class="dialog__form-group">
                    <label>Số điện thoại</label>
                    <input type="text" id="add-supplies-phone" placeholder="Nhập Số điện thoại" />
                </div>
                <div class="dialog__form-group">
                    <label>Email</label>
                    <input type="text" id="add-supplies-email" placeholder="Nhập Email"/>
                </div>
            </div>
            <div class="dialog__row">
                <div class="dialog__form-group full">
                    <label>Địa chỉ</label>
                    <input type="text" id="add-supplies-address" placeholder="Nhập Địa chỉ" />
                    <button>Chọn địa chỉ</button>
                </div>
            </div>
            <div class="dialog__row">
                <div class="dialog__form-group">
                    <label>Trạng thái</label>
                    <select id="add-supplies-status" disabled>
                    <option value="" selected>Chọn Trạng thái</option>
                    <option value="1">Hoạt động</option>
                    <option value="0">Tạm dừng</option>
                    </select>
                </div>
                <div class="dialog__form-group"></div>
            </div>
          <div class="dialog__buttons">
            <button id="update-supplies-button" class="update">Sửa</button>
          </div>
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
    .getElementById("update-supplies-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const fullname = document.getElementById("update-supplies-fullname");
      const phone = document.getElementById("update-supplies-phone");
      const email = document.getElementById("update-supplies-email");
      const address = document.getElementById("update-supplies-address");
      const password = document.getElementById("update-supplies-password");
      const privilege = document.getElementById("update-supplies-privilege");
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
    .getElementById("close-supplies-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
