import { updateCoverData } from "./updateCoverData.js";
import { lockCoverData } from "./lockCoverData.js";
import { filterCover } from "./filterCoverData.js";

const data = JSON.parse(sessionStorage.getItem('dataRole'));

var infoCover = data[14] && data[14].includes(2) ? '' : 'none__item';
var editCover = data[14] && data[14].includes(4) ? '' : 'none__item';
var lockCover = data[14] && data[14].includes(5) ? '' : 'none__item';

// Hàm cập nhật lại dữ liệu cho bảng Thể loại
export async function renderCoverTable(currentPage) {
  const data = (await filterCover(currentPage)) || [];
  // Biến chứa đối tượng bảng Thể loại
  const bodyInCoverTable = document.querySelector(
    ".main__data > .main__table.cover > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
          <tr>
              <td>${data[i].id}</td>
              <td>${data[i].name}</td>
              <td><span ${
                data[i].status === "Hoạt động" ? 'class="green"' : 'class="red"'
              }>${data[i].status}</span></td>
              <td>
                  <i class="fa-solid fa-pen-to-square ${editCover}"></i>
                  <i class="fa-solid fa-${
                    data[i].status === "Hoạt động" ? "" : "un"
                  }lock ${lockCover}"></i>
              </td>
          </tr>
      `;
  }
  if (data.length == 0) {
    html = `
          <tr>
              <td></td>
              <td>Danh sách trống</td>             
              <td></td>
          </tr>
      `;
    bodyInCoverTable.innerHTML = html;
  } else {
    // Cập nhật lại giao diện
    bodyInCoverTable.innerHTML = html;

    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.cover > tbody > tr > td:first-of-type"
    );
    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.cover > tbody > tr > td:last-of-type"
    );
    listButtonInTable.forEach((buttons, row) => {
      // Các nút cần gán sự kiện trên mỗi dòng
      const updateButton = buttons.children[0];
      const lockButton = buttons.children[1];
      // Id của đối tượng đã được chọn để thao tác
      const idCoverSelected = idColumnInTable.item(row).textContent;

      // Gán sự kiện hiện dialog sửa thể loại
      updateButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        updateCoverData(idCoverSelected);
      });

      // Gán sự kiện hiện dialog khoá / mở khoá thể loại
      lockButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        lockCoverData(idCoverSelected);
      });
    });
  }
}
