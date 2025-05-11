import { renderPaymentTable } from "./renderPaymentTable.js";
import { renderPagination } from "../pagination.js";


export async function filterPaymentData(currentPage) {
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

    
}