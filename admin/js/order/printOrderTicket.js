import { vietnamMoneyFormat } from "../others.js";

let data = {
  orderId: 1,
  customerId: 1,
  dateCreate: "28/02/2025",
  addressToShip: "123, Phường 10, Quận 05, Thành phố Hồ Chí Minh",
  orderDetail: [
    {
      bookId: "SP00001",
      bookName: "Tên sách 1",
      quantity: 2,
      price: 285000,
    },
    {
      bookId: "SP00005",
      bookName: "Tên sách 5",
      quantity: 10,
      price: 200000,
    },
    {
      bookId: "SP00001",
      bookName: "Tên sách 1",
      quantity: 2,
      price: 285000,
    },
    {
      bookId: "SP00005",
      bookName: "Tên sách 5",
      quantity: 10,
      price: 200000,
    },

    {
      bookId: "SP00001",
      bookName: "Tên sách 1",
      quantity: 2,
      price: 285000,
    },
    {
      bookId: "SP00005",
      bookName: "Tên sách 5",
      quantity: 10,
      price: 200000,
    },
    {
      bookId: "SP00001",
      bookName: "Tên sách 1",
      quantity: 2,
      price: 285000,
    },
    {
      bookId: "SP00005",
      bookName: "Tên sách 5",
      quantity: 10,
      price: 200000,
    },
    {
      bookId: "SP00001",
      bookName: "Tên sách 1",
      quantity: 2,
      price: 285000,
    },
    {
      bookId: "SP00005",
      bookName: "Tên sách 5",
      quantity: 10,
      price: 200000,
    },
  ],
  totalPrice: 2570000,
  methodPay: "Thanh toán khi giao hàng (COD)",
  discountId: "",
  status: "Đã hoàn thành",
  dateUpdate: "",
};

function renderOrderDetailTable() {
  // Biến chứa đối tượng bảng Chi tiết đơn hàng
  const bodyInOrderDetailTable = document.querySelector(
    ".ticket__table.order > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.orderDetail.length; i++) {
    html += `
          <tr>
              <td>${data.orderDetail[i].bookId}</td>
              <td>${data.orderDetail[i].bookName}</td>
              <td>${data.orderDetail[i].quantity}</td>
              <td>${vietnamMoneyFormat(data.orderDetail[i].price)}</td>
              <td>${vietnamMoneyFormat(
                data.orderDetail[i].quantity * data.orderDetail[i].price
              )}</td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyInOrderDetailTable.innerHTML = html;
}

//
export function printOrderTicket() {
  const printButton = document.getElementById("print-button-order");

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
                  <p class="ticket__date">Ngày đặt hàng: <span class="date-start">${
                    data.dateCreate
                  }</span></p>
                  <p class="ticket__info"><b>Khách hàng:</b> Tên khách hàng cần truy cấn</p>
                  <p class="ticket__info"><b>Số điện thoại:</b> Số điện thoại cần truy vấn</p>
                  <p class="ticket__info"><b>Email:</b> Email cần truy vấn</p>
                  <p class="ticket__info"><b>Địa chỉ giao hàng:</b> ${
                    data.addressToShip
                  }</p>
                  <p class="ticket__info"><b>Phương thức thanh toán:</b> ${
                    data.methodPay
                  }</p>
                  <p class="ticket__info"><b>Tổng thanh toán (VNĐ):</b> ${vietnamMoneyFormat(
                    data.totalPrice
                  )} đ</p>
                  <p class="ticket__info"><b>Trạng thái đơn hàng:</b> ${
                    data.status
                  }</p>
                  <p class="ticket__info"><b>Chi tiết đơn hàng:</b></p>
                  <table class="ticket__table order">
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

  //
  renderOrderDetailTable();

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
        filename: `${formattedDate}_PHDONHANG.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 }, // Tăng độ phân giải
        jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
      };
      html2pdf().set(options).from(element).save();
    });
}
