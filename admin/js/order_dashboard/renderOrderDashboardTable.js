import { fetchData } from "../../../public/js/book/getDataBook.js";
import { vietnamMoneyFormat } from "../others.js";
// import { printOrder_dashboardTicket } from "./printOrder_dashboardTicket.js";
import { filterOrderDashboard } from "./filterOrderDashboard.js";
import { detailOrderDashboardData } from "./detailOrderDashboardData.js";

const data = JSON.parse(sessionStorage.getItem("dataRole"));

var infoOrderDashboard = data[4] && data[4].includes(2) ? "" : "none__item";
var editOrderDashboard = data[4] && data[4].includes(4) ? "" : "none__item";
var lockOrderDashboard = data[4] && data[4].includes(5) ? "" : "none__item";

// Hàm cập nhật lại dữ liệu cho bảng Đơn hàng
export async function renderOrderDashboardTable(currentPage) {
  // Lấy dữ liệu từ API
  const data = (await filterOrderDashboard(currentPage)) || [];

  // Biến chứa đối tượng bảng Đơn hàng
  const bodyInOrderDashboardTable = document.querySelector(
    ".main__data > .main__table.order_dashboard > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
        <tr>
            <td>${data[i].idCustomer}</td>
            <td>${data[i].soDonDaGiaoVaThanhToan}</td>
            <td>${vietnamMoneyFormat(data[i].tongTienDaGiaoVaThanhToan)}</td>
            <td>${data[i].soDonHuyVaChuaThanhToan}</td>
            <td>${vietnamMoneyFormat(data[i].tongTienHuyVaChuaThanhToan)}</td>
            <td>
                <i class="fa-solid fa-circle-info ${infoOrderDashboard}"></i>
                <!-- <i class="fa-solid fa-print"></i> -->
            </td>
        </tr>
    `;
  }

  if (data.length == 0) {
    html = `
          <tr>
              <td></td>
              <td>Danh sách trống</td>         
              <td></td>
          </tr>
        `;
    bodyInOrderDashboardTable.innerHTML = html;
  } else {
    // Cập nhật lại giao diện
    bodyInOrderDashboardTable.innerHTML = html;

    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.order_dashboard > tbody > tr > td:first-of-type"
    );
    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.order_dashboard > tbody > tr > td:last-of-type"
    );
    listButtonInTable.forEach((buttons, row) => {
      // Các nút cần gán sự kiện trên mỗi dòng
      const detailButton = buttons.children[0];
      const printButton = buttons.children[1];
      // Id của đối tượng đã được chọn để thao tác
      const customerIdSelected = idColumnInTable.item(row).textContent;

      // Gán sự kiện hiện dialog sửa Đơn hàng
      detailButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        detailOrderDashboardData(customerIdSelected);
      });

      //   // Gán sự kiện hiện dialog in phiếu Đơn hàng
      //   printButton.addEventListener("click", (e) => {
      //     // Loại bỏ giá trị mặc định
      //     e.preventDefault();

      //     // Gọi hàm sự kiện
      //     printOrderDashboardTicket(customerIdSelected);
      //   });
    });
  }
}
