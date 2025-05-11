import { updatePaymentData } from "./updatePaymentData.js";
// Hàm khóa

import { filterPayment } from "./filterPaymentData.js";

export async function renderPaymentTable(currentPage) {
    const data = (await filterPayment(currentPage)) || [];

    // Biến chứa đối tượng phương thức thanh toán
    const bodyInPaymentTable = document.querySelector(
        ".main__data > .main__table.payment > tbody"
    );

    // Chuyển đổi dữ liệu thành các thẻ html
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        html += `
      <tr>
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].description != null ? data[i].description : 'Không có mô tả'}</td>
        <td>${data[i].online != 0 ? 'Nhận hàng - trả tiền' : 'Thanh toán online'}</td>
        <td><span ${data[i].status === "Hoạt động" ? 'class="green"' : 'class="red"'
            }>${data[i].status}</span></td>
        <td>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-${data[i].status === "Hoạt động" ? "" : "un"
            }lock"></i>
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
        bodyInPaymentTable.innerHTML = html;
    } else {
        // Cập nhật lại giao diện
        bodyInPaymentTable.innerHTML = html;

        // Gán sự kiện cho các nút sau khi thay đổi giao diện
        const idColumnInTable = document.querySelectorAll(
            ".main__data > .main__table.payment > tbody > tr > td:first-of-type"
        );
        const listButtonInTable = document.querySelectorAll(
            ".main__data > .main__table.payment > tbody > tr > td:last-of-type"
        );
        listButtonInTable.forEach((button, row) => {
            // Các nút cần gán sự kiện trên mỗi dòng
            const updateButton = button.children[0];
            const lockButton = button.children[1];
            // Id của đối tượng đã được chọn để thao tác
            const idpaymentSelected = idColumnInTable.item(row).textContent;

            // Gán sự kiện hiện dialog sửa thể loại
            updateButton.addEventListener("click", (e) => {
                // Loại bỏ giá trị mặc định
                e.preventDefault();

                // Gọi hàm sự kiện cập nhật
                
            });

            // Gán sự kiện hiện dialog khoá / mở khoá thể loại
            lockButton.addEventListener("click", (e) => {
                // Loại bỏ giá trị mặc định
                e.preventDefault();

                // Gọi hàm sự kiện khóa
                // lockpaymentData(idpaymentSelected);
            });
        });
    }

}