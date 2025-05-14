import { renderOrderDashboardTable } from "./renderOrderDashboardTable.js";
import { renderPagination } from "../pagination.js";

// Tiến hành lọc
export async function filterOrderDashboard(currentPage) {
  let findValue = document
    .getElementById("find-inp-order_dashboard")
    .value.trim();
  let sortValue = document
    .getElementById("sort-slt-order_dashboard")
    .value.trim();
  let dateStartValue = document
    .getElementById("date-start-inp-order_dashboard")
    .value.trim();
  let dateEndValue = document
    .getElementById("date-end-inp-order_dashboard")
    .value.trim();
  let limitValue = document
    .getElementById("show-inp-order_dashboard")
    .value.trim();

  let find = findValue !== "" ? findValue : "";

  let orderBy = "maKhachHang",
    orderType = "ASC",
    sortFor = "nguoiDung";

  switch (sortValue) {
    case "ID khách hàng giảm dần":
      orderType = "DESC";
      break;
    case "Tổng đơn mua tăng dần":
    case "Tổng đơn mua giảm dần":
    case "Tổng tiền mua tăng dần":
    case "Tổng tiền mua giảm dần":
    case "Tổng đơn huỷ tăng dần":
    case "Tổng đơn huỷ giảm dần":
    case "Tổng tiền huỷ tăng dần":
    case "Tổng tiền huỷ giảm dần":
      sortFor = "donHang";
      break;
  }

  let dateStart = dateStartValue !== "" ? dateStartValue : "";
  let dateEnd = dateEndValue !== "" ? dateEndValue : "";
  let limit = limitValue ? Number(limitValue) : 12;
  let page = currentPage ? Number(currentPage) : 1;
  let offset = (page - 1) * limit;

  let orderParams = new URLSearchParams();

  // Dành cho api người dùng
  if (find) orderParams.append("id", find);
  if (sortFor === "nguoiDung") {
    if (orderBy) orderParams.append("orderByColumn", orderBy);
    if (orderType) orderParams.append("orderType", orderType);
  }
  orderParams.append("limit", limit);
  orderParams.append("offset", offset);
  // Dành cho api đơn hàng
  if (dateStart) orderParams.append("createStart", dateStart);
  if (dateEnd) orderParams.append("createEnd", dateEnd);

  console.log(orderParams.toString())
  try {

    const responseOrder = await fetch(`api/orders/listOrder.php?${orderParams.toString()}`, {
    });

    const dataResOrder = await responseOrder.json();

    console.log(dataResOrder)

    // Mảng chứa thông tin tất tần tật đơn
    const usersWithOrders = dataResOrder['data'];    


    /**
    idKhachHang (idCustomer)
    tenKhachHang (customerFullname)
    totalPaid: tổng tiền các đơn đã thanh toán
    totalUnpaid: tổng tiền các đơn chưa thanh toán
    totalCancel: tổng tiền các đơn đã hủy
    totalDelivered: tổng tiền các đơn đã giao hàng
    totalConfirmed: tổng tiền các đơn đã xác nhận 

    đơn mua: đã giao + đã thanh toán
    đơn hủy: đã hủy + chưa thanh toán
     */

    if (sortFor === "donHang") {
      if (sortValue === "Tổng đơn mua tăng dần") {
        usersWithOrders.sort((a, b) => a.soDonDaGiaoVaThanhToan - b.soDonDaGiaoVaThanhToan);
      } else if (sortValue === "Tổng đơn mua giảm dần") {
        usersWithOrders.sort((a, b) => b.soDonDaGiaoVaThanhToan - a.soDonDaGiaoVaThanhToan);
      } else if (sortValue === "Tổng tiền mua tăng dần") {
        usersWithOrders.sort((a, b) => a.tongTienDaGiaoVaThanhToan - b.tongTienDaGiaoVaThanhToan);
      } else if (sortValue === "Tổng tiền mua giảm dần") {
        usersWithOrders.sort((a, b) => b.tongTienDaGiaoVaThanhToan - a.tongTienDaGiaoVaThanhToan);
      } else if (sortValue === "Tổng đơn huỷ tăng dần") {
        usersWithOrders.sort((a, b) => a.soDonHuyVaChuaThanhToan - b.soDonHuyVaChuaThanhToan);
      } else if (sortValue === "Tổng đơn huỷ giảm dần") {
        usersWithOrders.sort((a, b) => b.soDonHuyVaChuaThanhToan - a.soDonHuyVaChuaThanhToan);
      } else if (sortValue === "Tổng tiền huỷ tăng dần") {
        usersWithOrders.sort((a, b) => a.tongTienHuyVaChuaThanhToan - b.tongTienHuyVaChuaThanhToan);
      } else if (sortValue === "Tổng tiền huỷ giảm dần") {
        usersWithOrders.sort((a, b) => b.tongTienHuyVaChuaThanhToan - a.tongTienHuyVaChuaThanhToan);
      }
    }


    await renderPagination(
      "admin-pagination-order_dashboard",
      dataResOrder.pageCount,
      currentPage,
      renderOrderDashboardTable
    );

    return usersWithOrders;
  } catch (error) {
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    console.log(error);
    return [];
  }
}

// Thêm sự kiện cho nút "Lọc" và nút "Đặt lại"
export function filterOrderDashboardData() {
  const filterButton = document.getElementById("filter-button-order_dashboard");
  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await renderOrderDashboardTable(1);
    });
  }

  const resetButton = document.getElementById("reset-button-order_dashboard");
  if (resetButton) {
    resetButton.addEventListener("click", async (e) => {
      e.preventDefault();

      document.getElementById("find-inp-order_dashboard").value = "";
      document.getElementById("sort-slt-order_dashboard").value = "";
      document.getElementById("date-start-inp-order_dashboard").value = "";
      document.getElementById("date-end-inp-order_dashboard").value = "";
      document.getElementById("show-inp-order_dashboard").value = "";

      await renderOrderDashboardTable(1);
    });
  }
}
