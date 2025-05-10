import { updateSupplierData } from "./updateSupplierData.js";
import { detailSupplierData } from "./detailSupplierData.js";
import { lockSupplierData } from "./lockSupplierData.js";
import { filterSupplier } from "./filterSupplierData.js";

const data = JSON.parse(sessionStorage.getItem('dataRole'));

var infoSupplier = data[9] && data[9].includes(2) ? '' : 'none__item';
var editSupplier = data[9] && data[9].includes(4) ? '' : 'none__item';
var lockSupplier = data[9] && data[9].includes(5) ? '' : 'none__item';

// Hàm cập nhật lại dữ liệu cho bảng Nhà cung cấp
export async function renderSupplierTable(currentPage) {
  const data = (await filterSupplier(currentPage)) || [];
  // Biến chứa đối tượng bảng Nhà cung cấp
  const bodyInSupplierTable = document.querySelector(
    ".main__data > .main__table.supplier > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].email}</td>
            <td><span ${
              data[i].status === "Hoạt động" ? 'class="green"' : 'class="red"'
            }>${data[i].status}</span></td>
            <td>
                <i class="fa-solid fa-circle-info ${infoSupplier}"></i>
                <i class="fa-solid fa-pen-to-square ${editSupplier}"></i>
                <i class="fa-solid fa-${
                  data[i].status === "Hoạt động" ? "" : "un"
                }lock ${lockSupplier}"></i>
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
    bodyInSupplierTable.innerHTML = html;
  } else {
    // Cập nhật lại giao diện
    bodyInSupplierTable.innerHTML = html;

    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.supplier > tbody > tr > td:first-of-type"
    );
    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.supplier > tbody > tr > td:last-of-type"
    );
    listButtonInTable.forEach((buttons, row) => {
      // Các nút cần gán sự kiện trên mỗi dòng
      const detailButton = buttons.children[0];
      const updateButton = buttons.children[1];
      const lockButton = buttons.children[2];
      // Id của đối tượng đã được chọn để thao tác
      const idSupplierSelected = idColumnInTable.item(row).textContent;

      // Gán sự kiện hiện dialog chi tiết Nhà cung cấp
      detailButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        detailSupplierData(idSupplierSelected);
      });

      // Gán sự kiện hiện dialog sửa Nhà cung cấp
      updateButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        updateSupplierData(idSupplierSelected);
      });

      // Gán sự kiện hiện dialog khoá / mở khoá Nhà cung cấp
      lockButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        lockSupplierData(idSupplierSelected);
      });
    });
  }
}
