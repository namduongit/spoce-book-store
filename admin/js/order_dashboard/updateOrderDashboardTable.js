import { clickToShowDatePicker } from "../others.js";
import { filterOrderDashboardData } from "./filterOrderDashboard.js";
import { renderOrderDashboardTable } from "./renderOrderDashboardTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Đơn hàng
export function updateOrderDashboardTable() {
  clickToShowDatePicker("date-start-inp-order_dashboard");
  clickToShowDatePicker("date-end-inp-order_dashboard");
  filterOrderDashboardData();
  renderOrderDashboardTable(1);
}
