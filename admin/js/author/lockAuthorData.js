//
import { fetchData } from "../../../public/js/book/getDataBook.js";
export async function lockAuthorData(idAuthorSelected) {

  // Phải truy vấn từ CSDL thông qua idAuthorSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
    let author = await fetchData(`api/authors/get.php?authorId=${idAuthorSelected}`);
  

  // Biến chứa đối tượng là nút "Khoá"
  const lockButton = document.getElementById("lock-button-author");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một tác giả
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("author");
  lockDialog.style.width = "400px";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
  <h1 class="dialog__title">${author[0].status === 'ACTIVE' ? 'Khoá tác giả' : 'Mở khoá'}</h1>
  <button id="close-author-button" class="dialog__close">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <div class="dialog__line"></div>
  <form method="post" class="dialog__form">
    <div class="dialog__icons" style="display: flex; flex-direction: ${author[0].status === 'ACTIVE' ? 'row-reverse' : 'row'};">
      <input type="hidden" id="idAuthorInput" name="idAuthorInput" value="${author[0].id}">
      <input type="hidden" id="statusAuthorInput" name="statusAuthorInput" value="${author[0].status}">
      <i class="fa-solid fa-lock"></i>
      <i class="fa-solid fa-arrow-right"></i>
      <i class="fa-solid fa-unlock"></i>
    </div>
    <div class="dialog__buttons">
      <button type="submit" class="yes">Đồng ý</button>
      <button type="button" class="no">Từ chối</button>
    </div>
  </form>
`;

document.body.appendChild(lockDialog);
lockDialog.showModal();

//  them sự kiện khi nhấn nút đòng ý
document.querySelector(".yes").addEventListener("click", async (e) => {
  e.preventDefault();

  const idInput = document.getElementById("idAuthorInput").value;
  const statusInput = document.getElementById("statusAuthorInput").value;
  
  console.log("ID:", idInput, "Status:", statusInput);

  try {
    const response = await fetch("api/authors/delete.php", {
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

document.getElementById("close-author-button").addEventListener("click", () => {
  lockDialog.remove();
  lockButton.classList.remove("active");
});
}
