import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Thêm một tác giả cho bảng
export function addAuthorData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-author");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một tác giả
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("author");
    addDialog.style.width = "398px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
            <h1 class="dialog__title">Thêm tác giả</h1>
            <button id="close-type-button" class="dialog__close">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <form method="post" class="dialog__form">
              <div class="dialog__row">
                <div class="dialog__form-group full">
                  <label>Mã tác giả</label>
                  <input type="text" id="add-author-id" readonly />
                </div>
              </div>
              <div class="dialog__row">
                <div class="dialog__form-group full">
                  <label>Tên tác giả</label>
                  <input type="text" id="add-author-name" placeholder="Nhập Tên tác giả" autofocus/>
                </div>
              </div>
              <div class="dialog__row">
                <div class="dialog__form-group full">
                  <label>Trạng thái</label>
                  <select id="add-author-status">
                    <option selected value="">Chọn trạng thái</option>
                    <option  value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>
              <div class="dialog__buttons">
                <button id="add-author-button" class="add">Thêm</button>
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
      .getElementById("add-author-button")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const authorName = document.getElementById("add-author-name").value;
        const authorStatus = document.getElementById("add-author-status").value;
          console.log(authorName, authorStatus);
        if(authorName === '' || authorStatus == ''){
          alert("Hãy nhập tên đầy đủ");
        }else{
  
          try {
            const response = await fetch("api/authors/create.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                authorName: authorName,
                authorStatus: authorStatus,
              }),
            });
    
            const result = await response.json();
            console.log("Server Response:", result);
    
            if (result.success) {
              alert("thêm tác giả thành công!");
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
