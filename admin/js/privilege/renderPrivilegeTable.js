import { updatePrivilegeData } from "./updatePrivilegeData.js";
import { detailPrivilegeData } from "./detailPrivilegeData.js";
import { lockPrivilegeData } from "./lockPrivilegeData.js";


// Hàm cập nhật lại dữ liệu cho bảng Người dùng
export async function renderPrivilegeTable() {
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

  const role = data['data']['role'];

  // Biến chứa đối tượng bảng Người dùng
  const bodyInPrivilegeTable = document.querySelector(
    ".main__data > .main__table.privilege > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (const dataItem of role) {
    html += `
        <tr>
            <td>${dataItem.id}</td>
            <td>${dataItem.name}</td>
            <td id="data-status-privilege"><span ${
              dataItem.status === "Hoạt động" ? 'class="green"' : 'class="red"'
            }>${dataItem.status}</span></td>
            <td>
                <i id="detail-button-privilege" class="fa-solid fa-circle-info"></i>
                <i id="update-button-privilege" class="fa-solid fa-pen-to-square"></i>
                <i id="lock-button-privilege" class="fa-solid fa-${
                  dataItem.status === "Hoạt động" ? "" : "un"
                }lock"></i>
            </td>
        </tr>
    `;
  }

  // Cập nhật lại giao diện
  bodyInPrivilegeTable.innerHTML = html;

  // Gán sự kiện cho các nút sau khi thay đổi giao diện
  const idColumnInTable = document.querySelectorAll(
    ".main__data > .main__table.privilege > tbody > tr > td:first-of-type"
  );

  const statusColumnInTable = document.getElementById('data-status-privilege');

  const listButtonInTable = document.querySelectorAll(
    ".main__data > .main__table.privilege > tbody > tr > td:last-of-type"
  );
  listButtonInTable.forEach((buttons, row) => {
    // Các nút cần gán sự kiện trên mỗi dòng
    const detailButton = buttons.children[0];
    const updateButton = buttons.children[1];
    const lockButton = buttons.children[2];
    // Id của đối tượng đã được chọn để thao tác
    const idPrivilegeSelected = idColumnInTable.item(row);
    const statusPrivilegeSelected = statusColumnInTable.querySelector('span').innerText;

    // Gán sự kiện hiện dialog chi tiết người dùng
    detailButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      detailPrivilegeData(idPrivilegeSelected);
    });

    // Gán sự kiện hiện dialog sửa người dùng
    updateButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      updatePrivilegeData(idPrivilegeSelected);
    });

    // Gán sự kiện hiện dialog khoá / mở khoá người dùng
    lockButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      lockPrivilegeData(idPrivilegeSelected, statusPrivilegeSelected);
    });
  });
}
