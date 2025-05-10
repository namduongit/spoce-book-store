import { fetchData } from "../../../public/js/book/getDataBook.js";
import { vietnamMoneyFormat, numberToVietnamWords } from "../others.js";
import { printTicket } from "../printTicket.js";
import { renderOrderDetailTable } from "./renderOrderTable.js";

//
export async function printOrderTicket(idOrderSelected) {
  // Truy vấn csdl để lấy ra đơn hàng được chọn 
  const order = await fetchData(`api/orders/listBase.php?id=${idOrderSelected}`);

  // const printButton = document.getElementById("print-button-order");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // printButton.classList.add("active");

  // Lấy ra ngày hiện tại
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // Tạo một dialog để thêm một người dùng
  const printDialog = document.createElement("dialog");
  // - Định dạng dialog
  printDialog.classList.add("ticket");
  printDialog.classList.add("order");
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
              <main class="ticket__body order">
                  <h1 class="ticket__title">PHIẾU ĐƠN HÀNG</h1>
                  <p class="ticket__date">Ngày tạo đơn: <span class="date-start">${
                    order.data[0].createAt
                  }</span></p>
                  <p class="ticket__info"><b>Mã đơn hàng:</b> #${
                    order.data[0].id
                  }</p>
                  <p class="ticket__info"><b>Khách hàng:</b> ${
                    order.data[0].customerName
                  }</p>
                  <p class="ticket__info"><b>Số điện thoại:</b> ${
                    order.data[0].customerPhone
                  }</p>
                  <p class="ticket__info"><b>Email:</b> ${
                    order.data[0].customerEmail
                  }</p>
                  <p class="ticket__info"><b>Địa chỉ giao hàng:</b> ${
                    order.data[0].addressToShip
                  }</p>
                  <p class="ticket__info"><b>Phương thức thanh toán:</b> ${
                    order.data[0].payName
                  }</p>
                  <p class="ticket__info"><b>Tổng thanh toán (VNĐ):</b> ${vietnamMoneyFormat(
                    order.data[0].total
                  )}<u>đ</u> (${numberToVietnamWords(order.data[0].total)})</p>
                  <p class="ticket__info"><b>Trạng thái đơn hàng:</b> ${
                    order.data[0].status
                  } (${order.data[0].payStatus})</p>
                  <p class="ticket__info"><b>Chi tiết đơn hàng:</b></p>
                  <table class="ticket__table order-details"">
                      <thead>
                        <tr>  
                          <th width="10%">Mã sách</th>
                          <th width="42%" class="name">Tên sách</th>
                          <th width="12%">Giá bán (VNĐ)</th>
                          <th width="12%">Số lượng</th>
                          <th width="24%" class="total">Thành tiền (VNĐ)</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                  </table>
              </main>
              <footer class="ticket__footer order">
                  <p class="ticket_customer">
                      Ngày ${day} tháng ${
    month <= 9 ? "0" + month : month
  } năm ${year}<br>
                      <b>Khách hàng</b><br>
                      (Ký tên, ghi rõ họ tên)
                  </p>
                  <p class="ticket_customer">
                      Ngày ${day} tháng ${
    month <= 9 ? "0" + month : month
  } năm ${year}<br>
                      <b>Nhân viên lập phiếu</b><br>
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

  // Cập nhật chi tiết đơn hàng
  renderOrderDetailTable(order.data[0].id);

  // Gán sự kiện in phiếu khi nhấn nút
  printTicket(
    "print-ticket-button",
    "content-print",
    `PHDONHANG_${order.data[0].id}`
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
