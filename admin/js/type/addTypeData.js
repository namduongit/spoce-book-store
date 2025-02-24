import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Thêm một thể loại cho bảng
export function addTypeData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-type");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một thể loại
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("type");
    addDialog.style.width = "672px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
            <h1 class="dialog__title">Thêm thể loại</h1>
            <button id="close-type-button" class="dialog__close">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <div class="dialog__row">
              <div class="dialog__form-group">
                <label>Mã thể loại</label>
                <input type="text" id="add-type-id" readonly />
              </div>
              <div class="dialog__form-group">
                <label>Tên thể loại</label>
                <input type="text" id="add-type-name" placeholder="Nhập Tên thể loại" autofocus/>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group">
                <label>Trạng thái</label>
                <select id="add-type-status">
                  <option value="" selected>Chọn Trạng thái</option>
                  <option value="1">Hoạt động</option>
                  <option value="0">Tạm dừng</option>
                </select>
              </div>
              <div class="dialog__form-group">
              </div>
            </div>
            <div class="dialog__buttons">
              <button id="add-type-button" class="add">Thêm</button>
            </div>
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

    // Gán sự kiện cho nút "thêm" dialog
    document.getElementById("add-type-button").addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const id = document.getElementById("add-type-id");
      const name = document.getElementById("add-type-name");
      const status = document.getElementById("add-type-status");

      // ... (Xử lý tiếp ở đây)
      console.log(id.value);
      console.log(name.value);
      console.log(status.value);
    });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-type-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
