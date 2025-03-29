//
export function lockCategoryData(category) {
  // Phải truy vấn từ CSDL thông qua idCategorySelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

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
             <div class="dialog__icons" style="display: flex; flex-direction: ${category.status === 'ACTIVE' ? 'row-reverse' : 'row'};">
                <input type="hidden" id="categoryId" name="categoryId" value="${category.id}">
                <input type="hidden" id="categoryStatus" name="categoryStatus" value="${category.status}">
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
