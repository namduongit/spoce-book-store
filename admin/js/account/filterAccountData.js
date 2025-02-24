// Hàm thiết lập sự kiện lọc thông tin bảng Người dùng
export function filterAccountData() {
  // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
  const idOrUsernameInput = document.getElementById("find-inp-account");
  // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
  const sortSelect = document.getElementById("sort-slt-account");
  // Biến chứa đối tượng thẻ select liên quan đến lọc quyền
  const privilegeSelect = document.getElementById("privilege-slt-account");
  // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
  const statusSelect = document.getElementById("status-slt-account");
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-account");

  // Gán sự kiện khi nhấn nút "Lọc"
  filterButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    //
    console.log(idOrUsernameInput.value);
    console.log(sortSelect.value);
    console.log(privilegeSelect.value);
    console.log(statusSelect.value);
  });
}
