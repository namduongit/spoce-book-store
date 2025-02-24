//
export function lockTypeData(idTypeSelected) {
  // Phải truy vấn từ CSDL thông qua idTypeSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Khoá"
  const lockButton = document.getElementById("lock-button-type");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một thể loại
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("type");
  lockDialog.style.width = "400px";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
            <h1 class="dialog__title">Khoá thể loại</h1>
            <button id="close-type-button" class="dialog__close">
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
  document.getElementById("close-type-button").addEventListener("click", () => {
    // Xoá dialog
    lockDialog.remove();

    // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
    lockButton.classList.remove("active");
  });
}
