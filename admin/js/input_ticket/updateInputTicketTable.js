import { clickToShowDatePicker } from "../others.js";
// import { filterInputTicketData } from "./filterInputTicketData.js";
// import { addInputTicketData } from "./addInputTicketData.js";
import { renderInputTicketTable } from "./renderInputTicketTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Nhà phát hành
export function updateInputTicketTable() {
  clickToShowDatePicker("find-date-create-before-inp-input_ticket");
  clickToShowDatePicker("find-date-create-after-inp-input_ticket");
  //   filterInputTicketData();
  //   addInputTicketData();
  renderInputTicketTable();
}
