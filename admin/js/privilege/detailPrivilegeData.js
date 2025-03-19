import { isNotFirstItemSelected } from "../selectEvents.js";
import { clickToShowDatePicker, defaultDateSelected } from "../others.js";

// Hàm thiết lập sự kiện Sửa một nhóm quyền cho bảng
export function detailPrivilegeData(idPrivilegeSelected) {
  // Phải truy vấn từ CSDL thông qua idPrivilegeSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Sửa"
  const detailButton = document.getElementById("detail-button-privilege");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  detailButton.classList.add("active");

  // Tạo một dialog để sửa một nhóm quyền
  const detailDialog = document.createElement("dialog");
  // - Định dạng dialog
  detailDialog.classList.add("dialog");
  detailDialog.classList.add("privilege");
  detailDialog.style.width = "1178px";
  // - Ghi nội dung dialog
  detailDialog.innerHTML = `
            <h1 class="dialog__title">Sửa nhóm quyền</h1>
            <button id="close-privilege-button" class="dialog__close">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <form method="post" class="dialog__form">
                  <div class="dialog__row">
                    <div class="dialog__form-group">
                        <label>Mã nhóm quyền</label>
                        <input type="text" id="detail-privilege-id" readonly />
                    </div>
                    <div class="dialog__form-group full">
                      <label>Tên nhóm quyền</label>
                      <input type="text" id="detail-privilege-name" placeholder="Nhập Tên nhóm quyền" autofocus/>
                    </div>
                    <div class="dialog__form-group">
                      <label>Trạng thái</label>
                      <select id="detail-book-status">
                          <option value="" selected>Chọn Trạng thái</option>
                          <option value="1">Hoạt động</option>
                          <option value="0">Tạm dừng</option>
                      </select>
                    </div>
                  </div>
                  <div class="dialog__privilege-detail">
                    <table>
                      <thead>
                        <tr>
                          <th width="34%">Danh mục chức năng</th>
                          <th width="19%">Chi tiết</th>
                          <th width="19%">Thêm</th>
                          <th width="19%">Sửa</th>
                          <th width="19%">Xóa / Khoá</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>Khuyến mãi</td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                        </tr>
                        <tr>
                            <td>Nhóm quyền</td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                        </tr>
                        <tr>
                            <td>Nhà cung cấp</td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                        </tr>
                        <tr>
                            <td>Sách</td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form >
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
    .getElementById("close-privilege-button")
    .addEventListener("click", () => {
      // Xoá dialog
      detailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      detailButton.classList.remove("active");
    });
}
