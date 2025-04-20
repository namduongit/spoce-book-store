import { renderAuthorTable } from "./renderAuthorTable.js";
import { renderPagination } from "../pagination.js";

// Tiến hành lọc
export async function filterAuthor(currentPage) {
  let findValue = document.getElementById("find-inp-author").value.trim();
  let sortValue = document.getElementById("sort-slt-author").value.trim();
  let statusValue = document.getElementById("status-slt-author").value.trim();
  let limitValue = document.getElementById("show-inp-author").value.trim();

  let find = findValue !== "" ? findValue : "";
  let orderBy = "maTacGia",
    orderType = "ASC";
  switch (sortValue) {
    case "ID giảm dần":
      orderType = "DESC";
      break;
    case "Tên tác giả tăng dần":
      orderBy = "tenTacGia";
      break;
    case "Tên tác giả giảm dần":
      orderBy = "tenTacGia";
      orderType = "DESC";
      break;
  }
  let status = statusValue ? statusValue : "";
  let limit = limitValue ? Number(limitValue) : 12;
  let page = currentPage ? Number(currentPage) : 1;
  let offset = (page - 1) * limit;

  let params = new URLSearchParams();
  if (find) params.append("find", find);
  if (orderBy) params.append("orderByColumn", orderBy);
  if (orderType) params.append("orderType", orderType);
  if (status) params.append("status", status);
  params.append("limit", limit);
  params.append("offset", offset);

  try {
    let response = await fetch(`api/authors/list.php?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    await renderPagination(
      "admin-pagination-author",
      responseJSON.pageCount,
      currentPage,
      renderAuthorTable
    );

    return responseJSON.data;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    console.log(error);
    return [];
  }
}

// Thêm sự kiện cho nút "Lọc"
export function filterAuthorData() {
  const filterButton = document.getElementById("filter-button-author");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderAuthorTable(1);
    });
  }
}
