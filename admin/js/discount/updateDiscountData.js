import { isNotFirstItemSelected } from "../selectEvents.js";
import { clickToShowDatePicker, defaultDateSelected } from "../others.js";

// Hàm thiết lập sự kiện Sửa một khuyến mãi cho bảng
export async function updateDiscountData(idDiscountSelected) {
  // Phải truy vấn từ CSDL thông qua idDiscountSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
  const id = idDiscountSelected.textContent;
  const discountData = await fetch(`/api/discount/get_discount_detail.php?maGiamGia=${id}`);
  const discountDataJson = await discountData.json();
  // console.log(discountDataJson);
  const discount = discountDataJson.data;
  // console.log(discount);
  let discountValue = "";
  if (discount.type === "PERCENTAGE") {
    discountValue = `${discount.phanTram}%`;
  } else if (discount.type === "FIXED_AMOUNT") {
    discountValue = `${parseInt(discount.giaTriGiam).toLocaleString()}đ`;
  } else {
    discountValue = "Không xác định";
  }
  console.log(discountValue);
  
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
                  <input type="text" id="update-discount-id" readonly value="${discount.maPGG}"/>
                </div>
                <div class="dialog__form-group">
                  <label>Tên khuyến mãi</label>
                  <input type="text" id="update-discount-name" placeholder="Nhập Tên khuyến mãi" autofocus value="${discount.tenPGG}"/>
                </div>
              </div>
              <div class="dialog__row">
                     <div class="dialog__form-group">
                      <label>Loại khuyến mãi</label>
                      <select id="update-discount-type">
                        <option value="${discount.type}" selected style="opacity: 1;">${discount.type}</option>
                        <option value="PERCENTAGE">PERCENTAGE</option>
                        <option value="FIXED_AMOUNT">FIXED_AMOUNT</option>
                      </select>
                    </div>
                    <div class="dialog__form-group">
                      <label>Giá trị</label>
                      <input type="text" id="update-discount-value" placeholder="Nhập Giá trị" value="${discountValue}"/>
                    </div>
                  </div>
              <div class="dialog__row">
                <div class="dialog__form-group">
                  <label>Ngày bắt đầu</label>
                  <input type="date" id="update-discount-date-start" style="opacity: 1;" value="${discount.ngayBatDau}" autofocus/>
                </div>
                <div class="dialog__form-group">
                  <label>Ngày kết thúc</label>
                  <input type="date" id="update-discount-date-end" style="opacity: 1;" value="${discount.ngayKetThuc}" autofocus/>
                </div>
              </div>
              <div class="dialog__row">
                    <div class="dialog__form-group">
                      <label>Tiền đơn tối thiểu</label>
                      <input type="text" id="update-discount-order-min-cost" placeholder="Nhập Tiền đơn tối thiểu" value="${discount.toiThieu}"/>
                    </div>  
                    <div class="dialog__form-group">
                      <label>Tiền giảm tối đa</label>
                      <input type="text" id="update-discount-order-max-discount" placeholder="Nhập Tiền giảm tối đa" value="${discount.toiDa}"/>
                    </div>
                  </div>
              <div class="dialog__row">
                <div class="dialog__form-group">
                  <label>Trạng thái</label>
                  <select id="update-discount-status">
                    <option value="${discount.trangThai}">${discount.trangThai}</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DISABLE">DISABLE</option>
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
    .addEventListener("click", async (e) => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      e.preventDefault();
      const id = document.getElementById("update-discount-id").value;
      const name = document.getElementById("update-discount-name").value;
      const type = document.getElementById("update-discount-type").value;
      let value = document.getElementById("update-discount-value").value;
      const dateStart = document.getElementById("update-discount-date-start").value;
      const dateEnd = document.getElementById("update-discount-date-end").value;
      const minCost = document.getElementById("update-discount-order-min-cost").value;
      const maxDiscount = document.getElementById(
          "update-discount-order-max-discount"
      ).value;
      const status = document.getElementById("update-discount-status").value;

      // ... (Xử lý tiếp ở đây)
      //   console.log(id.value);
      console.log(name);
      console.log(value);
      console.log(type);
      console.log(dateStart);
      console.log(dateEnd);
      console.log(minCost);
      console.log(maxDiscount);
      //   console.log(status.value);
      // Kiểm tra tính hợp lệ của dữ liệu
      if (!name || !type || !value || !dateStart || !dateEnd || !minCost || !maxDiscount) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      // Kiểm tra tính hợp lệ của ngày bắt đầu và ngày kết thúc
      if (dateStart > dateEnd) {
        alert("Ngày bắt đầu không được lớn hơn ngày kết thúc");
        return;
      }
      // Kiểm tra tính hợp lệ của giá trị
      if (type === "PERCENTAGE" && (value < 0 || value > 100)) {
        alert("Giá trị phải nằm trong khoảng 0-100");
        return;
      }
      if (type === "FIXED_AMOUNT") {
        value = value.replace(/,/g, '');
        value = parseInt(value);
      }
      if (type === "FIXED_AMOUNT" && (value < 0 || value > 1000000000)) {
        alert("Giá trị phải nằm trong khoảng 0-10000000");
        return;
      }
      if(type === "PERCENTAGE" ){
        value = parseInt(value);
      }
      // Kiểm tra tính hợp lệ của tiền đơn tối thiểu
      if (minCost < 0 || minCost > 1000000000) {
        alert("Tiền đơn tối thiểu phải nằm trong khoảng 0-1000000000");
        return;
      }
      // Kiểm tra tính hợp lệ của tiền giảm tối đa
      if (maxDiscount < 0 || maxDiscount > 1000000000) {
        alert("Tiền giảm tối đa phải nằm trong khoảng 0-1000000000");
        return;
      }
      // Gửi dữ liệu đến server để cập nhật
      let params = new URLSearchParams();
      params.append("id", id);
      params.append("name", name);
      params.append("type", type);
      params.append("value", value);
      params.append("dateStart", dateStart);
      params.append("dateEnd", dateEnd);
      params.append("minCost", minCost);
      params.append("maxDiscount", maxDiscount);
      params.append("status", status);
      
      let url = `api/discount/update_discount.php?${params.toString()}`;
      console.log("Request URL:", url); 

      try {
        const response = await fetch(url);

        const result = await response.json(); // Chuyển luôn về JSON
        console.log(result);
        if (result.success) {
          alert("sửa thành công!");
        } else {
          alert("Lỗi sửa phiếu khuyến mãi: " + (result.error));
        }
      } catch (error) {
        console.error("Error:", error);
      }
      
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
