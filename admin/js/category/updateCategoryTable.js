import { filterCategoryData } from "./filterCategoryData.js";
import { addCategoryData } from "./addCategoryData.js";
import { renderCategoryTable } from "./renderCategoryTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Nhà phát hành
export function updateCategoryTable() {
  filterCategoryData();
  addCategoryData();
  renderCategoryTable(1);
}
