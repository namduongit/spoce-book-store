//
export function lockDiscountData(idDiscountSelected) {
  // Phải truy vấn từ CSDL thông qua idDiscountSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Khoá"
  const lockButton = document.getElementById("lock-button-discount");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một khuyến mãi
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("discount");
  lockDialog.style.width = "400px";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
                  <h1 class="dialog__title">Khoá khuyến mãi</h1>
                  <button id="close-discount-button" class="dialog__close">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                  <div class="dialog__line"></div>
                  <div class="dialog__icons">
                    <i class="fa-solid fa-lock"></i>
                    <i class="fa-solid fa-arrow-right"></i>
                    <i class="fa-solid fa-unlock"></i>
                  </div>
                  <div class="dialog__buttons">
                    <button class="yes">Đồng ý</button>
                    <button class="no">Từ chối</button>
                  </div>
            `;

  // Thêm vào body
  document.body.appendChild(lockDialog);

  // Hiển thị lockDialog
  lockDialog.showModal();

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-discount-button")
    .addEventListener("click", () => {
      // Xoá dialog
      lockDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      lockButton.classList.remove("active");
    });
}
