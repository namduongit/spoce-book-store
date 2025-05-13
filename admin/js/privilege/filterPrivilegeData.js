import { renderPrivilegeTable } from "./renderPrivilegeTable.js";
import { renderPagination } from "../pagination.js";

export async function lockRole(privilegeId, status) {
    let formData = new URLSearchParams();
    formData.append('id', privilegeId);
    formData.append('status', status);
    let response = await fetch('api/privileges/lock.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    });

    if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    return responseJSON;
}

export async function filterPrivilege(currentPage) {
    let findValue = document.getElementById("find-inp-privilege").value.trim();
    let sortValue = document.getElementById("sort-slt-privilege").value.trim();
    let statusValue = document
        .getElementById("status-slt-privilege")
        .value.trim();
    let limitValue = document.getElementById("show-inp-privilege").value.trim();

    let find = findValue !== "" ? findValue : "";
    let orderBy = "maQuyen",
        orderType = "ASC";
    switch (sortValue) {
        case "ID giảm dần":
            orderType = "DESC";
            break;
        case "Tên nhóm quyền tăng dần":
            orderBy = "tenQuyen";
            break;
        case "Tên nhóm quyền giảm dần":
            orderBy = "tenQuyen";
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
        let response = await fetch(`api/privileges/list.php?${params.toString()}`);

        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
        }
        let responseJSON = await response.json();


        await renderPagination(
            "admin-pagination-privilege",
            responseJSON.pageCount,
            currentPage,
            renderPrivilegeTable
        );

        return responseJSON.data;
    } catch (error) {
        alert("Lỗi khi lấy dữ liệu: " + error.message);
        return [];
    }
}

export function filterPrivilegeData() {
  const filterButton = document.getElementById("filter-button-privilege");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderPrivilegeTable(1);
    });
  }
}