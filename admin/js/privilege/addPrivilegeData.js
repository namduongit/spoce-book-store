import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Thêm một nhóm quyền cho bảng
export function addPrivilegeData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-privilege");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một nhóm quyền
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("privilege");
    addDialog.style.width = "1178px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
                <h1 class="dialog__title">Thêm nhóm quyền</h1>
                <button id="close-privilege-button" class="dialog__close">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="dialog__line"></div>
                <form method="post" class="dialog__form">
                  <div class="dialog__row">
                    <div class="dialog__form-group">
                        <label>Mã nhóm quyền</label>
                        <input type="text" id="add-privilege-id" readonly />
                    </div>
                    <div class="dialog__form-group full">
                      <label>Tên nhóm quyền</label>
                      <input type="text" id="add-privilege-name" placeholder="Nhập Tên nhóm quyền" autofocus/>
                    </div>
                    <div class="dialog__form-group">
                      <label>Trạng thái</label>
                      <select id="add-book-status">
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
                          <th width="25%">Danh mục chức năng</th>
                          <th width="15%">Lọc</th>
                          <th width="15%">Chi tiết</th>
                          <th width="15%">Thêm</th>
                          <th width="15%">Sửa</th>
                          <th width="15%">Xóa / Khoá</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>Thống kê lợi nhuận</td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                        </tr>
                        <tr>
                            <td>Thống kê doanh thu</td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                        </tr>
                        <tr>
                            <td>Thống kê phiếu nhập</td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                        </tr>
                        <tr>
                            <td>Thống kê đơn hàng</td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                        </tr>
                        <tr>
                            <td>Đơn hàng</td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox" disabled></td>
                            <td><input type="checkbox"></td>
                            <td><input type="checkbox" disabled></td>
                        </tr>
                        <tr>
                            <td>Khuyến mãi</td>
                            <td><input type="checkbox"></td>
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
                            <td><input type="checkbox"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="dialog__buttons">
                    <button id="add-privilege-button" class="add">Thêm</button>
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
      .getElementById("add-privilege-button")
      .addEventListener("click", () => {
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const id = document.getElementById("add-privilege-id");
        const name = document.getElementById("add-privilege-name");
        const status = document.getElementById("add-privilege-status");

        // ... (Xử lý tiếp ở đây)
        console.log(id.value);
        console.log(name.value);
        console.log(status.value);
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-privilege-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
