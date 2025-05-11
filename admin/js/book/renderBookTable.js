import { detailBookData } from "./detailBookData.js";
import { updateBookData } from "./updateBookData.js";
import { lockBookData } from "./lockBookData.js";
import { filterBook } from "./filterBookData.js";

const data = JSON.parse(sessionStorage.getItem('dataRole'));

var infoBook = data[11] && data[11].includes(2) ? '' : 'none__item';
var editBook = data[11] && data[11].includes(4) ? '' : 'none__item';
var lockBook = data[11] && data[11].includes(5) ? '' : 'none__item';


// Hàm cập nhật lại dữ liệu cho bảng Thể loại
export async function renderBookTable(currentPage) {
  const data = await filterBook(currentPage);

  // Biến chứa đối tượng bảng Thể loại
  const bodyInBookTable = document.querySelector(
    ".main__data > .main__table.book > tbody"
  );

  let html = "";

  if (data.length != 0) {
    data.forEach((book) => {
      html += `
        <tr>
            <td>${book.id}</td>
            <td><img src="public/uploads/books/${
              book.image
            }" alt="" width="90%" height="80%"/></td>
            <td>${book.name}</td>
            <td>${book.categoryName}</td>
            <td>${book.inventory}</td>
            <td>
                <span class="${book.status === "Đang bán" ? "green" : "red"}">
                    ${book.status}
                </span>
            </td>
            <td>
                <i class="fa-solid fa-circle-info ${infoBook}"></i>  
                <i class="fa-solid fa-pen-to-square ${editBook}"></i>
                <i class="fa-solid fa-${
                  book.status === "Đang bán" ? "" : "un"
                }lock lock-button-book ${lockBook}"></i>
            </td>
        </tr>`;
    });

    bodyInBookTable.innerHTML = html;
    // Cập nhật lại giao diện

    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.book > tbody > tr > td:first-of-type"
    );
    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.book > tbody > tr > td:last-of-type"
    );
    listButtonInTable.forEach((buttons, row) => {
      // Các nút cần gán sự kiện trên mỗi dòng
      const detailButton = buttons.children[0];
      const updateButton = buttons.children[1];
      const lockButton = buttons.children[2];
      // Id của đối tượng đã được chọn để thao tác
      const idBookSelected = idColumnInTable.item(row).textContent;

      // Gán sự kiện hiện dialog chi tiết người dùng
      detailButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        detailBookData(idBookSelected);
      });

      // Gán sự kiện hiện dialog sửa người dùng
      updateButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        updateBookData(idBookSelected);
      });

      // Gán sự kiện hiện dialog khoá / mở khoá người dùng
      lockButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        lockBookData(idBookSelected);
      });
    });
  } else {
    html = `
      <tr>
          <td colspan="4">Trống</td>
      </tr>`;

    bodyInBookTable.innerHTML = html;
    // Cập nhật lại giao diện
  }
}
