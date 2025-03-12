// import { filterPrivilegeData } from "./filterPrivilegeData.js";
import { addPrivilegeData } from "./addPrivilegeData.js";
import { renderPrivilegeTable } from "./renderPrivilegeTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Loại bìa
export function updatePrivilegeTable() {
  //   filterPrivilegeData();
  addPrivilegeData();
  renderPrivilegeTable();
}
