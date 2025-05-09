import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";

// Hàm thiết lập sự kiện Sửa một nhà cung cấp cho bảng
export async function detailSupplierData(idSupplierSelected) {
  // Gọi api để lấy được thông tin nhà cung cấp được nhấn
  const supplier = await fetchData(
    `api/suppliers/detail.php?id=${idSupplierSelected}`
  );

  //   // Biến chứa đối tượng là nút "Chi tiết"
  //   const detailButton = document.getElementById("detail-button-supplier");

  //   // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  //   detailButton.classList.add("active");

  // Tạo một dialog để hiện một nhà cung cấp
  const detailDialog = document.createElement("dialog");
  // - Định dạng dialog
  detailDialog.classList.add("dialog");
  detailDialog.classList.add("supplier");
  // detailDialog.style.width = "58%";
  // - Ghi nội dung dialog
  detailDialog.innerHTML = `
    <h1 class="dialog__title">Chi tiết nhà cung cấp</h1>
    <button id="close-supplier-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__line"></div>
    <form method="get" class="dialog__form">
        <div class="dialog__row">
            <div class="dialog__form-group">
                <label>Mã nhà cung cấp</label>
                <input type="text" id="detail-supplier-id" value="${supplier.data.id}" readonly />
            </div>
            <div class="dialog__form-group">
                <label>Tên nhà cung cấp</label>
                <input type="text" id="detail-supplier-name" value="${supplier.data.name}" readonly />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group">
                <label>Số điện thoại</label>
                <input type="text" id="detail-supplier-phone" value="${supplier.data.phone}" readonly />
            </div>
            <div class="dialog__form-group">
                <label>Email</label>
                <input type="text" id="detail-supplier-email" value="${supplier.data.email}" readonly />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group full">
                <label>Địa chỉ</label>
                <input type="text" id="detail-supplier-address" value="${supplier.data.address}" readonly />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group">
                <label>Trạng thái</label>
                <select id="detail-supplier-status" disabled>
                    <option value="" selected>${supplier.data.status}</option>
                    <option value="1">Hoạt động</option>
                </select>
            </div>
            <div class="dialog__form-group"></div>
        </div>
    </form>
  `;

  // Thêm vào body
  document.body.appendChild(detailDialog);

  // Hiển thị detailDialog
  detailDialog.showModal();

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-supplier-button")
    .addEventListener("click", () => {
      // Xoá dialog
      detailDialog.remove();

      //   // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      //   detailButton.classList.remove("active");
    });
}
