import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderSupplierTable } from "./renderSupplierTable.js";
import { showAddressSelectDialog } from "../updateAddressSelect.js";

// Hàm thiết lập sự kiện thêm một nhà cung cấp cho bảng Nhà cung cấp
export function addSupplierData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-supplier");
  
  if (!addButton) return;

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một nhà cung cấp
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("supplier");
    addDialog.style.width = "58%";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
        <h1 class="dialog__title">Thêm nhà cung cấp</h1>
        <button id="close-supplier-button" class="dialog__close">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="dialog__line"></div>
        <form class="dialog__form" autocomplete="off">
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Mã nhà cung cấp<span>*</span></label>
              <input type="text" id="add-supplier-id" class="text-center" value="Được xác định sau khi xác nhận thêm !" readonly />
            </div>
            <div class="dialog__form-group">
              <label>Tên nhà cung cấp<span>*</span></label>
              <input type="text" id="add-supplier-name" placeholder="Nhập Tên nhà cung cấp" autofocus/>
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Số điện thoại<span>*</span></label>
              <input type="text" id="add-supplier-phone" placeholder="Nhập Số điện thoại" />
            </div>
            <div class="dialog__form-group">
              <label>Email<span>*</span></label>
              <input type="text" id="add-supplier-email" placeholder="Nhập Email"/>
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group full">
              <label>Địa chỉ<span>*</span></label>
              <input type="text" id="add-supplier-address" placeholder="Nhập Địa chỉ" />
              <button id="create-address">Chọn địa chỉ</button>
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Trạng thái<span>*</span></label>
              <select id="add-supplier-status">
                  <option selected value="">Chọn trạng thái</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Tạm dừng">Tạm dừng</option>
              </select>
            </div>
            <div class="dialog__form-group"></div>
          </div>
          <div class="dialog__buttons">
            <button id="add-supplier-button" class="add">Thêm</button>
          </div>
        </form>
      `;

    // Thêm vào body
    document.body.appendChild(addDialog);

    // Hiển thị addDialog
    addDialog.showModal();

    // Sự kiện cho các thành phần trong dialog
    // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
    const selectElement = document.querySelectorAll(
      ".dialog__form-group > select"
    );
    selectElement.forEach((select) => {
      isNotFirstItemSelected(select);
    });
    // - Sự kiện hiển thị nút dialog tạo địa chỉ hợp lệ
    showAddressSelectDialog("add-supplier-address", "create-address");

    // Gán sự kiện cho nút "Thêm" dialog
    document
      .getElementById("add-supplier-button")
      .addEventListener("click", async (e) => {
        e.preventDefault();

        const name = document.getElementById("add-supplier-name").value
          ? document.getElementById("add-supplier-name").value
          : null;
        const phone = document.getElementById("add-supplier-phone").value
          ? document.getElementById("add-supplier-phone").value
          : null;
        const email = document.getElementById("add-supplier-email").value
          ? document.getElementById("add-supplier-email").value
          : null;
        const address = document.getElementById("add-supplier-address").value
          ? document.getElementById("add-supplier-address").value
          : null;
        const status = document.getElementById("add-supplier-status").value
          ? document.getElementById("add-supplier-status").value
          : null;

        // Validate
        let checkName = true,
          checkPhone = true,
          checkEmail = true,
          checkAddress = true,
          checkStatus = true;
        if (!name) {
          toast({
            title: "Cảnh báo",
            message: "Vui lòng nhập tên nhà cung cấp.",
            type: "warning",
            duration: 3000,
          });
          checkName = false;
        }
        if (!phone) {
          toast({
            title: "Cảnh báo",
            message: "Vui lòng nhập số điện thoại.",
            type: "warning",
            duration: 3000,
          });
          checkPhone = false;
        } else if (!/^\d+$/.test(phone)) {
          toast({
            title: "Cảnh báo",
            message: "Số điện thoại chỉ được chứa chữ số.",
            type: "warning",
            duration: 3000,
          });
          checkPhone = false;
        } else if (phone.length < 9 || phone.length > 12) {
          toast({
            title: "Cảnh báo",
            message: "Số điện thoại không hợp lệ (9-12 chữ số).",
            type: "warning",
            duration: 3000,
          });
          checkPhone = false;
        }
        if (!email) {
          toast({
            title: "Cảnh báo",
            message: "Vui lòng nhập Email.",
            type: "warning",
            duration: 3000,
          });
          checkEmail = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast({
            title: "Cảnh báo",
            message: "Email không hợp lệ.",
            type: "warning",
            duration: 3000,
          });
          checkEmail = false;
        }
        if (!address) {
          toast({
            title: "Cảnh báo",
            message: "Vui lòng nhập địa chỉ.",
            type: "warning",
            duration: 3000,
          });
          checkAddress = false;
        }
        if (!status) {
          toast({
            title: "Cảnh báo",
            message: "Vui lòng chọn trạng thái.",
            type: "warning",
            duration: 3000,
          });
          checkStatus = false;
        }
        if (
          checkName &&
          checkPhone &&
          checkEmail &&
          checkAddress &&
          checkStatus
        ) {
          let confirm = await showNotification(
            "Bạn có chắc muốn thêm nhà cung cấp này?"
          );
          if (confirm) {
            try {
              const response = await fetch("api/suppliers/create.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  name: name,
                  phone: phone,
                  email: email,
                  address: address,
                  status: status,
                }),
              });

              const result = await response.json();
              if (result.success) {
                toast({
                  title: "Thành công",
                  message: "Thêm nhà cung cấp thành công.",
                  type: "success",
                  duration: 3000,
                });
              } else {
                toast({
                  title: "Cảnh báo",
                  message: result.message || "Thêm thất bại.",
                  type: "warning",
                  duration: 3000,
                });
              }
            } catch (error) {
              toast({
                title: "Lỗi",
                message: `Không thể kết nối: ${error}`,
                type: "error",
                duration: 3000,
              });
            }

            addButton.classList.remove("active");
            addDialog.remove();
            renderSupplierTable(1);
          }
        }
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-supplier-button")
      .addEventListener("click", async () => {
        let confirm = await showNotification("Bạn có đồng ý thoát không?");
        if (confirm) {
          // Xoá dialog
          addDialog.remove();

          // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
          addButton.classList.remove("active");
        }
      });
  });
}
