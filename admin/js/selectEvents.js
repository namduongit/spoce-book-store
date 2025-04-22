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

    // Không lưu chuỗi đã nhập
    inputInSelect.setAttribute("autocomplete", "off");

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
    // if (ulInSelect.querySelectorAll("li").length > 0) {
    //   inputInSelect.value = ulInSelect.children[0].textContent;
    //   ulInSelect.children[0].classList.add("select");
    // }
  });
}

// Nếu không chọn mục ban đầu thì thay đổi định dạng
export function isNotFirstItemSelected(select) {
  // - Thay đổi khi chọn mục
  if (select.value !== "") {
    select.classList.add("changed");
  } else {
    select.classList.remove("changed");
  }

  select.addEventListener("change", function (e) {
    // - Loại bỏ giá trị mặc định
    e.preventDefault();

    // - Thay đổi khi chọn mục
    if (select.value !== "") {
      select.classList.add("changed");
    } else {
      select.classList.remove("changed");
    }
  });
}

// Hàm
export function updateTimelineSelects() {
  // Biến giữ các đối tượng liên quan đến select cho việc lọc theo thời gian
  const timelineInputSelect = document.querySelector(
    ".main__timeline-slt > input"
  );
  const timelineDetailInputSelect = document.querySelector(
    ".main__timeline-detail-slt > input"
  );
  const timelineUlSelect = document.querySelector(".main__timeline-slt > ul");
  const timelineDetailUlSelect = document.querySelector(
    ".main__timeline-detail-slt > ul"
  );

  // Tuỳ chỉnh thời gian khi "lọc theo năm" hoặc "lọc theo tháng"
  const yearStart = 2010,
    yearEnd = 2030;
  let timelineDetailYearFormat = ``;
  for (let year = yearStart; year <= yearEnd; year++) {
    timelineDetailYearFormat += `<li>Năm ${String(year).padStart(4, "0")}</li>`;
  }
  let timelineDetailMonthFormat = ``;
  for (let year = yearStart; year <= yearEnd; year++) {
    for (let month = 1; month <= 12; month++) {
      timelineDetailMonthFormat += `<li>Tháng ${String(month).padStart(
        2,
        "0"
      )}/${String(year).padStart(4, "0")}</li>`;
    }
  }

  // Gán sự kiện cho "Khoảng thời gian"
  timelineUlSelect.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Cập nhật lại "Thời gian cụ thể"
    timelineDetailInputSelect.value = "";

    // Tuỳ theo giá trị "Khoảng thời gian" mà cập nhật tương ứng
    if (timelineInputSelect.value === "Lọc theo năm") {
      timelineDetailUlSelect.innerHTML = timelineDetailYearFormat;
    } else {
      timelineDetailUlSelect.innerHTML = timelineDetailMonthFormat;
    }

    // Gán sự kiện cho "Thời gian cụ thể"
    timelineDetailUlSelect.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      console.log(timelineDetailInputSelect.value);
    });
  });
}
