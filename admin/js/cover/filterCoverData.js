import { renderCoverTable, getAllCoverData } from "./renderCoverTable.js";

// Hàm thiết lập sự kiện lọc thông tin bảng Loại bìa
export function filterCoverData() {
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-cover");
  
  // Gán sự kiện khi nhấn nút "Lọc"
  filterButton.addEventListener("click", async (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();
    
    let coverList = await getAllCoverData();
      if (!coverList || coverList.length === 0) {
          console.warn("Không có dữ liệu tác giả");
          return;
    }
    // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
    const idOrNameInput = document.getElementById("find-inp-cover").value.trim().toLowerCase();
    // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
    const sortSelect = document.getElementById("sort-slt-cover").value.trim().toLowerCase();
    // Giá trị cột cần sắp xếp
    const columnSelect = document.getElementById("column-slt-cover").value.trim().toLowerCase();
    // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
    const statusSelect = document.getElementById("status-slt-cover").value.trim().toLowerCase();

    // LỌC 
    coverList = coverList.filter((author) => {
      let nameMatch = author.name.toLowerCase().includes(idOrNameInput);
      let idMatch = String(author.id).includes(idOrNameInput);
      let statusMatch = statusSelect === "tất cả" || author.status.toLowerCase() === statusSelect;
      return (nameMatch || idMatch) && statusMatch;
    });

    //  sort
    
    if (columnSelect === "tên loại bìa") {
      coverList.sort((a, b) => (sortSelect === "tăng dần" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    }else{
      coverList.sort((a, b) => (sortSelect == "tăng dần" ? (a.id) - (b.id) : (b.id) - (a.id)));

    }    
    // 3️ hiển thị
    renderCoverTable(coverList);
  });
}
