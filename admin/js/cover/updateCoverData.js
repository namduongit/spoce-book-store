import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderCoverTable } from "./renderCoverTable.js";

// Hàm thiết lập sự kiện Sửa một loại bìa cho bảng
export async function updateCoverData(idCoverSelected) {
  // Gọi api để lấy được thông tin loại bìa được nhấn
  let cover = await fetchData(`api/covers/detail.php?id=${idCoverSelected}`);

  // // Biến chứa đối tượng là nút "Sửa"
  // const updateButton = document.getElementById("update-button-cover");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // updateButton.classList.add("active");

  // Tạo một dialog để sửa một loại bìa
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("cover");
  updateDialog.style.width = "30%";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
      <h1 class="dialog__title">Sửa loại bìa</h1>
      <button id="close-cover-button" class="dialog__close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="dialog__line"></div>
      <form class="dialog__form" autocomplete="off">
        <div class="dialog__row">
          <div class="dialog__form-group full">
            <label>Mã loại bìa</label>
            <input type="text" id="update-cover-id" class="text-center" value="${cover.data.id}" readonly />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group full">
            <label>Tên loại bìa<span>*<span></label>
            <input type="text" id="update-cover-name" placeholder="Nhập Tên loại bìa"  value="${cover.data.name}" autofocus/>
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group full">
            <label>Trạng thái</label>
            <select id="update-cover-status" disabled>
              <option selected value="${cover.data.status}">${cover.data.status}</option>
            </select>
          </div>
        </div>
        <div class="dialog__buttons">
          <button id="update-cover-button" class="update">Sửa</button>
        </div>
      </form >
    `;

  // Thêm vào body
  document.body.appendChild(updateDialog);

  // Hiển thị updateDialog
  updateDialog.showModal();

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });

  // Gán sự kiện cho nút "Sửa" dialog
  document
    .getElementById("update-cover-button")
    .addEventListener("click", async (e) => {
      // Ngăn ...
      e.preventDefault();

      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const id = document.getElementById("update-cover-id").value;
      const name = document.getElementById("update-cover-name").value
        ? document.getElementById("update-cover-name").value
        : null;

      //
      if (!name) {
        toast({
          title: "Lỗi",
          message: `Hãy nhập tên loại bìa`,
          type: "warning",
          duration: 3000,
        });
      } else {
        let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không.");
        if (yes) {
          try {
            const response = await fetch("api/covers/update.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                id: id,
                name: name,
              }),
            });

            const result = await response.json();
            if (result.success) {
              toast({
                title: "Thành công",
                message: `Cập nhật thành công`,
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
            toast({
              title: "Lỗi",
              message: `Lỗi fetch API:${error}`,
              type: "error",
              duration: 3000,
            });
          }
          updateDialog.remove();
          renderCoverTable(1);
        }
      }
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-cover-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // updateButton.classList.remove("active");
    });
}
