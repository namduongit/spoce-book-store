import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { isNotFirstItemSelected } from "../selectEvents.js";
import {
  updateInputTicketDetailTable,
  renderInputTicketTable,
} from "./renderInputTicketTable.js";

let data = [],
  status = "Đang chờ xác nhận";

// Hàm thiết lập sự kiện hiện thêm một phiếu nhập
export function addInputTicketData() {
  const userData = sessionStorage.getItem("user");

  const userObject = JSON.parse(userData);
  // Biến chứa đối tượng là nút "thêm"
  const addButton = document.getElementById("add-button-input_ticket");
  if (!addButton) return;

  //
  addButton.addEventListener("click", async (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một phiếu nhập
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("input_ticket");
    addDialog.style.width = "87%";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
          <h1 class="dialog__title">Thêm phiếu nhập</h1>
          <button id="close-input_ticket-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form class="dialog__form" autocomplete="off">
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket half">
                <label>Mã phiếu nhập</label>
                <input type="text" id="add-input_ticket-id" class="text-center" value="Chưa xác định !" readonly />
              </div>
              <div class="dialog__form-group input_ticket half">
                <label>Ngày tạo phiếu</label>
                <input type="date" id="add-input_ticket-date-create" value="${
                  new Date().toISOString().split("T")[0]
                }" class="text-center hasValidDate" readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Trạng thái</label>
                <input type="text" id="add-input_ticket-status" value="Đang chờ xác nhận" readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Tổng thanh toán (VNĐ)</label>
                <input type="text" id="input_ticket-total" value="" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket">
                <label>Nhân viên</label>
                <input type="text" id="add-input_ticket-employee" value="#${
                  userObject.user.id
                }-${userObject.user.name}" class="text-center" readonly />
              </div>
              <div class="dialog__form-group input_ticket full">
                <label>Nhà cung cấp</label>
                <select id="add-input_ticket-supplier"></select>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label style="color: #000;">Chi tiết phiếu nhập</label>
                <button id="create-input-ticket-detail"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Sách</button>
                <table class="dialog__table input_ticket_details">
                  <thead>
                    <tr>  
                      <th width="8%">Mã sách</th>
                      <th width="28%">Tên sách</th>
                      <th width="14%">Giá gốc (VNĐ)</th>
                      <th width="14%">Giá nhập (VNĐ)</th>
                      <th width="10%">Số lượng</th>
                      <th width="22%">Thành tiền (VNĐ)</th>
                      <th width="4%"></th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="dialog__buttons">
              <button type="button" id="add-input_ticket-button" class="add">Thêm</button>
            </div>
          </form >
    `;

    // Thêm vào body
    document.body.appendChild(addDialog);

    // Hiển thị addDialog
    addDialog.showModal();

    // Cập nhật các nhà cung cấp
    const supplierSelect = document.getElementById("add-input_ticket-supplier");
    if (supplierSelect) {
      supplierSelect.innerHTML = `<option value="">Chọn Nhà cung cấp</option>`;
      let suppliers = await fetchData(
        `api/suppliers/list.php?status=Hoạt%20động`
      );
      suppliers.data.forEach((supplier) => {
        supplierSelect.innerHTML += `<option value="${supplier.id}">#${
          supplier.id
        }${supplier.name ? " - " + supplier.name : ""}${
          supplier.phone ? " - " + supplier.phone : ""
        }${supplier.email ? " - " + supplier.email : ""}</option>`;
      });
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
    updateInputTicketDetailTable(-1, status, data);

    // Gán sự kiện khi thêm phiếu nhập
    document
      .getElementById("add-input_ticket-button")
      .addEventListener("click", async (e) => {
        //
        e.preventDefault();

        //
        let checkAddInputTicket = false;
        let idInputTicket = -1;
        const createAt = document.getElementById("add-input_ticket-date-create")
          .value
          ? document.getElementById("add-input_ticket-date-create").value
          : null;
        const supplierId = document.getElementById("add-input_ticket-supplier")
          .value
          ? document.getElementById("add-input_ticket-supplier").value
          : null;
        const employeeId = document.getElementById("add-input_ticket-employee")
          .value
          ? document.getElementById("add-input_ticket-employee").value
          : 1; // Mặc định
        const status = document.getElementById("add-input_ticket-status").value
          ? document.getElementById("add-input_ticket-status").value
          : null;
        const total = document.getElementById("input_ticket-total").value
          ? document.getElementById("input_ticket-total").value
          : null;
        const employee_id = employeeId.match(/#(\d+)-/)[1];
        let checkCreateDate = true,
          checkSupplierId = true;
        if (!createAt) {
          toast({
            title: "Cảnh báo",
            message: `Vui lòng chọn ngày tạo phiếu.`,
            type: "warning",
            duration: 3000,
          });
          checkCreateDate = false;
        }
        if (!supplierId) {
          toast({
            title: "Cảnh báo",
            message: `Vui lòng nhà cung cấp`,
            type: "warning",
            duration: 3000,
          });
          checkSupplierId = false;
        }

        if (checkCreateDate && checkSupplierId) {
          let yes = await showNotification(
            "Bạn có đồng ý thêm phiếu nhập này không?"
          );
          if (yes) {
            try {
              const response = await fetch("api/input_tickets/create.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  createAt: createAt,
                  supplierId: supplierId,
                  employeeId: employee_id, //đã tách id và name
                  total: total.replace(/\./g, ""),
                  status: status,
                }),
              });

              const result = await response.json();
              if (result.success) {
                idInputTicket = result.inputTicketId;
                checkAddInputTicket = true;
              } else {
                checkAddInputTicket = false;
                console.log("2");

                toast({
                  title: "Lỗi",
                  message: `Lỗi thêm phiếu nhập: ${result.message}`,
                  type: "error",
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

            // Nếu thêm thành công
            if (checkAddInputTicket && idInputTicket != -1) {
              let check = true;
              data.forEach(async (item) => {
                try {
                  const response = await fetch(
                    "api/input_ticket_details/create.php",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      body: new URLSearchParams({
                        inputTicketId: idInputTicket,
                        bookId: item.bookId,
                        price: item.price,
                        quantity: item.quantity,
                      }),
                    }
                  );

                  const result = await response.json();
                  if (result.success) {
                    check = true;
                  } else {
                    check = false;
                  }
                } catch (error) {
                  toast({
                    title: "Lỗi",
                    message: `Lỗi fetch API:${error}`,
                    type: "error",
                    duration: 3000,
                  });
                }
              });
              if (check) {
                toast({
                  title: "Thành công",
                  message: `Thêm phiếu nhập thành công.`,
                  type: "success",
                  duration: 3000,
                });
              } else {
                toast({
                  title: "Lỗi",
                  message: `Thêm phiếu nhập không thành công`,
                  type: "error",
                  duration: 3000,
                });
              }

              addDialog.remove();
              addButton.classList.remove("active");
              renderInputTicketTable(1);
            }
          }
        }
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-input_ticket-button")
      .addEventListener("click", async () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
