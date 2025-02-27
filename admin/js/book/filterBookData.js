// Hàm thiết lập sự kiện lọc thông tin bảng Sách
export function filterBookData() {
  // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
  const idOrNameInput = document.getElementById("find-inp-book");
  // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
  const sortSelect = document.getElementById("sort-slt-book");
  // Biến chứa đối tượng thẻ select liên quan đến lọc thể loại
  const typeSelect = document.getElementById("type-slt-book");
  // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
  const statusSelect = document.getElementById("status-slt-book");
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-book");

  // Gán sự kiện khi nhấn nút "Lọc"
  filterButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    //
    console.log(idOrNameInput.value);
    console.log(sortSelect.value);
    console.log(typeSelect.value);
    console.log(statusSelect.value);
  });
}
