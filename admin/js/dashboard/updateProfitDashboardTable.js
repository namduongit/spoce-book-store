import {
  vietnamMoneyFormat,
  numberToVietnamWords,
  formatDate2,
  getWeeksInMonth,
  getMonthsInYear,
  formatDate3,
} from "../others.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { updateTableLabelRevenue_dashboard } from "../../responsive/responsive.js";

// Biến chứa các đối tượng bảng Thống kê lợi nhuận
let data = [];
let headInProfitDashboardTable = null;
let bodyInProfitDashboardTable = null;
let footInProfitDashboardTable = null;
let footColumn2InProfitDashboardTable = null;
let footColumn3InProfitDashboardTable = null;
let footColumn4InProfitDashboardTable = null;
let totalTextInProfitDashboardTable = null;

export function updateProfitDashboardTable() {
  // Cập nhật lại biến sau khi đã đè html
  headInProfitDashboardTable = document.querySelector(
    ".main__data > .main__table.profit_dashboard > thead"
  );
  bodyInProfitDashboardTable = document.querySelector(
    ".main__data > .main__table.profit_dashboard > tbody"
  );
  footInProfitDashboardTable = document.querySelector(
    ".main__data > .main__table.profit_dashboard > tfoot"
  );
  totalTextInProfitDashboardTable = document.querySelector(
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
      renderProfitDashboardTable(
        timelineValueSelected,
        timelineDetailValueSelected
      );
    } else {
      headInProfitDashboardTable.innerHTML = `<tr><th width="100%">Thống kê lợi nhuận</th></tr>`;
      bodyInProfitDashboardTable.innerHTML = ``;
      footInProfitDashboardTable.innerHTML = ``;
      totalTextInProfitDashboardTable.innerHTML = `0 đồng`;
    }
  });
}

// Hàm cập nhật lại dữ liệu cho bảng Thống kê lợi nhuận
export async function renderProfitDashboardTable(
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
  headInProfitDashboardTable.innerHTML = `
    <tr>
        <th width="10%">${month !== 0 ? "Tuần" : "Tháng"}</th>
        <th width="12%">Từ ngày</th>
        <th width="12%">Đến ngày</th>
        <th width="20%">Doanh thu (VNĐ)</th>
        <th width="20%">Chi (VNĐ)</th>
        <th width="26%">Lợi nhuận (VNĐ)</th>
    </tr>
  `;
  // Cập nhật lại các cột cuối bảng
  footInProfitDashboardTable.innerHTML = `
    <tr class="total">
        <td colspan="3">TỔNG:</td>
        <td>0</td>
        <td>0</td>
        <td class='right'>0</tde>
    </tr>
  `;
  // Cập nhật lại các biến vì đã ấn "Xem" thành công
  footColumn2InProfitDashboardTable = document.querySelector(
    ".main__data > .main__table.profit_dashboard > tfoot > tr > td:nth-of-type(2)"
  );
  footColumn3InProfitDashboardTable = document.querySelector(
    ".main__data > .main__table.profit_dashboard > tfoot > tr > td:nth-of-type(3)"
  );
  footColumn4InProfitDashboardTable = document.querySelector(
    ".main__data > .main__table.profit_dashboard > tfoot > tr > td:nth-of-type(4)"
  );

  // Dữ liệu về tất cả đơn hàng hiện có
  const orders = await fetchData(`api/orders/listBase.php?`);
  // Dữ liệu về tất cả chi tiết đơn hàng hiện có
  const inputTickets = await fetchData(`api/input_tickets/list.php`);
  // Tuỳ theo lựa chọn mà có dữ liệu thời gian để thống kê
  const timeline =
    month !== 0 ? getWeeksInMonth(year, month) : getMonthsInYear(year);

  // Mảng chứa dữ liệu để thống kê
  let data = [];

  // Duyệt qua từng thời gian
  timeline.map((time) => {
    // Các biến để tính tổng số sách bán và tổng doanh thu
    let revenueValue = 0,
      costValue = 0;

    // Duyệt qua các đơn hàng theo từng thời gian
    orders.data.map((order) => {
      // Đổi định dạng ngày
      const orderCreateAt = order.createAt.split(" ")[0];

      // Kiểm tra và xử lý
      if (
        orderCreateAt >= formatDate3(time.start) &&
        orderCreateAt <= formatDate3(time.end) &&
        order.payStatus === "Đã thanh toán" &&
        order.status === "Đã giao hàng"
      ) {
        // Tính tổng doanh thu theo từng thời gian
        revenueValue += order.total;
      }
    });

    // Duyệt qua các phiếu nhập theo từng thời gian
    inputTickets.data.map((inputTicket) => {
      // Đổi định dạng ngày
      const inputTicketCreateAt = inputTicket.createAt.split(" ")[0];

      // Kiểm tra và xử lý
      if (
        inputTicketCreateAt >= formatDate3(time.start) &&
        inputTicketCreateAt <= formatDate3(time.end) &&
        (inputTicket.status === "Đã thanh toán" ||
          inputTicket.status === "Đã xác nhận")
      ) {
        // Tính tổng chi tiêu theo từng thời gian
        costValue -= inputTicket.totalPrice;
      }
    });

    // Thêm dữ liệu thống kê
    data.push({
      time: time.week ? time.week : time.month,
      start: time.start,
      end: time.end,
      revenue: revenueValue,
      cost: costValue,
    });
  });

  // Biến tính tổng cho các ô dữ liệu cuối
  let totalRevenue = 0,
    totalCost = 0,
    totalProfit = 0;
  // Duyệt qua từng dữ liệu rồi gán (cập nhật lại các ô dữ liệu giữa bảng)
  bodyInProfitDashboardTable.innerHTML = data
    .map((row) => {
      totalRevenue += row.revenue;
      totalCost += row.cost;
      totalProfit += row.revenue + row.cost;

      return `
            <tr>
                <td>${row.time}</td>
                <td>${row.start}</td>
                <td>${row.end}</td>
                <td>${vietnamMoneyFormat(row.revenue)}</td>
                <td>${vietnamMoneyFormat(row.cost)}</td>
                <td class="right">${vietnamMoneyFormat(
                  row.revenue + row.cost
                )}</td>
            </tr>
        `;
    })
    .join("");

  // Tính lại dữ liệu các dòng cuối
  footColumn2InProfitDashboardTable.textContent =
    vietnamMoneyFormat(totalRevenue);
  footColumn3InProfitDashboardTable.textContent = vietnamMoneyFormat(totalCost);
  footColumn4InProfitDashboardTable.textContent =
    vietnamMoneyFormat(totalProfit);
  totalTextInProfitDashboardTable.textContent =
    numberToVietnamWords(totalProfit);
  updateTableLabelRevenue_dashboard();
}
