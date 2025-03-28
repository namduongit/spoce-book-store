import { vietnamMoneyFormat } from "../others.js";
import { updateOrderData } from "./updateOrderData.js";
import { printOrderTicket } from "./printOrderTicket.js";

// Hàm tách các thông tin trong địa chỉ giao hàng (địa chỉ hợp lệ)
function splitAddressToShip(address) {
  if (!address) return "Không có địa chỉ";
  const info = address.split(",");
  return info.length === 4 ? info[2].trim() + ", " + info[3].trim() : address;
}

// Hàm lấy dữ liệu đơn hàng từ API
async function fetchOrders() {
  try {
    // Sử dụng đường dẫn tuyệt đối từ thư mục gốc
    const response = await fetch("/BookStore/api/orders/get_orders.php");

    // Kiểm tra response status
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Kiểm tra content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Response không phải là JSON!");
    }

    const result = await response.json();

    if (result.success) {
      console.log("Danh sách đơn hàng:", result.data);
      return result.data;
    } else {
      console.error("Lỗi khi lấy dữ liệu:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return [];
  }
}

// Hàm cập nhật lại dữ liệu cho bảng Đơn hàng
export async function renderOrderTable() {
  try {
    // Lấy dữ liệu từ API
    const orders = await fetchOrders();

    // Biến chứa đối tượng bảng Đơn hàng
    const bodyInOrderTable = document.querySelector(
      ".main__data > .main__table.order > tbody"
    );

    if (!bodyInOrderTable) {
      console.error("Không tìm thấy bảng đơn hàng trong DOM");
      return;
    }

    // Chuyển đổi dữ liệu thành các thẻ html
    let html = ``;
    if (!orders || orders.length === 0) {
      html =
        '<tr><td colspan="9" class="text-center">Không có đơn hàng nào</td></tr>';
    } else {
      orders.forEach((order) => {
        html += `
          <tr>
            <td>${order.maDonHang}</td>
            <td>${order.maKhachHang}</td>
            <td>${order.tenKhachHang || ""}</td>
            <td>${order.soDTKhachHang || ""}</td>
            <td>${splitAddressToShip(order.diaChiGiao)}</td>
            <td>${vietnamMoneyFormat(order.tongTienThu)}</td>
            <td><span ${
              order.trangThai === "Đã giao"
                ? 'class="purple"'
                : order.trangThai === "Đã xác nhận"
                ? 'class="green"'
                : order.trangThai === "Chờ xác nhận"
                ? 'class="gray"'
                : 'class="red"'
            }>${order.trangThai}</span></td>
            <td>${order.ngayTaoDon}</td>
            <td>
              <i id="update-button-order" class="fa-solid fa-pen-to-square"></i>
              <i id="print-button-order" class="fa-solid fa-print"></i>
            </td>
          </tr>
        `;
      });
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
  } catch (error) {
    console.error("Lỗi khi render bảng đơn hàng:", error);
  }
}
