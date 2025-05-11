import { fetchData } from "../../../public/js/book/getDataBook.js";
import { isNotFirstItemSelected } from "../selectEvents.js";
import { clickToShowDatePicker, defaultDateSelected } from "../others.js";
import { toast } from "../../../public/js/toast.js";
import { renderDiscountTable } from "./renderDiscountTable.js";

// Hàm thiết lập sự kiện Sửa một phiếu giảm giá cho bảng
export async function updateDiscountData(idDiscountSelected) {
  // Gọi api để lấy được thông tin phiếu giảm giá được nhấn
  const discount = await fetchData(
    `api/discounts/detail.php?id=${idDiscountSelected}`
  );

  // // Biến chứa đối tượng là nút "Sửa"
  // const updateButton = document.getElementById("update-button-discount");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // updateButton.classList.add("active");

  // Tạo một dialog để sửa một phiếu giảm giá
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("discount");
  // updateDialog.style.width = "58%";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
    <h1 class="dialog__title">Sửa phiếu giảm giá</h1>
    <button id="close-discount-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__line"></div>
    <form class="dialog__form" autocomplete="off">
      <div class="dialog__row">
        <div class="dialog__form-group">
          <label>Mã phiếu giảm giá</label>
          <input type="text" id="update-discount-id" class="text-center" readonly value="${
            discount.data.id
          }"/>
        </div>
        <div class="dialog__form-group">
          <label>Tên phiếu giảm giá</label>
          <input type="text" id="update-discount-name" placeholder="Nhập Tên phiếu giảm giá" autofocus value="${
            discount.data.name
          }"/>
        </div>
      </div>
      <div class="dialog__row">
             <div class="dialog__form-group">
              <label>Loại phiếu giảm giá</label>
              <select id="update-discount-type">
                ${
                  discount.data.type === "Phần trăm"
                    ? "<option value=''>Chọn Loại phiếu giảm giá</option><option value='Phần trăm' selected>Phần trăm</option><option value='Tiền'>Tiền</option>"
                    : "<option value=''>Chọn Loại phiếu giảm giá</option><option value='Tiền' selected>Tiền</option><option value='Phần trăm'>Phần trăm</option>"
                }
              </select>
            </div>
            <div class="dialog__form-group">
              <label>Giá trị</label>
              <input type="text" id="update-discount-value" placeholder="Nhập Giá trị" value="${
                discount.data.discountV
              }"/>
            </div>
          </div>
      <div class="dialog__row">
        <div class="dialog__form-group">
          <label>Ngày bắt đầu</label>
          <input type="date" id="update-discount-date-start" value="${
            discount.data.dateStart
          }"/>
        </div>
        <div class="dialog__form-group">
          <label>Ngày kết thúc</label>
          <input type="date" id="update-discount-date-end" value="${
            discount.data.dateEnd
          }"/>
        </div>
      </div>
      <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Tiền đơn tối thiểu</label>
              <input type="text" id="update-discount-min" placeholder="Nhập Tiền đơn tối thiểu" value="${
                discount.data.min
              }"/>
            </div>  
            <div class="dialog__form-group">
              <label>Tiền giảm tối đa</label>
              <input type="text" id="update-discount-max" placeholder="Nhập Tiền giảm tối đa" value="${
                discount.data.max
              }"/>
            </div>
          </div>
      <div class="dialog__row">
        <div class="dialog__form-group">
          <label>Trạng thái</label>
          <select id="update-discount-status" disabled>
            <option value="">${discount.data.status}</option>
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

      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const id = document.getElementById("update-discount-id").value;
      const name = document.getElementById("update-discount-name").value
        ? document.getElementById("update-discount-name").value
        : null;
      const type = document.getElementById("update-discount-type").value
        ? document.getElementById("update-discount-type").value
        : null;
      const discountV = document.getElementById("update-discount-value").value
        ? document.getElementById("update-discount-value").value
        : null;
      const dateStart = document.getElementById("update-discount-date-start")
        .value
        ? document.getElementById("update-discount-date-start").value
        : null;
      const dateEnd = document.getElementById("update-discount-date-end").value
        ? document.getElementById("update-discount-date-end").value
        : null;
      const min = document.getElementById("update-discount-min").value
        ? document.getElementById("update-discount-min").value
        : null;
      const max = document.getElementById("update-discount-max").value
        ? document.getElementById("update-discount-max").value
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
        } else if (type === "Phần trăm" && (valueNum <= 0 || valueNum > 100)) {
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
        const response = await fetch("/api/discounts/update.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            id: id,
            name: name,
            type: type,
            discountV: parseInt(discountV),
            min: parseInt(min),
            max: parseInt(max),
            dateStart: dateStart,
            dateEnd: dateEnd,
          }),
        });

        const result = await response.json();
        if (result.success) {
          toast({
            title: "Thành công",
            message: "Sửa phiếu giảm giá thành công.",
            type: "success",
            duration: 3000,
          });
        } else {
          toast({
            title: "Cảnh báo",
            message: result.message || "Sửa thất bại.",
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

      // updateButton.classList.remove("active");
      updateDialog.remove();
      renderDiscountTable(1);
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-discount-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // updateButton.classList.remove("active");
    });
}
