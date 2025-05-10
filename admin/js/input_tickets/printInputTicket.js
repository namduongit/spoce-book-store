import { fetchData } from "../../../public/js/book/getDataBook.js";
import { printTicket } from "../printTicket.js";
import { vietnamMoneyFormat } from "../others.js";
import { numberToVietnamWords } from "../others.js";

async function renderInputDetailTable(inputTicketIdSelected) {
  const inputTicketDetails = await fetchData(
    `api/input_ticket_details/list.php?inputTicketId=${inputTicketIdSelected}`
  );

  // Biến chứa đối tượng bảng Chi tiết đơn hàng
  const bodyInInputDetailTable = document.querySelector(
    ".ticket__table.input_ticket > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < inputTicketDetails.data.length; i++) {
    html += `
          <tr>
              <td>${inputTicketDetails.data[i].bookId}</td>
              <td class="left">${inputTicketDetails.data[i].bookName}</td>
              <td>${vietnamMoneyFormat(inputTicketDetails.data[i].price)}</td>
              <td>${inputTicketDetails.data[i].quantity}</td>
              <td class="right">${vietnamMoneyFormat(
                inputTicketDetails.data[i].quantity *
                  inputTicketDetails.data[i].price
              )}</td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyInInputDetailTable.innerHTML = html;
}

//
export async function printInputTicket(idInputTicketSelected) {
  //
  const inputTicket = await fetchData(
    `api/input_tickets/list.php?id=${idInputTicketSelected}`
  );

  // Lấy ra ngày hiện tại
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // printButton.classList.add("active");

  // Tạo một dialog để thêm một người dùng
  const printDialog = document.createElement("dialog");
  // - Định dạng dialog
  printDialog.classList.add("ticket");
  printDialog.classList.add("input_ticket");
  printDialog.style.width = "90%";
  // - Ghi nội dung dialog
  printDialog.innerHTML = `
            <button id="close-ticket-button" class="dialog__close">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div id="content-print" class="ticket__content">
              <header class="ticket__header">
                  <img src="../../media/logo/public_logo.png" alt="Logo Web" class="ticket__logo">
                  <div class="ticket__contact">
                      <p>Cửa hàng bán sách SPOCE STORE</p>
                      <p>273 An Đ. Vương, Phường 2, Quận 5, Hồ Chí Minh 700000</p>
                      <p>123456789 - 0987654321</p>
                      <p>spocestore@gmail.com.vn</p>
                  </div>
              </header>
              <main class="ticket__body input_ticket">
                  <h1 class="ticket__title">PHIẾU NHẬP HÀNG</h1>
                  <p class="ticket__date">Ngày tạo phiếu: <span>${
                    inputTicket.data[0].createAt
                  }</span></p>
                  <p class="ticket__info"><b>Mã phiếu:</b> #${
                    inputTicket.data[0].id
                  }</p>
                  <p class="ticket__info"><b>Nhà cung cấp:</b> ${
                    inputTicket.data[0].supplierName
                  }${
    inputTicket.data[0].supplierPhone
      ? " - " + inputTicket.data[0].supplierPhone
      : ""
  }${
    inputTicket.data[0].supplierEmail
      ? " - " + inputTicket.data[0].supplierEmail
      : ""
  }</p>
                  <p class="ticket__info"><b>Nhân viên tạo phiếu:</b> ${
                    inputTicket.data[0].employeeName
                  }</p>
                  <p class="ticket__info"><b>Tổng tiền nhập (VNĐ):</b> ${vietnamMoneyFormat(
                    inputTicket.data[0].totalPrice
                  )}<u>đ</u> (${numberToVietnamWords(
    inputTicket.data[0].totalPrice
  )})</p>
                  <p class="ticket__info"><b>Trạng thái phiếu:</b> ${
                    inputTicket.data[0].status
                  }</p>
                  <p class="ticket__info"><b>Chi tiết phiếu:</b></p>
                  <table class="ticket__table input_ticket">
                      <thead>
                        <tr>  
                          <th width="10%">Mã sách</th>
                          <th width="42%" class="name">Tên sách</th>
                          <th width="12%">Giá nhập (VNĐ)</th>
                          <th width="12%">Số lượng</th>
                          <th width="24%" class="total">Thành tiền (VNĐ)</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                  </table>
              </main>
              <footer class="ticket__footer input_ticket">
                  <p class="ticket_customer">
                      Ngày ${day} tháng ${
    month <= 9 ? "0" + month : month
  } năm ${year}<br>
                      <b>Nhân viên lập phiếu</b><br>
                      (Ký tên, ghi rõ họ tên)
                  </p>
                  <p class="ticket_customer">
                      Ngày ${day} tháng ${
    month <= 9 ? "0" + month : month
  } năm ${year}<br>
                      <b>Thủ kho</b><br>
                      (Ký tên, ghi rõ họ tên)
                  </p>
              </footer>
            </div>
            <button id="print-ticket-button" class="ticket__print-btn"><i class="fa-solid fa-file-arrow-down"></i>&nbsp;&nbsp;Tải xuống phiếu</button>
          `;

  // Thêm vào body
  document.body.appendChild(printDialog);

  // Hiển thị printDialog
  printDialog.showModal();

  // Cập nhật dữ liệu chi tiết phiếu nhập
  renderInputDetailTable(inputTicket.data[0].id);

  // Gán sự kiện in phiếu khi nhấn nút
  printTicket(
    "print-ticket-button",
    "content-print",
    `PHNHAPHANG_${inputTicket.data[0].id}`
  );

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-ticket-button")
    .addEventListener("click", () => {
      // Xoá dialog
      printDialog.remove();

      // // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // printButton.classList.remove("active");
    });
}
