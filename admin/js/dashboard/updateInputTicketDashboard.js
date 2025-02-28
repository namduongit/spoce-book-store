import {
  vietnamMoneyFormat,
  numberToVietnamWords,
  getWeeksInMonth,
  getMonthsInYear,
} from "../others.js";

// Biến chứa các đối tượng bảng Thống kê doanh thu
let data = [];
let headInInputTicketDashboardTable = null;
let bodyInInputTicketDashboardTable = null;
let footInInputTicketDashboardTable = null;
let footColumn2InInputTicketDashboardTable = null;
let footColumn3InInputTicketDashboardTable = null;
let footColumn4InInputTicketDashboardTable = null;
let totalTextInInputTicketDashboardTable = null;

export function updateInputTicketDashboardTable() {
  // Cập nhật lại biến sau khi đã đè html
  headInInputTicketDashboardTable = document.querySelector(
    ".main__data > .main__table.input_ticket_dashboard > thead"
  );
  bodyInInputTicketDashboardTable = document.querySelector(
    ".main__data > .main__table.input_ticket_dashboard > tbody"
  );
  footInInputTicketDashboardTable = document.querySelector(
    ".main__data > .main__table.input_ticket_dashboard > tfoot"
  );
  totalTextInInputTicketDashboardTable = document.querySelector(
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
      renderInputTicketDashboardTable(
        timelineValueSelected,
        timelineDetailValueSelected
      );
    } else {
      headInInputTicketDashboardTable.innerHTML = `<tr><th width="100%">Thống kê doanh thu</th></tr>`;
      bodyInInputTicketDashboardTable.innerHTML = ``;
      footInInputTicketDashboardTable.innerHTML = ``;
      totalTextInInputTicketDashboardTable.innerHTML = `0 đồng`;
    }
  });
}

// Hàm cập nhật lại dữ liệu cho bảng Thống kê doanh thu
export function renderInputTicketDashboardTable(
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
  headInInputTicketDashboardTable.innerHTML = `
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
  footInInputTicketDashboardTable.innerHTML = `
        <tr class="total">
            <td colspan="3">TỔNG:</td>
            <td>0</td>
            <td>0</td>
            <td>0</tde>
        </tr>
      `;
  // Cập nhật lại các biến vì đã ấn "Xem" thành công
  footColumn2InInputTicketDashboardTable = document.querySelector(
    ".main__data > .main__table.input_ticket_dashboard > tfoot > tr > td:nth-of-type(2)"
  );
  footColumn3InInputTicketDashboardTable = document.querySelector(
    ".main__data > .main__table.input_ticket_dashboard > tfoot > tr > td:nth-of-type(3)"
  );
  footColumn4InInputTicketDashboardTable = document.querySelector(
    ".main__data > .main__table.input_ticket_dashboard > tfoot > tr > td:nth-of-type(4)"
  );

  // Cập nhật lại dữ liệu cho bảng (Cần xử lý truy vấn dữ liệu chỗ này để tính toán)
  data = [];
  let timeline =
    month !== 0 ? getWeeksInMonth(year, month) : getMonthsInYear(year);
  timeline.forEach((time) => {
    data.push({
      time: time.week ? time.week : time.month,
      start: time.start,
      end: time.end,
      orderNumbers: 0, // Vì chưa xủ lý truy vấn nên mặc định là 0
      bookNumbers: 0, // Vì chưa xủ lý truy vấn nên mặc định là 0
    });
  });

  // Biến tính tổng cho các ô dữ liệu cuối
  let orderNumbers = 0,
    bookNumbers = 0,
    totalInputTicket = 0;
  // Duyệt qua từng dữ liệu rồi gán (cập nhật lại các ô dữ liệu giữa bảng)
  bodyInInputTicketDashboardTable.innerHTML = data
    .map((row) => {
      orderNumbers += row.orderNumbers;
      bookNumbers += row.bookNumbers;
      totalInputTicket += row.orderNumbers * row.bookNumbers;

      return `
                <tr>
                    <td>${row.time}</td>
                    <td>${row.start}</td>
                    <td>${row.end}</td>
                    <td>${row.orderNumbers}</td>
                    <td>${row.bookNumbers}</td>
                    <td>${vietnamMoneyFormat(
                      row.orderNumbers * row.bookNumbers
                    )}</td>
                </tr>
            `;
    })
    .join("");

  // Tính lại dữ liệu các dòng cuối
  footColumn2InInputTicketDashboardTable.textContent =
    vietnamMoneyFormat(orderNumbers);
  footColumn3InInputTicketDashboardTable.textContent =
    vietnamMoneyFormat(bookNumbers);
  footColumn4InInputTicketDashboardTable.textContent =
    vietnamMoneyFormat(totalInputTicket);
  totalTextInInputTicketDashboardTable.textContent =
    numberToVietnamWords(totalInputTicket);
}
