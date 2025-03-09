import { updateInputTicketData } from "./updateInputTicketData.js";

import { vietnamMoneyFormat } from "../others.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
let data = [
  {
    id: 1,
    suppliesId: "NCC00001",
    dateCreate: "25-02-2025",
    total: 200000,
    detail: [],
    status: "Đã hoàn thành",
    dateUpdate: "",
  },
  {
    id: 2,
    suppliesId: "NCC00002",
    dateCreate: "25-02-2025",
    total: 200000,
    detail: [],
    status: "Chưa xác nhận",
    dateUpdate: "",
  },
  {
    id: 3,
    suppliesId: "NCC00003",
    dateCreate: "25-02-2025",
    total: 1850000,
    detail: [],
    status: "Đã huỷ phiếu",
    dateUpdate: "",
  },
];

// Hàm cập nhật lại dữ liệu cho bảng Người dùng
export function renderInputTicketTable() {
  // Biến chứa đối tượng bảng Người dùng
  const bodyInputTicketTable = document.querySelector(
    ".main__data > .main__table.input_ticket > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].suppliesId}</td>
            <td>${data[i].dateCreate}</td>
            <td>${vietnamMoneyFormat(data[i].total)}</td>
            <td><span ${
              data[i].status === "Đã hoàn thành"
                ? 'class="green"'
                : data[i].status === "Chưa xác nhận"
                ? 'class="gray"'
                : 'class="red"'
            }>${data[i].status}</span></td>
            <td>
                <i id="update-button-input_ticket" class="fa-solid fa-pen-to-square"></i>
                <i id="print-button-input_ticket" class="fa-solid fa-print"></i>
            </td>
        </tr>
    `;
  }

  // Cập nhật lại giao diện
  bodyInputTicketTable.innerHTML = html;

  // Gán sự kiện cho các nút sau khi thay đổi giao diện
  const idColumnInTable = document.querySelectorAll(
    ".main__data > .main__table.input_ticket > tbody > tr > td:first-of-type"
  );
  const listButtonInTable = document.querySelectorAll(
    ".main__data > .main__table.input_ticket > tbody > tr > td:last-of-type"
  );
  listButtonInTable.forEach((buttons, row) => {
    // Các nút cần gán sự kiện trên mỗi dòng
    const updateButton = buttons.children[0];
    const printButton = buttons.children[1];
    // Id của đối tượng đã được chọn để thao tác
    const idInputTicketSelected = idColumnInTable.item(row);

    // Gán sự kiện hiện dialog sửa người dùng
    updateButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      updateInputTicketData(idInputTicketSelected);
    });
  });
}
