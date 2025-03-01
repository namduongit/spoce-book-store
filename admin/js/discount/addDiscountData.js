import { isNotFirstItemSelected } from "../selectEvents.js";
import { clickToShowDatePicker, defaultDateSelected } from "../others.js";

// Hàm thiết lập sự kiện Thêm một khuyến mãi cho bảng
export function addDiscountData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-discount");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một khuyến mãi
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("discount");
    addDialog.style.width = "772px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
                <h1 class="dialog__title">Thêm khuyến mãi</h1>
                <button id="close-discount-button" class="dialog__close">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="dialog__line"></div>
                <div class="dialog__row">
                  <div class="dialog__form-group">
                    <label>Mã khuyến mãi</label>
                    <input type="text" id="add-discount-id" readonly />
                  </div>
                  <div class="dialog__form-group">
                    <label>Tên khuyến mãi</label>
                    <input type="text" id="add-discount-name" placeholder="Nhập Tên khuyến mãi" autofocus/>
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group">
                    <label>Ngày bắt đầu</label>
                    <input type="date" id="add-discount-date-start" />
                  </div>
                  <div class="dialog__form-group">
                    <label>Ngày kết thúc</label>
                    <input type="date" id="add-discount-date-end" />
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group">
                    <label>Tiền đơn hàng tối thiểu</label>
                    <input type="text" id="add-discount-order-price-start" placeholder="Nhập Tiền đơn hàng tối thiểu" />
                  </div>
                  <div class="dialog__form-group">
                    <label>Tiền đơn hàng tối đa</label>
                    <input type="text" id="add-discount-order-price-end" placeholder="Nhập Tiền đơn hàng tối đa" />
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group">
                    <label>Phần trăm (%)</label>
                    <input type="text" id="add-discount-percent" placeholder="Nhập Phần trăm (%)" />
                  </div>
                  <div class="dialog__form-group">
                    <label>Trạng thái</label>
                    <select id="add-discount-status">
                      <option value="" selected>Chọn Trạng thái</option>
                      <option value="1">Hoạt động</option>
                      <option value="0">Tạm dừng</option>
                    </select>
                  </div>
                </div>
                <div class="dialog__buttons">
                  <button id="add-discount-button" class="add">Thêm</button>
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
    // -
    clickToShowDatePicker("add-discount-date-start");
    clickToShowDatePicker("add-discount-date-end");
    defaultDateSelected("add-discount-date-start");
    defaultDateSelected("add-discount-date-end");

    // Gán sự kiện cho nút "Thêm" dialog
    document
      .getElementById("add-discount-button")
      .addEventListener("click", () => {
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const id = document.getElementById("add-discount-id");
        const name = document.getElementById("add-discount-name");
        const dateStart = document.getElementById("add-discount-date-start");
        const dateEnd = document.getElementById("add-discount-date-end");
        const percent = document.getElementById("add-discount-percent");
        const status = document.getElementById("add-discount-status");

        // ... (Xử lý tiếp ở đây)
        console.log(id.value);
        console.log(name.value);
        console.log(dateStart.value);
        console.log(dateEnd.value);
        console.log(percent.value);
        console.log(status.value);
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-discount-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
