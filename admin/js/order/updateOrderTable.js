import { clickToShowDatePicker } from "../others.js";
import { updateAddressSelect } from "./updateAddressSelect.js";
import { filterOrderData } from "./filterOrderData.js";
import { renderOrderTable } from "./renderOrderTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Đơn hàng
export function updateOrderTable() {
  clickToShowDatePicker("date-start-inp-order");
  clickToShowDatePicker("date-end-inp-order");
  updateAddressSelect();
  filterOrderData();
  renderOrderTable(1);
}
