import { clickToShowDatePicker } from "../others.js";
import { filterDiscountData } from "./filterDiscountData.js";
import { addDiscountData } from "./addDiscountData.js";
import { renderDiscountTable } from "./renderDiscountTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Khuyến mãi
export function updateDiscountTable() {
  clickToShowDatePicker("date-start-inp-discount");
  clickToShowDatePicker("date-end-inp-discount");
  filterDiscountData();
  addDiscountData();
  renderDiscountTable(1);
}
