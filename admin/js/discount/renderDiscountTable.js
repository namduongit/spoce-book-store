import { detailDiscountData } from "./detailDiscountData.js";
import { updateDiscountData } from "./updateDiscountData.js";
import { lockDiscountData } from "./lockDiscountData.js";

// Hàm lấy dữ liệu mã giảm giá từ API
async function fetchDiscounts() {
  try {
    const response = await fetch("/api/discount/get_discount.php");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Kết quả API:", result);

    if (result.status === "success") {
      return result.data;
    } else {
      console.error("Lỗi khi lấy dữ liệu:", result.message);
      return {
        list: [],
        total: 0,
        page: 1,
        limit: 10,
        total_pages: 0,
      };
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return {
      list: [],
      total: 0,
      page: 1,
      limit: 10,
      total_pages: 0,
    };
  }
}

// Hàm cập nhật lại dữ liệu cho bảng khuyến mãi
export async function renderDiscountTable() {
  try {
    // Lấy dữ liệu từ API
    const data = await fetchDiscounts();

    // Biến chứa đối tượng bảng khuyến mãi
    const bodyInDiscountTable = document.querySelector(
      ".main__data > .main__table.discount > tbody"
    );

    if (!bodyInDiscountTable) {
      console.error("Không tìm thấy bảng khuyến mãi trong DOM");
      return;
    }

    // Chuyển đổi dữ liệu thành các thẻ html
    let html = ``;
    if (!data.list || data.list.length === 0) {
      html =
        '<tr><td colspan="7" class="text-center">Không có mã giảm giá nào</td></tr>';
    } else {
      data.list.forEach((discount) => {
        html += `
          <tr>
            <td>${discount.maPGG}</td>
            <td>${discount.tenPGG}</td>
            <td>${discount.type}</td>
            <td>${discount.ngayBatDau}</td>
            <td>${discount.ngayKetThuc}</td>
            <td><span ${
              discount.trangThai === "Hoạt động"
                ? 'class="green"'
                : 'class="red"'
            }>${discount.trangThai}</span></td>
            <td>
              <i id="detail-button-discount" class="fa-solid fa-circle-info"></i>
              <i id="update-button-discount" class="fa-solid fa-pen-to-square"></i>
              <i id="lock-button-discount" class="fa-solid fa-${
                discount.trangThai === "Hoạt động" ? "lock" : "unlock"
              }"></i>
            </td>
          </tr>
        `;
      });
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
      const detailButton = buttons.children[0];
      const updateButton = buttons.children[1];
      const lockButton = buttons.children[2];
      const idDiscountSelected = idColumnInTable.item(row);

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
  } catch (error) {
    console.error("Lỗi khi render bảng khuyến mãi:", error);
  }
}
