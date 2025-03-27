import { selectFormEvents, updateTimelineSelects } from "./selectEvents.js";
import { printProfitDashboardTicket } from "./dashboard/printProfitDashboard.js";
import { updateProfitDashboardTable } from "./dashboard/updateProfitDashboardTable.js";
import { updateRevenueDashboardTable } from "./dashboard/updateRevenueDashboardTable.js";
import { printRevenueDashboardTicket } from "./dashboard/printRevenueDashboard.js";
import { updateInputTicketDashboardTable } from "./dashboard/updateInputTicketDashboard.js";
import { printInputTicketDashboardTicket } from "./dashboard/printInputTicketDashboard.js";
import { updateOrderDashboardTable } from "./order_dashboard/updateOrderDashboardTable.js";
import { updateOrderTable } from "./order/updateOrderTable.js";
import { updateAccountTable } from "./account/updateAccountTable.js";
import { updateDiscountTable } from "./discount/updateDiscountTable.js";
import { updateSuppliesTable } from "./supplies/updateSuppliesTable.js";
import { updateInputTicketTable } from "./input_ticket/updateInputTicketTable.js";
import { updateBookTable } from "./book/updateBookTable.js";
import { updateAuthorTable } from "./author/updateAuthorTable.js";
import { updateCategoryTable } from "./category/updateCategoryTable.js";
import { updateCoverTable } from "./cover/updateCoverTable.js";
import { updatePublisherTable } from "./publisher/updatePublisherTable.js";
import { getAllCategoryData } from "./category/renderCategoryTable.js";

// import { renderPrivilegeTable } from "./privilege/renderPrivilegeTable.js";
import { updatePrivilegeTable } from "./privilege/updatePrivilegeTable.js";

// Biến chứa nội dung sẽ thay đổi của menu tương ứng
const mainContentMap = {
  profit_dashboard: `
    <h1 class="main__title">Thống kê lợi nhuận</h1>
    <div class="main__row">
      <div class="main__timeline-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-profit_dashboard" />
        <span><i class="fa-solid fa-timeline"></i></i>&nbsp;&nbsp;Chọn Khoảng thời gian</span>
        <ul>
          <li>Lọc theo năm</li>
          <li>Lọc theo tháng</li>
        </ul>
      </div>
      <div class="main__timeline-detail-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-profit_dashboard" />
        <span><i class="fa-solid fa-clock"></i>&nbsp;&nbsp;Chọn Thời gian cụ thể</span>
        <ul>
        </ul>
      </div>
      <button class="main__see-btn" id="filter-button-profit_dashboard">
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
      <div class="main__timeline-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-revenue_dashboard" />
        <span><i class="fa-solid fa-timeline"></i></i>&nbsp;&nbsp;Chọn Khoảng thời gian</span>
        <ul>
          <li>Lọc theo năm</li>
          <li>Lọc theo tháng</li>
        </ul>
      </div>
      <div class="main__timeline-detail-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-revenue_dashboard" />
        <span><i class="fa-solid fa-clock"></i>&nbsp;&nbsp;Chọn Thời gian cụ thể</span>
        <ul>
        </ul>
      </div>
      <button class="main__see-btn" id="filter-button-revenue_dashboard">
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
  input_ticket_dashboard: `
    <h1 class="main__title">Thống kê phiếu nhập</h1>
    <div class="main__row">
      <div class="main__timeline-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-input_ticket_dashboard" />
        <span><i class="fa-solid fa-timeline"></i></i>&nbsp;&nbsp;Chọn Khoảng thời gian</span>
        <ul>
          <li>Lọc theo năm</li>
          <li>Lọc theo tháng</li>
        </ul>
      </div>
      <div class="main__timeline-detail-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-input_ticket_dashboard" />
        <span><i class="fa-solid fa-clock"></i>&nbsp;&nbsp;Chọn Thời gian cụ thể</span>
        <ul>
        </ul>
      </div>
      <button class="main__see-btn" id="filter-button-input_ticket_dashboard">
        <i class="fa-solid fa-eye"></i>
        <span>Xem</span>
      </button>
      <button class="main__print-btn" id="print-button-input_ticket_dashboard">
        <i class="fa-solid fa-print"></i>
        <span>In thống kê</span>
      </button>
    </div>
    <div class="main__data">
      <table class="main__table dashboard input_ticket_dashboard">
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
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-customer" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;Khách hàng</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-order_dashboard" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>Khách hàng tăng dần</li>
          <li>Khách hàng giảm dần</li>
          <li>Ngày thống kê tăng dần</li>
          <li>Ngày thống kê giảm dần</li>
          <li>Tổng đơn hàng tăng dần</li>
          <li>Tổng đơn hàng giảm dần</li>
          <li>Tổng thanh toán tăng dần</li>
          <li>Tổng thanh toán giảm dần</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 date">
        <input required="" type="date" id="find-date-dashboard-before-inp-order_dashboard" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="find-date-dashboard-after-inp-order_dashboard" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Ngày thống kê</span>
      </div>
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-row" />
        <span><i class="fa-solid fa-list-ol"></i>&nbsp;&nbsp;Nhập số dòng</span>
      </div>
      <div class="main__buttons">
        <button class="main__filter-btn" id="filter-button-order_dashboard">
          <i class="fa-solid fa-filter"></i>
          <span>Lọc</span>
        </button>
        <button class="main__refresh-btn" id="filter-button-order_dashboard">
          <i class="fa-solid fa-refresh"></i>
          <span>Đặt lại</span>
        </button>
      </div>
    </div>
    <div class="main__data">
      <table class="main__table order_dashboard">
        <thead>
          <tr>
              <th width="14%">Khách hàng</th>
              <th width="19%">Ngày thống kê</th>
              <th width="19%">Tổng đơn hàng</th>
              <th width="38%">Tổng thanh toán (VNĐ)</th>
              <th width="10%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  order: `
    <h1 class="main__title">Đơn hàng</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-order" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID đơn hàng</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
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
      <div class="main__find-inp inp-text-form-1 date">
        <input required="" type="date" id="find-date-create-before-inp-order" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="find-date-create-after-inp-order" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Ngày tạo đơn</span>
      </div>
      <div class="main__city-slt main__select slt-form-1">
        <input required="" type="text" id="city-slt-order" />
        <span><i class="fa-solid fa-city"></i>&nbsp;&nbsp;Chọn Tỉnh / Thành phố</span>
        <ul>
          <li>Hà Nội</li>
          <li>Thành phố Hồ Chí Minh</li>
        </ul>
      </div>
      <div class="main__district-slt main__select slt-form-1">
        <input required="" type="text" id="district-slt-order" />
        <span><i class="fa-solid fa-tree-city"></i>&nbsp;&nbsp;Chọn Quận / Huyện</span>
        <ul>
          <li>Quận 1</li>
          <li>Quận 10</li>
        </ul>
      </div>
    </div>
    <div class="main__row">
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-order" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Đã giao</li>
          <li>Đã xác nhận</li>
          <li>Chưa xác nhận</li>
          <li>Đã huỷ đơn</li>
        </ul>
      </div>
      <div class="main__buttons">
        <button class="main__filter-btn" id="filter-button-order">
          <i class="fa-solid fa-filter"></i>
          <span>Lọc</span>
        </button>
        <button class="main__refresh-btn" id="filter-button-order">
          <i class="fa-solid fa-refresh"></i>
          <span>Đặt lại</span>
        </button>
      </div>
    </div>
    <div class="main__data">
      <table class="main__table order">
        <thead>
          <tr>
              <th width="10%">ID</th>
              <th width="16%">Ngày tạo đơn</th>
              <th width="16%">Quận, Tỉnh / TP</th>
              <th width="32%">Tổng thanh toán (VNĐ)</th>
              <th width="16%">Trạng thái</th>
              <th width="10%"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  privilege: `
    <h1 class="main__title">Nhóm quyền</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-privilege" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên nhóm quyền</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-privilege" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên nhóm quyền tăng dần</li>
          <li>Tên nhóm quyền giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-privilege" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-privilege">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-privilege">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
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
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-account" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Họ và tên</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-account" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên đăng nhập tăng dần</li>
          <li>Tên đăng nhập giảm dần</li>
        </ul>
      </div>
      <div class="main__privilege-slt main__select slt-form-1">
        <input required="" type="text" id="privilege-slt-account" />
        <span><i class="fa-solid fa-user-gear"></i>&nbsp;&nbsp;Chọn Nhóm quyền</span>
        <ul>
          <li>Quản lý</li>
          <li>Nhân viên thủ kho</li>
          <li>Nhân viên bán hàng</li>
          <li>Khách hàng</li> 
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-account" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-account">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-account">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
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
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  discount: `
    <h1 class="main__title">Khuyến mãi</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-id-or-name-inp-discount" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên khuyến mãi</span>
      </div>
      <div class="main__find-inp main__select slt-form-1">
        <input required="" type="text" id="type-slt-discount" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Loại khuyến mãi</span>
        <ul>
          <li>Phần trăm</li>
          <li>Tiền</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 date">
        <input required="" type="date" id="find-date-start-inp-discount" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="find-date-end-inp-discount" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Ngày áp dụng</span>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-discount" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-discount">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-discount">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
    </div>
    <div class="main__data">
      <table class="main__table discount">
        <thead>
          <tr>
              <th width="10%">ID</th>
              <th width="24%">Tên khuyến mãi</th>
              <th width="14%">Loại khuyến mãi</th>
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
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  supplies: `
    <h1 class="main__title">Nhà cung cấp</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-supplies" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên nhà cung cấp</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-supplies" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên nhà cung cấp tăng dần</li>
          <li>Tên nhà cung cấp giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-supplies" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-supplies">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-supplies">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
    </div>
    <div class="main__data">
      <table class="main__table supplies">
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
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  input_ticket: `
    <h1 class="main__title">Phiếu nhập</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-input_ticket" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID phiếu nhập</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-input_ticket" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Nhà cung cấp tăng dần</li>
          <li>Nhà cung cấp giảm dần</li>
          <li>Ngày lập phiếu tăng dần</li>
          <li>Ngày lập phiếu giảm dần</li>
          <li>Tổng tiền nhập tăng dần</li>
          <li>Tổng tiền nhập giảm dần</li>
        </ul>
      </div>
      <div class="main__find-inp inp-text-form-1 date">
        <input required="" type="date" id="find-date-create-before-inp-input_ticket" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="find-date-create-after-inp-input_ticket" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Ngày lập phiếu</span>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-input_ticket" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Đã hoàn thành</li>
          <li>Chưa thanh toán</li>
          <li>Đang chờ xác nhận</li>
          <li>Đã huỷ phiếu</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-input_ticket">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-input_ticket">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
    </div>
    <div class="main__data">
      <table class="main__table input_ticket">
        <thead>
          <tr>
              <th width="10%">ID</th>
              <th width="16%">Nhà cung cấp</th>
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
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  book: `
    <h1 class="main__title">Sách</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-book" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tiêu đề</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-book" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp</span>
        <ul>
          <li>Tăng dần</li>
          <li>Giảm dần</li>
        </ul>
      </div>

      <div class="main__sort_column-slt main__select slt-form-1">
        <input required="" type="text" id="sort_column-slt-book" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Sắp xếp cột</span>
        <ul>
          <li>Mã sách</li>
          <li>Tiêu đề</li>
          <li>Tên thể loại</li>
          <li>Năm xuất bản</li>
        </ul>
      </div>

      <div class="main__sort_category-slt main__select slt-form-1">
        <input required="" type="text" id="type-slt-book" />
        <span><i class="fa-solid fa-font-awesome"></i>&nbsp;&nbsp;Chọn Thể loại</span>
        <ul>
          <li>Tất cả</li>
          <li>Tiểu thuyết</li>
          <li>Trinh thám</li>
          <li>Khoa học viễn tưởng</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-book" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Tất cả</li>
          <li>ACTIVE</li>
          <li>INACTIVE</li>
          <li>SUSPENDED</li>
        </ul>
      </div>
      <button type="submit" class="main__filter-btn" id="filter-button-book">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-book">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
    
      
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
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  author: `
    <h1 class="main__title">Tác giả</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-author" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên tác giả</span>
      </div>

      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-author" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID </li>
          <li>Tên tác giả</li>
        </ul>
      </div>


      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-author" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>Tăng dần</li>
          <li>Giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-author" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-author">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-author">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
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
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  category: `
    <h1 class="main__title">Thể loại</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-category" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên thể loại</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-category" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên thể loại tăng dần</li>
          <li>Tên thể loại giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-category" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-category">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-category">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
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
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  cover: `
    <h1 class="main__title">Loại bìa</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-cover" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên loại bìa</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-cover" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên loại bìa tăng dần</li>
          <li>Tên loại bìa giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-cover" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-cover">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-cover">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
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
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,
  publisher: `
    <h1 class="main__title">Nhà xuất bản</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-publisher" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên nhà xuất bản</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-publisher" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên nhà xuất bản tăng dần</li>
          <li>Tên nhà xuất bản giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-publisher" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-publisher">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-publisher">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
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
    <div class="main__pagination">
      <button class="main-pagination__button previous">
        <i class="icon fa-solid fa-chevron-left"></i>
      </button>
      <button class="main-pagination__button">1</button>
      <button class="main-pagination__button active">2</button>
      <button class="main-pagination__button">3</button>
      <button class="main-pagination__button">...</button>
      <button class="main-pagination__button">997</button>
      <button class="main-pagination__button">998</button>
      <button class="main-pagination__button">999</button>
      <button class="main-pagination__button next">
        <i class="icon fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `,

  
};

// Biến dùng để chuyển nội dung chính tương ứng với từng trang
const mainContentDiv = document.getElementById("main-content");

// Biến chứa các mục ở menu
const menuInSideBar = document.querySelectorAll(
  ".sidebar__menu > .sidebar__item"
);

menuInSideBar.item(0).click();

// Gán sự kiện cho từng mục ở sidebar
menuInSideBar.forEach((item, i) => {
  item.addEventListener("click", (e) => {
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
      } else if (mainContentKey === "input_ticket_dashboard") {
        updateTimelineSelects();
        printInputTicketDashboardTicket();
        updateInputTicketDashboardTable();
      } else if (mainContentKey === "order_dashboard") {
        updateOrderDashboardTable();
      } else if (mainContentKey === "order") {
        updateOrderTable();
      } else if (mainContentKey === "privilege") {
        updatePrivilegeTable();
      } else if (mainContentKey === "account") {
        updateAccountTable();
      } else if (mainContentKey === "supplies") {
        updateSuppliesTable();
      } else if (mainContentKey === "discount") {
        updateDiscountTable();
      } else if (mainContentKey === "input_ticket") {
        updateInputTicketTable();
      } else if (mainContentKey === "book") {
        updateBookTable();
        showCategory();
      } else if (mainContentKey === "author") {
        updateAuthorTable();
      } else if (mainContentKey === "category") {
        updateCategoryTable();
      } else if (mainContentKey === "cover") {
        updateCoverTable();
      } else if (mainContentKey === "publisher") {
        updatePublisherTable();
      }
    }
  });
});

// Mặc định thì "Thống kê Lợi nhuận" luôn được hiển thị đầu tiên
window.addEventListener("load", function () {
  selectFormEvents();
  updateTimelineSelects();
  printProfitDashboardTicket();
  updateProfitDashboardTable();
});



// dùng để hiển thị vào input để chọn để tìm kiếm
async function showCategory() {
  let listCategory = await getAllCategoryData(); // Chờ dữ liệu từ API
  console.log("Dữ liệu nhận được từ API:", listCategory);

  if (!Array.isArray(listCategory)) {
      console.error(" Lỗi: Dữ liệu không đúng định dạng (phải là mảng).");
      return;
  }

  const ulElement = document.querySelector('.main__sort_category-slt ul');
  ulElement.innerHTML = ''; 
  let li = document.createElement('li');
  li.textContent = 'Tất cả';
   ulElement.appendChild(li);
  listCategory.forEach(category => {
      let li = document.createElement('li');
      li.textContent = category.name;
      ulElement.appendChild(li);
  });
}


