import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderSupplierTable } from "./renderSupplierTable.js";
import { showAddressSelectDialog } from "../updateAddressSelect.js";

// Hàm thiết lập sự kiện Sửa một nhà cung cấp cho bảng
export async function updateSupplierData(idSupplierSelected) {
  // Gọi api để lấy được thông tin nhà cung cấp được nhấn
  let supplier = await fetchData(
    `api/suppliers/detail.php?id=${idSupplierSelected}`
  );

  // // Biến chứa đối tượng là nút "Sửa"
  // const updateButton = document.getElementById("update-button-supplier");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // updateButton.classList.add("active");

  // Tạo một dialog để sửa một nhà cung cấp
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("supplier");
  // updateDialog.style.width = "58%";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <div id="toast"></div>
            <h1 class="dialog__title">Sửa nhà cung cấp</h1>
            <button id="close-supplier-button" class="dialog__close">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <form method="post" class="dialog__form">
              <div class="dialog__row">
                  <div class="dialog__form-group">
                      <label>Mã nhà cung cấp</label>
                      <input type="text" id="update-supplier-id" value="${supplier.data.id}"  readonly />
                  </div>
                  <div class="dialog__form-group">
                      <label>Tên nhà cung cấp<span>*</span></label>
                      <input type="text" id="update-supplier-name" placeholder="Nhập Tên nhà cung cấp" value="${supplier.data.name}" autofocus/>
                  </div>
              </div>
              <div class="dialog__row">
                  <div class="dialog__form-group">
                      <label>Số điện thoại<span>*</span></label>
                      <input type="text" id="update-supplier-phone" placeholder="Nhập Số điện thoại" value="${supplier.data.phone}" />
                  </div>
                  <div class="dialog__form-group">
                      <label>Email<span>*</span></label>
                      <input type="text" id="update-supplier-email" placeholder="Nhập Email" value="${supplier.data.email}"/>
                  </div>
              </div>
              <div class="dialog__row">
                  <div class="dialog__form-group full">
                      <label>Địa chỉ<span>*</span></label>
                      <input type="text" id="update-supplier-address" placeholder="Nhập Địa chỉ" value="${supplier.data.address}" />
                      <button id="create-address">Chọn địa chỉ</button>
                  </div>
              </div>
              <div class="dialog__row">
                  <div class="dialog__form-group">
                      <label>Trạng thái</label>
                      <select id="update-supplier-status" disabled>
                        <option selected value="${supplier.data.status}">${supplier.data.status}</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                      </select>
                  </div>
                  <div class="dialog__form-group"></div>
              </div>
              <div class="dialog__buttons">
                <button id="update-supplier-button" class="update">Sửa</button>
              </div>
            </form>
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
  showAddressSelectDialog("update-supplier-address", "create-address");

  // Gán sự kiện cho nút "Sửa" dialog
  document
    .getElementById("update-supplier-button")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      // Lấy dữ liệu từ form
      const id = document.getElementById("update-supplier-id").value;
      const name = document.getElementById("update-supplier-name").value
        ? document.getElementById("update-supplier-name").value
        : null;
      const phone = document.getElementById("update-supplier-phone").value
        ? document.getElementById("update-supplier-phone").value
        : null;
      const email = document.getElementById("update-supplier-email").value
        ? document.getElementById("update-supplier-email").value
        : null;
      const address = document.getElementById("update-supplier-address").value
        ? document.getElementById("update-supplier-address").value
        : null;

      // Validate
      let checkName = true,
        checkPhone = true,
        checkEmail = true,
        checkAddress = true;
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
      if (checkName && checkPhone && checkEmail && checkAddress) {
        let yes = await showNotification(
          "Bạn có đồng ý lưu sửa nhà cung cấp này không?"
        );
        if (yes) {
          // Nếu mọi thứ hợp lệ, tiếp tục gửi request
          try {
            const response = await fetch("api/suppliers/update.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                id: id,
                name: name,
                phone: phone,
                email: email,
                address: address,
              }),
            });

            const result = await response.json();
            if (result.success) {
              toast({
                title: "Thành công",
                message: `Sửa nhà cung cấp thành công`,
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

          // updateButton.classList.remove("active");
          updateDialog.remove();
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
        updateDialog.remove();

        // // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        // updateButton.classList.remove("active");
      }
    });
}
