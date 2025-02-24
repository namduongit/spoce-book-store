import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một thể loại cho bảng
export function updateTypeData(idTypeSelected) {
  // Phải truy vấn từ CSDL thông qua idTypeSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-type");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một thể loại
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("type");
  updateDialog.style.width = "672px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <h1 class="dialog__title">Sửa thể loại</h1>
          <button id="close-type-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Mã thể loại</label>
              <input type="text" id="update-type-id" readonly />
            </div>
            <div class="dialog__form-group">
              <label>Tên thể loại</label>
              <input type="text" id="update-type-name" placeholder="Nhập Tên thể loại" autofocus/>
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Trạng thái</label>
              <select id="update-type-status" disabled>
                <option value="" selected>Chọn Trạng thái</option>
                <option value="1">Hoạt động</option>
                <option value="0">Tạm dừng</option>
              </select>
            </div>
            <div class="dialog__form-group">
            </div>
          </div>
          <div class="dialog__buttons">
            <button id="update-type-button" class="update">Sửa</button>
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
    .getElementById("update-type-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const name = document.getElementById("update-type-name");
      const status = document.getElementById("update-type-status");

      // ... (Xử lý tiếp ở đây)
      console.log(name.value);
      console.log(status.value);
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document.getElementById("close-type-button").addEventListener("click", () => {
    // Xoá dialog
    updateDialog.remove();

    // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
    updateButton.classList.remove("active");
  });
}
