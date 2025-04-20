import { renderPublisherTable } from "./renderPublisherTable.js";
import { renderPagination } from "../pagination.js";

// Tiến hành lọc
export async function filterPublisher(currentPage) {
  let findValue = document.getElementById("find-inp-publisher").value.trim();
  let sortValue = document.getElementById("sort-slt-publisher").value.trim();
  let statusValue = document
    .getElementById("status-slt-publisher")
    .value.trim();
  let limitValue = document.getElementById("show-inp-publisher").value.trim();

  let find = findValue !== "" ? findValue : "";
  let orderBy = "maNXB",
    orderType = "ASC";
  switch (sortValue) {
    case "ID giảm dần":
      orderType = "DESC";
      break;
    case "Tên nhà xuất bản tăng dần":
      orderBy = "tenNXB";
      break;
    case "Tên nhà xuất bản giảm dần":
      orderBy = "tenNXB";
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
    let response = await fetch(`api/publishers/list.php?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    await renderPagination(
      "admin-pagination-publisher",
      responseJSON.pageCount,
      currentPage,
      renderPublisherTable
    );

    return responseJSON.data;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    return [];
  }
}

// Thêm sự kiện lọc
export function filterPublisherData() {
  const filterButton = document.getElementById("filter-button-publisher");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderPublisherTable(1);
    });
  }
}
