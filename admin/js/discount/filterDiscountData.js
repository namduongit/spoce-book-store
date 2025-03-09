// Hàm thiết lập sự kiện lọc thông tin bảng Khuyến mãi
export function filterDiscountData() {
  // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
  const idOrNameInput = document.getElementById("find-id-or-name-inp-discount");
  // Biến chứa đối tượng thẻ select liên quan đến lọc loại khuyến mãi
  const typeSelect = document.getElementById("type-slt-discount");
  // Biến chứa đối tượng thẻ input liên quan đến lọc ngày áp dụng (bắt đầu - kết thúc)
  const dateStartInput = document.getElementById(
    "find-date-start-inp-discount"
  );
  const dateEndInput = document.getElementById("find-date-end-inp-discount");
  // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
  const statusSelect = document.getElementById("status-slt-discount");
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-discount");

  // Gán sự kiện khi nhấn nút "Lọc"
  filterButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    //
    console.log(idOrNameInput.value);
    console.log(typeSelect.value);
    console.log(dateStartInput.value);
    console.log(dateEndInput.value);
    console.log(statusSelect.value);
  });
}
