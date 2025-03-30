import { detailBookData } from "./detailBookData.js";
import { updateBookData } from "./updateBookData.js";
import { lockBookData } from "./lockBookData.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)

async function getAllBookData(){
  
      const id_or_bookName = document.getElementById("find-inp-book").value.trim();
      const categoryBook = document.getElementById("type-slt-book").value;
      const orderByBook = document.getElementById("sort_column-slt-book").value;
      const orderTypeBook = document.getElementById("sort-slt-book").value;
      const statusBook = document.getElementById("status-slt-book").value;
      
      // console.log(id_or_bookName,categoryBook,orderByBook , orderTypeBook, statusBook );
        let orderBy = '';
        switch (orderByBook) {
          case 'Mã sách': orderBy = 'maSach'; break;
          case 'Tiêu đề': orderBy = 'tenSach'; break;
          case 'Tên thể loại': orderBy = 'tenTheLoai'; break;
          case 'Năm xuất bản': orderBy = 'namXuatBan'; break;
        }
        
        
        let orderType = '';
        switch(orderTypeBook){
          case 'Tăng dần' : orderType = 'ASC'; break;
          case 'Giảm dần' : orderType = 'DESC'; break;
        }

        let category = '';
        if(categoryBook !== 'Tất cả') category = categoryBook;
        
        let status = '';
        if(statusBook !== 'Tất cả') status = statusBook;
        
  
        // Xây dựng URL động, chỉ thêm tham số nếu có giá trị
        let params = new URLSearchParams();
        if (id_or_bookName) params.append("id_or_bookName", id_or_bookName);
        if (categoryBook) params.append("categoryBook", category);
        if (orderByBook) params.append("orderByBook", orderBy);
        if (orderTypeBook) params.append("orderTypeBook", orderType);
        if (statusBook) params.append("statusBook", status);
  
        // let url = `api/books/getbook.php?`;
        let url = `api/books/getbook.php?${params.toString()}`;
        console.log("Request URL:", url);
        
        try {
          let response = await fetch(url);
          if (!response.ok) {
                throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
            }
            
            let data = await response.json();
            console.log("Dữ liệu nhận được:", data);
            
            return data;
            
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            alert("Lỗi khi lấy dữ liệu: " + error.message);
            return [];
          }
}
export async function renderBookTable() {
  let bookList = await getAllBookData();
  console.log(bookList);

  const bodyInBookTable = document.querySelector(
    ".main__data > .main__table.book > tbody"
  );

  if (!bodyInBookTable) {
    console.log("Không tìm thấy bảng hiển thị dữ liệu sách!");
    return;
  }

  if (!bookList || !Array.isArray(bookList) || bookList.length === 0) {
    alert(bookList.error || "Không có sản phẩm phù hợp");
    return;
  }

  // 🛠 Tạo HTML trước
  let html = "";
  bookList.forEach((book) => {
    html += `
      <tr>
          <td>${book.id}</td>
          <td><img src="public/uploads/books/${book.image}" alt="" width="90%" height="80%"/></td>
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

  // Gán toàn bộ HTML một lần
  bodyInBookTable.innerHTML = html;

  // Lấy lại danh sách các hàng sau khi cập nhật HTML
  const listRows = document.querySelectorAll(".main__table.book > tbody > tr");

  // Gán sự kiện sau khi cập nhật HTML
  listRows.forEach((row, index) => {
    const book = bookList[index];
    const detailButton = row.querySelector(".detail-button-book");
    const updateButton = row.querySelector(".update-button-book");
    const lockButton = row.querySelector(".lock-button-book");

    if (detailButton) {
      detailButton.addEventListener("click", (e) => {
        e.preventDefault();
        detailBookData(book);
      });
    }

    if (updateButton) {
      updateButton.addEventListener("click", (e) => {
        e.preventDefault();
        updateBookData(book);
      });
    }

    if (lockButton) {
      lockButton.addEventListener("click", (e) => {
        e.preventDefault();
        lockBookData(book);
      });
    }
  });
}
