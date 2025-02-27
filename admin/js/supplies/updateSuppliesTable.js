import { filterSuppliesData } from "./filterSuppliesData.js";
import { addSuppliesData } from "./addSuppliesData.js";
import { renderSuppliesTable } from "./renderSuppliesTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Nhà cung cấp
export function updateSuppliesTable() {
  filterSuppliesData();
  addSuppliesData();
  renderSuppliesTable();
}
