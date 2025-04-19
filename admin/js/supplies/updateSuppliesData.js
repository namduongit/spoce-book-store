import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderSuppliesTable } from "./renderSuppliesTable.js";

// Hàm thiết lập sự kiện Sửa một nhà cung cấp cho bảng
export async function updateSuppliesData(idSuppliesSelected) {
  // Phải truy vấn từ CSDL thông qua idSuppliesSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
  const supplier = await fetchData(`api/supplies/get.php?supplyId=${idSuppliesSelected}`);

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-supplies");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một nhà cung cấp
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("supplies");
  updateDialog.style.width = "772px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <div id="toast"></div>--
            <h1 class="dialog__title">Sửa nhà cung cấp</h1>
            <button id="close-supplies-button" class="dialog__close">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <form method="post" class="dialog__form">
              <div class="dialog__row">
                  <div class="dialog__form-group">
                      <label>Mã nhà cung cấp</label>
                      <input type="text" id="update-supplies-id" value="${supplier[0].id}"  readonly />
                  </div>
                  <div class="dialog__form-group">
                      <label>Tên nhà cung cấp</label>
                      <input type="text" id="update-supplies-name" placeholder="Nhập Tên nhà cung cấp" value="${supplier[0].name}" autofocus/>
                  </div>
              </div>
              <div class="dialog__row">
                  <div class="dialog__form-group">
                      <label>Số điện thoại</label>
                      <input type="text" id="update-supplies-phone" placeholder="Nhập Số điện thoại" value="${supplier[0].phone}" />
                  </div>
                  <div class="dialog__form-group">
                      <label>Email</label>
                      <input type="text" id="update-supplies-email" placeholder="Nhập Email" value="${supplier[0].email}"/>
                  </div>
              </div>
              <div class="dialog__row">
                  <div class="dialog__form-group full">
                      <label>Địa chỉ</label>
                      <input type="text" id="update-supplies-address" placeholder="Nhập Địa chỉ" value="${supplier[0].address}" />
                      <button>Chọn địa chỉ</button>
                  </div>
              </div>
              <div class="dialog__row">
                  <div class="dialog__form-group">
                      <label>Trạng thái</label>
                      <select id="update-supplies-status" disabled>
                        <option selected value="${supplier[0].status}">${supplier[0].status}</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                      </select>
                  </div>
                  <div class="dialog__form-group"></div>
              </div>
              <div class="dialog__buttons">
                <button id="update-supplies-button" class="update">Sửa</button>
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

  // Gán sự kiện cho nút "Sửa" dialog
  document.getElementById("update-supplies-button").addEventListener("click", async (e) => {
    e.preventDefault();
  
    // Lấy dữ liệu từ form
    const supplierId = document.getElementById("update-supplies-id").value.trim();
    const supplierName = document.getElementById("update-supplies-name").value.trim();
    const supplierPhone = document.getElementById("update-supplies-phone").value.trim();
    const supplierEmail = document.getElementById("update-supplies-email").value.trim();
    const supplierAddress = document.getElementById("update-supplies-address").value.trim();
    const supplierStatus = document.getElementById("update-supplies-status").value.trim();
  
    // Kiểm tra đầu vào
    if (!supplierName) {
      toast({title :"Cảnh báo", message :`Vui lòng nhập tên nhà cung cấp.`, type : "warning" , duration : 3000});
      
      return;
    }
  
    if (!supplierPhone) {
      toast({title :"Cảnh báo", message :`Vui lòng nhập số điện thoại.`, type : "warning" , duration : 3000});

      return;
    } else if (!/^\d+$/.test(supplierPhone)) {
      toast({title :"Cảnh báo", message :`Số điện thoại chỉ được chứa chữ số.`, type : "warning" , duration : 3000});
      return;
    } else if (supplierPhone.length < 9 || supplierPhone.length > 12) {
      toast({title :"Cảnh báo", message :`Số điện thoại không hợp lệ (phải từ 9 đến 12 chữ số).`, type : "warning" , duration : 3000});
      return;
    }
    if (!supplierEmail) {
      toast({title :"Cảnh báo", message :`Vui lòng nhập Email.`, type : "warning" , duration : 3000});
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supplierEmail)) {
      toast({title :"Cảnh báo", message :`Email không hợp lệ.`, type : "warning" , duration : 3000});
      return;
    }
  
    if (!supplierAddress) {
      toast({title :"Cảnh báo", message :`Vui lòng nhập địa chỉ.`, type : "warning" , duration : 3000});
      return;
    }
  
    if (!supplierStatus) {
      toast({title :"Cảnh báo", message :`Vui lòng chọn trạng thái.`, type : "warning" , duration : 3000});
      return;
    }
    let yes = await showNotification("Bạn có đồng ý lưu thêm nhà cung cấp này không?");
    if(yes){

      // Nếu mọi thứ hợp lệ, tiếp tục gửi request
      try {
        const response = await fetch("api/supplies/update.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            supplierId: supplierId,
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
          // alert("Cập nhật nhà cung cấp thành công!");
          toast({title :"Thành công", message :`Thêm nhà cung cấp thành công`, type : "success" , duration : 3000});
        } else {
          // alert("Lỗi khi cập nhật trạng thái: " + (result.message || "Không rõ nguyên nhân"));
          toast({title :"Cảnh báo", message :`${result.message}`, type : "warning" , duration : 3000});

        }
      } catch (error) {
        console.error("Lỗi fetch API:", error);
        // alert("Không thể kết nối đến server!");
        toast({title :"Lỗi", message :`Lỗi fetch API:${error}`, type : "error" , duration : 3000});

      }
    
      updateDialog.remove();
      updateButton.classList.remove("active");
      renderSuppliesTable();
    }
  
  });
  
  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-supplies-button")
    .addEventListener("click", async () => {
      let confirm = await showNotification("Bạn có đồng ý thoát không?");
      if(confirm){
        // Xoá dialog
        updateDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        updateButton.classList.remove("active");
      }
    });
}
