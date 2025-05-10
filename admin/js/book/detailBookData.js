import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";

// Hàm thiết lập sự kiện hiện chi tiết Sách cho bảng
export async function detailBookData(idBookSelected) {
  // Truy vấn từ csdl thông tin các đối tượng cần thiết
  const book = await fetchData(`api/books/detail.php?id=${idBookSelected}`);
  const author = await fetchData(
    `api/authors/detail.php?id=${book.data.authorId}`
  );
  const category = await fetchData(
    `api/categories/detail.php?id=${book.data.coverId}`
  );
  const cover = await fetchData(
    `api/covers/detail.php?id=${book.data.coverId}`
  );
  const publisher = await fetchData(
    `api/publishers/detail.php?id=${book.data.publisherId}`
  );

  //   // Biến chứa đối tượng là nút "Chi tiết"
  //   const detailButton = document.querySelector(".detail-button-book");

  //   // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  //   detailButton.classList.add("active");

  // Tạo một dialog để hiện một nhà cung cấp
  const detailDialog = document.createElement("dialog");
  // - Định dạng dialog
  detailDialog.classList.add("dialog");
  detailDialog.classList.add("book");
  detailDialog.style.width = "87%";
  // - Ghi nội dung dialog
  detailDialog.innerHTML = `
    <h1 class="dialog__title">Chi tiết sách</h1>
    <button id="close-book-button" class="dialog__close">
        <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__line"></div>
    <form method="get" class="dialog__form">
        <div class="dialog__row">
            <div class="dialog__form-group book image">
                <label style="color: #000">Hình ảnh</label>
                <img src="public/uploads/books/${book.data.image}" alt"book-image"></img>
            </div>
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book"></div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Mã sách</label>
                <input type="text" id="detail-book-id" class="text-center" readonly value="${book.data.id}" />
            </div>
            <div class="dialog__form-group book">
                <label>Tiêu đề</label>
                <input type="text" id="detail-book-title" readonly value="${book.data.name}" />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Tác giả</label>
                <select id="detail-book-author" class="changed" disabled>
                    <option value="" selected>${author.data.name}</option>
                </select>
            </div>
            <div class="dialog__form-group book">
                <label>Thể loại</label>
                <select id="detail-book-type" disabled>
                    <option value="" selected>${category.data.name}</option>
                </select>
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book half">
                <label>Số trang</label>
                <input type="text" id="detail-book-pages" readonly value="${book.data.pages}"/>
            </div>
            <div class="dialog__form-group book half">
                <label>Kích thước</label>
                <input type="text" id="detail-book-size" readonly value="${book.data.size}"/>
            </div>
            <div class="dialog__form-group book">
                <label>Loại bìa</label>
                <select id="detail-book-cover" disabled>
                    <option value="" selected>${cover.data.name}</option>
                </select>
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Nhà xuất bản</label>
                <select id="detail-book-publish-name" disabled>
                    <option value="" selected>${publisher.data.name}</option>
                </select>
            </div>
            <div class="dialog__form-group book">
                <label>Năm xuất bản</label>
                <input type="text" id="detail-book-publish-year" readonly value="${book.data.publishYear}" />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book description">
                <label>Mô tả</label>
                <textarea id="detail-book-description" readonly>${book.data.description}</textarea>
            </div>
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book"></div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Giá gốc</label>
                <input type="text" id="detail-book-price-base" readonly value="${book.data.basePrice}" />
            </div>
            <div class="dialog__form-group book">
                <label>Giá bán</label>
                <input type="text" id="detail-book-price-order" readonly value="${book.data.sellPrice}" />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Tồn kho</label>
                <input type="text" id="detail-book-inventory" readonly value="${book.data.inventory}" />
            </div>
            <div class="dialog__form-group book">
                <label>Trạng thái</label>
                <select id="detail-book-status" disabled>
                    <option value="" selected>${book.data.status}</option>
                    <option value="1">Hoạt động</option>
                    <option value="0">Tạm dừng</option>
                </select>
            </div>
        </div>
    </form >
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
  document.getElementById("close-book-button").addEventListener("click", () => {
    // Xoá dialog
    detailDialog.remove();

    // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
    // detailButton.classList.remove("active");
  });
}
