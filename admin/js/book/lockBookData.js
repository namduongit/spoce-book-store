//
export function lockBookData(book) {

  // Tạo một dialog để khoá - mở khoá một sách
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("book");
  lockDialog.style.width = "400px";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
    <h1 class="dialog__title">${book.status === 'ACTIVE' ? 'Khoá sách' : 'Mở sách'}</h1>
    <button id="close-book-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__line"></div>
    <form method="get" class="dialog__form">
      <div class="dialog__icons" style="display: flex; flex-direction: ${book.status == 'ACTIVE' ? 'row-reverse' : 'row'};">
        <input type="text" id="idBookInput" name="idInput" value="${book.id}" style="display: none;">
        <input type="text" id="statusBookInput" name="statusInput" value="${book.status}" style="display: none;">
        <i class="fa-solid fa-lock"></i>
        <i class="fa-solid fa-arrow-right"></i>
        <i class="fa-solid fa-unlock"></i>
      </div>
      <div class="dialog__buttons">
        <button type="submit" class="yes">Đồng ý</button>
        <button type="submit" class="no">Từ chối</button>
      </div>
    </form>
    `;
    

  // Thêm vào body
  document.body.appendChild(lockDialog);

  // Hiển thị lockDialog
  lockDialog.showModal();

  document.querySelector(".yes").addEventListener("click", async (e) => {
    e.preventDefault();

    const idInput = document.getElementById("idBookInput").value;
    const statusInput = document.getElementById("statusBookInput").value;

    let params = new URLSearchParams();
    params.append("idInput", idInput);
    params.append("statusInput", statusInput);

    let url = `api/books/delete.php?${params.toString()}`;
    console.log("Request URL:", url);

    try {
        const response = await fetch(url, { method: "GET" });

        const result = await response.json(); // Chuyển luôn về JSON

        if (result.success) {
            alert("Cập nhật trạng thái thành công!");
            
        } else {
            alert("Lỗi khi cập nhật trạng thái: " + (result.false || "Không rõ nguyên nhân"));
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


  // Gán sự kiện cho nút "Đóng" dialog
  document.getElementById("close-book-button").addEventListener("click", () => {
    // Xoá dialog
    lockDialog.remove();
  });
}
