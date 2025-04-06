import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";


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
  document
    .getElementById("update-supplies-button")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const supplierId = document.getElementById("update-supplies-id").value.trim();
      const suppliername = document.getElementById("update-supplies-name").value.trim();
      const supplierphone = document.getElementById("update-supplies-phone").value.trim();
      const supplieremail = document.getElementById("update-supplies-email").value.trim();
      const supplieraddress = document.getElementById("update-supplies-address").value.trim();
      const supplierStatus = document.getElementById("update-supplies-status").value.trim();
     


      console.log(supplierId, suppliername, supplierphone, supplieremail, supplieraddress, supplierStatus);
      if(suppliername === '' || suppliername == '' || supplierphone == '' || supplieremail == '' || supplieraddress == ''|| supplierStatus == '' ){
        alert("Hãy nhập đầy đủ thông tin");
      }else{

        try {
          const response = await fetch("api/supplies/update.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              supplierId: supplierId,
              supplierName: suppliername,
              supplierPhone: supplierphone,
              supplierEmail: supplieremail,
              supplierAddress: supplieraddress,
              supplierStatus: supplierStatus,
            }),
          });
  
          const result = await response.json();
          console.log("Server Response:", result);
  
          if (result.success) {
            alert("Cập nhật nhà cung cấp thành công!");
          } else {
            alert("Lỗi khi cập nhật trạng thái: " + (result.message || "Không rõ nguyên nhân"));
          }
        } catch (error) {
          console.error("Lỗi fetch API:", error);
          alert("Không thể kết nối đến server!");
        }
        updateDialog.remove();
      }
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-supplies-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
