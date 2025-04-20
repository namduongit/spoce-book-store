import { filterCoverData } from "./filterCoverData.js";
import { addCoverData } from "./addCoverData.js";
import { renderCoverTable } from "./renderCoverTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Loại bìa
export function updateCoverTable() {
  filterCoverData();
  addCoverData();
  renderCoverTable(1);
}
