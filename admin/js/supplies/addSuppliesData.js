import { isNotFirstItemSelected } from "../selectEvents.js";

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
    document
      .getElementById("add-supplies-button")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const supplierName = document.getElementById("add-supplies-name").value.trim();
        const supplierPhone = document.getElementById("add-supplies-phone").value.trim();
        const supplierEmail = document.getElementById("add-supplies-email").value.trim();
        const supplierAddress = document.getElementById("add-supplies-address").value.trim();
        const supplierStatus = document.getElementById("add-supplies-status").value.trim();

          // console.log(suppliername, supplierphone, supplieremail, supplieraddress, supplierstatus);
          if(supplierName === '' || supplierName == '' || supplierPhone == '' || supplierEmail == '' || supplierAddress == ''|| supplierStatus == '' ){
          alert("Hãy nhập tên đầy đủ");
        }else{
  
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
              alert("thêm nhà cung cấp thành công!");
            } else {
              alert("Lỗi khi cập nhật trạng thái: " + (result.message || "Không rõ nguyên nhân"));
            }
          } catch (error) {
            console.error("Lỗi fetch API:", error);
            alert("Không thể kết nối đến server!");
          }
          addDialog.remove();
        }
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-supplies-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
