import { renderCategoryTable, getAllCategoryData } from "./renderCategoryTable.js";

// Hàm thiết lập sự kiện lọc thông tin bảng Thể loại
export function filterCategoryData() {
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-category");
  
  // Gán sự kiện khi nhấn nút "Lọc"
  filterButton.addEventListener("click", async (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    let categoryList = await getAllCategoryData();
    if (!categoryList || categoryList.length === 0) {
      console.warn("Không có dữ liệu tác giả");
      return;
    }
    // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
    const idOrNameInput = document.getElementById("find-inp-category").value.trim().toLowerCase();
      // Giá trị cột cần sắp xếp
    const columnSelect = document.getElementById("column-slt-category").value.trim().toLowerCase();
    // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
    const sortSelect = document.getElementById("sort-slt-category").value.trim().toLowerCase();
    // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
    const statusSelect = document.getElementById("status-slt-category").value.trim().toLowerCase();

    categoryList = categoryList.filter((author) => {
      let nameMatch = author.name.toLowerCase().includes(idOrNameInput);
      let idMatch = String(author.id).includes(idOrNameInput);
      let statusMatch = statusSelect === "tất cả" || author.status.toLowerCase() === statusSelect;
      return (nameMatch || idMatch) && statusMatch;
    });

    // *SẮP XẾP DỮ LIỆU**
    
    if (columnSelect === "tên thể loại") {
      categoryList.sort((a, b) => (sortSelect === "tăng dần" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    }else{
      categoryList.sort((a, b) => (sortSelect == "tăng dần" ? (a.id) - (b.id) : (b.id) - (a.id)));

    }
    renderCategoryTable(categoryList);
    
    console.log(idOrNameInput);
    console.log(columnSelect);
    console.log(sortSelect);
    console.log(statusSelect);
  });
}
