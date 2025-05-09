import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderBookTable } from "./renderBookTable.js";

//
export async function lockBookData(idBookSelected) {
  // Gọi api để lấy được thông tin sách được nhấn
  let book = await fetchData(`api/books/detail.php?id=${idBookSelected}`);

  // // Biến chứa đối tượng là nút "Khoá"
  // const lockButton = document.getElementById("lock-button-book");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một sách
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("book");
  // lockDialog.style.width = "30%";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
     <h1 class="dialog__title">${
       book.data.status === "Đang bán" ? "Khoá sách" : "Mở khoá sách"
     }</h1>
     <button id="close-book-button" class="dialog__close">
       <i class="fa-solid fa-xmark"></i>
     </button>
     <div class="dialog__line"></div>
     <form class="dialog__form">
     <div class="dialog__icons" style="display: flex; flex-direction: ${
       book.data.status === "Đang bán" ? "row-reverse" : "row"
     };">
       <input type="hidden" id="lock-book-id" name="lock-book-id" value="${
         book.data.id
       }">
       <input type="hidden" id="lock-book-status" name="lock-book-status" value="${
         book.data.status
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

    //
    let yes = await showNotification(
      "Bạn có đồng ý thay đổi trạng thái không."
    );
    if (yes) {
      const id = document.getElementById("lock-book-id").value;
      const status = document.getElementById("lock-book-status").value;

      try {
        const response = await fetch("api/books/lock.php", {
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
        console.log(error);
        toast({
          title: "Lỗi",
          message: `Lỗi fetch API:${error}`,
          type: "error",
          duration: 3000,
        });
      }

      lockDialog.remove();
      renderBookTable(1);
    }
  });

  // Gán sự kiện cho nút "Đóng" dialog
  document.querySelector(".no").addEventListener("click", () => {
    // Xoá dialog
    lockDialog.remove();

    // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
    // lockButton.classList.remove("active");
  });

  document.getElementById("close-book-button").addEventListener("click", () => {
    // Xoá dialog
    lockDialog.remove();

    // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
    // lockButton.classList.remove("active");
  });
}
