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
  let orderBy = "maNguoiDung",
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

  let userParams = new URLSearchParams();
  let orderParams = new URLSearchParams();
  // Dành cho api người dùng
  if (find) userParams.append("id", find);
  if (sortFor === "nguoiDung") {
    if (orderBy) userParams.append("orderByColumn", orderBy);
    if (orderType) userParams.append("orderType", orderType);
  }
  userParams.append("limit", limit);
  userParams.append("offset", offset);
  // Dành cho api đơn hàng
  if (dateStart) orderParams.append("createStart", dateStart);
  if (dateEnd) orderParams.append("createEnd", dateEnd);

  try {
    let responseUser = await fetch(
      `api/account/dashboard.php?${userParams.toString()}`
    );

    if (!responseUser.ok) {
      throw new Error(
        "Lỗi khi lấy dữ liệu! HTTP Status: " + responseUser.status
      );
    }
    let responseUserJSON = await responseUser.json();

    // ...
    const usersWithOrders = await Promise.all(
      responseUserJSON.data.map(async (user) => {
        const res = await fetch(
          `api/orders/listBase.php?customerId=${
            user.id
          }&${orderParams.toString()}`
        );

        const orderData = await res.json();
        let ordersBuyValue = 0,
          pricesBuyValue = 0,
          ordersCancelValue = 0,
          pricesCancelValue = 0;
        if (orderData.data) {
          for (let i = 0; i < orderData.data.length; i++) {
            if (
              orderData.data[i].status === "Đã giao hàng" &&
              orderData.data[i].payStatus === "Đã thanh toán"
            ) {
              ordersBuyValue += 1;
              pricesBuyValue += orderData.data[i].total;
            } else if (
              orderData.data[i].status === "Đã hủy đơn" &&
              orderData.data[i].payStatus === "Chưa thanh toán"
            ) {
              ordersCancelValue += 1;
              pricesCancelValue += orderData.data[i].total;
            }
          }
        }

        return {
          ...user,
          ordersBuy: ordersBuyValue,
          pricesBuy: pricesBuyValue,
          ordersCancel: ordersCancelValue,
          pricesCancel: pricesCancelValue,
        };
      })
    );
    // Sắp xếp lại dữ liệu
    if (sortFor === "donHang") {
      if (sortValue === "Tổng đơn mua tăng dần") {
        usersWithOrders.sort(
          (userA, userB) => userA.ordersBuy - userB.ordersBuy
        );
      } else if (sortValue === "Tổng đơn mua giảm dần") {
        usersWithOrders.sort(
          (userA, userB) => userB.ordersBuy - userA.ordersBuy
        );
      } else if (sortValue === "Tổng tiền mua tăng dần") {
        usersWithOrders.sort(
          (userA, userB) => userA.pricesBuy - userB.pricesBuy
        );
      } else if (sortValue === "Tổng tiền mua giảm dần") {
        usersWithOrders.sort(
          (userA, userB) => userB.pricesBuy - userA.pricesBuy
        );
      } else if (sortValue === "Tổng đơn huỷ tăng dần") {
        usersWithOrders.sort(
          (userA, userB) => userA.ordersCancel - userB.ordersCancel
        );
      } else if (sortValue === "Tổng đơn huỷ giảm dần") {
        usersWithOrders.sort(
          (userA, userB) => userB.ordersCancel - userA.ordersCancel
        );
      } else if (sortValue === "Tổng tiền huỷ tăng dần") {
        usersWithOrders.sort(
          (userA, userB) => userA.pricesCancel - userB.pricesCancel
        );
      } else if (sortValue === "Tổng tiền huỷ giảm dần") {
        usersWithOrders.sort(
          (userA, userB) => userB.pricesCancel - userA.pricesCancel
        );
      }
    }
    responseUserJSON.data = usersWithOrders;

    await renderPagination(
      "admin-pagination-order_dashboard",
      responseUserJSON.pageCount,
      currentPage,
      renderOrderDashboardTable
    );

    return responseUserJSON.data;
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
