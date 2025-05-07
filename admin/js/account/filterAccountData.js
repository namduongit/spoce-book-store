import { renderAccountTable } from "./renderAccountTable.js";
let currentPage = 1;

export async function filterAccount(pageIsSelected = 1) {
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
  // const privilegeSelect = document
  //   .getElementById("privilege-slt-account")
  //   .value.trim();
  // console.log(privilegeSelect);

  // Lấy tất cả các phần tử <li>
  const listItems = document.querySelectorAll(".main__privilege-slt ul li");
  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      listItems.forEach((li) => li.classList.remove("selected")); // bỏ selected ở tất cả li khác
      this.classList.add("selected"); // thêm selected vào li được click
    });
  });
  let params = new URLSearchParams();
  // Thêm sự kiện click cho từng <li>
  const selectedPrivilegeLi = document.querySelector(
    ".main__privilege-slt ul li.selected"
  ); // tìm li có class 'selected'
  let selectedValue = selectedPrivilegeLi
    ? selectedPrivilegeLi.getAttribute("value")
    : "";

  // Biến chứa đối tượng thẻ select liên quan đến lọc trạng thái
  const statusSelect = document.getElementById("status-slt-account").value;
  let userId = idOrUsernameInput !== "" ? idOrUsernameInput : "";
  let sortBy = "maNguoiDung",
    sortType = "ASC";

  switch (sortSelect.toLowerCase()) {
    case "id giảm dần":
      sortType = "DESC";
      break;
    case "tên đăng nhập tăng dần":
      sortBy = "tenTaiKhoan";
      break;
    case "tên đăng nhập giảm dần":
      sortBy = "tenTaiKhoan";
      sortType = "DESC";
      break;
  }

  let status = statusSelect !== "tất cả" ? statusSelect : "";
  console.log(statusSelect);

  // let category = privilegeSelect !== "tất cả" ? privilegeSelect : "";
  // console.log(privilegeSelect);

  let limit = 5;
  let page = Number(pageIsSelected) || 1;
  let offset = (page - 1) * limit;

  // let params = new URLSearchParams();
  if (userId) params.append("id_or_name", userId);
  if (sortBy) params.append("sortBy", sortBy);
  if (sortType) params.append("sortType", sortType);
  if (status) params.append("status", status);
  if (selectedValue) params.append("category", selectedValue);
  params.append("limit", limit);
  params.append("offset", offset);

  let url = `api/account/get_account.php?${params.toString()}`;
  console.log("Request URL:", url);
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }

    let data = await response.json();
    console.log("Dữ liệu nhận được:", data);
    await paginationAccount(data.pageCount);
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return 0;
  }
}
export function filterAccountData() {
  // Biến chứa đối tượng là nút "Lọc"
  const filterButton = document.getElementById("filter-button-account");
  if (!filterButton) return;

  // Gán sự kiện khi nhấn nút "Lọc"
  filterButton.addEventListener("click", async (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();
    currentPage = 1;
    await renderAccountTable();
  });
}

async function paginationAccount(pageCount) {
  if (pageCount > 1) {
    let pagination_container = document.querySelector(
      "#main__pagination_account"
    );

    pagination_container.innerHTML = "";

    let prevButton = document.createElement("button");
    prevButton.classList.add("main-pagination__button", "previous");
    prevButton.innerHTML = '<i class="icon fa-solid fa-chevron-left"></i>';
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        renderAccountTable(currentPage - 1);
        currentPage -= 1;
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
        currentPage = i;
        renderAccountTable(i);
      });

      pagination_container.appendChild(pageButton);
    }

    let nextButton = document.createElement("button");
    nextButton.classList.add("main-pagination__button", "next");
    nextButton.innerHTML = '<i class="icon fa-solid fa-chevron-right"></i>';
    nextButton.addEventListener("click", function () {
      if (currentPage < pageCount) {
        renderAccountTable(currentPage + 1);
        currentPage += 1;
      }
    });
    pagination_container.appendChild(nextButton);

    const currentPageButton = document.querySelector(
      `.main__pagination button:nth-child(${currentPage + 1})`
    );
    currentPageButton.classList.add("active");

    let allButtons = document.querySelectorAll(
      ".main__pagination .main-pagination__button"
    );
    let buttonsContainer = document.querySelector(".main__pagination");
    if (currentPage >= 4) {
      for (let i = 2; i < currentPage - 1; i++) {
        allButtons[i].style.display = "none";
      }

      const newButton = document.createElement("button");
      newButton.classList.add("main-pagination__button");
      newButton.textContent = ".....";
      // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
      buttonsContainer.insertBefore(newButton, allButtons[2]);
    }
    if (currentPage < pageCount - 2) {
      for (let i = pageCount - 1; i > currentPage + 1; i--) {
        allButtons[i].style.display = "none";
      }
      const newButton = document.createElement("button");
      newButton.classList.add("main-pagination__button");
      newButton.textContent = ".....";
      // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
      buttonsContainer.insertBefore(newButton, allButtons[pageCount - 1]);
    }
  } else {
    let pagination_container = document.querySelector(
      "#main__pagination_account"
    );
    pagination_container.innerHTML = "";
  }
}
