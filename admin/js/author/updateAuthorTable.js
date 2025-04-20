import { filterAuthorData } from "./filterAuthorData.js";
import { addAuthorData } from "./addAuthorData.js";
import { renderAuthorTable } from "./renderAuthorTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Nhà phát hành
export function updateAuthorTable() {
  filterAuthorData();
  addAuthorData();
  renderAuthorTable(1);
}
