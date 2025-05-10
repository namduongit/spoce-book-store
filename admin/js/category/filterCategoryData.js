import { renderCategoryTable } from "./renderCategoryTable.js";
import { renderPagination } from "../pagination.js";

// Tiến hành lọc
export async function filterCategory(currentPage) {
  let findValue = document.getElementById("find-inp-category").value.trim();
  let sortValue = document.getElementById("sort-slt-category").value.trim();
  let statusValue = document.getElementById("status-slt-category").value.trim();
  let limitValue = document.getElementById("show-inp-category").value.trim();

  let find = findValue !== "" ? findValue : "";
  let orderBy = "maTheLoai",
    orderType = "ASC";
  switch (sortValue) {
    case "ID giảm dần":
      orderType = "DESC";
      break;
    case "Tên thể loại tăng dần":
      orderBy = "tenTheLoai";
      break;
    case "Tên thể loại giảm dần":
      orderBy = "tenTheLoai";
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
    let response = await fetch(`api/categories/list.php?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    await renderPagination(
      "admin-pagination-category",
      responseJSON.pageCount,
      currentPage,
      renderCategoryTable
    );
    console.log(responseJSON);

    return responseJSON.data;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    console.log(error);
    return [];
  }
}

// Thêm sự kiện cho nút "Lọc"
export function filterCategoryData() {
  const filterButton = document.getElementById("filter-button-category");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderCategoryTable(1);
    });
  }
}
