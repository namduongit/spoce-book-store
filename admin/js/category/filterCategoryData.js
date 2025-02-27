// Hàm thiết lập sự kiện lọc thông tin bảng Thể loại
export function filterCategoryData() {
  // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
  const idOrNameInput = document.getElementById("find-inp-category");
  // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
  const sortSelect = document.getElementById("sort-slt-category");
  // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
  const statusSelect = document.getElementById("status-slt-category");
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-category");

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
