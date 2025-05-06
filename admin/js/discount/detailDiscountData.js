import { fetchData } from "../../../public/js/book/getDataBook.js";
import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Xem chi tiết một khuyến mãi cho bảng
export async function detailDiscountData(idDiscountSelected) {
  // Gọi api để lấy được thông tin nhà cung cấp được nhấn
  const discount = await fetchData(
    `api/discounts/detail.php?id=${idDiscountSelected}`
  );
  //   // Biến chứa đối tượng là nút "Chi tiết"
  //   const detailButton = document.getElementById("detail-button-discount");

  //   // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  //   detailButton.classList.add("active");

  // Tạo một dialog để xem chi tiết một khuyến mãi
  const detailDialog = document.createElement("dialog");
  // - Định dạng dialog
  detailDialog.classList.add("dialog");
  detailDialog.classList.add("discount");
  // detailDialog.style.width = "58%";
  // - Ghi nội dung dialog
  detailDialog.innerHTML = `
    <h1 class="dialog__title">Chi tiết khuyến mãi</h1>
      <button id="close-discount-button" class="dialog__close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="dialog__line"></div>
      <form method="get" class="dialog__form">
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Mã khuyến mãi</label>
            <input type="text" id="detail-discount-id" class="text-center" value="${discount.data.id}" readonly />
          </div>
          <div class="dialog__form-group">
            <label>Tên khuyến mãi</label>
            <input type="text" id="detail-discount-name" value="${discount.data.name}" readonly />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Loại khuyến mãi</label>
            <select id="detail-discount-type" disabled>
              <option value="" selected>${discount.data.type}</option>
            </select>
          </div>
          <div class="dialog__form-group">
            <label>Giá trị giảm</label>
            <input type="text" id="detail-discount-value" value="${discount.data.discountV}" readonly />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Ngày bắt đầu</label>
            <input type="text" id="detail-discount-date-start" value="${discount.data.dateStart}" readonly />
          </div>
          <div class="dialog__form-group">
            <label>Ngày kết thúc</label>
            <input type="text" id="detail-discount-date-end" value="${discount.data.dateEnd}" readonly />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Tiền đơn tối thiểu</label>
            <input type="text" id="detail-discount-min" value="${discount.data.min}" readonly />
          </div>
          <div class="dialog__form-group">
            <label>Tiền giảm tối đa</label>
            <input type="text" id="detail-discount-max" value="${discount.data.max}" readonly />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Trạng thái</label>
            <select id="detail-discount-status" disabled>
              <option value="" selected>${discount.data.status}</option>
            </select>
          </div>
          <div class="dialog__form-group"></div>
        </div>
      </form>
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
      // detailButton.classList.remove("active");
    });
}
