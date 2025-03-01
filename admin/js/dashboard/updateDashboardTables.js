import { printProfitDashboardTicket } from "./printProfitDashboard.js";
import { printRevenueDashboardTicket } from "./printRevenueDashboard.js";
import { printInputTicketDashboardTicket } from "./printInputTicketDashboard.js";
import { renderProfitDashboardTable } from "./updateProfitDashboard.js";
import { renderRevenueDashboardTable } from "./updateRevenueDashboard.js";
import { renderInputTicketDashboardTable } from "./updateInputTicketDashboard.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu các Thống kê
export function updateDashboardTables() {
    printProfitDashboardTicket();
    printRevenueDashboardTicket();
    printInputTicketDashboardTicket();
    renderProfitDashboardTable();
    renderRevenueDashboardTable();
    renderInputTicketDashboardTable();
}