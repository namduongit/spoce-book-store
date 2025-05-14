import { selectFormEvents, updateTimelineSelects } from "./selectEvents.js";
import { printProfitDashboardTicket } from "./dashboard/printProfitDashboard.js";
import { updateProfitDashboardTable } from "./dashboard/updateProfitDashboardTable.js";
import { updateRevenueDashboardTable } from "./dashboard/updateRevenueDashboardTable.js";
import { printRevenueDashboardTicket } from "./dashboard/printRevenueDashboard.js";
import { updateInvestDashboardTable } from "./dashboard/updateInvestDashboard.js";
import { printInvestDashboardTicket } from "./dashboard/printInvestDashboard.js";
import { updateOrderDashboardTable } from "./order_dashboard/updateOrderDashboardTable.js";
import { updateOrderTable } from "./order/updateOrderTable.js";
import { updateAccountTable } from "./account/updateAccountTable.js";
import { updateDiscountTable } from "./discount/updateDiscountTable.js";
import { updateSupplierTable } from "./supplier/updateSupplierTable.js";
import { updateInputTicketTable } from "./input_tickets/updateInputTicketTable.js";
import { updateBookTable } from "./book/updateBookTable.js";
import { updateAuthorTable } from "./author/updateAuthorTable.js";
import { updateCategoryTable } from "./category/updateCategoryTable.js";
import { updateCoverTable } from "./cover/updateCoverTable.js";
import { updatePublisherTable } from "./publisher/updatePublisherTable.js";
import { fetchData } from "../../public/js/book/getDataBook.js";
// import { updateAddressSelect } from "../../../api/address/updateAddressSelect.js";
// import { renderPrivilegeTable } from "./privilege/renderPrivilegeTable.js";
import { updatePrivilegeTable } from "./privilege/updatePrivilegeTable.js";
import { updatePaymentTable } from "./payment/updatePaymentTable.js";

const data = JSON.parse(sessionStorage.getItem("dataRole"));

/**

1	Thống kê lợi nhuận
2	Thống kê doanh thu
3	Thống kê phiếu nhập
4	Thống kê đơn hàng
5	Đơn hàng
6	Phiếu giảm giá
7	Nhóm quyền
8	Người dùng
9	Nhà cung cấp
10	Phiếu nhập
11	Sách
12	Tác giả
13	Thể loại
14	Loại bìa
15	Nhà xuất bản
16	Thẻ thanh toán

1   Lọc
2   Chi tiết
3   Thêm
4   Sửa
5   Xóa/Khóa
 
*/

// Thống kê lợi nhuận ------------------------------------------------------------------------------------
var filterProfitDashboardCSS =
  data[1] && data[1].includes(1) ? "" : "none__item";

// Thống kê doanh thu ------------------------------------------------------------------------------------
var filterTotalDashboardCSS =
  data[2] && data[2].includes(1) ? "" : "none__item";

// Phần thống kê phiếu nhập ------------------------------------------------------------------------------------
var filterInputTicketDashboardCSS =
  data[3] && data[3].includes(1) ? "" : "none__item";

// Phần thống kê đơn hàng ------------------------------------------------------------------------------------
var filterOrderDashboardHTML =
  data[4] && data[4].includes(1)
    ? `
        <button class="main__filter-btn" id="filter-button-order_dashboard">
          <i class="fa-solid fa-filter"></i>
          <span>Lọc</span>
        </button>
`
    : "";
var filterOrderDashboardCSS =
  data[4] && data[4].includes(1) ? "" : "none__item";

// Phần đơn hàng ------------------------------------------------------------------------------------
var filterOrderButtonHTML =
  data[5] && data[5].includes(1)
    ? `
        <button class="main__filter-btn" id="filter-button-order">
          <i class="fa-solid fa-filter"></i>
          <span>Lọc</span>
        </button>
`
    : "";
var filterOrderCSS = data[5] && data[5].includes(1) ? "" : "none__item";

// Phần phiếu giảm giá ------------------------------------------------------------------------------------
var filterVoucherButtonHTML =
  data[6] && data[6].includes(1)
    ? `
      <button class="main__filter-btn" id="filter-button-discount">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
`
    : "";
var addVoucherButtonHTML =
  data[6] && data[6].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-discount">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterVoucherCSS = data[6] && data[6].includes(1) ? "" : "none__item";

// Phần nhóm quyền ------------------------------------------------------------------------------------
var filterRoleButtonHTML =
  data[7] && data[7].includes(1)
    ? `
      <button class="main__filter-btn" id="filter-button-privilege">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>`
    : "";
var addRoleButtonHTML =
  data[7] && data[7].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-privilege">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterRoleCSS = data[7] && data[7].includes(1) ? "" : "none__item";

// Phần người dùng ------------------------------------------------------------------------------------
var filterMemButtonHTML =
  data[8] && data[8].includes(1)
    ? `
      <button class="main__filter-btn" id="filter-button-account">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
`
    : "";
var addMemButtonHTML =
  data[8] && data[8].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-account">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterMemCSS = data[8] && data[8].includes(1) ? "" : "none__item";

// Phần nhà cung cấp ------------------------------------------------------------------------------------
var filterSupplierButtonHTML =
  data[9] && data[9].includes(1)
    ? `
    <button class="main__filter-btn" id="filter-button-supplier">
      <i class="fa-solid fa-filter"></i>
      <span>Lọc</span>
    </button>
`
    : "";
var addSupplierButtonHTML =
  data[9] && data[9].includes(3)
    ? `
    <button class="main__add-btn" id="add-button-supplier">
      <i class="fa-solid fa-plus"></i>
      <span>Thêm</span>
    </button>
`
    : "";
var filterSupplierCSS = data[9] && data[9].includes(1) ? "" : "none__item";

// Phần phiếu nhập ------------------------------------------------------------------------------------
var filterInputTicketButtonHTML =
  data[10] && data[10].includes(1)
    ? `
      <button class="main__filter-btn" id="filter-button-input_ticket">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
`
    : "";
var addInputTicketButtonHTML =
  data[10] && data[10].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-input_ticket">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterInputTicketCSS = data[10] && data[10].includes(1) ? "" : "none__item";

// Phần sách ------------------------------------------------------------------------------------
var filterBookButtonHTML =
  data[11] && data[11].includes(1)
    ? `
      <div class="main__buttons" style="margin-left: 0;">
        <button class="main__filter-btn" id="filter-button-book">
          <i class="fa-solid fa-filter"></i>
          <span>Lọc</span>
        </button>
        <button class="main__refresh-btn" id="reset-button-book">
          <i class="fa-solid fa-refresh"></i>
          <span>Đặt lại</span>
        </button>
      </div>
`
    : "";
var addBookButtonHTML =
  data[11] && data[11].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-book" style="width: 19%">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterBookCSS = data[11] && data[11].includes(1) ? "" : "none__item";

// Phần tác giả ------------------------------------------------------------------------------------
var filterAuthorButtonHTML =
  data[12] && data[12].includes(1)
    ? `
      <button class="main__filter-btn" id="filter-button-author">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
`
    : "";
var addAuthorButtonHTML =
  data[12] && data[12].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-author">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterAuthorCSS = data[12] && data[12].includes(1) ? "" : "none__item";

// Phần thể loại ------------------------------------------------------------------------------------
var filterCategoryButtonHTML =
  data[13] && data[13].includes(1)
    ? `
      <button class="main__filter-btn" id="filter-button-category">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
`
    : "";
var addCategoryButtonHTML =
  data[13] && data[13].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-category">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterCategoryCSS = data[13] && data[13].includes(1) ? "" : "none__item";

// Phần loại bìa ------------------------------------------------------------------------------------
var filterCoverButtonHTML =
  data[14] && data[14].includes(1)
    ? `
      <button class="main__filter-btn" id="filter-button-cover">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
`
    : "";
var addCoverButtonHTML =
  data[14] && data[14].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-cover">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterCoverCSS = data[14] && data[14].includes(1) ? "" : "none__item";

// Phần nhà xuất bản ------------------------------------------------------------------------------------
var filterPublisherButtonHTML =
  data[15] && data[15].includes(1)
    ? `
      <button class="main__filter-btn" id="filter-button-publisher">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
`
    : "";
var addPublisherButtonHTML =
  data[15] && data[15].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-publisher">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterPublisherCSS = data[15] && data[15].includes(1) ? "" : "none__item";

// Phần thẻ thanh toán ------------------------------------------------------------------------------------
var filterPaymentButtonHTML =
  data[16] && data[16].includes(1)
    ? `
      <button class="main__filter-btn" id="filter-button-payment">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
`
    : "";
var addPaymentButtonHTML =
  data[16] && data[16].includes(3)
    ? `
      <button class="main__add-btn" id="add-button-payment">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
`
    : "";
var filterPaymentCSS = data[16] && data[16].includes(1) ? "" : "none__item";

async function getRolePrivilege() {
  try {
    const response = await fetch("api/roles/list.php");
    const data = await response.json(); // nếu server trả JSON
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
// Biến chứa nội dung sẽ thay đổi của menu tương ứng
const mainContentMap = {
  profit_dashboard: `
    <h1 class="main__title">Thống kê lợi nhuận</h1>
    <div class="main__row">
      <div class="main__timeline-slt main__select slt-form-1 ${filterProfitDashboardCSS}">
        <input required="" type="text" id="status-slt-profit_dashboard" />
        <span><i class="fa-solid fa-timeline"></i></i>&nbsp;&nbsp;Chọn Khoảng thời gian</span>
        <ul>
          <li>Lọc theo năm</li>
          <li>Lọc theo tháng</li>
        </ul>
      </div>
      <div class="main__timeline-detail-slt main__select slt-form-1 ${filterProfitDashboardCSS}">
        <input required="" type="text" id="status-slt-profit_dashboard" />
        <span><i class="fa-solid fa-clock"></i>&nbsp;&nbsp;Chọn Thời gian cụ thể</span>
        <ul></ul>
      </div>
      <button class="main__see-btn ${filterProfitDashboardCSS}" id="filter-button-profit_dashboard">
        <i class="fa-solid fa-eye"></i>
        <span>Xem</span>
      </button>
      <button class="main__print-btn" id="print-button-profit_dashboard">
        <i class="fa-solid fa-print"></i>
        <span>In thống kê</span>
      </button>
    </div>
    <div class="main__data">
      <table class="main__table dashboard profit_dashboard">
        <thead><tr><th width="100%">Thống kê lợi nhuận</th></tr></thead>
        <tbody></tbody>
        <tfoot></tfoot>
      </table>
      <p class="main__total-text"><strong>Viết bằng chữ:</strong> <span>0 đồng</span></p>
    </div>
  `,
  revenue_dashboard: `
    <h1 class="main__title">Thống kê doanh thu</h1>
    <div class="main__row">
      <div class="main__timeline-slt main__select slt-form-1 ${filterTotalDashboardCSS}">
        <input required="" type="text" id="status-slt-revenue_dashboard" />
        <span><i class="fa-solid fa-timeline"></i></i>&nbsp;&nbsp;Chọn Khoảng thời gian</span>
        <ul>
          <li>Lọc theo năm</li>
          <li>Lọc theo tháng</li>
        </ul>
      </div>
      <div class="main__timeline-detail-slt main__select slt-form-1 ${filterTotalDashboardCSS}">
        <input required="" type="text" id="status-slt-revenue_dashboard" />
        <span><i class="fa-solid fa-clock"></i>&nbsp;&nbsp;Chọn Thời gian cụ thể</span>
        <ul></ul>
      </div>

      <button class="main__see-btn ${filterTotalDashboardCSS}" id="filter-button-revenue_dashboard">
        <i class="fa-solid fa-eye"></i>
        <span>Xem</span>
      </button>

      <button class="main__print-btn" id="print-button-revenue_dashboard">
        <i class="fa-solid fa-print"></i>
        <span>In thống kê</span>
      </button>
    </div>
    <div class="main__data">
      <table class="main__table dashboard revenue_dashboard">
        <thead><tr><th width="100%">Thống kê doanh thu</th></tr></thead>
        <tbody></tbody>
        <tfoot></tfoot>
      </table>
      <p class="main__total-text"><strong>Viết bằng chữ:</strong> <span>0 đồng</span></p>
    </div>
  `,
  invest_dashboard: `
    <h1 class="main__title">Thống kê chi tiêu</h1>
    <div class="main__row">
      <div class="main__timeline-slt main__select slt-form-1 ${filterInputTicketDashboardCSS}">
        <input required="" type="text" id="status-slt-invest_dashboard" />
        <span><i class="fa-solid fa-timeline"></i></i>&nbsp;&nbsp;Chọn Khoảng thời gian</span>
        <ul>
          <li>Lọc theo năm</li>
          <li>Lọc theo tháng</li>
        </ul>
      </div>
      <div class="main__timeline-detail-slt main__select slt-form-1 ${filterInputTicketDashboardCSS}">
        <input required="" type="text" id="status-slt-invest_dashboard" />
        <span><i class="fa-solid fa-clock"></i>&nbsp;&nbsp;Chọn Thời gian cụ thể</span>
        <ul></ul>
      </div>

      <button class="main__see-btn ${filterInputTicketDashboardCSS}" id="filter-button-invest_dashboard">
        <i class="fa-solid fa-eye"></i>
        <span>Xem</span>
      </button>

      <button class="main__print-btn" id="print-button-invest_dashboard">
        <i class="fa-solid fa-print"></i>
        <span>In thống kê</span>
      </button>
    </div>
    <div class="main__data">
      <table class="main__table dashboard invest_dashboard">
        <thead><tr><th width="100%">Thống kê phiếu nhập</th></tr></thead>
        <tbody></tbody>
        <tfoot></tfoot>
      </table>
      <p class="main__total-text"><strong>Viết bằng chữ:</strong> <span>0 đồng</span></p>
    </div>
  `,
  order_dashboard: `
    <h1 class="main__title">Thống kê đơn hàng</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterOrderDashboardCSS}">
        <input required="" type="text" id="find-inp-order_dashboard" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;Khách hàng</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterOrderDashboardCSS}">
        <input required="" type="text" id="sort-slt-order_dashboard" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID khách hàng tăng dần</li>
          <li>ID khách hàng giảm dần</li>
          <li>Tổng đơn mua tăng dần</li>
          <li>Tổng đơn mua giảm dần</li>
          <li>Tổng tiền mua tăng dần</li>
          <li>Tổng tiền mua giảm dần</li>
          <li>Tổng đơn huỷ tăng dần</li>
          <li>Tổng đơn huỷ giảm dần</li>
          <li>Tổng tiền huỷ tăng dần</li>
          <li>Tổng tiền huỷ giảm dần</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 date ${filterOrderDashboardCSS}">
        <input required="" type="date" id="date-start-inp-order_dashboard" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="date-end-inp-order_dashboard" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Thời gian thống kê</span>
      </div>
      <div class="main__find-inp inp-text-form-1 ${filterOrderDashboardCSS}">
        <input required="" type="text" id="show-inp-order_dashboard" />
        <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Nhập số dòng</span>
      </div>
      <div class="main__buttons">
        ${filterOrderDashboardHTML}
        <button class="main__refresh-btn ${filterOrderDashboardCSS}" id="reset-button-order_dashboard">
          <i class="fa-solid fa-refresh"></i>
          <span>Đặt lại</span>
        </button>
      </div>
    </div>
    <div class="main__data">
      <table class="main__table order_dashboard">
        <thead>
          <tr>
              <th width="12%">ID khách hàng</th>
              <th width="16%">Tổng đơn mua</th>
              <th width="22%">Tổng tiền mua (VNĐ)</th>
              <th width="16%">Tổng đơn huỷ</th>
              <th width="22%">Tổng tiền huỷ (VNĐ)</th>
              <th width="12%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="admin-pagination-order_dashboard"></div>
  `,
  order: `
    <h1 class="main__title">Đơn hàng</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterOrderCSS}">
        <input required="" type="text" id="find-inp-order" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID đơn hàng</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterOrderCSS}">
        <input required="" type="text" id="sort-slt-order" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Ngày tạo đơn tăng dần</li>
          <li>Ngày tạo đơn giảm dần</li>
          <li>Tổng thanh toán tăng dần</li>
          <li>Tổng thanh toán giảm dần</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 date ${filterOrderCSS}">
        <input required="" type="date" id="date-start-inp-order" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="date-end-inp-order" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Ngày tạo đơn</span>
      </div>
      <div class="main__province-slt main__select slt-form-1 ${filterOrderCSS}">
        <input required="" type="text" id="province-slt-order" />
        <span><i class="fa-solid fa-tree-city"></i>&nbsp;&nbsp;Chọn Tỉnh thành</span>
        <ul></ul>
      </div>
      <div class="main__district-slt main__select slt-form-1 ${filterOrderCSS}">
        <input required="" type="text" id="district-slt-order" />
        <span><i class="fa-solid fa-tree-city"></i>&nbsp;&nbsp;Chọn Quận huyện</span>
        <ul></ul>
      </div>
    </div>
    <div class="main__row">
      <div class="main__status-slt main__select slt-form-1 ${filterOrderCSS}">
        <input required="" type="text" id="status-slt-order" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Đã giao hàng</li>
          <li>Đã huỷ đơn</li>
          <li>Đã xác nhận</li>
          <li>Đang chờ xác nhận</li>  
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 ${filterOrderCSS}">
        <input required="" type="text" id="show-inp-order" />
        <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Hiển thị</span>
      </div>
      <div class="main__buttons">

        ${filterOrderButtonHTML}

        <button class="main__refresh-btn ${filterOrderCSS}" id="reset-button-order">
          <i class="fa-solid fa-refresh"></i>
          <span>Đặt lại</span>
        </button>

      </div>
    </div>
    <div class="main__data">
      <table class="main__table order">
        <thead>
          <tr>
              <th width="12%">ID</th>
              <th width="16%">Ngày tạo đơn</th>
              <th width="20%">Quận huyện, Tỉnh thành</th>
              <th width="24%">Tổng thanh toán (VNĐ)</th>
              <th width="16%">Trạng thái</th>
              <th width="12%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="admin-pagination-order"></div>
  `,
  privilege: `
    <h1 class="main__title">Nhóm quyền</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterRoleCSS}">
        <input required="" type="text" id="find-inp-privilege" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên nhóm quyền</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterRoleCSS}">
        <input required="" type="text" id="sort-slt-privilege" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên nhóm quyền tăng dần</li>
          <li>Tên nhóm quyền giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1 ${filterRoleCSS}">
        <input required="" type="text" id="status-slt-privilege" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>

      ${filterRoleButtonHTML}

      ${addRoleButtonHTML}

    </div>
    <div class="main__data">
      <table class="main__table privilege">
        <thead>
          <tr>
              <th width="20%">ID</th>
              <th width="40%">Tên nhóm quyền</th>
              <th width="20%">Trạng thái</th>
              <th width="20%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  `,
  account: `
    <h1 class="main__title">Người dùng</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterMemCSS}">
        <input required="" type="text" id="find-inp-account" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Họ và tên</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterMemCSS}">
        <input required="" type="text" id="sort-slt-account" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên đăng nhập tăng dần</li>
          <li>Tên đăng nhập giảm dần</li>
        </ul>
      </div>
      <div class="main__privilege-slt main__select slt-form-1 ${filterMemCSS}">
        <input required="" type="text" id="privilege-slt-account" />
        <span><i class="fa-solid fa-user-gear"></i>&nbsp;&nbsp;Chọn Nhóm quyền</span>
        <ul>
          
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1 ${filterMemCSS}">
        <input required="" type="text" id="status-slt-account" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>

      ${filterMemButtonHTML}

      ${addMemButtonHTML}

    </div>
    <div class="main__data">
      <table class="main__table account">
        <thead>
          <tr>
              <th width="10%">ID</th>
              <th width="34%">Họ và tên</th>
              <th width="14%">Nhóm quyền</th>
              <th width="14%">Số điện thoại</th>
              <th width="14%">Trạng thái</th>
              <th width="14%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="main__pagination_account"></div>
  `,
  discount: `
    <h1 class="main__title">Phiếu giảm giá</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterVoucherCSS}">
        <input required="" type="text" id="find-inp-discount" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên phiếu giảm giá</span>
      </div>
      <div class="main__find-inp main__select slt-form-1 ${filterVoucherCSS}">
        <input required="" type="text" id="type-slt-discount" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Loại phiếu giảm giá</span>
        <ul>
          <li>Phần trăm</li>
          <li>Tiền</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 date ${filterVoucherCSS}">
        <input required="" type="date" id="date-start-inp-discount" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="date-end-inp-discount" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Ngày áp dụng</span>
      </div>
      <div class="main__status-slt main__select slt-form-1 ${filterVoucherCSS}">
        <input required="" type="text" id="status-slt-discount" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      ${filterVoucherButtonHTML}

      ${addVoucherButtonHTML}
    </div>
    <div class="main__data">
      <table class="main__table discount">
        <thead>
          <tr>
              <th width="10%">ID</th>
              <th width="24%">Tên phiếu giảm giá</th>
              <th width="14%">Loại phiếu giảm giá</th>
              <th width="14%">Ngày bắt đầu</th>
              <th width="14%">Ngày kết thúc</th>
              <th width="14%">Trạng thái</th>
              <th width="10%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="admin-pagination-discount"></div>
  `,
  supplier: `
  <h1 class="main__title">Nhà cung cấp</h1>
  <div class="main__row">
    <div class="main__find-inp inp-text-form-1 ${filterSupplierCSS}">
      <input required="" type="text" id="find-inp-supplier" />
      <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên nhà cung cấp</span>
    </div>
    <div class="main__sort-slt main__select slt-form-1 ${filterSupplierCSS}">
      <input required="" type="text" id="sort-slt-supplier" />
      <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp</span>
      <ul>
        <li>ID tăng dần</li>
        <li>ID giảm dần</li>
        <li>Tên nhà cung cấp tăng dần</li>
        <li>Tên nhà cung cấp giảm dần</li>
      </ul>
    </div>
    <div class="main__status-slt main__select slt-form-1 ${filterSupplierCSS}">
      <input required="" type="text" id="status-slt-supplier" />
      <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Trạng thái</span>
     <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
    </div>
    <div class="main__find-inp inp-text-form-1 ${filterSupplierCSS}">
      <input required="" type="text" id="show-inp-supplier" />
      <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Hiển thị</span>
    </div>

      ${filterSupplierButtonHTML}

      ${addSupplierButtonHTML}

  </div>
  <div class="main__data">
    <table class="main__table supplier">
      <thead>
        <tr>
            <th width="10%">ID</th>
            <th width="28%">Tên nhà cung cấp</th>
            <th width="14%">Số điện thoại</th>
            <th width="20%">Email</th>
            <th width="14%">Trạng thái</th>
            <th width="14%"></th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
  <div class="main__pagination" id="admin-pagination-supplier"></div>
`,
  input_ticket: `
    <h1 class="main__title">Phiếu nhập</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterInputTicketCSS}">
        <input required="" type="text" id="find-inp-input_ticket" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID phiếu nhập</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterInputTicketCSS}">
        <input required="" type="text" id="sort-slt-input_ticket" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp</span>
        <ul>
          <li>ID phiếu nhập tăng dần</li>
          <li>ID phiếu nhập giảm dần</li>
          <li>ID nhà cung cấp tăng dần</li>
          <li>ID nhà cung cấp giảm dần</li>
          <li>Ngày tạo phiếu tăng dần</li>
          <li>Ngày tạo phiếu giảm dần</li>
          <li>Tổng tiền nhập tăng dần</li>
          <li>Tổng tiền nhập giảm dần</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 date ${filterInputTicketCSS}">
        <input required="" type="date" id="date-start-inp-input_ticket" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="date-end-inp-input_ticket" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Ngày lập phiếu</span>
      </div>
      <div class="main__status-slt main__select slt-form-1 ${filterInputTicketCSS}">
        <input required="" type="text" id="status-slt-input_ticket" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Trạng thái</span>
        <ul>
          <li>Đã thanh toán</li>
          <li>Đã xác nhận</li>
          <li>Đang chờ xác nhận</li>
          <li>Đã huỷ phiếu</li>
        </ul>
      </div>

      ${filterInputTicketButtonHTML}

      ${addInputTicketButtonHTML}

    </div>
    <div class="main__data">
      <table class="main__table input_ticket">
        <thead>
          <tr>
              <th width="13%">ID phiếu nhập</th>
              <th width="13%">ID nhà cung cấp</th>
              <th width="16%">Ngày lập phiếu</th>
              <th width="26%">Tổng tiền nhập (VNĐ)</th>
              <th width="16%">Trạng thái</th>
              <th width="16%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="admin-pagination-input_ticket"></div>
  `,
  book: `
    <h1 class="main__title">Sách</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterBookCSS}">
        <input required="" type="text" id="find-inp-book" autocomplete="off" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tiêu đề</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterBookCSS}">
        <input required="" type="text" id="sort-slt-book" autocomplete="off" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tiêu đề tăng dần</li>
          <li>Tiêu đề giảm dần</li>
          <li>Số lượng tăng dần</li>
          <li>Số lượng giảm dần</li>
        </ul>
      </div>
      <div class="main__author-slt main__select slt-form-1 ${filterBookCSS}">
        <input required="" type="text" id="author-slt-book" autocomplete="off" />
        <span><i class="fa-solid fa-user-pen"></i>&nbsp;&nbsp;Tác giả </span>
        <ul></ul>
      </div>
      <div class="main__category-slt main__select slt-form-1 ${filterBookCSS}">
        <input required="" type="text" id="category-slt-book" autocomplete="off" />
        <span><i class="fa-solid fa-font-awesome"></i>&nbsp;&nbsp;Thể loại</span>
        <ul></ul>
      </div>
      <div class="main__cover-slt main__select slt-form-1 ${filterBookCSS}">
        <input required="" type="text" id="cover-slt-book" autocomplete="off" />
        <span><i class="fa-solid fa-book-open"></i>&nbsp;&nbsp;Loại bìa</span>
        <ul></ul>
      </div>
    </div>
    <div class="main__row">
      <div class="main__publisher-slt main__select slt-form-1 ${filterBookCSS}">
        <input required="" type="text" id="publisher-slt-book" autocomplete="off" />
        <span><i class="fa-solid fa-user-tag"></i>&nbsp;&nbsp;Nhà xuất bản</span>
        <ul></ul>
      </div>
      <div class="main__status-slt main__select slt-form-1 ${filterBookCSS}">
        <input required="" type="text" id="status-slt-book" autocomplete="off" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Trạng thái</span>
        <ul>
          <li>Đang bán</li>
          <li>Dừng bán</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 ${filterBookCSS}">
        <input required="" type="text" id="show-inp-book" autocomplete="off" />
        <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Hiển thị</span>
      </div>
      ${filterBookButtonHTML}
      ${addBookButtonHTML}
    </div>
    <div class="main__data">
      <table class="main__table book">
        <thead>
          <tr>
              <th width="9%">ID</th>
              <th width="7%">Hình ảnh</th>
              <th width="28%">Tiêu đề</th>
              <th width="14%">Thể loại</th>
              <th width="14%">Số lượng</th>
              <th width="14%">Trạng thái</th>
              <th width="14%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="admin-pagination-book"></div>
  `,
  author: `
    <h1 class="main__title">Tác giả</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterAuthorCSS}">
        <input required="" type="text" id="find-inp-author" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên tác giả</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterAuthorCSS}">
        <input required="" type="text" id="sort-slt-author" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên tác giả tăng dần</li>
          <li>Tên tác giả giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1 ${filterAuthorCSS}">
        <input required="" type="text" id="status-slt-author" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 ${filterAuthorCSS}">
        <input required="" type="text" id="show-inp-author" />
        <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Hiển thị</span>
      </div>

      ${filterAuthorButtonHTML}

      ${addAuthorButtonHTML}

    </div>
    <div class="main__data">
      <table class="main__table author">
        <thead>
          <tr>
            <th width="18%">ID</th>
            <th width="38%">Tên tác giả</th>
            <th width="22%">Trạng thái</th>
            <th width="22%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="admin-pagination-author"></div>
  `,
  category: `
    <h1 class="main__title">Thể loại</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterCategoryCSS}">
        <input required="" type="text" id="find-inp-category" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên thể loại</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterCategoryCSS}">
        <input required="" type="text" id="sort-slt-category" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên thể loại tăng dần</li>
          <li>Tên thể loại giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1 ${filterCategoryCSS}">
        <input required="" type="text" id="status-slt-category" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Trạng thái</span>
        <ul>
            <li>Hoạt động</li>
            <li>Tạm dừng</li>
          </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 ${filterCategoryCSS}">
        <input required="" type="text" id="show-inp-category" />
        <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Hiển thị</span>
      </div>

      ${filterCategoryButtonHTML}

      ${addCategoryButtonHTML}
      
    </div>
    <div class="main__data">
      <table class="main__table category">
        <thead>
          <tr>
            <th width="18%">ID</th>
            <th width="38%">Tên thể loại</th>
            <th width="22%">Trạng thái</th>
            <th width="22%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="admin-pagination-category"></div>
  `,
  cover: `
    <h1 class="main__title">Loại bìa</h1>
    <div class="main__row">

      <div class="main__find-inp inp-text-form-1 ${filterCoverCSS}">
        <input required="" type="text" id="find-inp-cover" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên loại bìa</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterCoverCSS}">
        <input required="" type="text" id="sort-slt-cover" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên loại bìa tăng dần</li>
          <li>Tên loại bìa giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1 ${filterCoverCSS}">
        <input required="" type="text" id="status-slt-cover" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Trạng thái</span>
          <ul>
            <li>Hoạt động</li>
            <li>Tạm dừng</li>
          </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 ${filterCoverCSS}">
        <input required="" type="text" id="show-inp-cover" />
        <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Hiển thị</span>
      </div>

      ${filterCoverButtonHTML}

      ${addCoverButtonHTML}

    </div>

    <div class="main__data">
      <table class="main__table cover">
        <thead>
          <tr>
            <th width="18%">ID</th>
            <th width="38%">Tên loại bìa</th>
            <th width="22%">Trạng thái</th>
            <th width="22%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="admin-pagination-cover"></div>
  `,

  publisher: `
    <h1 class="main__title">Nhà xuất bản</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1 ${filterPublisherCSS}">
        <input required="" type="text" id="find-inp-publisher" autocomplete="off" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên nhà xuất bản</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1 ${filterPublisherCSS}">
        <input required="" type="text" id="sort-slt-publisher" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên nhà xuất bản tăng dần</li>
          <li>Tên nhà xuất bản giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1 ${filterPublisherCSS}">
        <input required="" type="text" id="status-slt-publisher" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 ${filterPublisherCSS}">
        <input required="" type="text" id="show-inp-publisher" />
        <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Hiển thị</span>
      </div>

      ${filterPublisherButtonHTML}

      ${addPublisherButtonHTML}

    </div>
    <div class="main__data">
      <table class="main__table publisher">
        <thead>
          <tr>
            <th width="18%">ID</th>
            <th width="38%">Tên nhà xuất bản</th>
            <th width="22%">Trạng thái</th>
            <th width="22%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination" id="admin-pagination-publisher"></div>
  `,
  payment: `
    <h1 class="main__title">Thẻ thanh toán</h1>
  <div class="main__row">
    <div class="main__find-inp inp-text-form-1 ${filterPaymentCSS}">
      <input required="" type="text" id="find-inp-payment" autocomplete="off" />
      <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên phương thức</span>
    </div>
    <div class="main__sort-slt main__select slt-form-1 ${filterPaymentCSS}">
      <input required="" type="text" id="sort-slt-payment" autocomplete="off" />
      <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp</span>
      <ul>
        <li>ID tăng dần</li>
        <li>ID giảm dần</li>
        <li>Tên phương thức tăng dần</li>
        <li>Tên phương thức giảm dần</li>
      </ul>
    </div>
    <div class="main__status-slt main__select slt-form-1 ${filterPaymentCSS}">
      <input required="" type="text" id="status-slt-payment" autocomplete="off" />
      <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Trạng thái</span>
     <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
    </div>
    <div class="main__find-inp inp-text-form-1 ${filterPaymentCSS}">
      <input required="" type="text" id="show-inp-payment" autocomplete="off" />
      <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Hiển thị</span>
    </div>

      ${filterPaymentButtonHTML}

      ${addPaymentButtonHTML}

  </div>
  <div class="main__data">
    <table class="main__table payment">
      <thead>
        <tr>
            <th width="10%">ID</th>
            <th width="28%">Tên phương thức</th>
            <th width="14%">Mô tả</th>
            <th width="20%">Hình thức</th>
            <th width="14%">Trạng thái</th>
            <th width="14%"></th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
  <div class="main__pagination" id="admin-pagination-payment"></div>
  `,
};

// Biến dùng để chuyển nội dung chính tương ứng với từng trang
const mainContentDiv = document.getElementById("main-content");

// Biến chứa các mục ở menu
const menuInSideBar = document.querySelectorAll(
  ".sidebar__menu > .sidebar__item"
);

// Gán sự kiện cho từng mục ở sidebar
menuInSideBar.forEach((item, i) => {
  item.addEventListener("click", async (e) => {
    // Loại bỏ đi giá trị mặc định
    e.preventDefault();

    // Thêm class "active" vào nút được nhấn
    item.classList.add("active");

    // Xoá class "active" khỏi các nút không được nhấn
    menuInSideBar.forEach((otherItem, j) => {
      if (i != j) {
        otherItem.classList.remove("active");
      }
    });

    // Lấy ra giá trị của mục được nhấn, chuyển trang
    const mainContentKey = item
      .querySelector(".sidebar__action")
      .getAttribute("data-main-content");
    if (mainContentMap[mainContentKey]) {
      // Kéo lên đầu trang mỗi lần chuyển trang
      window.scrollTo(0, 0);

      // Thay đổi nội dung ở trang tương ứng
      mainContentDiv.innerHTML = mainContentMap[mainContentKey];
      // Đa phần thì trang nào cũng cần gọi hàm này
      selectFormEvents();

      // Gán sự kiện tương ứng cho trang tương ứng
      if (mainContentKey === "profit_dashboard") {
        updateTimelineSelects();
        printProfitDashboardTicket();
        updateProfitDashboardTable();
      } else if (mainContentKey === "revenue_dashboard") {
        updateTimelineSelects();
        printRevenueDashboardTicket();
        updateRevenueDashboardTable();
      } else if (mainContentKey === "invest_dashboard") {
        updateTimelineSelects();
        printInvestDashboardTicket();
        updateInvestDashboardTable();
      } else if (mainContentKey === "order_dashboard") {
        updateOrderDashboardTable();
      } else if (mainContentKey === "order") {
        updateOrderTable();
      } else if (mainContentKey === "privilege") {
        updatePrivilegeTable();
      } else if (mainContentKey === "account") {
        await renderPrivilegesAccount();
        updateAccountTable();
      } else if (mainContentKey === "supplier") {
        updateSupplierTable();
      } else if (mainContentKey === "discount") {
        updateDiscountTable();
      } else if (mainContentKey === "input_ticket") {
        updateInputTicketTable();
      } else if (mainContentKey === "book") {
        updateBookTable();
        // showCategory();
      } else if (mainContentKey === "author") {
        updateAuthorTable();
      } else if (mainContentKey === "category") {
        updateCategoryTable();
      } else if (mainContentKey === "cover") {
        updateCoverTable();
      } else if (mainContentKey === "publisher") {
        updatePublisherTable();
      } else if (mainContentKey === "payment") {
        updatePaymentTable();
      }
    }
  });
});

const firstKey = Object.keys(data)[0];

menuInSideBar.item(0).click();

if (firstKey == 1) {
  window.addEventListener("load", function () {
    updateTimelineSelects();
    printProfitDashboardTicket();
    updateProfitDashboardTable();
  });
} else if (firstKey == 2) {
  window.addEventListener("load", function () {
    updateTimelineSelects();
    printRevenueDashboardTicket();
    updateRevenueDashboardTable();
  });
} else if (firstKey == 3) {
  window.addEventListener("load", function () {
    updateTimelineSelects();
    printInvestDashboardTicket();
    updateInvestDashboardTable();
  });
} else if (firstKey == 4) {
  window.addEventListener("load", function () {
    updateOrderDashboardTable();
  });
} else if (firstKey == 5) {
  window.addEventListener("load", function () {
    updateOrderTable();
  });
} else if (firstKey == 6) {
  window.addEventListener("load", function () {
    updatePrivilegeTable();
  });
} else if (firstKey == 7) {
  window.addEventListener("load", async function () {
    await renderPrivilegesAccount();
    updateAccountTable();
  });
} else if (firstKey == 8) {
  window.addEventListener("load", function () {
    updateSupplierTable();
  });
} else if (firstKey == 9) {
  window.addEventListener("load", function () {
    updateDiscountTable();
  });
} else if (firstKey == 10) {
  window.addEventListener("load", function () {
    updateInputTicketTable();
  });
} else if (firstKey == 11) {
  window.addEventListener("load", function () {
    updateBookTable();
  });
} else if (firstKey == 12) {
  window.addEventListener("load", function () {
    updateAuthorTable();
  });
} else if (firstKey == 13) {
  window.addEventListener("load", function () {
    updateCategoryTable();
  });
} else if (firstKey == 14) {
  window.addEventListener("load", function () {
    updateCoverTable();
  });
} else if (firstKey == 15) {
  window.addEventListener("load", function () {
    updatePublisherTable();
  });
} else if (firstKey == 16) {
  window.addEventListener("load", function () {
    updatePaymentTable();
  });
}

// // Mặc định thì "Thống kê Lợi nhuận" luôn được hiển thị đầu tiên
// menuInSideBar.item(0).click();
// window.addEventListener("load", function () {
//   selectFormEvents();
//   updateTimelineSelects();
//   printProfitDashboardTicket();
//   updateProfitDashboardTable();
// });

// // dùng để hiển thị vào input để chọn để tìm kiếm
// async function showCategory() {
//   let listCategory = await fetchData(`api/categories/get.php`); // Chờ dữ liệu từ API
//   console.log("Dữ liệu nhận được từ API:", listCategory);

//   if (!Array.isArray(listCategory)) {
//     console.error(" Lỗi: Dữ liệu không đúng định dạng (phải là mảng).");
//     return;
//   }

//   const ulElement = document.querySelector(".main__category-slt ul");
//   let li = document.createElement("li");
//   listCategory.forEach((category) => {
//     let li = document.createElement("li");
//     li.textContent = category.name;
//     ulElement.appendChild(li);
//   });
// }

// render nhóm quyền người dùng
async function renderPrivilegesAccount() {
  const privileges = await getRolePrivilege();

  if (!privileges) return;

  const privilegeUl = document.querySelector(
    "#privilege-slt-account + span + ul"
  );
  const privilegeInput = document.getElementById("privilege-slt-account");

  if (!privilegeUl || !privilegeInput) return;
  privilegeUl.innerHTML = "";

  privileges.data.forEach((privilege) => {
    const li = document.createElement("li");
    li.textContent = privilege.name;
    li.setAttribute("value", privilege.id); // Gán giá trị vào thẻ <li>

    li.addEventListener("click", () => {
      privilegeInput.value = li.getAttribute("value"); // Cập nhật giá trị input bằng value của li
    });
    privilegeUl.appendChild(li);
  });
  // --- Thêm li cuối "CHƯA CÓ QUYỀN" ---
  const liNull = document.createElement("li");
  liNull.textContent = "Chưa có quyền";
  liNull.setAttribute("value", "null");
  privilegeUl.appendChild(liNull);
}
