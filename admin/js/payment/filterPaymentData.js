import { renderPaymentTable } from "./renderPaymentTable.js";
import { renderPagination } from "../pagination.js";


export async function filterPayment(currentPage) {
    let findValue = document.getElementById("find-inp-payment").value.trim();
    let sortValue = document.getElementById("sort-slt-payment").value.trim();
    let statusValue = document
        .getElementById("status-slt-payment")
        .value.trim();
    let limitValue = document.getElementById("show-inp-payment").value.trim();

    let find = findValue !== "" ? findValue : "";
    let orderBy = "maPhuongThuc",
        orderType = "ASC";
    switch (sortValue) {
        case "ID giảm dần":
            orderType = "DESC";
            break;
        case "Tên phương thức tăng dần":
            orderBy = "tenPhuongThuc";
            break;
        case "Tên phương thức giảm dần":
            orderBy = "tenPhuongThuc";
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
        let response = await fetch(`api/payments/list.php?${params.toString()}`);

        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
        }
        let responseJSON = await response.json();
        await renderPagination(
            "admin-pagination-payment",
            responseJSON.pageCount,
            currentPage,
            renderPaymentTable
        );

        return responseJSON.data;
    } catch (error) {
        alert("Lỗi khi lấy dữ liệu: " + error.message);
        return [];
    }
}

// Thêm sự kiện lọc
export function filterPaymentData() {
  const filterButton = document.getElementById("filter-button-payment");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderPaymentTable(1);
    });
  }
}