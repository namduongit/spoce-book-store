import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một người dùng cho bảng
export function detailDiscountData(idDiscountSelected) {
  // Phải truy vấn từ CSDL thông qua idDiscountSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Chi tiết"
  const detailButton = document.getElementById("detail-button-discount");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  detailButton.classList.add("active");

  // Tạo một dialog để sửa một người dùng
  const detailDialog = document.createElement("dialog");
  // - Định dạng dialog
  detailDialog.classList.add("dialog");
  detailDialog.classList.add("discount");
  detailDialog.style.width = "772px";
  // - Ghi nội dung dialog
  detailDialog.innerHTML = `
          <h1 class="dialog__title">Chi tiết khuyến mãi</h1>
                <button id="close-discount-button" class="dialog__close">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="dialog__line"></div>
                <div class="dialog__row">
                  <div class="dialog__form-group">
                    <label>Mã khuyến mãi</label>
                    <input type="text" id="detail-discount-id" readonly />
                  </div>
                  <div class="dialog__form-group">
                    <label>Tên khuyến mãi</label>
                    <input type="text" id="detail-discount-name" readonly />
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group">
                    <label>Ngày bắt đầu</label>
                    <input type="date" id="detail-discount-date-start" readonly />
                  </div>
                  <div class="dialog__form-group">
                    <label>Ngày kết thúc</label>
                    <input type="date" id="detail-discount-date-end" readonly />
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group">
                    <label>Tiền đơn hàng tối thiểu</label>
                    <input type="text" id="detail-discount-order-price-start" readonly />
                  </div>
                  <div class="dialog__form-group">
                    <label>Tiền đơn hàng tối đa</label>
                    <input type="text" id="detail-discount-order-price-end" readonly />
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group">
                    <label>Phần trăm (%)</label>
                    <input type="text" id="detail-discount-percent" readonly />
                  </div>
                  <div class="dialog__form-group">
                    <label>Trạng thái</label>
                    <select id="detail-discount-status" disabled>
                      <option value="" selected>Chọn Trạng thái</option>
                      <option value="1">Hoạt động</option>
                      <option value="0">Tạm dừng</option>
                    </select>
                  </div>
                </div>
                <div class="dialog__buttons">
                  <button id="detail-discount-button" class="add">Thêm</button>
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
    .getElementById("close-discount-button")
    .addEventListener("click", () => {
      // Xoá dialog
      detailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      detailButton.classList.remove("active");
    });
}
