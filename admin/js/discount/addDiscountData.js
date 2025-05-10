import { renderDiscountTable } from "./renderDiscountTable.js";
import { toast } from "../../../public/js/toast.js";
import { isNotFirstItemSelected } from "../selectEvents.js";
import { clickToShowDatePicker, defaultDateSelected } from "../others.js";

// Hàm thiết lập sự kiện Thêm một phiếu giảm giá cho bảng
export function addDiscountData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-discount");
  if (!addButton) return;
  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một phiếu giảm giá
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("discount");
    addDialog.style.width = "772px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
      <h1 class="dialog__title">Thêm phiếu giảm giá</h1>
      <button id="close-discount-button" class="dialog__close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="dialog__line"></div>
      <form class="dialog__form" autocomplete="off">
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Mã phiếu giảm giá</label>
            <input type="text" id="add-discount-id" class="text-center" value="Được xác định sau khi xác nhận thêm !" readonly />
          </div>
          <div class="dialog__form-group">
            <label>Tên phiếu giảm giá</label>
            <input type="text" id="add-discount-name" placeholder="Nhập Tên phiếu giảm giá" autofocus/>
          </div>
        </div>
        <div class="dialog__row">
           <div class="dialog__form-group">
            <label>Loại phiếu giảm giá</label>
            <select id="add-discount-type">
              <option value="" selected>Chọn Loại phiếu giảm giá</option>
              <option value="Phần trăm">Phần trăm</option>
              <option value="Tiền">Tiền</option>
            </select>
          </div>
          <div class="dialog__form-group">
            <label>Giá trị</label>
            <input type="text" id="add-discount-value" placeholder="Nhập Giá trị" />
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
            <label>Tiền đơn tối thiểu</label>
            <input type="text" id="add-discount-min" placeholder="Nhập Tiền đơn tối thiểu" />
          </div>
          <div class="dialog__form-group">
            <label>Tiền giảm tối đa</label>
            <input type="text" id="add-discount-max" placeholder="Nhập Tiền giảm tối đa" />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Trạng thái</label>
            <select id="add-discount-status">
              <option value="" selected>Chọn Trạng thái</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Tạm dừng">Tạm dừng</option>
            </select>
          </div>
          <div class="dialog__form-group"></div>
        </div>
        <div class="dialog__buttons">
          <button id="add-discount-button" class="add">Thêm</button>
        </div>
      </form >
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
      .addEventListener("click", async (e) => {
        // Ngăn chặn hành vi mặc định của nút submit
        e.preventDefault();

        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const name = document.getElementById("add-discount-name").value
          ? document.getElementById("add-discount-name").value
          : null;
        const type = document.getElementById("add-discount-type").value
          ? document.getElementById("add-discount-type").value
          : null;
        const discountV = document.getElementById("add-discount-value").value
          ? document.getElementById("add-discount-value").value
          : null;
        const dateStart = document.getElementById("add-discount-date-start")
          .value
          ? document.getElementById("add-discount-date-start").value
          : null;
        const dateEnd = document.getElementById("add-discount-date-end").value
          ? document.getElementById("add-discount-date-end").value
          : null;
        const min = document.getElementById("add-discount-min").value
          ? document.getElementById("add-discount-min").value
          : null;
        const max = document.getElementById("add-discount-max").value
          ? document.getElementById("add-discount-max").value
          : null;
        const status = document.getElementById("add-discount-status").value
          ? document.getElementById("add-discount-status").value
          : null;

        // Kiểm tra dữ liệu
        let errorMessage = "";
        if (!name) {
          errorMessage += "Vui lòng nhập tên phiếu giảm giá!\n";
        } else if (name.length < 3) {
          errorMessage += "Tên phiếu giảm giá phải có ít nhất 3 ký tự!\n";
        }
        if (!type) {
          errorMessage += "Vui lòng chọn loại phiếu giảm giá!\n";
        }
        if (!discountV) {
          errorMessage += "Vui lòng nhập giá trị!\n";
        } else {
          const valueNum = parseFloat(discountV);
          if (isNaN(valueNum)) {
            errorMessage += "Giá trị phải là số!\n";
          } else if (
            type === "Phần trăm" &&
            (valueNum <= 0 || valueNum > 100)
          ) {
            errorMessage += "Giá trị phần trăm phải từ 0 đến 100!\n";
          } else if (type === "Tiền" && valueNum <= 1000) {
            errorMessage += "Giá trị tiền phải lớn hơn 1000!\n";
          }
        }
        if (!dateStart || !dateEnd) {
          errorMessage += "Vui lòng chọn đầy đủ ngày bắt đầu và kết thúc!\n";
        } else {
          const startDate = new Date(dateStart);
          const endDate = new Date(dateEnd);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (startDate < today) {
            errorMessage += "Ngày bắt đầu không được nhỏ hơn ngày hiện tại!\n";
          }
          if (endDate <= startDate) {
            errorMessage += "Ngày kết thúc phải lớn hơn ngày bắt đầu!\n";
          }
        }
        if (!min) {
          errorMessage += "Vui lòng nhập tiền đơn tối thiểu!\n";
        } else {
          const minNum = parseFloat(min);
          if (isNaN(minNum) || minNum <= 0) {
            errorMessage += "Tiền đơn tối thiểu phải là số lớn hơn 0!\n";
          }
        }
        if (!max) {
          errorMessage += "Vui lòng nhập tiền giảm tối đa!\n";
        } else {
          const maxNum = parseFloat(max);
          if (isNaN(maxNum) || maxNum <= 0) {
            errorMessage += "Tiền giảm tối đa phải là số lớn hơn 0!\n";
          }
        }
        if (!status) {
          errorMessage += "Vui lòng chọn trạng thái!\n";
        }

        // Nếu có lỗi, hiển thị và dừng
        if (errorMessage) {
          toast({
            title: "Cảnh báo",
            message: errorMessage,
            type: "warning",
            duration: 3000,
          });
          return;
        }

        try {
          // Gửi yêu cầu POS T đến API
          const response = await fetch("api/discounts/create.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              name: name,
              type: type,
              discountV: parseInt(discountV),
              min: parseInt(min),
              max: parseInt(max),
              dateStart: dateStart,
              dateEnd: dateEnd,
              status: status,
            }),
          });

          const result = await response.json();
          if (result.success) {
            toast({
              title: "Thành công",
              message: "Thêm phiếu giảm giá thành công.",
              type: "success",
              duration: 3000,
            });
          } else {
            toast({
              title: "Cảnh báo",
              message: result.message || "Thêm thất bại.",
              type: "warning",
              duration: 3000,
            });
          }
        } catch (error) {
          toast({
            title: "Lỗi",
            message: `Không thể kết nối: ${error}`,
            type: "error",
            duration: 3000,
          });
        }

        addButton.classList.remove("active");
        addDialog.remove();
        renderDiscountTable(1);
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
