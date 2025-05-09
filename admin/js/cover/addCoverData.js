import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderCoverTable } from "./renderCoverTable.js";

// Hàm thiết lập sự kiện Thêm một loại bìa cho bảng
export function addCoverData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-cover");

  if (!addButton) return;

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một loại bìa
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("cover");
    addDialog.style.width = "30%";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
      <h1 class="dialog__title">Thêm loại bìa</h1>
      <button id="close-cover-button" class="dialog__close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="dialog__line"></div>
      <form class="dialog__form" autocomplete="off">
        <div class="dialog__row">
          <div class="dialog__form-group full">
            <label>Mã loại bìa<span>*<span></label>
            <input type="text" id="add-cover-id" class="text-center" value="Được xác định sau khi xác nhận thêm !" readonly />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group full">
            <label>Tên loại bìa<span>*<span></label>
            <input type="text" id="add-cover-name" placeholder="Nhập Tên loại bìa" autofocus/>
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group full">
            <label>Trạng thái<span>*<span></label>
            <select id="add-cover-status">
              <option value="" selected>Chọn Trạng thái</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Tạm dừng">Tạm dừng</option>
            </select>
          </div>
        </div>
        <div class="dialog__buttons">
          <button id="add-cover-button" class="add">Thêm</button>
        </div>
      </form >
    `;

    // Thêm vào body
    document.body.appendChild(addDialog);

    // Hiển thị addDialog
    addDialog.showModal();

    // Sự kiện cho các thành phần trong dialog
    // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
    const selectElement = document.querySelectorAll(
      ".dialog__form-group > select"
    );
    selectElement.forEach((select) => {
      isNotFirstItemSelected(select);
    });

    // Gán sự kiện cho nút "Thêm" dialog
    document
      .getElementById("add-cover-button")
      .addEventListener("click", async (e) => {
        //
        e.preventDefault();

        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const name = document.getElementById("add-cover-name").value
          ? document.getElementById("add-cover-name").value
          : null;
        const status = document.getElementById("add-cover-status").value
          ? document.getElementById("add-cover-status").value
          : null;

        //
        let checkName = true,
          checkStatus = true;
        if (!name) {
          // alert("Hãy nhập tên đầy đủ");
          toast({
            title: "Cảnh báo",
            message: `Vui lòng nhập tên loại bìa.`,
            type: "warning",
            duration: 3000,
          });
        }
        if (!status) {
          toast({
            title: "Cảnh báo",
            message: `Vui lòng chọn trạng thái.`,
            type: "warning",
            duration: 3000,
          });
          checkStatus = false;
        }
        if (checkName && checkStatus) {
          let yes = await showNotification(
            "Bạn có đồng ý thêm loại bìa này không?"
          );
          if (yes) {
            try {
              const response = await fetch("api/covers/create.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  name: name,
                  status: status,
                }),
              });

              const result = await response.json();
              if (result.success) {
                toast({
                  title: "Thành công",
                  message: `Thêm Loại bìa thành công.`,
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
            addButton.classList.remove("active");
            addDialog.remove();
            renderCoverTable(1);
          }
        }
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-cover-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
