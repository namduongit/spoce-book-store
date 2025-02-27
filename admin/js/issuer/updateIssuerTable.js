import { filterIssuerData } from "./filterIssuerData.js";
import { addIssuerData } from "./addIssuerData.js";
import { renderIssuerTable } from "./renderIssuerTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Nhà phát hành
export function updateIssuerTable() {
  filterIssuerData();
  addIssuerData();
  renderIssuerTable();
}
