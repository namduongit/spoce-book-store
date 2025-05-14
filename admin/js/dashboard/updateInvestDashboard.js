import {
  vietnamMoneyFormat,
  numberToVietnamWords,
  formatDate2,
  getWeeksInMonth,
  getMonthsInYear,
  formatDate3,
} from "../others.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { showLoading } from "../spiner.js";

// Biến chứa các đối tượng bảng Thống kê phiếu nhập
let headInInvestDashboardTable = null;
let bodyInInvestDashboardTable = null;
let footInInvestDashboardTable = null;
let footColumn2InInvestDashboardTable = null;
let footColumn3InInvestDashboardTable = null;
let footColumn4InInvestDashboardTable = null;
let totalTextInInvestDashboardTable = null;

export function updateInvestDashboardTable() {
  // Cập nhật lại biến sau khi đã đè html
  headInInvestDashboardTable = document.querySelector(
    ".main__data > .main__table.invest_dashboard > thead"
  );
  bodyInInvestDashboardTable = document.querySelector(
    ".main__data > .main__table.invest_dashboard > tbody"
  );
  footInInvestDashboardTable = document.querySelector(
    ".main__data > .main__table.invest_dashboard > tfoot"
  );
  totalTextInInvestDashboardTable = document.querySelector(
    ".main__data > .main__total-text > span"
  );

  // Biến chứa đối tượng là nút "Xem"
  const seeButton = document.querySelector(".main__see-btn");
  seeButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Lấy ra giá trị được chọn để cập nhật bảng
    const timelineValueSelected = document.querySelector(
      ".main__timeline-slt > input"
    ).value;
    const timelineDetailValueSelected = document.querySelector(
      ".main__timeline-detail-slt > input"
    ).value;

    // Nếu 1 trong 2 rỗng thì không thể tạo bảng
    if (timelineValueSelected && timelineDetailValueSelected) {
      renderInvestDashboardTable(
        timelineValueSelected,
        timelineDetailValueSelected
      );
    } else {
      headInInvestDashboardTable.innerHTML = `<tr><th width="100%">Thống kê phiếu nhập</th></tr>`;
      bodyInInvestDashboardTable.innerHTML = ``;
      footInInvestDashboardTable.innerHTML = ``;
      totalTextInInvestDashboardTable.innerHTML = `0 đồng`;
    }
  });
}

// Hàm cập nhật lại dữ liệu cho bảng Thống kê phiếu nhập
export async function renderInvestDashboardTable(
  timelineValueSelected,
  timelineDetailValueSelected
) {
  // Biến chứa thông tin về thời gian sẽ lọc
  let year = 0,
    month = 0;
  if (timelineValueSelected === "Lọc theo năm") {
    // Năm yyyy
    year = timelineDetailValueSelected.slice(4);
  } else {
    // Tháng mm/yyyy
    let times = timelineDetailValueSelected.slice(6).split("/");
    year = times[1];
    month = times[0];
  }

  // Cập nhật lại các cột đầu bảng
  headInInvestDashboardTable.innerHTML = `
        <tr>
            <th width="10%">${month !== 0 ? "Tuần" : "Tháng"}</th>
            <th width="12%">Từ ngày</th>
            <th width="12%">Đến ngày</th>
            <th width="20%">Số phiếu nhập</th>
            <th width="20%">Tổng số sách nhập</th>
            <th width="26%">Chi (VNĐ)</th>
        </tr>
      `;
  // Cập nhật lại các cột cuối bảng
  footInInvestDashboardTable.innerHTML = `
        <tr class="total">
            <td colspan="3">TỔNG:</td>
            <td>0</td>
            <td>0</td>
            <td class='right'>0</tde>
        </tr>
      `;
  // Cập nhật lại các biến vì đã ấn "Xem" thành công
  footColumn2InInvestDashboardTable = document.querySelector(
    ".main__data > .main__table.invest_dashboard > tfoot > tr > td:nth-of-type(2)"
  );
  footColumn3InInvestDashboardTable = document.querySelector(
    ".main__data > .main__table.invest_dashboard > tfoot > tr > td:nth-of-type(3)"
  );
  footColumn4InInvestDashboardTable = document.querySelector(
    ".main__data > .main__table.invest_dashboard > tfoot > tr > td:nth-of-type(4)"
  );

  showLoading();
  // Dữ liệu về tất cả phiếu nhập hiện có
  const inputTickets = await fetchData(`api/input_tickets/list.php?`);
  // Dữ liệu về tất cả chi tiết phiếu nhập hiện có
  const inputTicketDetails = await fetchData(
    `api/input_ticket_details/list.php`
  );
  // hideLoading();
  // Tuỳ theo lựa chọn mà có dữ liệu thời gian để thống kê
  const timeline =
    month !== 0 ? getWeeksInMonth(year, month) : getMonthsInYear(year);

  // Mảng chứa dữ liệu để thống kê
  let data = [];

  // Duyệt qua từng thời gian
  timeline.map((time) => {
    // Các biến để tính tổng số sách bán và tổng phiếu nhập
    let ticketNumbersValue = 0,
      bookNumbersValue = 0,
      totalPriceValue = 0;

    // Duyệt qua các đơn hơn theo từng thời gian
    inputTickets.data.map((inputTicket) => {
      // Đổi định dạng ngày
      const ticketCreateAt = inputTicket.createAt.split(" ")[0];

      // Kiểm tra và xử lý
      if (
        ticketCreateAt >= formatDate3(time.start) &&
        ticketCreateAt <= formatDate3(time.end) &&
        (inputTicket.status === "Đã xác nhận" ||
          inputTicket.status === "Đã thanh toán")
      ) {
        // Tính tổng phiếu nhập theo từng thời gian
        ticketNumbersValue += 1;

        // Tính tổng số sách bán theo từng thời gian
        inputTicketDetails.data.map((inputTicketDetail) => {
          if (inputTicketDetail.inputTicketId === inputTicket.id) {
            bookNumbersValue += inputTicketDetail.quantity;
          }
        });

        // Tính tổng phiếu nhập theo từng thời gian
        totalPriceValue += inputTicket.totalPrice;
      }
    });

    // Thêm dữ liệu thống kê
    data.push({
      time: time.week ? time.week : time.month,
      start: time.start,
      end: time.end,
      ticketNumbers: ticketNumbersValue,
      bookNumbers: bookNumbersValue,
      totalPrice: totalPriceValue,
    });
  });

  // Biến tính tổng cho các ô dữ liệu cuối
  let ticketNumbersFinal = 0,
    bookNumbersFinal = 0,
    totalPriceFinal = 0;
  // Duyệt qua từng dữ liệu rồi gán (cập nhật lại các ô dữ liệu giữa bảng)
  bodyInInvestDashboardTable.innerHTML = data
    .map((row) => {
      ticketNumbersFinal += row.ticketNumbers;
      bookNumbersFinal += row.bookNumbers;
      totalPriceFinal += row.totalPrice;

      return `
                <tr>
                    <td>${row.time}</td>
                    <td>${row.start}</td>
                    <td>${row.end}</td>
                    <td>${row.ticketNumbers}</td>
                    <td>${row.bookNumbers}</td>
                    <td class="right">${vietnamMoneyFormat(row.totalPrice)}</td>
                </tr>
            `;
    })
    .join("");

  // Tính lại dữ liệu các dòng cuối
  footColumn2InInvestDashboardTable.textContent = ticketNumbersFinal;
  footColumn3InInvestDashboardTable.textContent = bookNumbersFinal;
  footColumn4InInvestDashboardTable.textContent =
    vietnamMoneyFormat(totalPriceFinal);
  totalTextInInvestDashboardTable.textContent =
    numberToVietnamWords(totalPriceFinal);
}
