import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from '../../../public/js/toast.js'
import { showNotification } from "../dialogMessage.js";
import { renderPrivilegeTable } from "./renderPrivilegeTable.js";

// Hàm thiết lập sự kiện Thêm một nhóm quyền cho bảng
export async function addPrivilegeData() {
  const response = await fetch('api/action/getDetailList.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'maQuyen': 1
    })
  });
  const data = await response.json();

  const action = data['data']['action'];
  const feature = data['data']['feature'];

  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-privilege");
  if (!addButton) return;

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

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
        
      });
    }

    let actionHTML = ``;

    if (action && Array.isArray(action)) {
      action.forEach(dataItem => {
        actionHTML += `
          <th width="15%">${dataItem.name}</th>
        `;
      });
    }

    // Tạo một dialog để thêm một nhóm quyền
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("privilege");
    addDialog.style.width = "1178px";
    // - Ghi nội dung dialog
    /**
     * 
      <div class="dialog__form-group">
          <label>Mã nhóm quyền</label>
          <input type="text" id="add-privilege-id" readonly />
      </div>
     */
    addDialog.innerHTML = `
                <h1 class="dialog__title">Thêm nhóm quyền</h1>
                <button id="close-privilege-button" class="dialog__close">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="dialog__line"></div>
                <form method="post" class="dialog__form">
                  <div class="dialog__row">

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
                          ${actionHTML}
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


    // Tạo phân quyền
    const dialogDetail = document.querySelector('.dialog__privilege-detail');
    const tablePrivilege = dialogDetail.querySelectorAll('table tbody tr');

    let dataDetailPrivilege = {};


    tablePrivilege.forEach(item => {
      item.querySelectorAll('td input').forEach(checkBox => {
        checkBox.addEventListener('click', () => {
          let privilege = item.getAttribute('data-privilege');
          let action = checkBox.getAttribute('data-action');

          console.log(privilege);
          console.log('Đã chọn: ', action);

          // Cập nhật vào đối tượng dataDetailPrivilege
          if (!dataDetailPrivilege[privilege]) {
            dataDetailPrivilege[privilege] = [];
          }

          // Kiểm tra nếu checkbox được chọn, thêm action vào mảng
          if (checkBox.checked) {
            dataDetailPrivilege[privilege].push(action);
          } else {
            // Nếu bỏ chọn, xóa action khỏi mảng
            dataDetailPrivilege[privilege] = dataDetailPrivilege[privilege].filter(item => item !== action);
          }

          console.log(dataDetailPrivilege);
        });
      });
    });



    // Gán sự kiện cho nút "Thêm" dialog
    document
      .getElementById("add-privilege-button")
      .addEventListener("click", async (event) => {
        event.preventDefault();

        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        // const id = document.getElementById("add-privilege-id");
        const name = document.getElementById("add-privilege-name");
        const status = document.getElementById("add-privilege-status");

        // ... (Xử lý tiếp ở đây)
        // console.log(id.value)
        // console.log(name.value)
        // console.log(status.value)


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
          "Bạn có đồng ý thêm quyền mới không không."
        );

        if (!yes) return;

        let formData = new URLSearchParams();
        formData.append('name', name.value);
        formData.append('status', status.value == '1' ? 'Hoạt động' : 'Tạm dừng');


        const response = await fetch('api/action/create.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              "name": name.value,
              "status": status.value == 1 ? 'Hoạt động' : 'Tạm dừng',
              "action": dataDetailPrivilege
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

          addDialog.remove();
          // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
          addButton.classList.remove("active");
          renderPrivilegeTable(1);
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
