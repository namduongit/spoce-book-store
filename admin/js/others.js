// Hàm định dạng việc hiển thị tiền VNĐ
export function vietnamMoneyFormat(money) {
  return money.toLocaleString("vi-VN");
}

// Hàm đọc tiền theo kiểu Việt
export function numberToVietnamWords(n) {
  if (n === 0) return "Không đồng";

  let laSoAm = false;
  if (n < 0) {
    n *= -1;
    laSoAm = true;
  }

  const donVi = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const hangChuc = [
    "",
    "mười",
    "hai mươi",
    "ba mươi",
    "bốn mươi",
    "năm mươi",
    "sáu mươi",
    "bảy mươi",
    "tám mươi",
    "chín mươi",
  ];
  const hangTram = [
    "",
    "một trăm",
    "hai trăm",
    "ba trăm",
    "bốn trăm",
    "năm trăm",
    "sáu trăm",
    "bảy trăm",
    "tám trăm",
    "chín trăm",
  ];

  function docBaChuSo(so) {
    let tram = Math.floor(so / 100);
    let chuc = Math.floor((so % 100) / 10);
    let donvi = so % 10;
    let result = "";

    if (tram > 0) result += hangTram[tram] + " ";
    if (chuc > 1) {
      result += hangChuc[chuc] + " ";
      if (donvi > 0) result += donVi[donvi];
    } else if (chuc === 1) {
      result += "mười ";
      if (donvi > 0 && donvi !== 5) result += donVi[donvi];
      else if (donvi === 5) result += "lăm";
    } else {
      if (donvi > 0) result += (tram > 0 ? "lẻ " : "") + donVi[donvi];
    }
    return result.trim();
  }

  function docHangTrieu(so) {
    let trieu = Math.floor(so / 1_000_000);
    let nghin = Math.floor((so % 1_000_000) / 1_000);
    let tram = so % 1_000;
    let result = "";

    if (trieu > 0) result += docBaChuSo(trieu) + " triệu ";
    if (nghin > 0) result += docBaChuSo(nghin) + " nghìn ";
    if (tram > 0) result += docBaChuSo(tram);

    return result.trim();
  }

  return (
    (laSoAm
      ? "Âm " + docHangTrieu(n)
      : " " +
        docHangTrieu(n).charAt(0).toUpperCase() +
        docHangTrieu(n).slice(1)) + " đồng"
  );
}

// Hàm hiện date picker khi nhấn vào (hỗ trợ cho việc hiệu ứng)
export function clickToShowDatePicker(id) {
  document.getElementById(id).addEventListener("click", function (e) {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    this.showPicker();
  });
}

// Hàm kiểm tra nếu thẻ input có type="date" đang có giá trị là "dd/mm/yyyy"
export function defaultDateSelected(id) {
  const date = document.getElementById(id);

  if (!date.value) {
    date.classList.remove("hasValidDate");
  } else {
    date.classList.add("hasValidDate");
  }
  date.addEventListener("change", (e) => {
    if (!date.value) {
      date.classList.remove("hasValidDate");
    } else {
      date.classList.add("hasValidDate");
    }
  });
}

// Hàm chuyển từ định dạng yyyy-mm-dd sang dd-mm-yyyy
function formatDate1(date) {
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear().toString().padStart(4, "0");
  return `${day}/${month}/${year}`;
}

// Hàm chuyển từ định dạng dd-mm-yyyy sang yyyy-mm-dd
export function formatDate2(date) {
  let day = date.slice(0, 2);
  let month = date.slice(3, 5);
  let year = date.slice(6);
  return `${year}-${month}-${day}`;
}

// Hàm lấy ra danh sách các tuần
export function getWeeksInMonth(year, month) {
  // Chuyển tháng về dạng 0-11 cho JS
  month = month - 1;

  let weeks = [];
  // Ngày đầu tháng
  let firstDay = new Date(year, month, 1);
  // Ngày cuối tháng
  let lastDay = new Date(year, month + 1, 0);
  // Ngày duyệt hiện tại
  let current = new Date(firstDay);

  while (current <= lastDay) {
    // Ngày đầu tuần
    let startOfWeek = new Date(current);
    // Ngày cuối tuần
    let endOfWeek = new Date(current);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Đảm bảo endOfWeek không vượt quá ngày cuối tháng
    if (endOfWeek > lastDay) {
      endOfWeek = lastDay;
    }

    // Thêm vào danh sách
    weeks.push({
      week: weeks.length + 1,
      start: formatDate1(startOfWeek),
      end: formatDate1(endOfWeek),
    });

    // Chuyển sang ngày đầu tiên của tuần tiếp theo
    current.setDate(current.getDate() + 7);
  }

  return weeks;
}

// Hàm lấy ra danh sách các tháng
export function getMonthsInYear(year) {
  let months = [];

  for (let month = 0; month < 12; month++) {
    // Ngày đầu tháng
    let start = new Date(year, month, 1);
    // Ngày cuối tháng
    let end = new Date(year, month + 1, 0);

    // Thêm vào danh sách
    months.push({
      month: month + 1,
      start: formatDate1(start),
      end: formatDate1(end),
    });
  }

  return months;
}
