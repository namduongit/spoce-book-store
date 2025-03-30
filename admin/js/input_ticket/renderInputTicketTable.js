import { vietnamMoneyFormat } from "../others.js";
import { updateInputTicketData } from "./updateInputTicketData.js";
import { printInputTicket } from "./printInputTicket.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)


export async function getAllInputTicketData(){
  let url = `api/input_ticket/get.php`;
  console.log("Request URL:", url);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
      }
      let data = await response.json();
      console.log("Dữ liệu nhận được:", data);
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      alert("Lỗi khi lấy dữ liệu: " + error.message);
      return [];
    }
}


// Hàm cập nhật lại dữ liệu cho bảng phiếu nhập hàng
export async function renderInputTicketTable(data = null) {

  if(!data){
    data = await getAllInputTicketData();
  }

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
            <td>${data[i].suplierName}</td>
            <td>${data[i].DateInit}</td>
            <td>${vietnamMoneyFormat(data[i].inputTotal)}</td>
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
    const idInputTicketSelected = idColumnInTable.item(row).innerText;

    // Gán sự kiện hiện dialog sửa phiếu nhập hàng
    updateButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
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
