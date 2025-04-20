import { filterSupplierData } from "./filterSupplierData.js";
import { addSupplierData } from "./addSupplierData.js";
import { renderSupplierTable } from "./renderSupplierTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Nhà cung cấp
export function updateSupplierTable() {
  filterSupplierData();
  addSupplierData();
  renderSupplierTable(1);
}
