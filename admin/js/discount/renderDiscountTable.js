import { detailDiscountData } from "./detailDiscountData.js";
import { updateDiscountData } from "./updateDiscountData.js";
import { lockDiscountData } from "./lockDiscountData.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
let data = [
  {
    id: 1,
    name: "Khuyến mãi 1",
    type: "Tiền",
    value: 200000,
    dateStart: "27/02/2025",
    dateEnd: "27/02/2025",
    status: "Hoạt động",
    dateUpdate: "",
  },
  {
    id: 2,
    name: "Khuyến mãi 2",
    type: "Phần trăm",
    value: 20,
    dateStart: "27/02/2025",
    dateEnd: "27/02/2025",
    status: "Tạm dừng",
    dateUpdate: "",
  },
];

// Hàm cập nhật lại dữ liệu cho bảng khuyến mãi
export function renderDiscountTable() {
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
              <td><span ${
                data[i].status === "Hoạt động" ? 'class="green"' : 'class="red"'
              }>${data[i].status}</span></td>
              <td>
                  <i id="detail-button-discount" class="fa-solid fa-circle-info"></i>
                  <i id="update-button-discount" class="fa-solid fa-pen-to-square"></i>
                  <i id="lock-button-discount" class="fa-solid fa-${
                    data[i].status === "Hoạt động" ? "" : "un"
                  }lock"></i>
              </td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyInDiscountTable.innerHTML = html;

  // Gán sự kiện cho các nút sau khi thay đổi giao diện
  const idColumnInTable = document.querySelectorAll(
    ".main__data > .main__table.discount > tbody > tr > td:first-of-type"
  );
  const listButtonInTable = document.querySelectorAll(
    ".main__data > .main__table.discount > tbody > tr > td:last-of-type"
  );
  listButtonInTable.forEach((buttons, row) => {
    // Các nút cần gán sự kiện trên mỗi dòng
    const detailButton = buttons.children[0];
    const updateButton = buttons.children[1];
    const lockButton = buttons.children[2];
    // Id của đối tượng đã được chọn để thao tác
    const idDiscountSelected = idColumnInTable.item(row);

    // Gán sự kiện hiện dialog chi tiết khuyến mãi
    detailButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      detailDiscountData(idDiscountSelected);
    });

    // Gán sự kiện hiện dialog sửa khuyến mãi
    updateButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      updateDiscountData(idDiscountSelected);
    });

    // Gán sự kiện hiện dialog khoá / mở khoá khuyến mãi
    lockButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      lockDiscountData(idDiscountSelected);
    });
  });
}
