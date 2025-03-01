import { clickToShowDatePicker } from "../others.js";
// import { filterOrderData } from "./filterOrderData.js";
import { renderOrderTable } from "./renderOrderTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Đơn hàng
export function updateOrderTable() {
  clickToShowDatePicker("find-date-create-before-inp-order");
  clickToShowDatePicker("find-date-create-after-inp-order");
  // filterOrderData();
  renderOrderTable();
}
