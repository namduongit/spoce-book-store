import { selectFormEvents, updateTimelineSelects } from "./selectEvents.js";
import { clickToShowDatePicker } from "./others.js";
import { printProfitDashboardTicket } from "./dashboard/printProfitDashboard.js";
import { updateProfitDashboardTable } from "./dashboard/updateProfitDashboardTable.js";
import { updateRevenueDashboardTable } from "./dashboard/updateRevenueDashboardTable.js";
import { printRevenueDashboardTicket } from "./dashboard/printRevenueDashboard.js";
import { updateInputTicketDashboardTable } from "./dashboard/updateInputTicketDashboard.js";
import { printInputTicketDashboardTicket } from "./dashboard/printInputTicketDashboard.js";
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
import { updateIssuerTable } from "./issuer/updateIssuerTable.js";

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
  order_dashboard: `<h1>Thống kê đơn hàng</h1>`,
  order: `
    <h1 class="main__title">Đơn hàng</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-order" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Khách hàng</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-order" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Khách hàng tăng dần</li>
          <li>Khách hàng giảm dần</li>
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
        <span><i class="fa-solid fa-tree-city"></i>&nbsp;&nbsp;Chọn Quận</span>
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
          <li>Đã hoàn thành</li>
          <li>Chưa thanh toán</li>
          <li>Đang chờ xác nhận</li>
          <li>Đã huỷ phiếu</li>
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
              <th width="10%">Khách hàng</th>
              <th width="14%">Ngày tạo đơn</th>
              <th width="14%">Quận, Tỉnh / TP</th>
              <th width="28%">Tổng thanh toán (VNĐ)</th>
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
        <span><i class="fa-solid fa-user-gear"></i>&nbsp;&nbsp;Chọn Phân quyền</span>
        <ul>
          <li>Quản lý</li>
          <li>Nhân viên</li>
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
              <th width="14%">Phân quyền</th>
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
  discount: `
    <h1 class="main__title">Khuyến mãi</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-id-or-name-inp-discount" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên khuyến mãi</span>
      </div>
      <div class="main__find-inp inp-text-form-1 date">
        <input required="" type="date" id="find-date-start-before-inp-discount" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="find-date-start-after-inp-discount" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Ngày bắt đầu</span>
      </div>
      <div class="main__find-inp inp-text-form-1 date">
        <input required="" type="date" id="find-date-end-before-inp-discount" />
        <i class="fa-solid fa-minus"></i>
        <input required="" type="date" id="find-date-end-after-inp-discount" />
        <span><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;Ngày kết thúc</span>
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
              <th width="14%">Ngày bắt đầu</th>
              <th width="14%">Ngày kết thúc</th>
              <th width="10%">Phần trăm</th>
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
          <li>Ngày lập phiếu tăng dần</li>
          <li>Ngày lập phiếu giảm dần</li>
          <li>Số loại sách tăng dần</li>
          <li>Số loại sách giảm dần</li>
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
              <th width="16%">Ngày lập phiếu</th>
              <th width="16%">Tổng số lượng</th>
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
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tiêu đề tăng dần</li>
          <li>Tiêu đề giảm dần</li>
          <li>Số lượng tăng dần</li>
          <li>Số lượng giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="type-slt-book" />
        <span><i class="fa-solid fa-font-awesome"></i>&nbsp;&nbsp;Chọn Thể loại</span>
        <ul>
          <li>Thể loại 1</li>
          <li>Thể loại 2</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-book" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-book">
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
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên tác giả tăng dần</li>
          <li>Tên tác giả giảm dần</li>
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
  issuer: `
    <h1 class="main__title">Nhà phát hành</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-issuer" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên nhà phát hành</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-issuer" />
        <span><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên nhà phát hành tăng dần</li>
          <li>Tên nhà phát hành giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-issuer" />
        <span><i class="fa-solid fa-signal"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-issuer">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-issuer">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
    </div>
    <div class="main__data">
      <table class="main__table issuer">
        <thead>
          <tr>
              <th width="18%">ID</th>
              <th width="38%">Tên nhà phát hành</th>
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

    // Lấy ra giá trị của mục được nhấn
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
      } else if (mainContentKey === "order") {
        updateOrderTable();
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
      } else if (mainContentKey === "author") {
        updateAuthorTable();
      } else if (mainContentKey === "category") {
        updateCategoryTable();
      } else if (mainContentKey === "cover") {
        updateCoverTable();
      } else if (mainContentKey === "publisher") {
        updatePublisherTable();
      } else if (mainContentKey === "issuer") {
        updateIssuerTable();
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
