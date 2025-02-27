// import { updateinput_ticketData } from "./updateinput_ticketData.js";
// import { detailinput_ticketData } from "./detailinput_ticketData.js";
// import { lockinput_ticketData } from "./lockinput_ticketData.js";

import { vietnamMoneyFormat } from "../others.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
let data = [
  {
    id: 1,
    dateCreate: "25-02-2025",
    dateContract: "25-02-2025",
    bookTypes: 5,
    cost: 200000,
    status: "Đã hoàn thành",
    dateUpdate: "",
  },
  {
    id: 2,
    dateCreate: "25-02-2025",
    bookTypes: 5,
    cost: 200000,
    status: "Chưa thanh toán",
    dateUpdate: "",
  },
  {
    id: 3,
    dateCreate: "25-02-2025",
    bookTypes: 5,
    cost: 200000,
    status: "Đang chờ xác nhận",
    dateUpdate: "",
  },
  {
    id: 4,
    dateCreate: "25-02-2025",
    bookTypes: 5,
    cost: 1850000,
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
            <td>${data[i].dateCreate}</td>
            <td>${data[i].bookTypes}</td>
            <td>${vietnamMoneyFormat(data[i].cost)}</td>
            <td><span ${
              data[i].status === "Đã hoàn thành"
                ? 'class="green"'
                : data[i].status === "Chưa thanh toán"
                ? 'class="yellow"'
                : data[i].status === "Đang chờ xác nhận"
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

  //   // Gán sự kiện cho các nút sau khi thay đổi giao diện
  //   const idColumnInTable = document.querySelectorAll(
  //     ".main__data > .main__table.input_ticket > tbody > tr > td:first-of-type"
  //   );
  //   const listButtonInTable = document.querySelectorAll(
  //     ".main__data > .main__table.input_ticket > tbody > tr > td:last-of-type"
  //   );
  //   listButtonInTable.forEach((buttons, row) => {
  //     // Các nút cần gán sự kiện trên mỗi dòng
  //     const detailButton = buttons.children[0];
  //     const updateButton = buttons.children[1];
  //     const lockButton = buttons.children[2];
  //     // Id của đối tượng đã được chọn để thao tác
  //     const idinput_ticketSelected = idColumnInTable.item(row);

  //     // Gán sự kiện hiện dialog chi tiết người dùng
  //     detailButton.addEventListener("click", (e) => {
  //       // Loại bỏ giá trị mặc định
  //       e.preventDefault();

  //       // Gọi hàm sự kiện
  //       detailinput_ticketData(idinput_ticketSelected);
  //     });

  //     // Gán sự kiện hiện dialog sửa người dùng
  //     updateButton.addEventListener("click", (e) => {
  //       // Loại bỏ giá trị mặc định
  //       e.preventDefault();

  //       // Gọi hàm sự kiện
  //       updateinput_ticketData(idinput_ticketSelected);
  //     });

  //     // Gán sự kiện hiện dialog khoá / mở khoá người dùng
  //     lockButton.addEventListener("click", (e) => {
  //       // Loại bỏ giá trị mặc định
  //       e.preventDefault();

  //       // Gọi hàm sự kiện
  //       lockinput_ticketData(idinput_ticketSelected);
  //     });
  //   });
}
