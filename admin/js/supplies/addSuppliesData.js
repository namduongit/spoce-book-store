import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderSuppliesTable } from "./renderSuppliesTable.js";

// Hàm thiết lập sự kiện thêm một nhà cung cấp cho bảng Nhà cung cấp
export function addSuppliesData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-supplies");

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
    addDialog.classList.add("supplies");
    addDialog.style.width = "772px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
        <h1 class="dialog__title">Thêm nhà cung cấp</h1>
        <button id="close-supplies-button" class="dialog__close">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="dialog__line"></div>
        <form method="post" class="dialog__form">
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Mã nhà cung cấp</label>
              <input type="text" id="add-supplies-id" readonly />
            </div>
            <div class="dialog__form-group">
              <label>Tên nhà cung cấp</label>
              <input type="text" id="add-supplies-name" placeholder="Nhập Tên nhà cung cấp" autofocus/>
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Số điện thoại</label>
              <input type="text" id="add-supplies-phone" placeholder="Nhập Số điện thoại" />
            </div>
            <div class="dialog__form-group">
              <label>Email</label>
              <input type="text" id="add-supplies-email" placeholder="Nhập Email"/>
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group full">
              <label>Địa chỉ</label>
              <input type="text" id="add-supplies-address" placeholder="Nhập Địa chỉ" />
              <button>Chọn địa chỉ</button>
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group">
              <label>Trạng thái</label>
              <select id="add-supplies-status">
                  <option selected value="">Chọn trạng thái</option>
                  <option  value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="SUSPENDED">SUSPENDED</option>
              </select>
            </div>
            <div class="dialog__form-group"></div>
          </div>
          <div class="dialog__buttons">
            <button id="add-supplies-button" class="add">Thêm</button>
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

    // Gán sự kiện cho nút "Thêm" dialog
    document.getElementById("add-supplies-button").addEventListener("click", async (e) => {
      e.preventDefault();
    
      const supplierName = document.getElementById("add-supplies-name").value.trim();
      const supplierPhone = document.getElementById("add-supplies-phone").value.trim();
      const supplierEmail = document.getElementById("add-supplies-email").value.trim();
      const supplierAddress = document.getElementById("add-supplies-address").value.trim();
      const supplierStatus = document.getElementById("add-supplies-status").value.trim();
    
      // Validate
      if (!supplierName) {
        toast({ title: "Cảnh báo", message: "Vui lòng nhập tên nhà cung cấp.", type: "warning", duration: 3000 });
        return;
      }
    
      if (!supplierPhone) {
        toast({ title: "Cảnh báo", message: "Vui lòng nhập số điện thoại.", type: "warning", duration: 3000 });
        return;
      } else if (!/^\d+$/.test(supplierPhone)) {
        toast({ title: "Cảnh báo", message: "Số điện thoại chỉ được chứa chữ số.", type: "warning", duration: 3000 });
        return;
      } else if (supplierPhone.length < 9 || supplierPhone.length > 12) {
        toast({ title: "Cảnh báo", message: "Số điện thoại không hợp lệ (9-12 chữ số).", type: "warning", duration: 3000 });
        return;
      }
    
      if (!supplierEmail) {
        toast({ title: "Cảnh báo", message: "Vui lòng nhập Email.", type: "warning", duration: 3000 });
        return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supplierEmail)) {
        toast({ title: "Cảnh báo", message: "Email không hợp lệ.", type: "warning", duration: 3000 });
        return;
      }
    
      if (!supplierAddress) {
        toast({ title: "Cảnh báo", message: "Vui lòng nhập địa chỉ.", type: "warning", duration: 3000 });
        return;
      }
    
      if (!supplierStatus) {
        toast({ title: "Cảnh báo", message: "Vui lòng chọn trạng thái.", type: "warning", duration: 3000 });
        return;
      }
    
      let confirm = await showNotification("Bạn có chắc muốn thêm nhà cung cấp này?");
      if (!confirm) return;
    
      // Gửi yêu cầu nếu hợp lệ
      try {
        const response = await fetch("api/supplies/create.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            supplierName: supplierName,
            supplierPhone: supplierPhone,
            supplierEmail: supplierEmail,
            supplierAddress: supplierAddress,
            supplierStatus: supplierStatus,
          }),
        });
    
        const result = await response.json();
        console.log("Server Response:", result);
    
        if (result.success) {
          toast({ title: "Thành công", message: "Thêm nhà cung cấp thành công.", type: "success", duration: 3000 });
        } else {
          toast({ title: "Cảnh báo", message: result.message || "Thêm thất bại.", type: "warning", duration: 3000 });
        }
      } catch (error) {
        console.error("Lỗi fetch API:", error);
        toast({ title: "Lỗi", message: `Không thể kết nối: ${error}`, type: "error", duration: 3000 });
      }
    
      addDialog.remove();
      addButton.classList.remove("active");
      renderSuppliesTable();
    });
    

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-supplies-button")
      .addEventListener("click", async () => {
      let confirm = await showNotification("Bạn có đồng ý thoát không?");
        if(confirm){
          // Xoá dialog
          addDialog.remove();
  
          // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
          addButton.classList.remove("active");
        }
      });
  });
}
