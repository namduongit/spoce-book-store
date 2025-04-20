import { vietnamMoneyFormat } from "../others.js";
import { updateInputTicketData } from "./updateInputTicketData.js";
import { printInputTicket } from "./printInputTicket.js";
import { filterInputTicket } from "./filterInputTicket.js";

// Hàm cập nhật lại dữ liệu cho bảng phiếu nhập hàng
export async function renderInputTicketTable(currentPage) {
  //
  const data = (await filterInputTicket(currentPage)) || [];
  // Biến chứa đối tượng bảng phiếu nhập hàng
  const bodyInputTicketTable = document.querySelector(
    ".main__data > .main__table.input_ticket > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].supplierId}</td>
            <td>${data[i].createAt}</td>
            <td>${vietnamMoneyFormat(data[i].total)}</td>
            <td><span ${
              data[i].status === "Đã thanh toán"
                ? 'class="orange"'
                : data[i].status === "Đã xác nhận"
                ? 'class="green"'
                : data[i].status === "Đã huỷ phiếu"
                ? 'class="red"'
                : 'class="gray"'
            }>${data[i].status}</span></td>
            <td>
                <i class="fa-solid fa-pen-to-square"></i>
                <i class="fa-solid fa-print"></i>
            </td>
        </tr>
    `;
  }

  if (data.length == 0) {
    html = `
          <tr>
              <td></td>
              <td>Danh sách trống</td>             
              <td></td>
          </tr>
      `;
    bodyInputTicketTable.innerHTML = html;
  } else {
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
      const idInputTicketSelected = idColumnInTable.item(row).textContent;

      // Gán sự kiện hiện dialog sửa phiếu nhập hàng
      updateButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        console.log(idInputTicketSelected);
        updateInputTicketData(idInputTicketSelected);
      });

      // Gán sự kiện hiện dialog in phiếu nhập hàng
      printButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        printInputTicket(idInputTicketSelected);
      });
    });
  }
}
