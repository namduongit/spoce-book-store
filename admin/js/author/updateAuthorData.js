import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một tác giả cho bảng
export function updateAuthorData(idAuthorSelected) {
  // Phải truy vấn từ CSDL thông qua idAuthorSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-author");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một tác giả
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("author");
  updateDialog.style.width = "398px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <h1 class="dialog__title">Sửa tác giả</h1>
          <button id="close-author-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form method="post" class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Mã tác giả</label>
                <input type="text" id="update-author-id" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Tên tác giả</label>
                <input type="text" id="update-author-name" placeholder="Nhập Tên tác giả" autofocus/>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Trạng thái</label>
                <select id="update-author-status" disabled>
                  <option value="" selected>Chọn Trạng thái</option>
                  <option value="1">Hoạt động</option>
                  <option value="0">Tạm dừng</option>
                </select>
              </div>
            </div>
            <div class="dialog__buttons">
              <button id="update-author-button" class="update">Sửa</button>
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
    .getElementById("update-author-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const name = document.getElementById("update-author-name");
      const status = document.getElementById("update-author-status");

      // ... (Xử lý tiếp ở đây)
      console.log(name.value);
      console.log(status.value);
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-author-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
