import { renderOrderTable } from "./renderOrderTable.js";
import { renderPagination } from "../pagination.js";

// Tiến hành lọc
export async function filterOrder(currentPage) {
  let findValue = document.getElementById("find-inp-order").value.trim();
  let sortValue = document.getElementById("sort-slt-order").value.trim();
  let dateStartValue = document
    .getElementById("date-start-inp-order")
    .value.trim();
  let dateEndValue = document.getElementById("date-end-inp-order").value.trim();
  let provinceValue = document
    .getElementById("province-slt-order")
    .value.trim();
  let districtValue = document
    .getElementById("district-slt-order")
    .value.trim();
  let statusValue = document.getElementById("status-slt-order").value.trim();
  let limitValue = document.getElementById("show-inp-order").value.trim();

  let find = findValue !== "" ? findValue : "";
  let orderBy = "maDonHang",
    orderType = "ASC";
  switch (sortValue) {
    case "ID giảm dần":
      orderType = "DESC";
      break;
    case "Ngày tạo đơn tăng dần":
      orderBy = "ngayTaoDon";
      break;
    case "Ngày tạo đơn giảm dần":
      orderBy = "ngayTaoDon";
      orderType = "DESC";
      break;
    case "Tổng thanh toán tăng dần":
      orderBy = "tongTienThu";
      break;
    case "Tổng thanh toán giảm dần":
      orderBy = "tongTienThu";
      orderType = "DESC";
      break;
  }
  let dateStart = dateStartValue !== "" ? dateStartValue : "";
  let dateEnd = dateEndValue !== "" ? dateEndValue : "";
  let province = provinceValue ? provinceValue : "";
  let district = districtValue ? districtValue : "";
  let status = statusValue ? statusValue : "";
  let limit = limitValue ? Number(limitValue) : 10;
  let page = currentPage ? Number(currentPage) : 1;
  let offset = (page - 1) * limit;

  let params = new URLSearchParams();
  if (find) params.append("id", find);
  if (orderBy) params.append("orderByColumn", orderBy);
  if (orderType) params.append("orderType", orderType);
  if (dateStart) params.append("createStart", dateStart);
  if (dateEnd) params.append("createEnd", dateEnd);
  if (province || district)
    params.append(
      "addressToShip",
      district + (province ? ", " + province : "")
    );
  if (status) params.append("status", status);
  params.append("limit", limit);
  params.append("offset", offset);

  try {
    let response = await fetch(`api/orders/listBase.php?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    await renderPagination(
      "admin-pagination-order",
      responseJSON.pageCount,
      currentPage,
      renderOrderTable
    );

    return responseJSON.data;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    console.log(error);
    return [];
  }
}

// Thêm sự kiện cho nút "Lọc" và nút "Đặt lại"
export function filterOrderData() {
  const filterButton = document.getElementById("filter-button-order");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderOrderTable(1);
    });
  }

  const resetButton = document.getElementById("reset-button-order");
  if (resetButton) {
    resetButton.addEventListener("click", async (e) => {
      e.preventDefault();

      document.getElementById("find-inp-order").value = "";
      document.getElementById("sort-slt-order").value = "";
      document.getElementById("date-start-inp-order").value = "";
      document.getElementById("date-end-inp-order").value = "";
      document.getElementById("province-slt-order").value = "";
      // document.querySelector(".main__select input#province-slt-order ~ ul").innerHTML = "";
      document.getElementById("district-slt-order").value = "";
      document.querySelector(
        ".main__select input#district-slt-order ~ ul"
      ).innerHTML = "";
      document.getElementById("status-slt-order").value = "";
      document.getElementById("show-inp-order").value = "";

      await renderOrderTable(1);
    });
  }
}
