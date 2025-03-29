import { getAllSupplierData, renderSuppliesTable } from "./renderSuppliesTable.js";


// Hàm thiết lập sự kiện lọc thông tin bảng Nhà cung cấp
export function filterSuppliesData() {
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-supplies");
  
  // Gán sự kiện khi nhấn nút "Lọc"
  filterButton.addEventListener("click", async (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

      // Lấy danh sách tất cả tác giả từ API
      let supplierList = await getAllSupplierData();
      if (!supplierList || supplierList.length === 0) {
        console.warn("Không có dữ liệu nhà xuất bản");
        return;
      }

    // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
    const idOrNameInput = document.getElementById("find-inp-supplies").value.trim().toLowerCase();
    // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
    const sortSelect = document.getElementById("sort-slt-supplies").value.trim().toLowerCase();
        // Giá trị cột cần sắp xếp
    const columnSelect = document.getElementById("column-slt-supplies").value.trim().toLowerCase();
    
    // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
    const statusSelect = document.getElementById("status-slt-supplies").value.trim().toLowerCase();


      // lọc
        supplierList = supplierList.filter((author) => {
          let nameMatch = author.name.toLowerCase().includes(idOrNameInput);
          let idMatch = String(author.id).includes(idOrNameInput);
          let statusMatch = statusSelect === "tất cả" || author.status.toLowerCase() === statusSelect;
          return (nameMatch || idMatch) && statusMatch;
        });
    
        // sắp xếp
        if (columnSelect === "tên nhà cung cấp") {
          supplierList.sort((a, b) => (sortSelect === "tăng dần" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
        }else{
          supplierList.sort((a, b) => (sortSelect == "tăng dần" ? (a.id) - (b.id) : (b.id) - (a.id)));
    
        }
        
    
        // hiẻne thị
        renderSuppliesTable(supplierList);
  });
}
