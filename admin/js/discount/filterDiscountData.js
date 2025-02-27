// Hàm thiết lập sự kiện lọc thông tin bảng Khuyến mãi
export function filterDiscountData() {
  // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
  const idOrNameInput = document.getElementById("find-id-or-name-inp-discount");
  // Biến chứa đối tượng thẻ input liên quan đến lọc ngày bắt đầu (trước - sau)
  const dateStartBeforeInput = document.getElementById(
    "find-date-start-before-inp-discount"
  );
  const dateStartAfterInput = document.getElementById(
    "find-date-start-after-inp-discount"
  );
  // Biến chứa đối tượng thẻ input liên quan đến lọc ngày kết thúc (trước - sau)
  const dateEndBeforeInput = document.getElementById(
    "find-date-end-before-inp-discount"
  );
  const dateEndAfterInput = document.getElementById(
    "find-date-end-after-inp-discount"
  );
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
    console.log(dateStartBeforeInput.value);
    console.log(dateStartAfterInput.value);
    console.log(dateEndBeforeInput.value);
    console.log(dateEndAfterInput.value);
    console.log(statusSelect.value);
  });
}
