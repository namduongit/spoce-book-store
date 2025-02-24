//
export function selectFormEvents() {
  // Biến tạm chứa select của đối tượng có class ".slt-form-1"
  const selectForm01 = document.querySelectorAll(".main__row > .slt-form-1");

  // Duyệt qua từng select để gán sự kiện
  selectForm01.forEach((select) => {
    // Đối tượng thẻ input trong select
    const inputInSelect = select.children[0];
    // Đối tượng thẻ span trong select (không dùng tới, viết ra để rõ ràng)
    const spanInSelect = select.children[1];
    // Đối tượng thẻ ul trong select
    const ulInSelect = select.children[2];

    // Sự kiện kiểm tra đã có mục nào đã chọn trước đó hay chưa khi focus vào input
    inputInSelect.addEventListener("focus", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gán sự kiện khi nhấn vào một mục
      for (let i = 0; i < ulInSelect.childElementCount; i++) {
        const item = ulInSelect.children[i];
        item.addEventListener("click", (e) => {
          // Loại bỏ giá trị mặc định
          e.preventDefault();

          // Gán giá trị của item được chọn cho thẻ input
          inputInSelect.value = item.textContent;
        });
      }

      // Duyệt qua từng mục có cùng giá trị với giá trị của thẻ input hiện tại
      for (let i = 0; i < ulInSelect.childElementCount; i++) {
        const item = ulInSelect.children[i];
        if (item.textContent == inputInSelect.value) {
          // Thêm class "active" vào nút được nhấn
          item.classList.add("select");
        } else {
          // Xoá class "active" khỏi các nút không được nhấn
          item.classList.remove("select");
        }
      }
    });
  });
}
