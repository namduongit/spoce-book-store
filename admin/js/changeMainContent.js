import { selectFormEvents } from "./selectEvents.js";
import { clickToShowDatePicker } from "./others.js";
import { filterAccountData } from "./account/filterAccountData.js";
import { addAccountData } from "./account/addAccountData.js";
import { renderAccountTable } from "./account/renderAccountTable.js";
import { filterAuthorData } from "./author/filterAuthorData.js";
import { addAuthorData } from "./author/addAuthorData.js";
import { renderAuthorTable } from "./author/renderAuthorTable.js";
import { filterCategoryData } from "./category/filterCategoryData.js";
import { addCategoryData } from "./category/addCategoryData.js";
import { renderCategoryTable } from "./category/renderCategoryTable.js";
import { filterCoverData } from "./cover/filterCoverData.js";
import { addCoverData } from "./cover/addCoverData.js";
import { renderCoverTable } from "./cover/renderCoverTable.js";
import { filterSuppliesData } from "./supplies/filterSuppliesData.js";
import { addSuppliesData } from "./supplies/addSuppliesData.js";
import { renderSuppliesTable } from "./supplies/renderSuppliesTable.js";
import { filterPublisherData } from "./publisher/filterPublisherData.js";
import { addPublisherData } from "./publisher/addPublisherData.js";
import { renderPublisherTable } from "./publisher/renderPublisherTable.js";
import { filterIssuerData } from "./issuer/filterIssuerData.js";
import { addIssuerData } from "./issuer/addIssuerData.js";
import { renderIssuerTable } from "./issuer/renderIssuerTable.js";

import { renderInputTicketTable } from "./input_ticket/renderInputTicketTable.js";

import { addBookData } from "./book/addBookData.js";
import { filterBookData } from "./book/filterBookData.js";
import { renderBookTable } from "./book/renderBookTable.js";

import { filterDiscountData } from "./discount/filterDiscountData.js";
import { addDiscountData } from "./discount/addDiscountData.js";
import { renderDiscountTable } from "./discount/renderDiscountTable.js";

// Biến chứa nội dung sẽ thay đổi của menu tương ứng
const mainContentMap = {
  profit_dashboard: `<h1>Thống kê lợi nhuận</h1>`,
  revenue_dashboard: `<h1>Thống kê doanh thu</h1>`,
  input_ticket_dashboard: `<h1>Thống kê phiếu nhập</h1>`,
  order_dashboard: `<h1>Thống kê đơn hàng</h1>`,
  order: `
    <h1>Đơn hàng</h1>
  `,
  account: `
    <h1 class="main__title">Người dùng</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-account" />
        <span><i class="fa-solid fa-search"></i>&nbsp;&nbsp;ID / Tên đăng nhập</span>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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
              <th width="34%">Tên đăng nhập</th>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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
          <li>Tổng thanh toán tăng dần</li>
          <li>Tổng thanh toán giảm dần</li>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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
              <th width="26%">Tổng tiền thanh toán (VNĐ)</th>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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
        <span><i class="fa-solid fa-refresh"></i>&nbsp;&nbsp;Chọn Trạng thái</span>
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

      // Gán sự kiện tương ứng cho trang tương ứng
      if (mainContentKey === "dashboard") {
      } else if (mainContentKey === "order") {
      } else if (mainContentKey === "account") {
        filterAccountData();
        addAccountData();
        renderAccountTable();
      } else if (mainContentKey === "supplies") {
        filterSuppliesData();
        addSuppliesData();
        renderSuppliesTable();
      } else if (mainContentKey === "discount") {
        clickToShowDatePicker("find-date-start-before-inp-discount");
        clickToShowDatePicker("find-date-start-after-inp-discount");
        clickToShowDatePicker("find-date-end-before-inp-discount");
        clickToShowDatePicker("find-date-end-after-inp-discount");
        filterDiscountData();
        addDiscountData();
        renderDiscountTable();
      } else if (mainContentKey === "input_ticket") {
        clickToShowDatePicker("find-date-create-before-inp-input_ticket");
        clickToShowDatePicker("find-date-create-after-inp-input_ticket");
        renderInputTicketTable();
      } else if (mainContentKey === "book") {
        filterBookData();
        addBookData();
        renderBookTable();
      } else if (mainContentKey === "author") {
        filterAuthorData();
        addAuthorData();
        renderAuthorTable();
      } else if (mainContentKey === "category") {
        filterCategoryData();
        addCategoryData();
        renderCategoryTable();
      } else if (mainContentKey === "cover") {
        filterCoverData();
        addCoverData();
        renderCoverTable();
      } else if (mainContentKey === "publisher") {
        filterPublisherData();
        addPublisherData();
        renderPublisherTable();
      } else if (mainContentKey === "issuer") {
        filterIssuerData();
        addIssuerData();
        renderIssuerTable();
      }

      // Đa phần thì trang nào cũng cần gọi hàm này
      selectFormEvents();
    }
  });
});
