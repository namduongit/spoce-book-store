import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Xem chi tiết một khuyến mãi cho bảng
export async function detailDiscountData(idDiscountSelected) {
  try {
    const id = idDiscountSelected.textContent;
    // Lấy thông tin chi tiết của mã giảm giá
    const response = await fetch(`/api/discount/get_discount_detail.php?maGiamGia=${id}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    if (result.status === "error") {
      throw new Error(result.message);
    }

    const discount = result.data;
    // console.log(discount);
    let discountValue = "";
    if (discount.type === "PERCENTAGE") {
      discountValue = `${discount.phanTram}%`;
    } else if (discount.type === "FIXED_AMOUNT") {
      discountValue = `${parseInt(discount.giaTriGiam).toLocaleString()}đ`;
    } else {
      discountValue = "Không xác định";
    }

    // Biến chứa đối tượng là nút "Chi tiết"
    const detailButton = document.getElementById("detail-button-discount");

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    detailButton.classList.add("active");

    // Tạo một dialog để xem chi tiết một khuyến mãi
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
                  <form method="get" class="dialog__form">
                    <div class="dialog__row">
                      <div class="dialog__form-group">
                        <label>Mã khuyến mãi</label>
                        <input type="text" id="detail-discount-id" value="${discount.maPGG}" readonly />
                      </div>
                      <div class="dialog__form-group">
                        <label>Tên khuyến mãi</label>
                        <input type="text" id="detail-discount-name" value="${discount.tenPGG}" readonly />
                      </div>
                    </div>
                    <div class="dialog__row">
                      <div class="dialog__form-group">
                        <label>Loại khuyến mãi</label>
                        <select id="detail-discount-type" disabled>
                          <option value="" selected>${discount.type}</option>
                        </select>
                      </div>
                      <div class="dialog__form-group">
                        <label>Giá trị</label>
                        <input type="text" id="detail-discount-value" value="${discountValue}" readonly />
                      </div>
                    </div>
                    <div class="dialog__row">
                      <div class="dialog__form-group">
                        <label>Ngày bắt đầu</label>
                        <input type="text" id="detail-discount-date-start" value="${discount.ngayBatDau}" readonly />
                      </div>
                      <div class="dialog__form-group">
                        <label>Ngày kết thúc</label>
                        <input type="text" id="detail-discount-date-end" value="${discount.ngayKetThuc}" readonly />
                      </div>
                    </div>
                    <div class="dialog__row">
                      <div class="dialog__form-group">
                        <label>Tiền đơn tối thiểu</label>
                        <input type="text" id="detail-discount-order-min-cost" value="${discount.toiThieu}" readonly />
                      </div>
                      <div class="dialog__form-group">
                        <label>Tiền giảm tối đa</label>
                        <input type="text" id="detail-discount-order-max-discount" value="${discount.toiDa}" readonly />
                      </div>
                    </div>
                    <div class="dialog__row">
                      <div class="dialog__form-group">
                        <label>Trạng thái</label>
                        <select id="detail-discount-status" disabled>
                          <option value="" selected>${discount.trangThai}</option>
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

    // Điền thông tin vào form
    // document.getElementById("detail-discount-id").value = discount.maPGG;
    // document.getElementById("detail-discount-name").value = discount.tenPGG;
    // document.getElementById("detail-discount-type").value = discount.type;
    
    // // Xử lý hiển thị giá trị tùy theo loại
    // if (discount.type === "PERCENTAGE") {
    //   document.getElementById("detail-discount-value").value = `${discount.phanTram}%`;
    // } else {
    //   document.getElementById("detail-discount-value").value = `${parseInt(discount.giaTriGiam).toLocaleString()}đ`;
    // }
    
    // document.getElementById("detail-discount-date-start").value = discount.ngayBatDau;
    // document.getElementById("detail-discount-date-end").value = discount.ngayKetThuc;
    // document.getElementById("detail-discount-order-min-cost").value = `${parseInt(discount.toiThieu).toLocaleString()}đ`;
    // document.getElementById("detail-discount-order-max-discount").value = `${parseInt(discount.toiDa).toLocaleString()}đ`;
    // document.getElementById("detail-discount-status").value = discount.trangThai;

    // // Sự kiện cho các thành phần trong dialog
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
  } catch (error) {
    console.error("Lỗi:", error);
    alert("Có lỗi xảy ra khi lấy thông tin chi tiết: " + error.message);
  }
}
