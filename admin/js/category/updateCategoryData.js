import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderCategoryTable } from "./renderCategoryTable.js";

// Hàm thiết lập sự kiện Sửa một thể loại cho bảng
export async function updateCategoryData(idCategorySelected) {
  // Phải truy vấn từ CSDL thông qua idCategorySelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
    let category = await fetchData(`api/categories/get.php?cateId=${idCategorySelected}`);
  

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-category");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một thể loại
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("category");
  updateDialog.style.width = "398px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
  <h1 class="dialog__title">Sửa thể loại</h1>
  <button id="close-category-button" class="dialog__close">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <div class="dialog__line"></div>
  <form method="post" class="dialog__form">
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Mã thể loại</label>
        <input type="text" id="update-category-id"  value="${category[0].id}" readonly />
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Tên thể loại</label>
        <input type="text" id="update-category-name" placeholder="Nhập Tên thể loại"  value="${category[0].name}" autofocus/>
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Trạng thái</label>
        <select id="update-category-status" disabled>
          <option value="" selected>Chọn Trạng thái</option>
          <option selected value="${category[0].status}">${category[0].status}</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="SUSPENDED">SUSPENDED</option>
        </select>
      </div>
    </div>
    <div class="dialog__buttons">
      <button id="update-category-button" class="update">Sửa</button>
    </div>
  </form >
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
    .getElementById("update-category-button")
    .addEventListener("click", async (e) => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      e.preventDefault();
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const categoryId = document.getElementById("update-category-id").value.trim();
      const categoryName = document.getElementById("update-category-name").value.trim();
      const categoryStatus = document.getElementById("update-category-status").value.trim();
      console.log(categoryId, categoryName, categoryStatus);
      if(categoryName === ''){
        // alert("Hãy nhập tên đầy đủ");
        toast({title :"Lỗi", message :`Hãy nhập tên thể loại`, type : "warning" , duration : 3000});
      }else{
        let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không.");
          if(yes){
            try {
              const response = await fetch("api/categories/update.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  categoryId: categoryId,
                  categoryName: categoryName,
                  categoryStatus: categoryStatus,
                }),
              });
      
              const result = await response.json();
              console.log("Server Response:", result);
      
              if (result.success) {
                // alert("Cập nhật Thể loại thành công!");
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
          renderCategoryTable();
          }

        }
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-category-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
