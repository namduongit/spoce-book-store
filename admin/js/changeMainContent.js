import { filterAccountData } from "./account/filterAccountData.js";
import { addAccountData } from "./account/addAccountData.js";
import { renderAccountTable } from "./account/renderAccountTable.js";
import { filterSuppliesData } from "./supplies/filterSuppliesData.js";
import { addSuppliesData } from "./supplies/addSuppliesData.js";
import { renderSuppliesTable } from "./supplies/renderSuppliesTable.js";
import { filterPublisherData } from "./publisher/filterPublisherData.js";
import { addPublisherData } from "./publisher/addPublisherData.js";
import { renderPublisherTable } from "./publisher/renderPublisherTable.js";
import { filterIssuerData } from "./issuer/filterIssuerData.js";
import { addIssuerData } from "./issuer/addIssuerData.js";
import { renderIssuerTable } from "./issuer/renderIssuerTable.js";
import { filterTypeData } from "./type/filterTypeData.js";
import { addTypeData } from "./type/addTypeData.js";
import { renderTypeTable } from "./type/renderTypeTable.js";

// Biến chứa nội dung sẽ thay đổi của menu tương ứng
const mainContentMap = {
  dashboard: `<h1>Thống kê</h1>`,
  order: `
    <h1>Hoá đơn</h1>
  `,
  account: `
    <h1 class="main__title">Người dùng</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-account" />
        <span>ID / Tên đăng nhập</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-account" />
        <span>Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên đăng nhập tăng dần</li>
          <li>Tên đăng nhập giảm dần</li>
        </ul>
      </div>
      <div class="main__privilege-slt main__select slt-form-1">
        <input required="" type="text" id="privilege-slt-account" />
        <span>Chọn Phân quyền</span>
        <ul>
          <li>Quản lý</li>
          <li>Nhân viên</li>
          <li>Khách hàng</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-account" />
        <span>Chọn Trạng thái</span>
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
        <span>ID / Tên nhà cung cấp</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-supplies" />
        <span>Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên nhà cung cấp tăng dần</li>
          <li>Tên nhà cung cấp giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-supplies" />
        <span>Chọn Trạng thái</span>
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
  publisher: `
    <h1 class="main__title">Nhà xuất bản</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-publisher" />
        <span>ID / Tên xuất bản</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-publisher" />
        <span>Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên xuất bản tăng dần</li>
          <li>Tên xuất bản giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-publisher" />
        <span>Chọn Trạng thái</span>
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
              <th width="38%">Tên xuất bản</th>
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
        <span>ID / Tên phát hành</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-issuer" />
        <span>Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên phát hành tăng dần</li>
          <li>Tên phát hành giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-issuer" />
        <span>Chọn Trạng thái</span>
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
              <th width="38%">Tên phát hành</th>
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
  type: `
    <h1 class="main__title">Thể loại</h1>
    <div class="main__row">
      <div class="main__find-inp inp-text-form-1">
        <input required="" type="text" id="find-inp-type" />
        <span>ID / Tên thể loại</span>
      </div>
      <div class="main__sort-slt main__select slt-form-1">
        <input required="" type="text" id="sort-slt-type" />
        <span>Chọn Sắp xếp</span>
        <ul>
          <li>ID tăng dần</li>
          <li>ID giảm dần</li>
          <li>Tên thể loại tăng dần</li>
          <li>Tên thể loại giảm dần</li>
        </ul>
      </div>
      <div class="main__status-slt main__select slt-form-1">
        <input required="" type="text" id="status-slt-type" />
        <span>Chọn Trạng thái</span>
        <ul>
          <li>Hoạt động</li>
          <li>Tạm dừng</li>
        </ul>
      </div>
      <button class="main__filter-btn" id="filter-button-type">
        <i class="fa-solid fa-filter"></i>
        <span>Lọc</span>
      </button>
      <button class="main__add-btn" id="add-button-type">
        <i class="fa-solid fa-plus"></i>
        <span>Thêm</span>
      </button>
    </div>
    <div class="main__data">
      <table class="main__table type">
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
      } else if (mainContentKey === "publisher") {
        filterPublisherData();
        addPublisherData();
        renderPublisherTable();
      } else if (mainContentKey === "issuer") {
        filterIssuerData();
        addIssuerData();
        renderIssuerTable();
        console.log(123);
      } else if (mainContentKey === "type") {
        filterTypeData();
        addTypeData();
        renderTypeTable();
      }
    }
  });
});
