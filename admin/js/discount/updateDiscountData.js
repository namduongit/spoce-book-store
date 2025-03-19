import { isNotFirstItemSelected } from "../selectEvents.js";
import { clickToShowDatePicker, defaultDateSelected } from "../others.js";

// Hàm thiết lập sự kiện Sửa một khuyến mãi cho bảng
export function updateDiscountData(idDiscountSelected) {
  // Phải truy vấn từ CSDL thông qua idDiscountSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-discount");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một khuyến mãi
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("discount");
  updateDialog.style.width = "772px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
            <h1 class="dialog__title">Sửa khuyến mãi</h1>
            <button id="close-discount-button" class="dialog__close">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <form method="post" class="dialog__form">
              <div class="dialog__row">
                <div class="dialog__form-group">
                  <label>Mã khuyến mãi</label>
                  <input type="text" id="update-discount-id" readonly />
                </div>
                <div class="dialog__form-group">
                  <label>Tên khuyến mãi</label>
                  <input type="text" id="update-discount-name" placeholder="Nhập Tên khuyến mãi" autofocus/>
                </div>
              </div>
              <div class="dialog__row">
                     <div class="dialog__form-group">
                      <label>Loại khuyến mãi</label>
                      <select id="update-discount-type">
                        <option value="" selected>Chọn Loại khuyến mãi</option>
                        <option value="1">Phần trăm</option>
                        <option value="0">Tiền</option>
                      </select>
                    </div>
                    <div class="dialog__form-group">
                      <label>Giá trị</label>
                      <input type="text" id="update-discount-value" placeholder="Nhập Giá trị" />
                    </div>
                  </div>
              <div class="dialog__row">
                <div class="dialog__form-group">
                  <label>Ngày bắt đầu</label>
                  <input type="date" id="update-discount-date-start" />
                </div>
                <div class="dialog__form-group">
                  <label>Ngày kết thúc</label>
                  <input type="date" id="update-discount-date-end" />
                </div>
              </div>
              <div class="dialog__row">
                    <div class="dialog__form-group">
                      <label>Tiền đơn tối thiểu</label>
                      <input type="text" id="update-discount-order-min-cost" placeholder="Nhập Tiền đơn tối thiểu" />
                    </div>
                    <div class="dialog__form-group">
                      <label>Tiền giảm tối đa</label>
                      <input type="text" id="update-discount-order-max-discount" placeholder="Nhập Tiền giảm tối đa" />
                    </div>
                  </div>
              <div class="dialog__row">
                <div class="dialog__form-group">
                  <label>Trạng thái</label>
                  <select id="update-discount-status" disabled>
                    <option value="" selected>Chọn Trạng thái</option>
                    <option value="1">Hoạt động</option>
                    <option value="0">Tạm dừng</option>
                  </select>
                </div>
                <div class="dialog__form-group"></div>
              </div>
              <div class="dialog__buttons">
                <button id="update-discount-button" class="update">Sửa</button>
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
  // -
  clickToShowDatePicker("update-discount-date-start");
  clickToShowDatePicker("update-discount-date-end");
  defaultDateSelected("update-discount-date-start");
  defaultDateSelected("update-discount-date-end");

  // Gán sự kiện cho nút "Sửa" dialog
  document
    .getElementById("update-discount-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      //   const id = document.getElementById("add-discount-id");
      const name = document.getElementById("add-discount-name");
      const type = document.getElementById("add-discount-type");
      const value = document.getElementById("add-discount-value");
      const dateStart = document.getElementById("add-discount-date-start");
      const dateEnd = document.getElementById("add-discount-date-end");
      const minCost = document.getElementById("add-discount-order-min-cost");
      const maxDiscount = document.getElementById(
        "add-discount-order-max-discount"
      );
      //   const status = document.getElementById("add-discount-status");

      // ... (Xử lý tiếp ở đây)
      //   console.log(id.value);
      console.log(name.value);
      console.log(value.value);
      console.log(type.value);
      console.log(dateStart.value);
      console.log(dateEnd.value);
      console.log(minCost.value);
      console.log(maxDiscount.value);
      //   console.log(status.value);
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-discount-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
