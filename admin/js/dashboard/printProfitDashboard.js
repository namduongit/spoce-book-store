import { toast } from "../../../public/js/toast.js";
import { printTicket } from "../printTicket.js";

export function printProfitDashboardTicket() {
  const printButton = document.getElementById("print-button-profit_dashboard");
  printButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    //
    const headInProfitDashboardTable = document.querySelector(
      ".main__data > .main__table.profit_dashboard > thead"
    );
    const bodyInProfitDashboardTable = document.querySelector(
      ".main__data > .main__table.profit_dashboard > tbody"
    );
    const footInProfitDashboardTable = document.querySelector(
      ".main__data > .main__table.profit_dashboard > tfoot"
    );
    const totalTextInProfitDashboardTable = document.querySelector(
      ".main__data > .main__total-text > span"
    );
    const dateStartInProfitDashboardTable = document.querySelector(
      ".main__data > .main__table.profit_dashboard > tbody > tr:first-of-type > td:nth-of-type(2)"
    );
    const dateEndInProfitDashboardTable = document.querySelector(
      ".main__data > .main__table.profit_dashboard > tbody > tr:last-of-type > td:nth-of-type(3)"
    );

    if (
      headInProfitDashboardTable &&
      bodyInProfitDashboardTable &&
      footInProfitDashboardTable &&
      dateStartInProfitDashboardTable &&
      dateEndInProfitDashboardTable
    ) {
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
      printDialog.classList.add("profit_dashboard");
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
        <main class="ticket__body">
            <h1 class="ticket__title">THỐNG KÊ LỢI NHUẬN</h1>
            <p class="ticket__date">Từ ngày: <span class="date-start">${
              dateStartInProfitDashboardTable.innerHTML
            }</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đến ngày: <span class="date-end">${
        dateEndInProfitDashboardTable.innerHTML
      }</span></p>
            <table class="ticket__table profit_dashboard">
                <thead>${headInProfitDashboardTable.innerHTML}</thead>
                <tbody>${bodyInProfitDashboardTable.innerHTML}</tbody>
                <tfoot>${footInProfitDashboardTable.innerHTML}</tfoot>
            </table>
            <p class="ticket__total-text"><strong>Viết bằng chữ:</strong> <span>${
              totalTextInProfitDashboardTable.innerHTML
            }</span></p>
        </main>
        <footer class="ticket__footer">
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
                <b>Thủ quỹ</b><br>
                (Ký tên, ghi rõ họ tên)
            </p>
            <p class="ticket_customer">
                Ngày ${day} tháng ${
        month <= 9 ? "0" + month : month
      } năm ${year}<br>
                <b>Kế toán trưởng</b><br>
                (Ký tên, ghi rõ họ tên)
            </p>
            <p class="ticket_customer">
                Ngày ${day} tháng ${
        month <= 9 ? "0" + month : month
      } năm ${year}<br>
                <b>Giám đốc</b><br>
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
      printTicket("print-ticket-button", "content-print", "TKLoiNhuan");
    } else {
      toast({
        title: "Cảnh báo",
        message: `Chưa có dữ liệu thống kê`,
        type: "warning",
        duration: 3000,
      });
    }
  });
}
