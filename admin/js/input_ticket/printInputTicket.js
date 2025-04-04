import { vietnamMoneyFormat } from "../others.js";
import { getAllInputTicketDetailById } from "./updateInputTicketData.js";

let data = [];
//  {
//   ticketId: 1,
//   customerId: 1,
//   dateCreate: "28/02/2025",
//   dateContract: "28/01/2025",
//   inputDetail: [
//     {
//       bookId: "SP00001",
//       bookName: "Tên sách 1",
//       quantity: 2,
//       price: 285000,
//     },
//     {
//       bookId: "SP00005",
//       bookName: "Tên sách 5",
//       quantity: 10,
//       price: 200000,
//     },
//     {
//       bookId: "SP00001",
//       bookName: "Tên sách 1",
//       quantity: 2,
//       price: 285000,
//     },
//     {
//       bookId: "SP00005",
//       bookName: "Tên sách 5",
//       quantity: 10,
//       price: 200000,
//     },

//     {
//       bookId: "SP00001",
//       bookName: "Tên sách 1",
//       quantity: 2,
//       price: 285000,
//     },
//     {
//       bookId: "SP00005",
//       bookName: "Tên sách 5",
//       quantity: 10,
//       price: 200000,
//     },
//     {
//       bookId: "SP00001",
//       bookName: "Tên sách 1",
//       quantity: 2,
//       price: 285000,
//     },
//     {
//       bookId: "SP00005",
//       bookName: "Tên sách 5",
//       quantity: 10,
//       price: 200000,
//     },
//     {
//       bookId: "SP00001",
//       bookName: "Tên sách 1",
//       quantity: 2,
//       price: 285000,
//     },
//     {
//       bookId: "SP00005",
//       bookName: "Tên sách 5",
//       quantity: 10,
//       price: 200000,
//     },
//   ],
//   totalPrice: 2570000,
//   status: "Đã hoàn thành",
//   dateUpdate: "",
// };

function renderInputDetailTable() {
  // Biến chứa đối tượng bảng Chi tiết đơn hàng
  const bodyInInputDetailTable = document.querySelector(
    ".ticket__table.input_ticket > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.allDetail.length; i++) {
    html += `
          <tr>
              <td>${data.allDetail[i].bookId}</td>
              <td>${data.allDetail[i].bookName}</td>
              <td>${data.allDetail[i].quantity}</td>
              <td>${vietnamMoneyFormat(data.allDetail[i].inputPrice)}</td>
              <td>${vietnamMoneyFormat(
                data.allDetail[i].quantity * data.allDetail[i].inputPrice
              )}</td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyInInputDetailTable.innerHTML = html;
}

//
export async function printInputTicket(idInputTicketSelected) {
  data = await getAllInputTicketDetailById(idInputTicketSelected);
  console.log(data.total);
  const printButton = document.getElementById("print-button-input_ticket");

  // Lấy ra ngày hiện tại
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  printButton.classList.add("active");

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
                  <p class="ticket__info"><b>Nhân viên lập phiếu:</b> ${
                    data.employeeUserName
                  }</p>
                  <p class="ticket__info"><b>Ngày lập phiếu:</b> ${
                    data.dateCreate
                  }</p>
                  <p class="ticket__info"><b>Ngày hợp đồng:</b> ${
                    data.dateCreate
                  }</p>
                  <p class="ticket__info"><b>Tổng thanh toán (VNĐ):</b> ${vietnamMoneyFormat(
                    data.total
                  )} đ</p>
                  <p class="ticket__info"><b>Trạng thái phiếu nhập:</b> ${
                    data.status
                  }</p>
                  <p class="ticket__info"><b>Chi tiết phiếu nhập:</b></p>
                  <table class="ticket__table input_ticket">
                      <thead>
                        <tr>  
                          <th width="10%">Mã sách</th>
                          <th width="42%" class="name">Tên sách</th>
                          <th width="10%">Số lượng</th>
                          <th width="14%">Đơn giá (VNĐ)</th>
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

  //
  renderInputDetailTable();

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-ticket-button")
    .addEventListener("click", () => {
      // Xoá dialog
      printDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      printButton.classList.remove("active");
    });

  // Gán sự kiện in phiếu khi nhấn nút
  document
    .getElementById("print-ticket-button")
    .addEventListener("click", () => {
      // Định dạng chuỗi ngày
      const formattedDate = `${day}${month <= 9 ? "0" + month : month}${year}`;

      // In phiếu
      const element = document.getElementById("content-print");
      const options = {
        margin: 5,
        filename: `${formattedDate}_PHNHAPHANG.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 }, // Tăng độ phân giải
        jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
      };
      html2pdf().set(options).from(element).save();
    });
}
