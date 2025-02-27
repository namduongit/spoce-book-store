// Hàm định dạng việc hiển thị tiền VNĐ
export function vietnamMoneyFormat(money) {
  let format = String(money).split("").reverse();
  let count = 0;
  for (let i = 0; i < format.length; i++) {
    if (++count === 4) {
      format.splice(i, 0, ".");
      count = 0;
    }
  }
  return format.reverse().join("");
}

// Hàm hiện date picker khi nhấn vào (hỗ trợ cho việc hiệu ứng)
export function clickToShowDatePicker(id) {
  document.getElementById(id).addEventListener("click", function (e) {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    this.showPicker(); 
  });
}

export function defaultDateSelected(id) {
  const date = document.getElementById(id);

  date.addEventListener("change", (e) => {
    if (!date.value) {
      date.classList.remove("hasValidDate");
    } else {
      date.classList.add("hasValidDate");
    }
  });
}
