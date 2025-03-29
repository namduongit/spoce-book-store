import { getAllAuthorData, renderAuthorTable } from "./renderAuthorTable.js";

// Hàm thiết lập sự kiện lọc thông tin bảng Tác giả
export function filterAuthorData() {
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-author");

  // Gán sự kiện khi nhấn nút "Lọc"
  filterButton.addEventListener("click", async (e) => {
    e.preventDefault(); // Ngăn form submit mặc định

    // Lấy danh sách tất cả tác giả từ API
    let authorList = await getAllAuthorData();
    if (!authorList || authorList.length === 0) {
      console.warn("Không có dữ liệu tác giả");
      return;
    }

    // Biến chứa giá trị tìm kiếm từ input
    const idOrNameInput = document.getElementById("find-inp-author").value.trim().toLowerCase();
    
    // Giá trị lọc trạng thái
    const statusSelect = document.getElementById("status-slt-author").value.trim().toLowerCase();
    
    // Giá trị cột cần sắp xếp
    const columnSelect = document.getElementById("column-slt-author").value.trim().toLowerCase();
    
    // Giá trị sắp xếp tăng/giảm
    const sortSelect = document.getElementById("sort-slt-author").value.trim().toLowerCase();

    // 1️ lọc
    authorList = authorList.filter((author) => {
      let nameMatch = author.name.toLowerCase().includes(idOrNameInput);
      let idMatch = String(author.id).includes(idOrNameInput);
      let statusMatch = statusSelect === "tất cả" || author.status.toLowerCase() === statusSelect;
      return (nameMatch || idMatch) && statusMatch;
    });

    // sắp xếp
    if (columnSelect === "tên tác giả") {
      authorList.sort((a, b) => (sortSelect === "tăng dần" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    }else{
      authorList.sort((a, b) => (sortSelect == "tăng dần" ? (a.id) - (b.id) : (b.id) - (a.id)));

    }
    

    // hiẻne thị
    renderAuthorTable(authorList);
  });
}
