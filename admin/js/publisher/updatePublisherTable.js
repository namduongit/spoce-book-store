import { filterPublisherData } from "./filterPublisherData.js";
import { addPublisherData } from "./addPublisherData.js";
import { renderPublisherTable } from "./renderPublisherTable.js";

// Hàm tổng hợp lại các sự kiện để có thể cập nhật bảng dữ liệu Nhà phát hành
export function updatePublisherTable(dataDetail) {
  filterPublisherData();
  addPublisherData();
  renderPublisherTable(1, dataDetail);
}
