import { clickToShowDatePicker } from "../others.js";
import { filterDiscountData } from "./filterDiscountData.js";
import { addDiscountData } from "./addDiscountData.js";
import { renderDiscountTable } from "./renderDiscountTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Khuyến mãi
export function updateDiscountTable() {
  clickToShowDatePicker("find-date-start-before-inp-discount");
  clickToShowDatePicker("find-date-start-after-inp-discount");
  clickToShowDatePicker("find-date-end-before-inp-discount");
  clickToShowDatePicker("find-date-end-after-inp-discount");
  filterDiscountData();
  addDiscountData();
  renderDiscountTable();
}
