import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một nhà cung cấp cho bảng
export function detailSuppliesData(idSuppliesSelected) {
  // Phải truy vấn từ CSDL thông qua idSuppliesSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Chi tiết"
  const detailButton = document.getElementById("detail-button-supplies");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  detailButton.classList.add("active");

  // Tạo một dialog để hiện một nhà cung cấp
  const detailDialog = document.createElement("dialog");
  // - Định dạng dialog
  detailDialog.classList.add("dialog");
  detailDialog.classList.add("supplies");
  detailDialog.style.width = "772px";
  // - Ghi nội dung dialog
  detailDialog.innerHTML = `
            <h1 class="dialog__title">Chi tiết nhà cung cấp</h1>
            <button id="close-supplies-button" class="dialog__close">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <form method="get" class="dialog__form">
                <div class="dialog__row">
                    <div class="dialog__form-group">
                        <label>Mã nhà cung cấp</label>
                        <input type="text" id="add-supplies-id" readonly />
                    </div>
                    <div class="dialog__form-group">
                        <label>Tên nhà cung cấp</label>
                        <input type="text" id="add-supplies-name" readonly />
                    </div>
                </div>
                <div class="dialog__row">
                    <div class="dialog__form-group">
                        <label>Số điện thoại</label>
                        <input type="text" id="add-supplies-phone" readonly />
                    </div>
                    <div class="dialog__form-group">
                        <label>Email</label>
                        <input type="text" id="add-supplies-email" readonly />
                    </div>
                </div>
                <div class="dialog__row">
                    <div class="dialog__form-group full">
                        <label>Địa chỉ</label>
                        <input type="text" id="add-supplies-address"readonly />
                    </div>
                </div>
                <div class="dialog__row">
                    <div class="dialog__form-group">
                        <label>Trạng thái</label>
                        <select id="add-supplies-status" disabled>
                        <option value="" selected>Chọn Trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Tạm dừng</option>
                        </select>
                    </div>
                    <div class="dialog__form-group"></div>
                </div>
            </form>
      `;

  // Thêm vào body
  document.body.appendChild(detailDialog);

  // Hiển thị detailDialog
  detailDialog.showModal();

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-supplies-button")
    .addEventListener("click", () => {
      // Xoá dialog
      detailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      detailButton.classList.remove("active");
    });
}
