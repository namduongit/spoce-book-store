import { renderSupplierTable } from "./renderSupplierTable.js";
import { renderPagination } from "../pagination.js";
import { hideLoading, showLoading } from "../spiner.js";

//  Tiến hành lọc
export async function filterSupplier(currentPage) {
  let findValue = document.getElementById("find-inp-supplier").value.trim();
  let sortValue = document.getElementById("sort-slt-supplier").value.trim();
  let statusValue = document.getElementById("status-slt-supplier").value.trim();
  let limitValue = document.getElementById("show-inp-supplier").value.trim();

  let find = findValue !== "" ? findValue : "";
  let orderBy = "maNCC",
    orderType = "ASC";
  switch (sortValue) {
    case "ID giảm dần":
      orderType = "DESC";
      break;
    case "Tên nhà cung cấp tăng dần":
      orderBy = "tenNCC";
      break;
    case "Tên nhà cung cấp giảm dần":
      orderBy = "tenNCC";
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
    let response = await fetch(`api/suppliers/list.php?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    showLoading();
    let responseJSON = await response.json();
    hideLoading();
    await renderPagination(
      "admin-pagination-supplier",
      responseJSON.pageCount,
      currentPage,
      renderSupplierTable
    );

    return responseJSON.data;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    console.log(error);
    return [];
  }
}

//  themee sự kiện btn lọc
export function filterSupplierData() {
  const filterButton = document.getElementById("filter-button-supplier");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderSupplierTable(1);
    });
  }
}
