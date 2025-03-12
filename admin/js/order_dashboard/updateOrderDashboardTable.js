import { clickToShowDatePicker } from "../others.js";
// import { filterOrderData } from "./filterOrderData.js";
// import { renderOrderTable } from "./renderOrderTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Đơn hàng
export function updateOrderDashboardTable() {
  clickToShowDatePicker("find-date-dashboard-before-inp-order_dashboard");
  clickToShowDatePicker("find-date-dashboard-after-inp-order_dashboard");
  // filterOrderData();
  //   renderOrderTable();
}
