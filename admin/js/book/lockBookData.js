import { fetchData } from "../../../public/js/book/getDataBook.js";

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
        alert("Cập nhật trạng thái thành công!");
      } else {
        alert("Lỗi khi cập nhật trạng thái: " + (result.message || "Không rõ nguyên nhân"));
      }
    } catch (error) {
      console.error("Lỗi fetch API:", error);
      alert("Không thể kết nối đến server!");
    }

    lockDialog.remove();
  });

  document.querySelector(".no").addEventListener("click", (e) => {
    e.preventDefault();
    lockDialog.remove();
  });

  document.getElementById("close-book-button").addEventListener("click", () => {
    lockDialog.remove();
  });
}
