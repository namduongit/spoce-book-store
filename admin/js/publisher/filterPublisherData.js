// Hàm thiết lập sự kiện lọc thông tin bảng Nhà xuất bản
export function filterPublisherData() {
  // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
  const idOrNameInput = document.getElementById("find-inp-publisher");
  // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
  const sortSelect = document.getElementById("sort-slt-publisher");
  // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
  const statusSelect = document.getElementById("status-slt-publisher");
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-publisher");

  // Gán sự kiện khi nhấn nút "Lọc"
  filterButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    //
    console.log(idOrNameInput.value);
    console.log(sortSelect.value);
    console.log(statusSelect.value);
  });
}
