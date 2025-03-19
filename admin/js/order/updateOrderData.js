import { isNotFirstItemSelected } from "../selectEvents.js";
import { vietnamMoneyFormat } from "../others.js";

const data = [
  {
    bookId: "SP00001",
    bookName: "Tên sách 1", // Thực tế phải truy vấn để lấy ra tiêu đề sách
    quantity: 2,
    price: 285000,
  },
  {
    bookId: "SP00005",
    bookName: "Tên sách 5",
    quantity: 10,
    price: 200000,
  },
  {
    bookId: "SP00001",
    bookName: "Tên sách 1", // Thực tế phải truy vấn để lấy ra tiêu đề sách
    quantity: 2,
    price: 285000,
  },
  {
    bookId: "SP00005",
    bookName: "Tên sách 5",
    quantity: 10,
    price: 200000,
  },
  {
    bookId: "SP00001",
    bookName: "Tên sách 1", // Thực tế phải truy vấn để lấy ra tiêu đề sách
    quantity: 2,
    price: 285000,
  },
  {
    bookId: "SP00005",
    bookName: "Tên sách 5",
    quantity: 10,
    price: 200000,
  },
  {
    bookId: "SP00001",
    bookName: "Tên sách 1", // Thực tế phải truy vấn để lấy ra tiêu đề sách
    quantity: 2,
    price: 285000,
  },
  {
    bookId: "SP00005",
    bookName: "Tên sách 5",
    quantity: 10,
    price: 200000,
  },

  {
    bookId: "SP00001",
    bookName: "Tên sách 1", // Thực tế phải truy vấn để lấy ra tiêu đề sách
    quantity: 2,
    price: 285000,
  },
  {
    bookId: "SP00005",
    bookName: "Tên sách 5",
    quantity: 10,
    price: 200000,
  },
  {
    bookId: "SP00001",
    bookName: "Tên sách 1", // Thực tế phải truy vấn để lấy ra tiêu đề sách
    quantity: 2,
    price: 285000,
  },
  {
    bookId: "SP00005",
    bookName: "Tên sách 5",
    quantity: 10,
    price: 200000,
  },
];

// Hàm cập nhật lại dữ liệu cho bảng Chi tiết đơn hàng
export function renderOrderDetailTable() {
  // Biến chứa đối tượng bảng Chi tiết đơn hàng
  const bodyInOrderDetailTable = document.querySelector(
    ".dialog__form-group > table > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
          <tr>
              <td>${data[i].bookId}</td>
              <td>${data[i].bookName}</td>
              <td>${data[i].quantity}</td>
              <td>${vietnamMoneyFormat(data[i].price)}</td>
              <td>${vietnamMoneyFormat(data[i].quantity * data[i].price)}</td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyInOrderDetailTable.innerHTML = html;
}

// Hàm thiết lập sự kiện hiện sửa một đơn hàng
export function updateOrderData(idOrderSelected) {
  // Phải truy vấn từ CSDL thông qua idOrderSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "sửa"
  const updateButton = document.getElementById("update-button-order");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một đơn hàng
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("order");
  updateDialog.style.width = "1146px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <h1 class="dialog__title">Sửa đơn hàng</h1>
          <button id="close-order-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form method="post" class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group order half">
                <label>Mã đơn hàng</label>
                <input type="text" id="update-order-id" readonly />
              </div>
              <div class="dialog__form-group order half">
                <label>Ngày tạo đơn</label>
                <input type="text" id="update-order-date-create" readonly />
              </div>
              <div class="dialog__form-group order half">
                <label>Mã nhân viên</label>
                <input type="text" id="update-employee-id" readonly />
              </div>
              <div class="dialog__form-group order half">
                <label>Trạng thái</label>
                <input type="text" id="update-order-status" readonly />
              </div>
              <div class="dialog__form-group order">
                <label>Tổng thanh toán (VNĐ)</label>
                <input type="text" id="update-order-cost" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group order">
                <label>Phương thức thanh toán</label>
                <input type="text" id="update-order-method-pay" value="Thanh toán chuyển khoản" readonly />
              </div>
              <div class="dialog__form-group order full">
                <label>Địa chỉ giao hàng</label>
                <input type="text" id="update-order-address-to-ship" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group order half">
                <label>Mã khách hàng</label>
                <input type="text" id="update-order-customer-id" readonly />
              </div>
              <div class="dialog__form-group order half">
                <label>Số điện thoại</label>
                <input type="text" id="update-order-customer-phone" readonly />
              </div>
              <div class="dialog__form-group order">
                <label>Họ và tên</label>
                <input type="text" id="update-order-customer-fullname" readonly />
              </div>
              <div class="dialog__form-group order">
                <label>Email</label>
                <input type="text" id="update-order-customer-email" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label style="color: #000;">Chi tiết đơn hàng</label>
                <table>
                  <thead>
                    <tr>  
                      <th width="10%">Mã sách</th>
                      <th width="42%" class="name">Tên sách</th>
                      <th width="10%">Số lượng</th>
                      <th width="14%">Đơn giá (VNĐ)</th>
                      <th width="24%" class="total">Thành tiền (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="dialog__buttons order">
              <button class="ship-status">Giao hàng</button>
              <button class="confirm-status">Xác nhận</button>
              <button class="cancel-status">Huỷ đơn</button>
            </div>
          </form >
    `;

  // Thêm vào body
  document.body.appendChild(updateDialog);

  // Hiển thị updateDialog
  updateDialog.showModal();

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });
  // -
  renderOrderDetailTable();

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-order-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
