import { updateCategoryData } from "./updateCategoryData.js";
import { lockCategoryData } from "./lockCategoryData.js";
import { filterCategory } from "./filterCategoryData.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
let data = [];

// Hàm cập nhật lại dữ liệu cho bảng Thể loại
export async function renderCategoryTable(pageIsSelected = 1) {

  data = await filterCategory(pageIsSelected);

  // Biến chứa đối tượng bảng Thể loại
  const bodyInCategoryTable = document.querySelector(
    ".main__data > .main__table.category > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
          <tr>
              <td>${data[i].id}</td>
              <td>${data[i].name}</td>
              <td><span ${
                data[i].status === "ACTIVE" ? 'class="green"' : 'class="red"'
              }>${data[i].status}</span></td>
              <td>
                  <i id="update-button-category" class="fa-solid fa-pen-to-square"></i>
                  <i id="lock-button-category" class="fa-solid fa-${
                    data[i].status === "ACTIVE" ? "" : "un"
                  }lock"></i>
              </td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyInCategoryTable.innerHTML = html;

  // Gán sự kiện cho các nút sau khi thay đổi giao diện
  const idColumnInTable = document.querySelectorAll(
    ".main__data > .main__table.category > tbody > tr > td:first-of-type"
  );
  const listButtonInTable = document.querySelectorAll(
    ".main__data > .main__table.category > tbody > tr > td:last-of-type"
  );
  listButtonInTable.forEach((buttons, row) => {
    // Các nút cần gán sự kiện trên mỗi dòng
    const updateButton = buttons.children[0];
    const lockButton = buttons.children[1];
    // Id của đối tượng đã được chọn để thao tác
    const idCategorySelected = idColumnInTable.item(row).textContent;

    // Gán sự kiện hiện dialog sửa thể loại
    updateButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      updateCategoryData(idCategorySelected);
    });

    // Gán sự kiện hiện dialog khoá / mở khoá thể loại
    lockButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      lockCategoryData(idCategorySelected);
    });
  });
}
