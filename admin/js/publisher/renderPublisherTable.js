import { updatePublisherData } from "./updatePublisherData.js";
import { lockPublisherData } from "./lockPublisherData.js";
import { filterPublisher } from "./filterPublisherData.js";

const data = JSON.parse(sessionStorage.getItem('dataRole'));

var infoPublisher = data[15] && data[15].includes(2) ? '' : 'none__item';
var editPublisher = data[15] && data[15].includes(4) ? '' : 'none__item';
var lockPublisher = data[15] && data[15].includes(5) ? '' : 'none__item';

// Hàm cập nhật lại dữ liệu cho bảng Nhà xuất bản
export async function renderPublisherTable(currentPage) {
  const data = (await filterPublisher(currentPage)) || [];
  // Biến chứa đối tượng bảng Nhà xuất bản
  const bodyInPublisherTable = document.querySelector(
    ".main__data > .main__table.publisher > tbody"
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
          <i class="fa-solid fa-pen-to-square ${editPublisher}"></i>
          <i class="fa-solid fa-${
            data[i].status === "Hoạt động" ? "" : "un"
          }lock ${lockPublisher}"></i>
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
    bodyInPublisherTable.innerHTML = html;
  } else {
    // Cập nhật lại giao diện
    bodyInPublisherTable.innerHTML = html;

    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.publisher > tbody > tr > td:first-of-type"
    );
    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.publisher > tbody > tr > td:last-of-type"
    );
    listButtonInTable.forEach((button, row) => {
      // Các nút cần gán sự kiện trên mỗi dòng
      const updateButton = button.children[0];
      const lockButton = button.children[1];
      // Id của đối tượng đã được chọn để thao tác
      const idPublisherSelected = idColumnInTable.item(row).textContent;

      // Gán sự kiện hiện dialog sửa thể loại
      updateButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        updatePublisherData(idPublisherSelected);
      });

      // Gán sự kiện hiện dialog khoá / mở khoá thể loại
      lockButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        lockPublisherData(idPublisherSelected);
      });
    });
  }
}
