import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { vietnamMoneyFormat } from "../others.js";
import { isNotFirstItemSelected } from "../selectEvents.js";
import {
  updateInputTicketDetailTable,
  renderInputTicketDetailTableForCrud,
  renderInputTicketTable,
} from "./renderInputTicketTable.js";

let data = [],
  status = "";

// Hàm thiết lập sự kiện hiện thêm một phiếu nhập
export async function updateInputTicketData(idInputTicketSelected) {
  //
  const inputTicket = await fetchData(
    `api/input_tickets/list.php?id=${idInputTicketSelected}`
  );
  const inputTicketDetails = await fetchData(
    `api/input_ticket_details/list.php?inputTicketId=${idInputTicketSelected}`
  );
  data = inputTicketDetails.data;
  status = inputTicket.data[0].status;
  console.log(inputTicket);

  // // Biến chứa đối tượng là nút "thêm"
  // const updateButton = document.getElementById("update-button-input_ticket");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // updateButton.classList.add("active");

  // Tạo một dialog để thêm một phiếu nhập
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("input_ticket");
  updateDialog.style.width = "87%";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <h1 class="dialog__title">Sửa phiếu nhập</h1>
          <button id="close-input_ticket-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket half">
                <label>Mã phiếu nhập</label>
                <input type="text" id="update-input_ticket-id" class="text-center" value="${
                  inputTicket.data[0].id
                }" readonly />
              </div>
              <div class="dialog__form-group input_ticket half">
                <label>Ngày tạo phiếu</label>
                <input type="date" id="update-input_ticket-date-create" value="${
                  String(inputTicket.data[0].createAt).split(" ")[0]
                }" class="text-center hasValidDate" readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Trạng thái</label>
                <input type="text" id="update-input_ticket-status" value="${
                  inputTicket.data[0].status
                }" readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Tổng thanh toán (VNĐ)</label>
                <input type="text" id="input_ticket-total" value="${vietnamMoneyFormat(
                  inputTicket.data[0].totalPrice
                )}" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket">
                <label>Nhân viên</label>
                <input type="text" id="update-input_ticket-employee" value="#${
                  inputTicket.data[0].employeeId
                } - ${inputTicket.data[0].employeeName}" readonly />
              </div>
              <div class="dialog__form-group input_ticket full">
                <label>Nhà cung cấp</label>
                <select id="update-input_ticket-supplier"></select>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label style="color: #000;">Chi tiết phiếu nhập</label>
                ${
                  inputTicket.data[0].status === "Đang chờ xác nhận"
                    ? '<button id="create-input-ticket-detail"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Sách</button>'
                    : ""
                }
                <table class="dialog__table input_ticket_details">
                  <thead>
                    <tr>  
                    ${
                      inputTicket.data[0].status === "Đang chờ xác nhận"
                        ? '<th width="10%">Mã sách</th><th width="28%">Tên sách</th><th width="15%">Giá trần (VNĐ)</th><th width="15%">Giá nhập (VNĐ)</th><th width="10%">Số lượng</th><th width="22%">Thành tiền (VNĐ)</th><th width="4%"></th>'
                        : '<th width="8%">Mã sách</th><th width="28%">Tên sách</th><th width="14%">Giá trần (VNĐ)</th><th width="14%">Giá nhập (VNĐ)</th><th width="10%">Số lượng</th><th width="22%">Thành tiền (VNĐ)</th>'
                    }
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="dialog__buttons input_ticket">
            ${
              inputTicket.data[0].status === "Đã xác nhận"
                ? "<button id='pay-button' class='pay-status'>Thanh toán</button>"
                : ""
            }
            ${
              inputTicket.data[0].status === "Đang chờ xác nhận"
                ? "<button id='confirm-button' class='confirm-status'>Xác nhận</button><button id='cancel-button' class='cancel-status'>Huỷ phiếu</button>"
                : ""
            }
            </div>
          </form>
    `;

  // Thêm vào body
  document.body.appendChild(updateDialog);

  // Hiển thị updateDialog
  updateDialog.showModal();

  // Cập nhật các nhà cung cấp
  const supplierSelect = document.getElementById(
    "update-input_ticket-supplier"
  );
  if (inputTicket.data[0].status === "Đang chờ xác nhận") {
    if (supplierSelect) {
      supplierSelect.innerHTML = `<option value="">Chọn Nhà cung cấp</option>`;
      let suppliers = await fetchData(`api/suppliers/list.php`);
      suppliers.data.forEach((supplier) => {
        if (inputTicket.data[0].supplierId === supplier.id) {
          supplierSelect.innerHTML += `<option value="${
            supplier.id
          }" selected>#${supplier.id}${
            supplier.name ? " - " + supplier.name : ""
          }${supplier.phone ? " - " + supplier.phone : ""}${
            supplier.email ? " - " + supplier.email : ""
          }</option>`;
        } else {
          supplierSelect.innerHTML += `<option value="${supplier.id}">#${
            supplier.id
          }${supplier.name ? " - " + supplier.name : ""}${
            supplier.phone ? " - " + supplier.phone : ""
          }${supplier.email ? " - " + supplier.email : ""}</option>`;
        }
      });
    }
  } else {
    supplierSelect.setAttribute("disabled", "");
    supplierSelect.innerHTML = `<option value="${inputTicket.data[0].supplierId}">#${inputTicket.data[0].supplierId} - ${inputTicket.data[0].supplierName}</option>`;
  }

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });
  // - Gán sự kiện hiển thị dialog để thêm 1 chi tiết phiếu nhập
  updateInputTicketDetailTable(inputTicket.data[0].id, status, data);
  // - Cập nhật chi tiết phiếu nhập
  renderInputTicketDetailTableForCrud(data, status);

  // Gán sự kiện cho các nút để "cập nhật" phiếu nhập
  // - Gọi api để cập nhật phiếu nhập
  async function callApiToUpdateInputTicket(status) {
    // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
    // const inputTicketId = document.getElementById(
    //   "update-input_ticket-id"
    // ).value;
    // const employeeId = document.getElementById(
    //   "update-input_ticket-employee-id"
    // ).value
    //   ? document.getElementById("update-input_ticket-employee-id").value
    //   : null;
    const supplierId = document.getElementById("update-input_ticket-supplier")
      .value
      ? document.getElementById("update-input_ticket-supplier").value
      : null;
    const total = document.getElementById("input_ticket-total").value
      ? document
          .getElementById("input_ticket-total")
          .value.replace(/[^0-9]/g, "")
      : 0;

    // Tiến hành gọi api
    // - Cập nhật chi tiết phiếu
    if (status !== "Đã thanh toán") {
      // - Xoá tất cả chi tiết phiếu hiện có
      try {
        await fetch("api/input_ticket_details/delete.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            inputTicketId: Number(idInputTicketSelected),
          }),
        });
      } catch (error) {
        toast({
          title: "Lỗi",
          message: `Lỗi fetch API:${error}`,
          type: "error",
          duration: 3000,
        });
      }

      // - Cập nhật lại các chi tiết phiếu mới
      try {
        await Promise.all(
          data.map(async (item) => {
            const response = await fetch(
              "api/input_ticket_details/create.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  inputTicketId: Number(idInputTicketSelected),
                  bookId: Number(item.bookId),
                  price: Number(item.price),
                  quantity: Number(item.quantity),
                }),
              }
            );

            // Kiểm tra phản hồi
            const result = await response.text(); // Hoặc response.json() nếu API trả về JSON
            if (!response.ok) {
              throw new Error(`Lỗi khi thêm chi tiết: ${result}`);
            }

            console.log("Phản hồi từ create:", result);
          })
        );
      } catch (error) {
        toast({
          title: "Lỗi",
          message: `Lỗi khi thêm chi tiết phiếu: ${error}`,
          type: "error",
          duration: 3000,
        });
      }
    }
    // - Cập nhật phiếu nhập
    try {
      const response = await fetch("api/input_tickets/update.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          id: Number(idInputTicketSelected),
          supplierId: Number(supplierId),
          total: Number(total),
          status: status,
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
    renderInputTicketTable(1);
  }
  // - Nút 'Thanh toán'
  const payButton = document.getElementById("pay-button");
  if (payButton) {
    payButton.addEventListener("click", async (e) => {
      // Ngăn ...
      e.preventDefault();

      // Thêm class 'active' thể hiện là nút được nhấn
      e.target.classList.add("active");

      // Hỏi lần nữa trước khi cập nhật
      let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không.");
      if (yes) {
        callApiToUpdateInputTicket("Đã thanh toán");
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
        callApiToUpdateInputTicket("Đã xác nhận");
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
        callApiToUpdateInputTicket("Đã huỷ phiếu");
      } else {
        // Xoá class 'active' thể hiện là nút không còn ược nhấn
        e.target.classList.remove("active");
      }
    });
  }

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-input_ticket-button")
    .addEventListener("click", async (e) => {
      //
      e.preventDefault();

      // Xoá dialog
      updateDialog.remove();

      // // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // updateButton.classList.remove("active");
    });
}
