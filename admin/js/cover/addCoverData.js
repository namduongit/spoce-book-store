import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Thêm một loại bìa cho bảng
export function addCoverData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-cover");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một loại bìa
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("cover");
    addDialog.style.width = "398px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
                <h1 class="dialog__title">Thêm loại bìa</h1>
                <button id="close-cover-button" class="dialog__close">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="dialog__line"></div>
                <div class="dialog__row">
                  <div class="dialog__form-group full">
                    <label>Mã loại bìa</label>
                    <input type="text" id="add-cover-id" readonly />
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group full">
                    <label>Tên loại bìa</label>
                    <input type="text" id="add-cover-name" placeholder="Nhập Tên loại bìa" autofocus/>
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group full">
                    <label>Trạng thái</label>
                    <select id="add-cover-status">
                      <option value="" selected>Chọn Trạng thái</option>
                      <option value="1">Hoạt động</option>
                      <option value="0">Tạm dừng</option>
                    </select>
                  </div>
                </div>
                <div class="dialog__buttons">
                  <button id="add-cover-button" class="add">Thêm</button>
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

    // Gán sự kiện cho nút "Thêm" dialog
    document
      .getElementById("add-cover-button")
      .addEventListener("click", () => {
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const id = document.getElementById("add-cover-id");
        const name = document.getElementById("add-cover-name");
        const status = document.getElementById("add-cover-status");

        // ... (Xử lý tiếp ở đây)
        console.log(id.value);
        console.log(name.value);
        console.log(status.value);
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-cover-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
