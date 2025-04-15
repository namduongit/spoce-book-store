// Hàm thiết lập sự kiện lọc thông tin bảng Người dùng

export async function filterAccount(pageIsSelected = 1) {
  try {
    // Lấy dữ liệu từ API
    // Biến chứa đối tượng thẻ input liên quan đến tìm kiếm thông tin
    const idOrUsernameInput = document
      .getElementById("find-inp-account")
      .value.toLowerCase()
      .trim();
    // Biến chứa đối tượng thẻ select liên quan đến sắp xếp thông tin
    const sortSelect = document
      .getElementById("sort-slt-account")
      .value.toLowerCase()
      .trim();
    // Biến chứa đối tượng thẻ select liên quan đến lọc quyền
    const privilegeSelect = document
      .getElementById("privilege-slt-account")
      .value.toLowerCase()
      .trim();
    // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
    const statusSelect = document.getElementById("status-slt-account");
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return {
      list: [],
      total: 0,
      page: 1,
      limit: 10,
      total_pages: 0,
    };
  }
}
export function filterAccountData() {
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
