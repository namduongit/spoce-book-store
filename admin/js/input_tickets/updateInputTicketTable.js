import { clickToShowDatePicker } from "../others.js";
import { filterInputTicketData } from "./filterInputTicket.js";
import { addInputTicketData } from "./addInputTicketData.js";
import { renderInputTicketTable } from "./renderInputTicketTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Nhà phát hành
export function updateInputTicketTable() {
  clickToShowDatePicker("date-start-inp-input_ticket");
  clickToShowDatePicker("date-end-inp-input_ticket");
  filterInputTicketData();
  addInputTicketData();
  renderInputTicketTable(1);
}
