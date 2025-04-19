import { renderDiscountTable } from "./renderDiscountTable.js";
// // Hàm thiết lập sự kiện lọc thông tin bảng Khuyến mãi
let curentpage = 1;

export async function filterDiscount(pageIsSelected = 1) {
  let id = document
    .querySelector("#find-id-or-name-inp-discount")
    .value.toLowerCase()
    .trim();
  let type = document
    .querySelector("#type-slt-discount")
    .value.toLowerCase()
    .trim();
  console.log(type);

  let dateStart = document
    .querySelector("#find-date-start-inp-discount")
    .value.trim();
  let dateEnd = document
    .querySelector("#find-date-end-inp-discount")
    .value.trim();
  let discountStatus = document
    .querySelector("#status-slt-discount")
    .value.toLowerCase()
    .trim();

  let discountId = id !== "" ? id : "";
  let discountBy = "maPGG",
    discountType = "ASC";

  let status = discountStatus !== "tất cả" ? discountStatus.toUpperCase() : "";

  // Map hiển thị sang enum DB
  let category = "";
  if (type === "phần trăm") category = "PERCENTAGE";
  else if (type === "tiền mặt") category = "FIXED_AMOUNT";

  let limit = 5;
  let page = Number(pageIsSelected) || 1;
  let offset = (page - 1) * limit;

  let params = new URLSearchParams();
  if (discountId) params.append("id", discountId);
  if (discountBy) params.append("discountByColumn", discountBy);
  if (discountType) params.append("discountType", discountType);
  if (status) params.append("status", status);
  if (category) params.append("category", category);
  if (dateStart) params.append("ngayBatDau", dateStart);
  if (dateEnd) params.append("ngayKetThuc", dateEnd);
  params.append("limit", limit);
  params.append("offset", offset);

  let url = `api/discount/filter_discount.php?${params.toString()}`;
  console.log("Request URL:", url);
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }

    let data = await response.json();
    console.log("Dữ liệu nhận được:", data);
    await paginationDiscount(data.pageCount);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return [];
  }
}

export function filterDiscountData() {
  // // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-discount");

  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      curentpage = 1;
      await renderDiscountTable();
    });
  }
}

async function paginationDiscount(pageCount) {
  if (pageCount > 1) {
    let pagination_container = document.querySelector(
      "#main__pagination_discount"
    );

    pagination_container.innerHTML = "";

    let prevButton = document.createElement("button");
    prevButton.classList.add("main-pagination__button", "previous");
    prevButton.innerHTML = '<i class="icon fa-solid fa-chevron-left"></i>';
    prevButton.addEventListener("click", function () {
      if (curentpage > 1) {
        renderDiscountTable(curentpage - 1);
        curentpage -= 1;
      }
    });
    pagination_container.appendChild(prevButton);

    //   console.log(pageCount);

    for (let i = 1; i <= pageCount; i++) {
      let pageButton = document.createElement("button");
      pageButton.classList.add("main-pagination__button");
      pageButton.textContent = i;

      pageButton.addEventListener("click", function () {
        console.log(`Page ${i} clicked`);
        curentpage = i;
        renderDiscountTable(i);
      });

      pagination_container.appendChild(pageButton);
    }

    let nextButton = document.createElement("button");
    nextButton.classList.add("main-pagination__button", "next");
    nextButton.innerHTML = '<i class="icon fa-solid fa-chevron-right"></i>';
    nextButton.addEventListener("click", function () {
      if (curentpage < pageCount) {
        renderDiscountTable(curentpage + 1);
        curentpage += 1;
      }
    });
    pagination_container.appendChild(nextButton);

    const curentpageButton = document.querySelector(
      `.main__pagination button:nth-child(${curentpage + 1})`
    );
    curentpageButton.classList.add("active");

    let allButtons = document.querySelectorAll(
      ".main__pagination .main-pagination__button"
    );
    let buttonsContainer = document.querySelector(".main__pagination");
    if (curentpage >= 4) {
      for (let i = 2; i < curentpage - 1; i++) {
        allButtons[i].style.display = "none";
      }

      const newButton = document.createElement("button");
      newButton.classList.add("main-pagination__button");
      newButton.textContent = ".....";
      // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
      buttonsContainer.insertBefore(newButton, allButtons[2]);
    }
    if (curentpage < pageCount - 2) {
      for (let i = pageCount - 1; i > curentpage + 1; i--) {
        allButtons[i].style.display = "none";
      }
      const newButton = document.createElement("button");
      newButton.classList.add("main-pagination__button");
      newButton.textContent = ".....";
      // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
      buttonsContainer.insertBefore(newButton, allButtons[pageCount - 1]);
    }
  } else {
    let pagination_container = document.querySelector("#main__pagination_book");
    pagination_container.innerHTML = "";
  }
}
