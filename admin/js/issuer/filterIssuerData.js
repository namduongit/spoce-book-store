// Hàm thiết lập sự kiện lọc thông tin bảng Nhà phát hành
export function filterIssuerData() {
  // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
  const idOrNameInput = document.getElementById("find-inp-issuer");
  // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
  const sortSelect = document.getElementById("sort-slt-issuer");
  // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
  const statusSelect = document.getElementById("status-slt-issuer");
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-issuer");

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
