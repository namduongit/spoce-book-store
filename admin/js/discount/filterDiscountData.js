import { renderDiscountTable } from "./renderDiscountTable.js";
import { renderPagination } from "../pagination.js";

// Hàm thiết lập sự kiện lọc thông tin bảng Khuyến mãi
export async function filterDiscount(currentPage) {
  let findValue = document.getElementById("find-inp-discount").value.trim();
  let typeValue = document.getElementById("type-slt-discount").value.trim();
  let dateStartValue = document
    .getElementById("date-start-inp-discount")
    .value.trim();
  let dateEndValue = document
    .getElementById("date-end-inp-discount")
    .value.trim();
  let statusValue = document.getElementById("status-slt-discount").value.trim();
  // let limitValue = document.getElementById("show-inp-discount").value.trim();

  let find = findValue !== "" ? findValue : "";
  let type = typeValue !== "" ? typeValue : "";
  let dateStart = dateStartValue !== "" ? dateStartValue : "";
  let dateEnd = dateEndValue !== "" ? dateEndValue : "";
  let status = statusValue ? statusValue : "";
  // let limit = limitValue ? Number(limitValue) : 12;
  let limit = 12;
  let page = currentPage ? Number(currentPage) : 1;
  let offset = (page - 1) * limit;

  let params = new URLSearchParams();
  if (find) params.append("find", find);
  if (type) params.append("type", type);
  if (dateStart) params.append("dateStart", dateStart);
  if (dateEnd) params.append("dateEnd", dateEnd);
  if (status) params.append("status", status);
  params.append("orderByColumn", "maPGG");
  params.append("orderType", "ASC");
  params.append("limit", limit);
  params.append("offset", offset);

  try {
    let response = await fetch(`api/discounts/list.php?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    await renderPagination(
      "admin-pagination-discount",
      responseJSON.pageCount,
      currentPage,
      renderDiscountTable
    );

    return responseJSON.data;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    return [];
  }
}

// Thêm sự kiện lọc
export function filterDiscountData() {
  const filterButton = document.getElementById("filter-button-discount");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderDiscountTable(1);
    });
  }
}
