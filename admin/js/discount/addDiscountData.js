import { isNotFirstItemSelected } from "../selectEvents.js";
import { clickToShowDatePicker, defaultDateSelected } from "../others.js";

// Hàm load dữ liệu khuyến mãi
async function loadDiscountData() {
  try {
    const response = await fetch("/api/discount/get_discount.php");
    const data = await response.json();
    
    if (data.status === "success") {
      const tbody = document.querySelector(".table__body");
      tbody.innerHTML = ""; // Xóa dữ liệu cũ
      
      data.data.list.forEach((discount) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${discount.maPGG}</td>
          <td>${discount.tenPGG}</td>
          <td>${discount.type === "PERCENTAGE" ? discount.phanTram + "%" : discount.giaTriGiam.toLocaleString() + "đ"}</td>
          <td>${discount.toiThieu.toLocaleString()}đ</td>
          <td>${discount.toiDa.toLocaleString()}đ</td>
          <td>${discount.ngayBatDau}</td>
          <td>${discount.ngayKetThuc}</td>
          <td>${discount.trangThai}</td>
          <td>
            <button class="edit" data-id="${discount.maPGG}">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete" data-id="${discount.maPGG}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
}

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
                <form method="post" class="dialog__form">
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
                      <label>Loại khuyến mãi</label>
                      <select id="add-discount-type">
                        <option value="" selected>Chọn Loại khuyến mãi</option>
                        <option value="PERCENTAGE">Phần trăm</option>
                        <option value="FIXED_AMOUNT">Tiền</option>
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
                      <input type="text" id="add-discount-order-min-cost" placeholder="Nhập Tiền đơn tối thiểu" />
                    </div>
                    <div class="dialog__form-group">
                      <label>Tiền giảm tối đa</label>
                      <input type="text" id="add-discount-order-max-discount" placeholder="Nhập Tiền giảm tối đa" />
                    </div>
                  </div>
                  <div class="dialog__row">
                    <div class="dialog__form-group">
                      <label>Trạng thái</label>
                      <select id="add-discount-status">
                        <option value="" selected>Chọn Trạng thái</option>
                        <option value="ACTIVE">Hoạt động</option>
                        <option value="DISABLED">Tạm dừng</option>
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
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const name = document.getElementById("add-discount-name").value;
        const type = document.getElementById("add-discount-type").value;
        const value = document.getElementById("add-discount-value").value;
        const dateStart = document.getElementById(
          "add-discount-date-start"
        ).value;
        const dateEnd = document.getElementById("add-discount-date-end").value;
        const minCost = document.getElementById(
          "add-discount-order-min-cost"
        ).value;
        const maxDiscount = document.getElementById(
          "add-discount-order-max-discount"
        ).value;
        const status = document.getElementById("add-discount-status").value;
        e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
        // Kiểm tra dữ liệu
        let errorMessage = "";

        // Kiểm tra tên khuyến mãi
        if (!name) {
          errorMessage += "Vui lòng nhập tên khuyến mãi!\n";
        } else if (name.length < 3) {
          errorMessage += "Tên khuyến mãi phải có ít nhất 3 ký tự!\n";
        }

        // Kiểm tra loại khuyến mãi
        if (!type) {
          errorMessage += "Vui lòng chọn loại khuyến mãi!\n";
        }

        // Kiểm tra giá trị
        if (!value) {
          errorMessage += "Vui lòng nhập giá trị!\n";
        } else {
          const valueNum = parseFloat(value);
          if (isNaN(valueNum)) {
            errorMessage += "Giá trị phải là số!\n";
          } else if (type === "PERCENTAGE" && (valueNum <= 0 || valueNum > 100)) {
            errorMessage += "Giá trị phần trăm phải từ 0 đến 100!\n";
          } else if (type === "FIXED_AMOUNT" && valueNum <= 0) {
            errorMessage += "Giá trị tiền phải lớn hơn 0!\n";
          }
        }

        // Kiểm tra ngày
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

        // Kiểm tra tiền đơn tối thiểu
        if (!minCost) {
          errorMessage += "Vui lòng nhập tiền đơn tối thiểu!\n";
        } else {
          const minCostNum = parseFloat(minCost);
          if (isNaN(minCostNum) || minCostNum <= 0) {
            errorMessage += "Tiền đơn tối thiểu phải là số lớn hơn 0!\n";
          }
        }

        // Kiểm tra tiền giảm tối đa
        if (!maxDiscount) {
          errorMessage += "Vui lòng nhập tiền giảm tối đa!\n";
        } else {
          const maxDiscountNum = parseFloat(maxDiscount);
          if (isNaN(maxDiscountNum) || maxDiscountNum <= 0) {
            errorMessage += "Tiền giảm tối đa phải là số lớn hơn 0!\n";
          }
        }

        // Kiểm tra trạng thái
        if (!status) {
          errorMessage += "Vui lòng chọn trạng thái!\n";
        }

        // Nếu có lỗi, hiển thị và dừng
        if (errorMessage) {
          alert(errorMessage);
          return;
        }

        try {
          // Chuẩn bị dữ liệu để gửi
          const discountData = {
            tenPGG: name,
            type: type,
            phanTram: type === "PERCENTAGE" ? parseInt(value) : null,
            giaTriGiam: type === "FIXED_AMOUNT" ? parseInt(value) : null,
            toiThieu: parseInt(minCost),
            toiDa: parseInt(maxDiscount),
            ngayBatDau: dateStart,
            ngayKetThuc: dateEnd,
            trangThai: status,
          };

          console.log("Dữ liệu gửi đi:", discountData); // Log dữ liệu gửi đi

          // // Gửi yêu cầu POST đến API
          const response = await fetch("/api/discount/add_discount.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(discountData),
          });

          console.log("Status response:", response.status); // Log status code
          const responseText = await response.text(); // Lấy response dạng text trước
          console.log("Response text:", responseText); // Log response text

          let result;
          try {
            result = JSON.parse(responseText); // Thử parse JSON
          } catch (e) {
            console.error("Lỗi parse JSON:", e);
            throw new Error("Response không phải là JSON hợp lệ");
          }

          if (result.status === "success") {
            alert("Thêm khuyến mãi thành công!");
            // Đóng dialog
            addDialog.remove();
            // Xoá class active
            addButton.classList.remove("active");
            // Cập nhật dữ liệu bảng
            await loadDiscountData();
          } else {
            alert(result.message || "Có lỗi xảy ra khi thêm khuyến mãi!");
          }
        } catch (error) {
          console.error("Chi tiết lỗi:", error);
          // alert("Có lỗi xảy ra khi thêm khuyến mãi: " + error.message);
        }
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
