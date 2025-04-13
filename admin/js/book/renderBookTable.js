import { detailBookData } from "./detailBookData.js";
import { updateBookData } from "./updateBookData.js";
import { lockBookData } from "./lockBookData.js";
import { filterbook } from "./filterBookData.js";
import { showNotification } from "../dialogMessage.js";


// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
export let data = [];

// Hàm cập nhật lại dữ liệu cho bảng Thể loại
export async function renderBookTable() {
  data = await filterbook();

  // Biến chứa đối tượng bảng Thể loại
  const bodyInBookTable = document.querySelector(
    ".main__data > .main__table.book > tbody"
  );

  let html = "";

  
  if(data.length != 0){
    data.forEach((book) => {
      html += `
        <tr>
            <td>${book.id}</td>
            <td><img src="public/uploads/books/${book.image}?v=${Date.now()}" alt="" width="90%" height="80%"/></td>
            <td>${book.name}</td>
            <td>${book.genreName}</td>
            <td>${book.quantity}</td>
            <td>
                <span class="${book.status === "ACTIVE" ? "green" : "red"}">
                    ${book.status}
                </span>
            </td>
            <td>
                <i class="fa-solid fa-circle-info detail-button-book"></i>  
                <i class="fa-solid fa-pen-to-square update-button-book"></i>
                <i class="fa-solid fa-${book.status === "ACTIVE" ? "" : "un"}lock lock-button-book"></i>
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
  }else{
        html =  `
            <tr>
                <td></td>
                <td>Danh sách trống</td>             
                <td></td>
            </tr>
        `;

      bodyInBookTable.innerHTML = html;
      // Cập nhật lại giao diện
  }

}
