import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { vietnamMoneyFormat } from "../others.js";
import { showNotification } from "../dialogMessage.js";

//
async function renderOrderTableForDashboard(customerId) {
  // Kiểm tra nếu có đang thống kê theo khoảng ngày
  let dateStart = document
    .getElementById("date-start-inp-order_dashboard")
    .value.trim();
  let dateEnd = document
    .getElementById("date-end-inp-order_dashboard")
    .value.trim();

  // Gọi api để truy vấn dữ liệu
  const orders = await fetchData(
    `api/orders/listBase.php?customerId=${customerId}&createStart=${dateStart}&createEnd=${dateEnd}`
  );

  // Biến chứa đối tượng bảng Chi tiết đơn hàng
  const bodyInOrderTable = document.querySelector(
    "table.orders-dashboard > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let totalBuy = 0,
    totalCancel = 0;
  let html = ``;
  if (orders.data) {
    for (let i = 0; i < orders.data.length; i++) {
      html += `
          <tr class=${
            orders.data[i].status === "Đã giao hàng" &&
            orders.data[i].payStatus === "Đã thanh toán"
              ? "green"
              : orders.data[i].status === "Đã hủy đơn" &&
                orders.data[i].payStatus === "Chưa thanh toán"
              ? "red"
              : ""
          }>
              <td>${orders.data[i].id}</td>
              <td>${orders.data[i].createAt}</td>
              <td>${vietnamMoneyFormat(orders.data[i].total)}</td>
              <td>${orders.data[i].status}</td>
              <td>${orders.data[i].payStatus}</td>
              <td><a href="/api/orders/listBase.php?id=${
                orders.data[i].id
              }" target="_blank" ><i class="fa-solid fa-link"></i></a></td>
          </tr>
      `;

      if (
        orders.data[i].status == "Đã giao hàng" &&
        orders.data[i].payStatus == "Đã thanh toán"
      ) {
        totalBuy += orders.data[i].total;
        console.log(orders.data[i].total);
      }
      if (
        orders.data[i].status == "Đã hủy đơn" &&
        orders.data[i].payStatus == "Chưa thanh toán"
      ) {
        totalCancel += orders.data[i].total;
      }
    }
  }

  // Cập nhật lại giao diện
  bodyInOrderTable.innerHTML = html;

  document.getElementById(
    "total-order-dashboard"
  ).innerHTML = `${vietnamMoneyFormat(
    totalBuy
  )}<u>đ</u> (Tổng tiền mua) - ${vietnamMoneyFormat(
    totalCancel
  )}<u>đ</u> (Tổng tiền huỷ)`;
}

// Hàm thiết lập sự kiện hiện chi tiết một thống kê đơn hàng
export async function detailOrderDashboardData(customerIdSelected) {
  // Truy vấn csdl để lấy ra thống kê đơn hàng được chọn
  const user = await fetchData(
    `api/account/detail_account.php?id=${customerIdSelected}`
  );

  console.log(user);

  // // Biến chứa đối tượng là nút "sửa"
  // const detailButton = document.getElementById("detail-button-order");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // detailButton.classList.add("active");

  // Tạo một dialog để sửa một thống kê đơn hàng
  const detailDialog = document.createElement("dialog");
  // - Định dạng dialog
  detailDialog.classList.add("dialog");
  detailDialog.classList.add("order");
  detailDialog.style.width = "87%";
  // - Ghi nội dung dialog
  detailDialog.innerHTML = `
          <h1 class="dialog__title">Chi tiết thống kê đơn hàng</h1>
          <button id="close-order-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group order half">
                <label>Mã khách hàng</label>
                <input type="text" id="detail-order-customer-id" class="text-center" readonly value="${user.data.maNguoiDung}" />
              </div>
              <div class="dialog__form-group order half">
                <label>Số điện thoại</label>
                <input type="text" id="detail-order-customer-phone" readonly value="${user.data.soDT}" />
              </div>
              <div class="dialog__form-group order">
                <label>Họ và tên</label>
                <input type="text" id="detail-order-customer-fullname" readonly value="${user.data.hoVaTen}" />
              </div>
              <div class="dialog__form-group order">
                <label>Email</label>
                <input type="text" id="detail-order-customer-email" readonly value="${user.data.email}" />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label style="color: #000;">Chi tiết thống kê đơn hàng</label>
                <table class="dialog__table orders-dashboard">
                  <thead>
                    <tr>  
                      <th width="10%">Mã đơn hàng</th>
                      <th width="16%">Ngày tạo đơn</th>
                      <th width="24%">Tổng thanh toán (VNĐ)</th>
                      <th width="20%">Trạng thái</th>
                      <th width="20%">Thanh toán</th>
                      <th width="10%"></th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="dialog__row">
              <p style="margin-left: auto; font-weight: 700">Tổng: <span id="total-order-dashboard" style="font-weight: 400; font-style: italic">0<u>đ</u> (Không đồng)</span></p>
            </div>
          </form >
    `;

  // Thêm vào body
  document.body.appendChild(detailDialog);

  // Hiển thị detailDialog
  detailDialog.showModal();

  // Cập nhật chi tiết thống kê đơn hàng
  renderOrderTableForDashboard(user.data.maNguoiDung);

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-order-button")
    .addEventListener("click", () => {
      // Xoá dialog
      detailDialog.remove();

      // // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // detailButton.classList.remove("active");
    });
}
