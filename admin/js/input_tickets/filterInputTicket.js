import { renderInputTicketTable } from "./renderInputTicketTable.js";
import { renderPagination } from "../pagination.js";

// Tiến hành lọc
export async function filterInputTicket(currentPage) {
  let findValue = document.getElementById("find-inp-input_ticket").value.trim();
  let sortValue = document.getElementById("sort-slt-input_ticket").value.trim();
  let dateStartValue = document
    .getElementById("date-start-inp-input_ticket")
    .value.trim();
  let dateEndValue = document
    .getElementById("date-end-inp-input_ticket")
    .value.trim();
  let statusValue = document
    .getElementById("status-slt-input_ticket")
    .value.trim();

  let find = findValue !== "" ? findValue : "";
  let orderBy = "maPhieuNhap",
    orderType = "ASC";
  switch (sortValue) {
    case "ID giảm dần":
      orderType = "DESC";
      break;
    case "Nhà cung cấp tăng dần":
      orderBy = "maNCC";
      break;
    case "Nhà cung cấp giảm dần":
      orderBy = "maNCC";
      orderType = "DESC";
      break;
    case "Ngày tạo phiếu tăng dần":
      orderBy = "ngayTaoPhieu";
      break;
    case "Ngày tạo phiếu giảm dần":
      orderBy = "ngayTaoPhieu";
      orderType = "DESC";
      break;
    case "Tổng tiền nhập tăng dần":
      orderBy = "tongTienNhap";
      break;
    case "Tổng tiền nhập giảm dần":
      orderBy = "tongTienNhap";
      orderType = "DESC";
      break;
  }
  let dateStart = dateStartValue !== "" ? dateStartValue : "";
  let dateEnd = dateEndValue !== "" ? dateEndValue : "";
  let status = statusValue ? statusValue : "";
  // let limit = limitValue ? Number(limitValue) : 12;
  let limit = 12;
  let page = currentPage ? Number(currentPage) : 1;
  let offset = (page - 1) * limit;

  let params = new URLSearchParams();
  if (find) params.append("id", find);
  if (dateStart) params.append("createStart", dateStart);
  if (dateEnd) params.append("createEnd", dateEnd);
  if (status) params.append("status", status);
  params.append("orderByColumn", orderBy);
  params.append("orderType", orderType);
  params.append("limit", limit);
  params.append("offset", offset);

  try {
    let response = await fetch(
      `/api/input_tickets/list.php?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    await renderPagination(
      "admin-pagination-input_ticket",
      responseJSON.pageCount,
      currentPage,
      renderInputTicketTable
    );

    return responseJSON.data;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    return [];
  }
}

// Thêm sự kiện cho nút "Lọc"
export function filterInputTicketData() {
  const filterButton = document.getElementById("filter-button-input_ticket");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderInputTicketTable(1);
    });
  }
}
