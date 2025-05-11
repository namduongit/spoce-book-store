import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from '../../../public/js/toast.js'
import { showNotification } from "../dialogMessage.js";
import { renderPrivilegeTable } from "./renderPrivilegeTable.js";

// Hàm thiết lập sự kiện Sửa một nhóm quyền cho bảng
export async function updatePrivilegeData(idPrivilegeSelected) {
  // Phải truy vấn từ CSDL thông qua idPrivilegeSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
  const idPrivilege = parseInt(idPrivilegeSelected.innerText);
  const response = await fetch('api/action/getDetailList.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'maQuyen': idPrivilege
    })
  });
  const data = await response.json();

  const action = data['data']['action'];
  const feature = data['data']['feature'];
  const dataRole = data['data']['dataRole'];
  const detailRole = data['data']['detailRole'];


  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-privilege");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  let privilegeHTML = ``;
  if (feature && Array.isArray(feature)) {
    feature.forEach(dataItem => {
      if (dataItem.id > 4) {
        privilegeHTML += `
      <tr data-privilege=${dataItem.id}>
          <td>${dataItem.name}</td>
          <td><input type="checkbox" data-action=${1}></td>
          <td><input type="checkbox" data-action=${2}></td>
          <td><input type="checkbox" data-action=${3}></td>
          <td><input type="checkbox" data-action=${4}></td>
          <td><input type="checkbox" data-action=${5}></td>
      </tr>
      `;
      } else {
        privilegeHTML += `
      <tr data-privilege=${dataItem.id}>
          <td>${dataItem.name}</td>
          <td><input type="checkbox" data-action=${1}></td>
          <td><input type="checkbox" data-action=${2} disabled></td>
          <td><input type="checkbox" data-action=${3} disabled></td>
          <td><input type="checkbox" data-action=${4} disabled></td>
          <td><input type="checkbox" data-action=${5} disabled></td>
      </tr>
      `;
      }
    })
  }

  let actionHTML = ``;

  if (action && Array.isArray(action)) {
    action.forEach(dataItem => {
      actionHTML += `
        <th width="15%">${dataItem.name}</th>
      `;
    });
  }

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
                        <input type="text" id="update-privilege-id" readonly value="${dataRole['id']}" />
                    </div>
                    <div class="dialog__form-group full">
                      <label>Tên nhóm quyền</label>
                      <input type="text" id="update-privilege-name" value="${dataRole['name']}" autofocus/>
                    </div>
                    <div class="dialog__form-group">
                      <label>Trạng thái</label>
                      <select id="update-privilege-status">
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
                          ${actionHTML}
                        </tr>
                      </thead>
                      <tbody>
                          ${privilegeHTML}
                      </tbody>
                    </table>
                  </div>
                  <div class="dialog__buttons">
                    <button id="update-privilege-button" class="update">Sửa</button>
                  </div>
                </form >
        `;

  // Thêm vào body
  document.body.appendChild(updateDialog);

  // Hiển thị updateDialog
  updateDialog.showModal();

  /**
   * 1 là Lọc
   * 2 là Chi tiết
   * 3 là Thêm
   * 4 là Sửa
   * 5 là Xóa/Khóa
   */

  detailRole.forEach(roleItem => {
    const privilegeId = roleItem['privilegeId'];
    const actionId = roleItem['actionId'];

    // console.log(privilegeId);
    // console.log(actionId);

    document.querySelectorAll('.dialog__privilege-detail table tbody tr').forEach(trItem => {
      const dataPrivilege = trItem.getAttribute('data-privilege');
      if (dataPrivilege == privilegeId) {
        trItem.querySelectorAll('tr td input').forEach(inputItem => {
          const dataAction = inputItem.getAttribute('data-action');
          if (dataAction == actionId) {
            // console.log('Trùng nè');
            inputItem.checked = true;
          }
        });
      }
    });
  });

  document.getElementById('update-privilege-status').value = dataRole['status'] == 'Hoạt động' ? '1' : '0';

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });


  // Data lưu trữ phân quyền linh động
  const dialogDetail = document.querySelector('.dialog__privilege-detail');
  const tablePrivilege = dialogDetail.querySelectorAll('table tbody tr');

  let dataDetailPrivilege = {};

  // Render dữ liệu cũ vào đã nè
  detailRole.forEach(dataItem => {
    // const roleId = dataItem['roleId'];
    const privilegeId = dataItem['privilegeId'];
    const actionId = dataItem['actionId'];

    if (!dataDetailPrivilege[privilegeId]) {
      dataDetailPrivilege[privilegeId] = [];
    }

    dataDetailPrivilege[privilegeId].push(actionId);
  });

  console.log(dataDetailPrivilege)

  tablePrivilege.forEach(item => {
    item.querySelectorAll('td input').forEach(checkBox => {
      checkBox.addEventListener('click', () => {
        let privilege = item.getAttribute('data-privilege');
        let action = checkBox.getAttribute('data-action');

        // console.log(privilege);
        // console.log('Đã chọn: ', action);

        // Cập nhật vào đối tượng dataDetailPrivilege
        if (!dataDetailPrivilege[privilege]) {
          dataDetailPrivilege[privilege] = [];
        }

        // Kiểm tra nếu checkbox được chọn, thêm action vào mảng
        if (checkBox.checked) {
          dataDetailPrivilege[privilege].push(action);
        } else {
          // Nếu bỏ chọn, xóa action khỏi mảng
          dataDetailPrivilege[privilege] = dataDetailPrivilege[privilege].filter(item => item != action);
        }

        // console.log(dataDetailPrivilege);
      });
    });
  });

  // Gán sự kiện cho nút "Sửa" dialog
  document
    .getElementById("update-privilege-button")
    .addEventListener("click", async (event) => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      //   const id = document.getElementById("add-privilege-id");
      // const type = document.getElementById("update-privilege-type");
      //   const status = document.getElementById("add-privilege-status");

      // ... (Xử lý tiếp ở đây)
      //   console.log(id.value);
      // console.log(type.value);
      //   console.log(status.value);

      event.preventDefault();

      const name = document.getElementById("update-privilege-name");
      const status = document.getElementById("update-privilege-status");

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

      let yes = await showNotification(
        "Bạn có đồng ý sửa quyền này không"
      );

      if (!yes) return;

      let formData = new URLSearchParams();
      formData.append('name', name.value);
      formData.append('status', status.value == '1' ? 'Hoạt động' : 'Tạm dừng');

      const response = await fetch('api/action/update.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            "name": name.value,
            "status": status.value == 1 ? 'Hoạt động' : 'Tạm dừng',
            "action": dataDetailPrivilege,
            "roleId": dataRole['id']
          }
        })
      });

      const data = await response.json();
      if (data) {
        toast({
          type: data.success ? 'success' : 'waring',
          message: data.message,
          title: 'Thông báo',
          duration: 3000
        });

        updateDialog.remove();

        updateButton.classList.remove("active");
        renderPrivilegeTable(1);
      }


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
