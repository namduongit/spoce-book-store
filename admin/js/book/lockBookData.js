import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderBookTable } from "./renderBookTable.js";

export async function lockBookData(idBookSelected) {
  const res = await fetchData(`api/books/get.php?bookID=${idBookSelected}`);
  const book = res.books[0];

  const lockButton = document.querySelector(".lock-button-book");
  lockButton.classList.add("active");

  const lockDialog = document.createElement("dialog");
  lockDialog.classList.add("dialog", "book");
  lockDialog.style.width = "400px";

  lockDialog.innerHTML = `
    <h1 class="dialog__title">${book.status === 'ACTIVE' ? 'Khoá sách' : 'Mở khoá sách'}</h1>
    <button id="close-book-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__line"></div>
    <form method="dialog" class="dialog__form">
      <div class="dialog__icons" style="display: flex; flex-direction: ${book.status === 'ACTIVE' ? 'row-reverse' : 'row'};">
        <input type="hidden" id="idBookInput" value="${book.id}">
        <input type="hidden" id="statusBookInput" value="${book.status}">
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

  document.body.appendChild(lockDialog);
  lockDialog.showModal();

  //  Gửi POST khi đồng ý
  document.querySelector(".yes").addEventListener("click", async (e) => {
    e.preventDefault();
    let yes = await showNotification("Bạn có đồng ý thay đổi trạng thái không.");
    if(yes){
      const idInput = document.getElementById("idBookInput").value;
      const statusInput = document.getElementById("statusBookInput").value;
  
      const formData = new FormData();
      formData.append("idInput", idInput);
      formData.append("statusInput", statusInput);
  
      try {
        const response = await fetch("api/books/delete.php", {
          method: "POST",
          body: formData
        });
  
        const result = await response.json();
  
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
      renderBookTable();
    }
  });

  document.querySelector(".no").addEventListener("click", async (e) => {
    e.preventDefault();
    let yes = await showNotification("Bạn có đồng ý thoát không ?");
    if(yes){
      lockDialog.remove();
      lockDialog.classList.remove("active");
    }
  });

  document.getElementById("close-book-button").addEventListener("click", async () => {
    let yes = await showNotification("Bạn có đồng ý thoát không ?");
    if(yes){
      lockDialog.remove();
      lockDialog.classList.remove("active");
    }

  });
}
