import { filterAccountData } from "./filterAccountData.js";
import { addAccountData } from "./addAccountData.js";
import { renderAccountTable } from "./renderAccountTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Người dùng
export function updateAccountTable() {
  filterAccountData();
  addAccountData();
  renderAccountTable();
}
