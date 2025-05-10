import { printProfitDashboardTicket } from "./printProfitDashboard.js";
import { printRevenueDashboardTicket } from "./printRevenueDashboard.js";
import { printInvestDashboardTicket } from "./printInvestDashboard.js";
import { renderProfitDashboardTable } from "./updateProfitDashboard.js";
import { renderRevenueDashboardTable } from "./updateRevenueDashboard.js";
import { renderInvestDashboardTable } from "./updateInvestDashboard.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu các Thống kê
export function updateDashboardTables() {
  printProfitDashboardTicket();
  printRevenueDashboardTicket();
  printInvestDashboardTicket();
  renderProfitDashboardTable();
  renderRevenueDashboardTable();
  renderInvestDashboardTable();
}
