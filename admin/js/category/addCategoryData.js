import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Thêm một thể loại cho bảng
export function addCategoryData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-category");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một thể loại
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("category");
    addDialog.style.width = "398px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
            <h1 class="dialog__title">Thêm thể loại</h1>
            <button id="close-type-button" class="dialog__close">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <form method="post" class="dialog__form">
              <div class="dialog__row">
                <div class="dialog__form-group full">
                  <label>Mã thể loại</label>
                  <input type="text" id="add-category-id" readonly />
                </div>
              </div>
              <div class="dialog__row">
                <div class="dialog__form-group full">
                  <label>Tên thể loại</label>
                  <input type="text" id="add-category-name" placeholder="Nhập Tên thể loại" autofocus/>
                </div>
              </div>
              <div class="dialog__row">
                <div class="dialog__form-group full">
                  <label>Trạng thái</label>
                  <select id="add-category-status">
                    <option selected value="">Chọn trạng thái</option>
                    <option  value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>
              <div class="dialog__buttons">
                <button id="add-category-button" class="add">Thêm</button>
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

    // Gán sự kiện cho nút "thêm" dialog
    document
      .getElementById("add-category-button")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const categoryName = document.getElementById("add-category-name").value;
        const categoryStatus = document.getElementById("add-category-status").value;

          console.log(categoryName, categoryStatus);
        if(categoryName === ''){
          alert("Hãy nhập tên đầy đủ");
        }else{
  
          try {
            const response = await fetch("api/categories/create.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                categoryName: categoryName,
                categoryStatus: categoryStatus,
              }),
            });
    
            const result = await response.json();
            console.log("Server Response:", result);
    
            if (result.success) {
              alert("thêm thể loại thành công!");
            } else {
              alert("Lỗi khi cập nhật trạng thái: " + (result.message || "Không rõ nguyên nhân"));
            }
          } catch (error) {
            console.error("Lỗi fetch API:", error);
            alert("Không thể kết nối đến server!");
          }
          addDialog.remove();
          addButton.classList.remove("active");

        }

        console.log(categoryName, categoryStatus);

      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-type-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
