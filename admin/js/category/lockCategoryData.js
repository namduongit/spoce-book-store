import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderCategoryTable } from "./renderCategoryTable.js";

//
export async function lockCategoryData(idCategorySelected) {
  // Gọi api để lấy được thông tin thể loại được nhấn
  let category = await fetchData(
    `api/categories/detail.php?id=${idCategorySelected}`
  );

  // // Biến chứa đối tượng là nút "Khoá"
  // const lockButton = document.getElementById("lock-button-category");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một thể loại
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("category");
  lockDialog.style.width = "30%";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
       <h1 class="dialog__title">${
         category.data.status === "Hoạt động"
           ? "Khoá thể loại"
           : "Mở khoá thể loại"
       }</h1>
       <button id="close-category-button" class="dialog__close">
         <i class="fa-solid fa-xmark"></i>
       </button>
       <div class="dialog__line"></div>
       <form class="dialog__form">
       <div class="dialog__icons" style="display: flex; flex-direction: ${
         category.data.status === "Hoạt động" ? "row-reverse" : "row"
       };">
         <input type="hidden" id="lock-category-id" name="lock-category-id" value="${
           category.data.id
         }">
         <input type="hidden" id="lock-category-status" name="lock-category-status" value="${
           category.data.status
         }">    
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

  // Thêm sự kiện khi nhấn nút đồng ý
  document.querySelector(".yes").addEventListener("click", async (e) => {
    // Ngăn ...
    e.preventDefault();

    const id = document.getElementById("lock-category-id").value;
    let category = await fetchData(`api/categories/detail.php?id=${id}`);
    let bookList = await fetchData(`api/books/list.php?category=${category.data.name}`);
    if(bookList.data.length > 0){
       toast({
            title: "Cảnh báo",
            message: `Không thể khoá thể loại này vì thể loại này còn sách`,
            type: "warning",
            duration: 3000,
          });
    }else{
      let yes = await showNotification(
        "Bạn có đồng ý thay đổi trạng thái không."
      );
      if (yes) {
        const id = document.getElementById("lock-category-id").value;
        const status = document.getElementById("lock-category-status").value;
  
        try {
          const response = await fetch("api/categories/lock.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              id: id,
              status: status,
            }),
          });
  
          const result = await response.json();
          if (result.success) {
            toast({
              title: "Thành công",
              message: `Lưu chỉnh sửa thành công`,
              type: "success",
              duration: 3000,
            });
          } else {
            toast({
              title: "Cảnh báo",
              message: `${result.message}`,
              type: "warning",
              duration: 3000,
            });
          }
        } catch (error) {
          toast({
            title: "Lỗi",
            message: `Lỗi fetch API:${error}`,
            type: "error",
            duration: 3000,
          });
        }
        lockDialog.remove();
        renderCategoryTable(1);
      }
    }

    //
  });

  // Gán sự kiện cho nút "Đóng" dialog
  document.querySelector(".no").addEventListener("click", () => {
    // Xoá dialog
    lockDialog.remove();

    // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
    // lockButton.classList.remove("active");
  });

  document
    .getElementById("close-category-button")
    .addEventListener("click", () => {
      // Xoá dialog
      lockDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // lockButton.classList.remove("active");
    });
}
