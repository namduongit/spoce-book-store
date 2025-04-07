import { fetchData } from "../../../public/js/book/getDataBook.js";

//
export async function lockCoverData(idCoverSelected) {
  // Phải truy vấn từ CSDL thông qua idCoverSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
  let cover = await fetchData(`api/covers/get.php?coverId=${idCoverSelected}`);

  // Biến chứa đối tượng là nút "Khoá"
  const lockButton = document.getElementById("lock-button-cover");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một loại bìa
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("cover");
  lockDialog.style.width = "400px";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
                <h1 class="dialog__title">${cover[0].status === 'ACTIVE' ? 'Khoá bìa' : 'Mở khoá'}</h1>
                <button id="close-cover-button" class="dialog__close">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="dialog__line"></div>
                <form method="post" class="dialog__form">
                  <div class="dialog__icons" style="display: flex; flex-direction: ${cover[0].status == 'ACTIVE' ? 'row-reverse' : 'row'};">
                    <input type="text" id="idCoverInput" name="idInput" value="${cover[0].id}" style="display: none;">
                    <input type="text" id="statusCoverInput" name="statusInput" value="${cover[0].status}" style="display: none;">
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
    const idInput = document.getElementById("idCoverInput").value;
    const statusInput = document.getElementById("statusCoverInput").value;

    console.log("ID:", idInput, "Status:", statusInput);

    try {
      const response = await fetch("api/covers/delete.php", {
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


document.querySelector(".no").addEventListener("click", (e) => {
  e.preventDefault();
  lockDialog.remove();

});



  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-cover-button")
    .addEventListener("click", () => {
      // Xoá dialog
      lockDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      lockButton.classList.remove("active");
    });
}
