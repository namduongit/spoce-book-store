import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderPublisherTable } from "./renderPublisherTable.js";

// Hàm thiết lập sự kiện Sửa một nhà xuất bản cho bảng
export async function updatePublisherData(idPublisherSelected) {
  // Gọi api để lấy được thông tin Nhà xuất bản được nhấn
  let publisher = await fetchData(
    `api/publishers/detail.php?id=${idPublisherSelected}`
  );

  // // Biến chứa đối tượng là nút "Sửa"
  // const updateButton = document.getElementById("update-button-publisher");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // updateButton.classList.add("active");

  // Tạo một dialog để sửa một nhà xuất bản
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("publisher");
  updateDialog.style.width = "30%";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
    <h1 class="dialog__title">Sửa nhà xuất bản</h1>
    <button id="close-publisher-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__line"></div>
    <form class="dialog__form" autocomplete="off">
      <div class="dialog__row">
        <div class="dialog__form-group full">
          <label>Mã nhà xuất bản</label>
          <input type="text" id="update-publisher-id" class="text-center" value="${publisher.data.id}" readonly />
        </div>
      </div>
      <div class="dialog__row">
        <div class="dialog__form-group full">
          <label>Tên nhà xuất bản<span>*<span></label>
          <input type="text" id="update-publisher-name" placeholder="Nhập Tên nhà xuất bản"  value="${publisher.data.name}" autofocus/>
        </div>
      </div>
      <div class="dialog__row">
        <div class="dialog__form-group full">
          <label>Trạng thái</label>
          <select id="update-publisher-status" disabled>
            <option selected value="${publisher.data.status}">${publisher.data.status}</option>
          </select>
        </div>
      </div>
      <div class="dialog__buttons">
        <button id="update-publisher-button" class="update">Sửa</button>
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
    .getElementById("update-publisher-button")
    .addEventListener("click", async (e) => {
      // Ngăn ...
      e.preventDefault();

      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const id = document.getElementById("update-publisher-id").value;
      const name = document.getElementById("update-publisher-name").value
        ? document.getElementById("update-publisher-name").value
        : null;

      //
      if (!name) {
        toast({
          title: "Lỗi",
          message: `Hãy nhập tên nhà xuất bản`,
          type: "warning",
          duration: 3000,
        });
      } else {
        let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không.");
        if (yes) {
          try {
            const response = await fetch("api/publishers/update.php", {
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
          renderPublisherTable(1);
        }
      }
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-publisher-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // updateButton.classList.remove("active");
    });
}
