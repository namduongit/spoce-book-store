import { getAllPublisherData, renderPublisherTable } from "./renderPublisherTable.js";

// Hàm thiết lập sự kiện lọc thông tin bảng Nhà xuất bản
export function filterPublisherData() {
  
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-publisher");

    
    // Gán sự kiện khi nhấn nút "Lọc"
    filterButton.addEventListener("click", async (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

       // Lấy danh sách tất cả tác giả từ API
          let publisherList = await getAllPublisherData();
          if (!publisherList || publisherList.length === 0) {
            console.warn("Không có dữ liệu tác giả");
            return;
          }
          
    // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
    const idOrNameInput = document.getElementById("find-inp-publisher").value.trim().toLowerCase();
    // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
    const sortSelect = document.getElementById("sort-slt-publisher").value.trim().toLowerCase();
        // Giá trị cột cần sắp xếp
    const columnSelect = document.getElementById("column-slt-publisher").value.trim().toLowerCase();
    
    // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
    const statusSelect = document.getElementById("status-slt-publisher").value.trim().toLowerCase();
      
    publisherList = publisherList.filter((author) => {
      let nameMatch = author.name.toLowerCase().includes(idOrNameInput);
      let idMatch = String(author.id).includes(idOrNameInput);
      let statusMatch = statusSelect === "tất cả" || author.status.toLowerCase() === statusSelect;
      return (nameMatch || idMatch) && statusMatch;
    });

    // sắp xếp
    if (columnSelect === "tên nhà xuất bản") {
      publisherList.sort((a, b) => (sortSelect === "tăng dần" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    }else{
      publisherList.sort((a, b) => (sortSelect == "tăng dần" ? (a.id) - (b.id) : (b.id) - (a.id)));

    }
       // hiẻne thị
       renderPublisherTable(publisherList);
  });
}
