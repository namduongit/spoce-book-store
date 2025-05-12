import { fetchData } from "../../../public/js/book/getDataBook.js";
import { vietnamMoneyFormat } from "../others.js";
import { updateOrderData } from "./updateOrderData.js";
import { printOrderTicket } from "./printOrderTicket.js";
import { filterOrder } from "./filterOrderData.js";

const data = JSON.parse(sessionStorage.getItem('dataRole'));

var infoOrder = data[5] && data[5].includes(2) ? '' : 'none__item';
var editOrder = data[5] && data[5].includes(4) ? '' : 'none__item';
var lockOrder = data[5] && data[5].includes(5) ? '' : 'none__item';

// Hàm tách địa chỉ giao thành còn Quận huyện và Tỉnh thành
function splitAddressToShip(address) {
  const addressArray = address.split(" / ");
  const houseNumberAndStreetName = addressArray[3]
    ? addressArray[3].trim()
    : "";
  const ward = addressArray[2] ? addressArray[2].trim() : "";
  const district = addressArray[1] ? addressArray[1].trim() : "";
  const province = addressArray[0] ? addressArray[0].trim() : "";

  if (district && province) return district + ", " + province;
  return "Địa chỉ không hợp lệ";
}

// Hàm cập nhật lại dữ liệu cho chi tiết đơn hàng
export async function renderOrderDetailTable(orderIdSelected) {
  const orderDetails = await fetchData(
    `api/order_details/list.php?orderId=${orderIdSelected}`
  );

  // Biến chứa đối tượng bảng Chi tiết đơn hàng
  const bodyInOrderTable = document.querySelector(
    "table.order-details > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  if (orderDetails.data) {
    for (let i = 0; i < orderDetails.data.length; i++) {
      html += `
          <tr>
              <td>${orderDetails.data[i].bookId}</td>
              <td class="left">${orderDetails.data[i].bookName}</td>
              <td>${vietnamMoneyFormat(orderDetails.data[i].price / orderDetails.data[i].quantity)}</td>
              <td>${orderDetails.data[i].quantity}</td>
              <td class="right">${vietnamMoneyFormat(
                orderDetails.data[i].price
              )}</td>
          </tr>
      `;
    }
  }

  // Cập nhật lại giao diện
  bodyInOrderTable.innerHTML = html;
}

// Hàm cập nhật lại dữ liệu cho bảng Đơn hàng
export async function renderOrderTable(currentPage) {
  // Lấy dữ liệu từ API
  const data = (await filterOrder(currentPage)) || [];

  // Biến chứa đối tượng bảng Đơn hàng
  const bodyInOrderTable = document.querySelector(
    ".main__data > .main__table.order > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
      <tr>
        <td>${data[i].id}</td>
        <td>${data[i].createAt}</td>
        <td>${splitAddressToShip(data[i].customerAddress)}</td>
        <td>${vietnamMoneyFormat(data[i].total)}</td>
        <td><span ${
          data[i].status === "Đã giao hàng"
            ? 'class="purple"'
            : data[i].status === "Đã xác nhận"
            ? 'class="green"'
            : data[i].status === "Đang chờ xác nhận"
            ? 'class="gray"'
            : 'class="red"'
        }>${data[i].status}</span></td>
        <td>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-print"></i>
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
    bodyInOrderTable.innerHTML = html;
  } else {
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
      const idOrderSelected = idColumnInTable.item(row).textContent;

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
}
