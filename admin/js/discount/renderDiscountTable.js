import { detailDiscountData } from "./detailDiscountData.js";
import { updateDiscountData } from "./updateDiscountData.js";
import { lockDiscountData } from "./lockDiscountData.js";
import { filterDiscount } from "./filterDiscountData.js";

const data = JSON.parse(sessionStorage.getItem('dataRole'));

var infoDiscount = data[6] && data[6].includes(2) ? '' : 'none__item';
var editDiscount = data[6] && data[6].includes(4) ? '' : 'none__item';
var lockDiscount = data[6] && data[6].includes(5) ? '' : 'none__item';

// Hàm cập nhật lại dữ liệu cho bảng khuyến mãi
export async function renderDiscountTable(currentPage) {
  // Lấy dữ liệu từ API
  const data = (await filterDiscount(currentPage)) || [];
  // Biến chứa đối tượng bảng khuyến mãi
  const bodyInDiscountTable = document.querySelector(
    ".main__data > .main__table.discount > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
        <tr>
          <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].type}</td>
            <td>${data[i].dateStart}</td>
            <td>${data[i].dateEnd}</td>
            <td><span ${data[i].status === "Hoạt động" ? 'class="green"' : 'class="red"'
      }>${data[i].status}</span></td>
            <td>
              <i class="fa-solid fa-circle-info ${infoDiscount}"></i>
              <i class="fa-solid fa-pen-to-square ${editDiscount}"></i>
              <i class="fa-solid fa-${data[i].status === "Hoạt động" ? "lock" : "unlock"
      } ${lockDiscount}"></i>
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
    bodyInDiscountTable.innerHTML = html;
  } else {
    // Cập nhật lại giao diện
    bodyInDiscountTable.innerHTML = html;

    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.discount > tbody > tr > td:first-of-type"
    );

    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.discount > tbody > tr > td:last-of-type"
    );

    listButtonInTable.forEach((button, row) => {
      const detailButton = button.children[0];
      const updateButton = button.children[1];
      const lockButton = button.children[2];
      const idDiscountSelected = idColumnInTable.item(row).textContent;

      detailButton.addEventListener("click", (e) => {
        e.preventDefault();
        detailDiscountData(idDiscountSelected);
      });

      updateButton.addEventListener("click", (e) => {
        e.preventDefault();
        updateDiscountData(idDiscountSelected);
      });

      lockButton.addEventListener("click", (e) => {
        e.preventDefault();
        lockDiscountData(idDiscountSelected);
      });
    });
  }
} 

