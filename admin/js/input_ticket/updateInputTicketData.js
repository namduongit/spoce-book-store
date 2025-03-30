import { isNotFirstItemSelected } from "../selectEvents.js";
import {
  vietnamMoneyFormat,
  clickToShowDatePicker,
  defaultDateSelected,
} from "../others.js";

// const data = [
//   {
//     bookId: "SP00001",
//     bookName: "Tên sách 1", // Thực tế phải truy vấn để lấy ra tiêu đề sách
//     priceBase: 200000,
//     priceInput: 350000,
//     quantityInput: 2,
//   },
//   {
//     bookId: "SP00005",
//     bookName: "Tên sách 5",
//     priceBase: 228000,
//     priceInput: 400000,
//     quantityInput: 10,
//   },
// ];

function formatDateForInput(dateString) {
  let date = new Date(dateString);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`; // Định dạng chuẩn cho input date
}

export async function getAllInputTicketDetailByInputticketId(id){
  let url = `api/input_ticket_detail/get.php?inputTicketId=${id}`;
  console.log("Request URL:", url);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
      }
        let data = await response.json();
        console.log("Dữ liệu nhận được:", data);
        return data;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        alert("Lỗi khi lấy dữ liệu: " + error.message);
        return [];
      }
}
 


// Hàm cập nhật lại dữ liệu cho bảng Chi tiết phiếu nhập
function renderInputTicketDetailTable(data) {
  // Biến chứa đối tượng bảng Chi tiết phiếu nhập
  const bodyInInputTicketDetailTable = document.querySelector(
    ".dialog__form-group > table > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
          <tr>
              <td>${data[i].bookId}</td>
              <td class="name">${data[i].bookName}</td>
              <td>${vietnamMoneyFormat(data[i].basePrice)}</td>
              <td>${vietnamMoneyFormat(data[i].sellingPrice)}</td>
              <td>${data[i].quantity}</td>
              <td class="total">${vietnamMoneyFormat(
                data[i].quantity * data[i].sellingPrice
              )}</td>
              <td>
                <i id="update-remove-trash-input_ticket" class="fa-solid fa-trash"
                  style="color: red; text-align: center;">
                </i>
              </td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyInInputTicketDetailTable.innerHTML = html;
}

// Hàm thiết lập sự kiện thêm sách cho chi tiết phiếu
function updateInputTicketDetailTable() {
  // Tạo một dialog để thêm một sách cho chi tiết phiếu
  const updateDetailDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDetailDialog.classList.add("dialog");
  updateDetailDialog.classList.add("input_ticket-detail");
  updateDetailDialog.style.width = "464px";
  // - Ghi nội dung dialog
  updateDetailDialog.innerHTML = `
    <button id="close-input_ticket-detail-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__row">
      <div class="dialog__form-group">
          <label>Mã sách</label>
          <select id="update-input_ticket-detail-id">
            <option value="" selected>Chọn Mã sách</option>
            <option value="SA00001">SA00001</option>
            <option value="SA00002">SA00002</option>
          </select>
      </div>
      <div class="dialog__form-group">
          <label>Giá bìa (VNĐ)</label>
          <input type="text" id="update-input_ticket-detail-price-base" value="" readonly />
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Tên sách</label>
        <input type="text" id="update-input_ticket-detail-name" value="" readonly />
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group">
        <label>Giá nhập (VNĐ)</label>
        <input type="text" id="update-input_ticket-detail-price-input" placeholder="Nhập Giá nhập (VNĐ)" />
      </div>
      <div class="dialog__form-group">
        <label>Số lượng</label>
        <input type="text" id="update-input_ticket-detail-quantity-input" placeholder="Nhập Số lượng" />
      </div>
    </div>
    <div class="dialog__buttons">
      <button id="update-input_ticket-detail-button" class="yes">Đồng ý</button>
    </div>
  `;

  // Thêm vào body
  document.body.appendChild(updateDetailDialog);

  // Hiển thị updateDetailDialog
  updateDetailDialog.showModal();

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-input_ticket-detail-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDetailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateDetailDialog.classList.remove("active");
    });
  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("update-input_ticket-detail-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const id = document.getElementById("update-input_ticket-detail-id");
      const name = document.getElementById("update-input_ticket-detail-name");
      const priceBase = document.getElementById(
        "update-input_ticket-detail-price-base"
      );
      const priceInput = document.getElementById(
        "update-input_ticket-detail-price-input"
      );
      const quantityInput = document.getElementById(
        "update-input_ticket-detail-quantity-input"
      );

      // ... xử lý (chưa kiểm tra tính hợp lệ)
      //   let isExists = false;
      //   for (let i = 0; i < data.length; i++) {
      //     if (item.id == id.value) {
      //       isExists = true;
      //       break;
      //     }
      //   }
      //   if (!isExists) {
      //   } else {
      //   }
      data.push({
        bookId: id.value,
        bookName: name.value,
        priceBase: Number(priceBase.value),
        priceInput: Number(priceInput.value),
        quantityInput: Number(quantityInput.value),
      });

      // Cập nhật lại giao diện hiển thị
      // renderInputTicketDetailTable(data);

      // Xoá dialog
      updateDetailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateDetailDialog.classList.remove("active");
    });
}

// Hàm thiết lập sự kiện hiện thêm một phiếu nhập
export async function updateInputTicketData(idInputTicketSelected) {
  const AllDetail = await getAllInputTicketDetailByInputticketId(idInputTicketSelected);

  // Biến chứa đối tượng là nút "thêm"
  const updateButton = document.getElementById("update-button-input_ticket");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để thêm một phiếu nhập
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("input_ticket");
  updateDialog.style.width = "1146px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <h1 class="dialog__title">Sửa phiếu nhập</h1>
          <button id="close-input_ticket-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form method="post" class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket half">
                <label>Mã phiếu nhập</label>
                <input type="text" id="update-input_ticket-id" value="${AllDetail[0].inputTicketId}" readonly />
              </div>
              <div class="dialog__form-group input_ticket half">
                <label>Mã nhân viên</label>
                <input type="text" id="update-input_ticket-customer"  value="${AllDetail[0].employeeUserName}"  readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Tổng thanh toán (VNĐ)</label>
                <input type="text" id="update-input_ticket-cost"  value="${AllDetail[0].inputTicketId}"  readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Trạng thái</label>
                <input type="text" id="update-input_ticket-status"  value="${AllDetail[0].status}"  readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket half">
                <label>Ngày tạo phiếu</label>
                <input type="date" id="update-input_ticket-date-create"  value="${formatDateForInput(AllDetail[0].dateCreate)}"  />
              </div>
              <div class="dialog__form-group input_ticket half">
                <label>Ngày hợp đồng</label>
                <input type="date" id="update-input_ticket-date-contract" value="${formatDateForInput(AllDetail[0].dateCreate)}"  />
              </div>
              <div class="dialog__form-group input_ticket full">
                <label>Nhà cung cấp</label>
                <select id="update-author-status">
                  <option value="" selected>${AllDetail[0].suplierName}</option>
                  <option value="1">NCC00001 - Nhà cung cấp 01</option>
                  <option value="0">NCC00002 - Nhà cung cấp 02</option>
                </select>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label style="color: #000;">Chi tiết phiếu nhập</label>
                <button id="update-button-add-input_ticket-detail"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Sách</button>
                <table>
                  <thead>
                    <tr>  
                      <th width="8%">Mã sách</th>
                      <th width="28%">Tên sách</th>
                      <th width="14%">Giá bìa (VNĐ)</th>
                      <th width="14%">Giá nhập (VNĐ)</th>
                      <th width="10%">Số lượng</th>
                      <th width="22%">Thành tiền (VNĐ)</th>
                      <th width="4%"></th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>
            <div class="dialog__buttons input_ticket">
              <button class="confirm-status">Hoàn thành</button>
              <button class="cancel-status">Huỷ phiếu</button>
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
  clickToShowDatePicker("update-input_ticket-date-create");
  clickToShowDatePicker("update-input_ticket-date-contract");
  defaultDateSelected("update-input_ticket-date-create");
  defaultDateSelected("update-input_ticket-date-contract");
  // - Nút hiển thị dialog cho phép thêm một sách cho chi tiết phiếu
  const addDetailButton = document.getElementById(
    "update-button-add-input_ticket-detail"
  );
  addDetailButton.addEventListener("click", (e) => {
    // - Loại bỏ giá trị mặc định
    e.preventDefault();

    // -
    updateInputTicketDetailTable();
  });
  // -
  renderInputTicketDetailTable(AllDetail[0].allDetail);

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-input_ticket-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
