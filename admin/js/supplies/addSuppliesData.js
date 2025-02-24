import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện thêm một nhà cung cấp cho bảng Nhà cung cấp
export function addSuppliesData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-supplies");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một nhà cung cấp
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("supplies");
    addDialog.style.width = "672px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
        <h1 class="dialog__title">Thêm nhà cung cấp</h1>
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
            <select id="add-supplies-status">
              <option value="" selected>Chọn Trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="0">Tạm dừng</option>
            </select>
          </div>
          <div class="dialog__form-group"></div>
        </div>
        <div class="dialog__buttons">
          <button id="add-supplies-button" class="add">Thêm</button>
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
      .getElementById("add-supplies-button")
      .addEventListener("click", () => {
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const id = document.getElementById("add-supplies-id");
        const name = document.getElementById("add-supplies-name");
        const phone = document.getElementById("add-supplies-phone");
        const email = document.getElementById("add-supplies-email");
        const address = document.getElementById("add-supplies-address");
        const status = document.getElementById("add-supplies-status");

        // ... (Xử lý tiếp ở đây)
        console.log(id.value);
        console.log(name.value);
        console.log(phone.value);
        console.log(email.value);
        console.log(address.value);
        console.log(status.value);
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-supplies-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
