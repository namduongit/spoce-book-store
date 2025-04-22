import { updateAuthorData } from "./updateAuthorData.js";
import { lockAuthorData } from "./lockAuthorData.js";
import { filterAuthor } from "./filterAuthorData.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
let data = [];

// Hàm cập nhật lại dữ liệu cho bảng Tác giả
export async function renderAuthorTable(currentPage) {
  data = await filterAuthor(currentPage);
  // Biến chứa đối tượng bảng Tác giả
  const bodyInAuthorTable = document.querySelector(
    ".main__data > .main__table.author > tbody"
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
                  <i class="fa-solid fa-pen-to-square"></i>
                  <i class="fa-solid fa-${
                    data[i].status === "Hoạt động" ? "" : "un"
                  }lock"></i>
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
    bodyInAuthorTable.innerHTML = html;
  } else {
    // Cập nhật lại giao diện
    bodyInAuthorTable.innerHTML = html;

    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.author > tbody > tr > td:first-of-type"
    );
    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.author > tbody > tr > td:last-of-type"
    );
    listButtonInTable.forEach((buttons, row) => {
      // Các nút cần gán sự kiện trên mỗi dòng
      const updateButton = buttons.children[0];
      const lockButton = buttons.children[1];
      // Id của đối tượng đã được chọn để thao tác
      const idAuthorSelected = idColumnInTable.item(row).textContent;

      // Gán sự kiện hiện dialog sửa Tác giả
      updateButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        updateAuthorData(idAuthorSelected);
      });

      // Gán sự kiện hiện dialog khoá / mở khoá Tác giả
      lockButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        lockAuthorData(idAuthorSelected);
      });
    });
  }
}
