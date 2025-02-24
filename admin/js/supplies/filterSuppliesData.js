// Hàm thiết lập sự kiện lọc thông tin bảng Nhà cung cấp
export function filterSuppliesData() {
  // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
  const idOrNameInput = document.getElementById("find-inp-supplies");
  // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
  const sortSelect = document.getElementById("sort-slt-supplies");
  // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
  const statusSelect = document.getElementById("status-slt-supplies");
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-supplies");

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
