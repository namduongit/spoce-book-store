import { renderCoverTable } from "./renderCoverTable.js";
import { renderPagination } from "../pagination.js";

//  lọc
export async function filterCover(currentPage) {
  let findValue = document.getElementById("find-inp-cover").value.trim();
  let sortValue = document.getElementById("sort-slt-cover").value.trim();
  let statusValue = document.getElementById("status-slt-cover").value.trim();
  let limitValue = document.getElementById("show-inp-cover").value.trim();

  let find = findValue !== "" ? findValue : "";
  let orderBy = "maLoaiBia",
    orderType = "ASC";
  switch (sortValue) {
    case "ID giảm dần":
      orderType = "DESC";
      break;
    case "Tên loại bìa tăng dần":
      orderBy = "tenLoaiBia";
      break;
    case "Tên loại bìa giảm dần":
      orderBy = "tenLoaiBia";
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
    let response = await fetch(`api/covers/list.php?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    await renderPagination(
      "admin-pagination-cover",
      responseJSON.pageCount,
      currentPage,
      renderCoverTable
    );

    return responseJSON.data;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    console.log(error);
    return [];
  }
}

//  themee sự kiện btn lọc
export function filterCoverData() {
  const filterButton = document.getElementById("filter-button-cover");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderCoverTable(1);
    });
  }
}
