import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Thêm một nhà xuất bản cho bảng
export function addPublisherData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-publisher");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một nhà xuất bản
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("publisher");
    addDialog.style.width = "398px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
              <h1 class="dialog__title">Thêm nhà xuất bản</h1>
              <button id="close-publisher-button" class="dialog__close">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <div class="dialog__line"></div>
              <div class="dialog__row">
                <div class="dialog__form-group full">
                  <label>Mã nhà xuất bản</label>
                  <input type="text" id="add-publisher-id" readonly />
                </div>
              </div>
              <div class="dialog__row">
                <div class="dialog__form-group full">
                  <label>Tên nhà xuất bản</label>
                  <input type="text" id="add-publisher-name" placeholder="Nhập Tên nhà xuất bản" autofocus/>
                </div>
              </div>
              <div class="dialog__row">
                <div class="dialog__form-group full">
                  <label>Trạng thái</label>
                  <select id="add-publisher-status">
                    <option value="" selected>Chọn Trạng thái</option>
                    <option value="1">Hoạt động</option>
                    <option value="0">Tạm dừng</option>
                  </select>
                </div>
              </div>
              <div class="dialog__buttons">
                <button id="add-publisher-button" class="add">Thêm</button>
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
    document
      .getElementById("add-publisher-button")
      .addEventListener("click", () => {
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const id = document.getElementById("add-publisher-id");
        const name = document.getElementById("add-publisher-name");
        const status = document.getElementById("add-publisher-status");

        // ... (Xử lý tiếp ở đây)
        console.log(id.value);
        console.log(name.value);
        console.log(status.value);
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-publisher-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
