import { toast } from "../../../public/js/toast.js";
import { printTicket } from "../printTicket.js";

export function printRevenueDashboardTicket() {
  const printButton = document.getElementById("print-button-revenue_dashboard");
  printButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    //
    const headInRevenueDashboardTable = document.querySelector(
      ".main__data > .main__table.revenue_dashboard > thead"
    );
    const bodyInRevenueDashboardTable = document.querySelector(
      ".main__data > .main__table.revenue_dashboard > tbody"
    );
    const footInRevenueDashboardTable = document.querySelector(
      ".main__data > .main__table.revenue_dashboard > tfoot"
    );
    const totalTextInRevenueDashboardTable = document.querySelector(
      ".main__data > .main__total-text > span"
    );
    const dateStartInRevenueDashboardTable = document.querySelector(
      ".main__data > .main__table.revenue_dashboard > tbody > tr:first-of-type > td:nth-of-type(2)"
    );
    const dateEndInRevenueDashboardTable = document.querySelector(
      ".main__data > .main__table.revenue_dashboard > tbody > tr:last-of-type > td:nth-of-type(3)"
    );
    // Nếu tồn tại hết tương đương có bảng thống kê dữ liệu
    if (
      headInRevenueDashboardTable &&
      bodyInRevenueDashboardTable &&
      footInRevenueDashboardTable &&
      dateStartInRevenueDashboardTable &&
      dateEndInRevenueDashboardTable
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
      printDialog.classList.add("revenue_dashboard");
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
              <h1 class="ticket__title">THỐNG KÊ DOANH THU</h1>
              <p class="ticket__date">Từ ngày: <span class="date-start">${
                dateStartInRevenueDashboardTable.innerHTML
              }</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đến ngày: <span class="date-end">${
        dateEndInRevenueDashboardTable.innerHTML
      }</span></p>
              <table class="ticket__table revenue_dashboard">
                  <thead>${headInRevenueDashboardTable.innerHTML}</thead>
                  <tbody>${bodyInRevenueDashboardTable.innerHTML}</tbody>
                  <tfoot>${footInRevenueDashboardTable.innerHTML}</tfoot>
              </table>
              <p class="ticket__total-text"><strong>Viết bằng chữ:</strong> <span>${
                totalTextInRevenueDashboardTable.innerHTML
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

      // Gán sự kiện in phiếu khi nhấn nút
      printTicket("print-ticket-button", "content-print", "TKDoanhThu");

      // Gán sự kiện cho nút "Đóng" dialog
      document
        .getElementById("close-ticket-button")
        .addEventListener("click", () => {
          // Xoá dialog
          printDialog.remove();

          // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
          printButton.classList.remove("active");
        });
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
