import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { vietnamMoneyFormat } from "../others.js";
import { renderOrderDetailTable } from "./renderOrderTable.js";
import { showNotification } from "../dialogMessage.js";
import { renderOrderTable } from "./renderOrderTable.js";

// Hàm thiết lập sự kiện hiện sửa một đơn hàng
export async function updateOrderData(idOrderSelected) {
  // Truy vấn csdl để lấy ra đơn hàng được chọn
  const order = await fetchData(`api/orders/listBase.php?id=${idOrderSelected}`);

  const loginEmployee = JSON.parse(sessionStorage.getItem('user'));

  console.log(loginEmployee)
  
  let statusPayHTML = `
      <option value="" disabled>Chọn trạng thái</option>
      <option value="Đã thanh toán">Đã thanh toán</option>
      <option value="Chưa thanh toán">Chưa thanh toán</option>
  `;
  


  // // Biến chứa đối tượng là nút "sửa"
  // const updateButton = document.getElementById("update-button-order");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // updateButton.classList.add("active");

  // Tạo một dialog để sửa một đơn hàng
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("order");
  updateDialog.style.width = "87%";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <h1 class="dialog__title">Sửa đơn hàng</h1>
          <button id="close-order-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group order half">
                <label>Mã đơn hàng</label>
                <input type="text" id="update-order-id" class="text-center" readonly value="${
                  order.data[0].id
                }" />
              </div>
              <div class="dialog__form-group order half">
                <label>Ngày tạo đơn</label>
                <input type="text" id="update-order-date-create" readonly value="${
                  order.data[0].createAt
                }" />
              </div>
              <div class="dialog__form-group order half">
                <label>Mã nhân viên</label>
                <input type="text" id="update-order-employee-id" readonly class="text-center" value="${
                  order.data[0].employeeId
                    ? order.data[0].employeeId
                    : "Đang cập nhật"
                }" />
              </div>
              <div class="dialog__form-group order half">
                <label>Trạng thái</label>
                <input type="text" id="update-order-status" readonly value="${
                  order.data[0].status
                }" />
              </div>
              <div class="dialog__form-group order">
                <label>Tổng thanh toán (VNĐ)</label>
                <input type="text" id="update-order-cost" readonly value="${vietnamMoneyFormat(
                  order.data[0].total
                )}" />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group order">
                <label>Phương thức thanh toán</label>
                <input type="text" id="update-order-method-pay" readonly value="${
                  order.data[0].payName
                }" />
              </div>
              <div class="dialog__form-group order full">
                <label>Địa chỉ giao hàng</label>
                <input type="text" id="update-order-address-to-ship" readonly value="${
                  order.data[0].customerAddress
                }" />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group order half">
                <label>Mã khách hàng</label>
                <input type="text" id="update-order-customer-id" class="text-center" readonly value="${
                  order.data[0].customerId
                }" />
              </div>
              <div class="dialog__form-group order half">
                <label>Số điện thoại</label>
                <input type="text" id="update-order-customer-phone" readonly value="${
                  order.data[0].customerPhone
                }" />
              </div>
              <div class="dialog__form-group order">
                <label>Họ và tên</label>
                <input type="text" id="update-order-customer-fullname" readonly value="${
                  order.data[0].customerFullname
                }" />
              </div>
              <div class="dialog__form-group order">
                <label>Email</label>
                <input type="text" id="update-order-customer-email" readonly value="${
                  order.data[0].customerEmail
                }" />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label style="color: #000;">Chi tiết đơn hàng</label>
                <table class="dialog__table order-details">
                  <thead>
                    <tr>  
                      <th width="10%">Mã sách</th>
                      <th width="42%" class="name">Tên sách</th>
                      <th width="14%">Giá bán (VNĐ)</th>
                      <th width="10%">Số lượng</th>
                      <th width="24%" class="total">Thành tiền (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="dialog__buttons order order-buttons">
              <p style="align-self: flex-end; margin-right: auto; font-size: 20px; font-weight: 700;">
                <select id="status-pay-order">
                  ${statusPayHTML}
                <select/>
              </p>

              ${
                order.data[0].status === "Đã giao hàng" &&
                order.data[0].payStatus === "Chưa thanh toán"
                  ? "<button type='button' id='cancel-button' class='cancel-status'>Huỷ đơn</button>"
                  : ""
              }
              ${
                order.data[0].status === "Đã xác nhận"
                  ? "<button type='button' id='ship-button' class='ship-status'>Giao hàng</button>"
                  : ""
              }
              ${
                order.data[0].status === "Đang chờ xác nhận"
                  ? "<button type='button' id='confirm-button' class='confirm-status'>Xác nhận</button><button type='button' id='cancel-button' class='cancel-status'>Huỷ đơn</button>"
                  : ""
              }
              ${
                order.data[0].status == 'Đã giao hàng' && order.data[0].payStatus == 'Đã thanh toán'
                ? ''
                : "<button type='button' id='confirm-pay-button' class='confirm-status-pay'>Xác nhận thanh toán</button>"
              }
            </div>
          </form >
    `;

  // Thêm vào body
  document.body.appendChild(updateDialog);

  // Hiển thị updateDialog
  updateDialog.showModal();

  // Cập nhật chi tiết đơn hàng
  renderOrderDetailTable(order.data[0].id);

  // Cập nhật trạng thái đơn cho select
  document.getElementById('status-pay-order').value = order.data[0].payStatus;

  if (!order.data[0].status == 'Đã hủy đơn') document.getElementById('status-pay-order').style.pointerEvents = "none";

  if (order.data[0].payStatus == 'Đã thanh toán' && order.data[0].status == 'Đã giao hàng') document.getElementById('status-pay-order').style.pointerEvents = "none";

  // Gán sự kiện cho các nút để "cập nhật" đơn hàng
  // - Gọi api để cập nhật đơn hàng
  async function callApiToUpdateOrder(status) {
    // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
    const id = document.getElementById("update-order-id").value;
    const employeeId = loginEmployee['user'].id;
    const statusPay = document.getElementById('status-pay-order').value;

    // Tiến hành gọi api
    try {
      const response = await fetch("api/orders/update.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          id: id,
          status: status,
          employeeId: employeeId,
          statusPay: statusPay
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Thành công",
          message: `Cập nhật thành công`,
          type: "success",
          duration: 3000,
        });
      } else {
        toast({
          title: "Cảnh báo",
          message: `${result.message}`,
          type: "warning",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        message: `Lỗi fetch API:${error}`,
        type: "error",
        duration: 3000,
      });
    }

    updateDialog.remove();
    renderOrderTable(1);
  }
  // Nút xác thay đổi trạng thái thanh toán
  const confirmStatusPay = document.getElementById('confirm-pay-button');
  if (confirmStatusPay) {
    confirmStatusPay.addEventListener('click', async (e) => {
      e.preventDefault();

      // Thêm class 'active' thể hiện là nút được nhấn
      e.target.classList.add("active");

      // Hỏi lần nữa trước khi cập nhật
      let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không.");
      if (yes) {
        callApiToUpdateOrder(order.data[0].status);
      } else {
        // Xoá class 'active' thể hiện là nút không còn ược nhấn
        e.target.classList.remove("active");
      }
    });
  }

  // - Nút 'Giao hàng'
  const shipButton = document.getElementById("ship-button");
  if (shipButton) {
    shipButton.addEventListener("click", async (e) => {
      // Ngăn ...
      e.preventDefault();

      // Thêm class 'active' thể hiện là nút được nhấn
      e.target.classList.add("active");

      // Hỏi lần nữa trước khi cập nhật
      let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không.");
      if (yes) {
        callApiToUpdateOrder("Đã giao hàng");
      } else {
        // Xoá class 'active' thể hiện là nút không còn ược nhấn
        e.target.classList.remove("active");
      }
    });
  }
  // - Nút 'Xác nhận'
  const confirmButton = document.getElementById("confirm-button");
  if (confirmButton) {
    confirmButton.addEventListener("click", async (e) => {
      // Ngăn ...
      e.preventDefault();

      // Thêm class 'active' thể hiện là nút được nhấn
      e.target.classList.add("active");

      // Hỏi lần nữa trước khi cập nhật
      let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không.");
      if (yes) {
        callApiToUpdateOrder("Đã xác nhận");
      } else {
        // Xoá class 'active' thể hiện là nút không còn ược nhấn
        e.target.classList.remove("active");
      }
    });
  }
  // - Nút 'Huỷ đơn'
  const cancelButton = document.getElementById("cancel-button");
  if (cancelButton) {
    cancelButton.addEventListener("click", async (e) => {
      // Ngăn ...
      e.preventDefault();

      // Thêm class 'active' thể hiện là nút được nhấn
      e.target.classList.add("active");

      // Hỏi lần nữa trước khi cập nhật
      let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không.");
      if (yes) {
        callApiToUpdateOrder("Đã huỷ đơn");
      } else {
        // Xoá class 'active' thể hiện là nút không còn ược nhấn
        e.target.classList.remove("active");
      }
    });
  }

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-order-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // updateButton.classList.remove("active");
    });
}
