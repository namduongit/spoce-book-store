import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một tác giả cho bảng
export function updateAuthorData(author) {
  // Phải truy vấn từ CSDL thông qua idAuthorSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-author");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một tác giả
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("author");
  updateDialog.style.width = "398px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <h1 class="dialog__title">Sửa tác giả</h1>
          <button id="close-author-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form method="post" class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Mã tác giả</label>
                <input type="text" id="update-author-id" value="${author.id}" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Tên tác giả</label>
                <input type="text" id="update-author-name" placeholder="Nhập Tên tác giả" value="${author.name}" autofocus/>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Trạng thái</label>
                <select id="update-author-status" >
                  <option value="" selected>Chọn Trạng thái</option>
                  
                  <option selected value="${author.status}">${author.status}</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                </select>
              </div>
            </div>
            <div class="dialog__buttons">
              <button id="update-author-button" class="update">Sửa</button>
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
    .getElementById("update-author-button")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const authorId = document.getElementById("update-author-id").value.trim();
      const authorName = document.getElementById("update-author-name").value.trim();
      const authorStatus = document.getElementById("update-author-status").value.trim();
      console.log(authorId, authorName, authorStatus);
      if(authorName === ''){
        alert("Hãy nhập tên đầy đủ");
      }else{

        try {
          const response = await fetch("api/authors/update.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              authorId: authorId,
              authorName: authorName,
              authorStatus: authorStatus,
            }),
          });
  
          const result = await response.json();
          console.log("Server Response:", result);
  
          if (result.success) {
            alert("Cập nhật trạng thái thành công!");
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
    .getElementById("close-author-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
