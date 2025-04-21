import {
  vietnamMoneyFormat,
  numberToVietnamWords,
  formatDate2,
  getWeeksInMonth,
  getMonthsInYear,
} from "../others.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";

// Biến chứa các đối tượng bảng Thống kê doanh thu
let headInRevenueDashboardTable = null;
let bodyInRevenueDashboardTable = null;
let footInRevenueDashboardTable = null;
let footColumn2InRevenueDashboardTable = null;
let footColumn3InRevenueDashboardTable = null;
let footColumn4InRevenueDashboardTable = null;
let totalTextInRevenueDashboardTable = null;

export function updateRevenueDashboardTable() {
  // Cập nhật lại biến sau khi đã đè html
  headInRevenueDashboardTable = document.querySelector(
    ".main__data > .main__table.revenue_dashboard > thead"
  );
  bodyInRevenueDashboardTable = document.querySelector(
    ".main__data > .main__table.revenue_dashboard > tbody"
  );
  footInRevenueDashboardTable = document.querySelector(
    ".main__data > .main__table.revenue_dashboard > tfoot"
  );
  totalTextInRevenueDashboardTable = document.querySelector(
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
      renderRevenueDashboardTable(
        timelineValueSelected,
        timelineDetailValueSelected
      );
    } else {
      headInRevenueDashboardTable.innerHTML = `<tr><th width="100%">Thống kê doanh thu</th></tr>`;
      bodyInRevenueDashboardTable.innerHTML = ``;
      footInRevenueDashboardTable.innerHTML = ``;
      totalTextInRevenueDashboardTable.innerHTML = `0 đồng`;
    }
  });
}

// Hàm cập nhật lại dữ liệu cho bảng Thống kê doanh thu
export async function renderRevenueDashboardTable(
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
  headInRevenueDashboardTable.innerHTML = `
      <tr>
          <th width="10%">${month !== 0 ? "Tuần" : "Tháng"}</th>
          <th width="12%">Từ ngày</th>
          <th width="12%">Đến ngày</th>
          <th width="20%">Số đơn hàng</th>
          <th width="20%">Tổng số sách bán</th>
          <th width="26%">Doanh thu (VNĐ)</th>
      </tr>
    `;
  // Cập nhật lại các cột cuối bảng
  footInRevenueDashboardTable.innerHTML = `
      <tr class="total">
          <td colspan="3">TỔNG:</td>
          <td>0</td>
          <td>0</td>
          <td class='right'>0</tde>
      </tr>
    `;
  // Cập nhật lại các biến vì đã ấn "Xem" thành công
  footColumn2InRevenueDashboardTable = document.querySelector(
    ".main__data > .main__table.revenue_dashboard > tfoot > tr > td:nth-of-type(2)"
  );
  footColumn3InRevenueDashboardTable = document.querySelector(
    ".main__data > .main__table.revenue_dashboard > tfoot > tr > td:nth-of-type(3)"
  );
  footColumn4InRevenueDashboardTable = document.querySelector(
    ".main__data > .main__table.revenue_dashboard > tfoot > tr > td:nth-of-type(4)"
  );

  // Cập nhật lại dữ liệu cho bảng
  let timeline =
    month !== 0 ? getWeeksInMonth(year, month) : getMonthsInYear(year);
  const promises = timeline.map(async (time) => {
    const order = await fetchData(
      `api/orders/list.php?createStart=${formatDate2(
        time.start
      )}&createEnd=${formatDate2(time.end)}`
    );

    let bookNumbersValue = 0,
      totalPriceValue = 0;
    if (order.data) {
      console.log(order);
      for (let i = 0; i < order.data.length; i++) {
        totalPriceValue += order.data[i].total;

        const orderDetails = await fetchData(
          `api/order_details/list.php?orderId=${order.data[i].id}`
        );
        if (orderDetails.data) {
          console.log(orderDetails);
          for (let i = 0; i < orderDetails.data.length; i++) {
            bookNumbersValue += orderDetails.data[i].quantity;
          }
        }
      }
    }

    return {
      time: time.week ? time.week : time.month,
      start: time.start,
      end: time.end,
      orderNumbers: order.data ? order.data.length : 0,
      bookNumbers: bookNumbersValue,
      totalPrice: totalPriceValue,
    };
  });
  const data = await Promise.all(promises);

  // Biến tính tổng cho các ô dữ liệu cuối
  let orderNumbersFinal = 0,
    bookNumbersFinal = 0,
    totalPriceFinal = 0;
  // Duyệt qua từng dữ liệu rồi gán (cập nhật lại các ô dữ liệu giữa bảng)
  bodyInRevenueDashboardTable.innerHTML = data
    .map((row) => {
      orderNumbersFinal += row.orderNumbers;
      bookNumbersFinal += row.bookNumbers;
      totalPriceFinal += row.totalPrice;

      return `
              <tr>
                  <td>${row.time}</td>
                  <td>${row.start}</td>
                  <td>${row.end}</td>
                  <td>${row.orderNumbers}</td>
                  <td>${row.bookNumbers}</td>
                  <td class="right">${vietnamMoneyFormat(row.totalPrice)}</td>
              </tr>
          `;
    })
    .join("");

  // Tính lại dữ liệu các dòng cuối
  footColumn2InRevenueDashboardTable.textContent = orderNumbersFinal;
  footColumn3InRevenueDashboardTable.textContent = bookNumbersFinal;
  footColumn4InRevenueDashboardTable.textContent =
    vietnamMoneyFormat(totalPriceFinal);
  totalTextInRevenueDashboardTable.textContent =
    numberToVietnamWords(totalPriceFinal);
}
