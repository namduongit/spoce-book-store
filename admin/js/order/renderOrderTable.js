import { vietnamMoneyFormat } from "../others.js";
import { updateOrderData } from "./updateOrderData.js";
import { printOrderTicket } from "./printOrderTicket.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
let data = [
  {
    orderId: 1,
    customerId: 1,
    dateCreate: "28/02/2025",
    addressToShip: "123, Phường 10, Quận 05, Thành phố Hồ Chí Minh",
    orderDetail: [
      {
        bookId: "SP00001",
        quantity: 2,
        price: 285000,
      },
      {
        bookId: "SP00005",
        quantity: 10,
        price: 200000,
      },
    ],
    totalPrice: 2570000,
    methodPay: "Thanh toán khi giao hàng (COD)",
    discountId: "",
    status: "Đã hoàn thành",
    dateUpdate: "",
  },
  {
    orderId: 1,
    customerId: 1,
    dateCreate: "28/02/2025",
    addressToShip: "124125, 1879812",
    orderDetail: [
      {
        bookId: "SP00001",
        quantity: 2,
        price: 285000,
      },
      {
        bookId: "SP00005",
        quantity: 10,
        price: 200000,
      },
    ],
    totalPrice: 2570000,
    methodPay: "Thanh toán khi giao hàng (COD)",
    discountId: "",
    status: "Đang giao hàng",
    dateUpdate: "",
  },
  {
    orderId: 1,
    customerId: 1,
    dateCreate: "28/02/2025",
    addressToShip: "124125, 1879812",
    orderDetail: [
      {
        bookId: "SP00001",
        quantity: 2,
        price: 285000,
      },
      {
        bookId: "SP00005",
        quantity: 10,
        price: 200000,
      },
    ],
    totalPrice: 2570000,
    methodPay: "Thanh toán khi giao hàng (COD)",
    discountId: "",
    status: "Đang chờ xác nhận",
    dateUpdate: "",
  },
  {
    orderId: 1,
    customerId: 1,
    dateCreate: "28/02/2025",
    addressToShip: "124125, 1879812",
    orderDetail: [
      {
        bookId: "SP00001",
        quantity: 2,
        price: 285000,
      },
      {
        bookId: "SP00005",
        quantity: 10,
        price: 200000,
      },
    ],
    totalPrice: 2570000,
    methodPay: "Thanh toán khi giao hàng (COD)",
    discountId: "",
    status: "Đã huỷ đơn",
    dateUpdate: "",
  },
];

// Hàm tách các thông tin trong địa chỉ giao hàng (địa chỉ hợp lệ)
function splitAddressToShip(address) {
  const info = address.split(",");
  return info.length === 4
    ? info[2].trim() + ", " + info[3].trim()
    : "Địa chỉ không hợp lệ";
}

// Hàm cập nhật lại dữ liệu cho bảng Đơn hàng
export function renderOrderTable() {
  // Biến chứa đối tượng bảng Đơn hàng
  const bodyInOrderTable = document.querySelector(
    ".main__data > .main__table.order > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
          <tr>
              <td>${data[i].orderId}</td>
              <td>${data[i].customerId}</td>
              <td>${data[i].dateCreate}</td>
              <td>${splitAddressToShip(data[i].addressToShip)}</td>
              <td>${vietnamMoneyFormat(data[i].totalPrice)}</td>
              <td><span ${
                data[i].status === "Đã hoàn thành"
                  ? 'class="green"'
                  : data[i].status === "Đang giao hàng"
                  ? 'class="yellow"'
                  : data[i].status === "Đang chờ xác nhận"
                  ? 'class="gray"'
                  : 'class="red"'
              }>${data[i].status}</span></td>
              <td>
                  <i id="update-button-order" class="fa-solid fa-pen-to-square"></i>
                  <i id="print-button-order" class="fa-solid fa-print"></i>
              </td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyInOrderTable.innerHTML = html;

  // Gán sự kiện cho các nút sau khi thay đổi giao diện
  const idColumnInTable = document.querySelectorAll(
    ".main__data > .main__table.order > tbody > tr > td:first-of-type"
  );
  const listButtonInTable = document.querySelectorAll(
    ".main__data > .main__table.order > tbody > tr > td:last-of-type"
  );
  listButtonInTable.forEach((buttons, row) => {
    // Các nút cần gán sự kiện trên mỗi dòng
    const updateButton = buttons.children[0];
    const printButton = buttons.children[1];
    // Id của đối tượng đã được chọn để thao tác
    const idOrderSelected = idColumnInTable.item(row);

    // Gán sự kiện hiện dialog sửa Đơn hàng
    updateButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      updateOrderData(idOrderSelected);
    });

    // Gán sự kiện hiện dialog in phiếu Đơn hàng
    printButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      printOrderTicket(idOrderSelected);
    });
  });
}
