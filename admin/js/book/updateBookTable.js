import { filterBookData } from "./filterBookData.js";
import { addBookData } from "./addBookData.js";
import { renderBookTable } from "./renderBookTable.js";
import { renderItemsForFilter } from "./renderItemsForFilter.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Nhà phát hành
export function updateBookTable() {
  filterBookData();
  addBookData();
  renderBookTable(1);
  renderItemsForFilter();
}
