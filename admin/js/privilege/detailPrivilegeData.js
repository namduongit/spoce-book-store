import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một nhóm quyền cho bảng
export async function detailPrivilegeData(idPrivilegeSelected) {
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
  const detailButton = document.getElementById("detail-button-privilege");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  detailButton.classList.add("active");

  let privilegeHTML = ``;
  if (feature && Array.isArray(feature)) {
    feature.forEach(dataItem => {
      privilegeHTML += `
      <tr data-privilege=${dataItem.id}>
          <td>${dataItem.name}</td>
          <td><input type="checkbox" data-action=${1} disabled></td>
          <td><input type="checkbox" data-action=${2} disabled></td>
          <td><input type="checkbox" data-action=${3} disabled></td>
          <td><input type="checkbox" data-action=${4} disabled></td>
          <td><input type="checkbox" data-action=${5} disabled></td>
      </tr>
      `;
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
                        <input type="text" id="detail-privilege-id" readonly value="${dataRole['id']}"/>
                    </div>
                    <div class="dialog__form-group full">
                      <label>Tên nhóm quyền</label>
                      <input type="text" id="detail-privilege-name" readonly autofocus value="${dataRole['name']}"/>
                    </div>
                    <div class="dialog__form-group">
                      <label>Trạng thái</label>
                      <select id="detail-privilege-status" disabled>
                          <option value="" selected>${dataRole['status']}</option>
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
                </form >
        `;

  // Thêm vào body
  document.body.appendChild(detailDialog);

  // Hiển thị detailDialog
  detailDialog.showModal();

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
