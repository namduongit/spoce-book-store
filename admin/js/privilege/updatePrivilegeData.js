import { isNotFirstItemSelected } from "../selectEvents.js";
import { clickToShowDatePicker, defaultDateSelected } from "../others.js";

// Hàm thiết lập sự kiện Sửa một nhóm quyền cho bảng
export function updatePrivilegeData(idPrivilegeSelected) {
  // Phải truy vấn từ CSDL thông qua idPrivilegeSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-privilege");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một nhóm quyền
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("privilege");
  updateDialog.style.width = "1178px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
            <h1 class="dialog__title">Sửa nhóm quyền</h1>
            <button id="close-privilege-button" class="dialog__close">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="dialog__line"></div>
            <form method="post" class="dialog__form">
                  <div class="dialog__row">
                    <div class="dialog__form-group">
                        <label>Mã nhóm quyền</label>
                        <input type="text" id="update-privilege-id" readonly />
                    </div>
                    <div class="dialog__form-group full">
                      <label>Tên nhóm quyền</label>
                      <input type="text" id="update-privilege-name" placeholder="Nhập Tên nhóm quyền" autofocus/>
                    </div>
                    <div class="dialog__form-group">
                      <label>Trạng thái</label>
                      <select id="update-book-status">
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
                  <div class="dialog__buttons">
                    <button id="update-privilege-button" class="update">Thêm</button>
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
    .getElementById("update-privilege-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      //   const id = document.getElementById("add-privilege-id");
      const type = document.getElementById("update-privilege-type");
      //   const status = document.getElementById("add-privilege-status");

      // ... (Xử lý tiếp ở đây)
      //   console.log(id.value);
      console.log(type.value);
      //   console.log(status.value);
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-privilege-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
