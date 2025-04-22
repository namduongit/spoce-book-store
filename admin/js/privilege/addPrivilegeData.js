import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from '../../../public/js/toast.js'

// Hàm thiết lập sự kiện Thêm một nhóm quyền cho bảng
export async function addPrivilegeData() {
  const response = await fetch('api/privileges/list.php');
  const dataPrivileges = await response.json();


  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-privilege");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    let privilegeHTML = ``;

    if (dataPrivileges['data'] && Array.isArray(dataPrivileges['data'])) {
      dataPrivileges['data'].forEach(dataItem => {
        privilegeHTML += `
        <tr data-privilege=${dataItem.id}>
            <td>${dataItem.name}</td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
        </tr>
        `;
      })
    }

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
                      <select id="add-privilege-status">
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
                        ${privilegeHTML}
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
      .addEventListener("click", async (event) => {
        event.preventDefault();

        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const id = document.getElementById("add-privilege-id");
        const name = document.getElementById("add-privilege-name");
        const status = document.getElementById("add-privilege-status");

        // ... (Xử lý tiếp ở đây)
        console.log(id.value)
        console.log(name.value)
        console.log(status.value)

        
        return;

        if (String(name.value).length == 0 || name.value == null || !name.value) {
          toast({
            type: 'Cảnh báo',
            message: 'Vui lòng đặt tên cho quyền này',
            type: 'warning',
            duration: 3000
          });
          return;
        }

        if (String(name.value).trim().length < 4) {
          toast({
            type: 'Cảnh báo',
            message: 'Tên của quyền phải có ít nhất 4 chữ cái, không tính dấu khoảng cách thừa',
            type: 'warning',
            duration: 3000
          });
          return;
        }

        if (String(status.value).length == 0 || status.value == null || !status.value) {
          toast({
            type: 'Cảnh báo',
            message: 'Vui lòng chọn trạng thái cho loại quyền này',
            type: 'warning',
            duration: 3000
          });
          return;
        }

        let formData = new URLSearchParams();
        formData.append('name', name.value);
        formData.append('status', status.value == '1' ? 'Hoạt động' : 'Tạm dừng');
        

        const response = await fetch('api/roles/create.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }, 
          body: formData.toString()
        });

        const data = await response.json();
        if (data) {
          toast({
            type: data.success ? 'success' : 'waring',
            message: data.message,
            title: 'Thông báo',
            duration: 3000
          });

          addDialog.remove();

          // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
          addButton.classList.remove("active");
        }


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
