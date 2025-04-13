import { fetchData } from "../../../public/js/book/getDataBook.js";
import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderAuthorTable } from "./renderAuthorTable.js";

// Hàm thiết lập sự kiện Sửa một tác giả cho bảng
export async function updateAuthorData(idAuthorSelected) {
  // Phải truy vấn từ CSDL thông qua idAuthorSelected để lấy được dữ liệu của đối tượng hiện tại
  let author = await fetchData(`api/authors/get.php?authorId=${idAuthorSelected}`);


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
                <input type="text" id="update-author-id" value="${author[0].id}" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Tên tác giả</label>
                <input type="text" id="update-author-name" placeholder="Nhập Tên tác giả" value="${author[0].name}" autofocus/>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Trạng thái</label>
                <select id="update-author-status" disabled >
                  <option value="" selected>Chọn Trạng thái</option>
                  
                  <option selected value="${author[0].status}">${author[0].status}</option>
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
        // alert("Hãy nhập tên đầy đủ");
        toast({title :"Lỗi", message :`Hãy nhập tên tác giả`, type : "warning" , duration : 3000});
      }else{
        let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không.");
        if(yes){

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
              // alert("Cập nhật tác giả thành công!");
              toast({title :"Thành công", message :`Cập nhật thành công`, type : "success" , duration : 3000});
  
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
        renderAuthorTable();
        }
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
