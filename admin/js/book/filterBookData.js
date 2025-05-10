import { renderBookTable } from "./renderBookTable.js";
import { renderPagination } from "../pagination.js";

// Tiến hành lọc
export async function filterBook(currentPage) {
  let findValue = document.getElementById("find-inp-book").value.trim();
  let sortValue = document.getElementById("sort-slt-book").value.trim();
  let authorValue = document.getElementById("author-slt-book").value.trim();
  let categoryValue = document.getElementById("category-slt-book").value.trim();
  let coverValue = document.getElementById("cover-slt-book").value.trim();
  let publisherValue = document
    .getElementById("publisher-slt-book")
    .value.trim();
  let statusValue = document.getElementById("status-slt-book").value.trim();
  let limitValue = document.getElementById("show-inp-book").value.trim();

  let find = findValue !== "" ? findValue : "";
  let orderBy = "maSach",
    orderType = "ASC";
  switch (sortValue) {
    case "ID giảm dần":
      orderType = "DESC";
      break;
    case "Tên tác giả tăng dần":
      orderBy = "tenSach";
      break;
    case "Tên tác giả giảm dần":
      orderBy = "tenSach";
      orderType = "DESC";
      break;
    case "Số lượng tăng dần":
      orderBy = "soLuong";
      break;
    case "Số lượng giảm dần":
      orderBy = "soLuong";
      orderType = "DESC";
      break;
  }
  let author = authorValue !== "" ? authorValue : "";
  let category = categoryValue !== "" ? categoryValue : "";
  let cover = coverValue !== "" ? coverValue : "";
  let publisher = publisherValue !== "" ? publisherValue : "";
  let status = statusValue ? statusValue : "";
  let limit = limitValue ? Number(limitValue) : 5;
  let page = currentPage ? Number(currentPage) : 1;
  let offset = (page - 1) * limit;

  let params = new URLSearchParams();
  if (find) params.append("find", find);
  if (author) params.append("author", author);
  if (category) params.append("category", category);
  if (cover) params.append("cover", cover);
  if (publisher) params.append("publisher", publisher);
  if (orderBy) params.append("orderByColumn", orderBy);
  if (orderType) params.append("orderType", orderType);
  if (status) params.append("status", status);
  params.append("limit", limit);
  params.append("offset", offset);

  try {
    let response = await fetch(`api/books/list.php?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    await renderPagination(
      "admin-pagination-book",
      responseJSON.pageCount,
      currentPage,
      renderBookTable
    );

    return responseJSON.data;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    console.log(error);
    return [];
  }
}

// Thêm sự kiện cho nút "Lọc"
export function filterBookData() {
  const filterButton = document.getElementById("filter-button-book");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderBookTable(1);
    });
  }

  const resetButton = document.getElementById("reset-button-book");
  if (resetButton) {
    resetButton.addEventListener("click", async (e) => {
      e.preventDefault();

      document.getElementById("find-inp-book").value = "";
      document.getElementById("sort-slt-book").value = "";
      document.getElementById("author-slt-book").value = "";
      document.getElementById("category-slt-book").value = "";
      document.getElementById("cover-slt-book").value = "";
      document.getElementById("publisher-slt-book").value = "";
      document.getElementById("status-slt-book").value = "";
      document.getElementById("show-inp-book").value = "";

      await renderBookTable(1);
    });
  }
}
