import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderCategoryTable } from "./renderCategoryTable.js";

//
export async function lockCategoryData(idCategorySelected) {
  // Phải truy vấn từ CSDL thông qua idCategorySelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
    let category = await fetchData(`api/categories/get.php?cateId=${idCategorySelected}`);

  // Biến chứa đối tượng là nút "Khoá"
  const lockButton = document.getElementById("lock-button-category");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một thể loại
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("category");
  lockDialog.style.width = "400px";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
  <h1 class="dialog__title">Khoá thể loại</h1>
  <button id="close-category-button" class="dialog__close">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <div class="dialog__line"></div>
  <form method="post" class="dialog__form">
   <div class="dialog__icons" style="display: flex; flex-direction: ${category[0].status === 'ACTIVE' ? 'row-reverse' : 'row'};">
      <input type="hidden" id="categoryId" name="categoryId" value="${category[0].id}">
      <input type="hidden" id="categoryStatus" name="categoryStatus" value="${category[0].status}">
      <i class="fa-solid fa-lock"></i>
      <i class="fa-solid fa-arrow-right"></i>
      <i class="fa-solid fa-unlock"></i>
    </div>
    <div class="dialog__buttons">
      <button class="yes">Đồng ý</button>
      <button class="no">Từ chối</button>
    </div>
  </form>
`;


  // Thêm vào body
  document.body.appendChild(lockDialog);

  // Hiển thị lockDialog
  lockDialog.showModal();
  
  document.querySelector(".yes").addEventListener("click", async (e) => {
    e.preventDefault();
    let yes = await showNotification("Bạn có đồng ý thay đổi trạng thái không.");
    if(yes){

      const idInput = document.getElementById("categoryId").value;
      const statusInput = document.getElementById("categoryStatus").value;
      
      console.log("ID:", idInput, "Status:", statusInput);
  
      try {
        const response = await fetch("api/categories/delete.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            idInput: idInput,
            statusInput: statusInput,
          }),
        });
  
        const result = await response.json();
        console.log("Server Response:", result);
  
        if (result.success) {
          // alert("Cập nhật trạng thái thành công!");
          toast({title :"Thành công", message :`Lưu chỉnh sửa thành công`, type : "success" , duration : 3000});
        } else {
          // alert("Lỗi khi cập nhật trạng thái: " + (result.message || "Không rõ nguyên nhân"));
          toast({title :"Cảnh báo", message :`${result.message}`, type : "warning" , duration : 3000});
          
        }
      } catch (error) {
        console.error("Lỗi fetch API:", error);
        // alert("Không thể kết nối đến server!");
        toast({title :"Lỗi", message :`Lỗi fetch API:${error}`, type : "error" , duration : 3000});

      }
  
  
      lockDialog.remove();
      lockButton.classList.remove("active");
      renderCategoryTable();
    }

  });


  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-category-button")
    .addEventListener("click", () => {
      // Xoá dialog
      lockDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      lockButton.classList.remove("active");
    });
}
