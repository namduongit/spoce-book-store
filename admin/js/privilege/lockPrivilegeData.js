import { lockRole } from "./filterPrivilegeData.js";
import { renderPrivilegeTable } from "./renderPrivilegeTable.js";
import { showNotification } from "../dialogMessage.js";
import { toast } from "../../../public/js/toast.js";

export function lockPrivilegeData(idPrivilegeSelected, statusPrivilegeSelected) {
  // Phải truy vấn từ CSDL thông qua idPrivilegeSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
  // Biến chứa đối tượng là nút "Khoá"
  console.log(statusPrivilegeSelected)
  const lockButton = document.getElementById("lock-button-privilege");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một khuyến mãi
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("privilege");
  lockDialog.style.width = "400px";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
                    <h1 class="dialog__title">Khoá nhóm quyền</h1>
                    <button id="close-privilege-button" class="dialog__close">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div class="dialog__line"></div>
                    <form method="post" class="dialog__form">
                      <div class="dialog__icons">
                        <i class="fa-solid fa-lock"></i>
                        <i class="fa-solid fa-arrow-right"></i>
                        <i class="fa-solid fa-unlock"></i>
                      </div>
                      <div class="dialog__buttons">
                        <button class="yes" id="yes-privilege-button">Đồng ý</button>
                        <button class="no" id="no-privilege-button">Từ chối</button>
                      </div>
                    </form>
              `;

  // Thêm vào body
  document.body.appendChild(lockDialog);

  // Hiển thị lockDialog
  lockDialog.showModal();

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-privilege-button")
    .addEventListener("click", () => {
      // Xoá dialog
      lockDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      lockButton.classList.remove("active");
    });
  

  // Gán sự kiện không đồng ý khóa nhóm quyền
  document
    .getElementById('no-privilege-button')
    .addEventListener("click", (event) => {
      event.preventDefault();

      lockDialog.remove();
      lockButton.classList.remove("active");
    });

  // Gán sự kiện đồng ý khóa nhóm quyền
  document
    .getElementById('yes-privilege-button')
    .addEventListener("click", async (event) => {
      event.preventDefault();
      let yes = await showNotification(
        "Bạn có đồng ý thay đổi trạng thái không."
      );

      if (yes) {
        const response = await lockRole(parseInt(idPrivilegeSelected.innerText), statusPrivilegeSelected);
        toast({
          type: response['success'] ? 'success' : 'warning',
          title: 'Thông báo',
          message: response['message'],
          duration: 3000
        });
      }

      renderPrivilegeTable(1);
      lockDialog.remove();
      lockButton.classList.remove("active");
    });
}
