import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";


// Hàm thiết lập sự kiện hiện chi tiết Sách cho bảng
export async function detailBookData(idBookSelected) {
  // Phải truy vấn từ CSDL thông qua idBookSelected để lấy được dữ liệu của đối tượng hiện tại
    const res = await fetchData(`api/books/get.php?bookID=${idBookSelected}`);
    const book = res.books[0];
    const author = await fetchData(`api/authors/get.php?authorId=${book.authorId}`);
    const category = await fetchData(`api/categories/get.php?cateId=${book.genreId}`);
    const corver = await fetchData(`api/covers/get.php?coverId=${book.coverTypeId}`);
    const publisher = await fetchData(`api/publishers/get.php?publisherId=${book.publisherId}`);

  // Biến chứa đối tượng là nút "Chi tiết"
  const detailButton = document.querySelector(".detail-button-book");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  detailButton.classList.add("active");

  // Tạo một dialog để hiện một nhà cung cấp
  const detailDialog = document.createElement("dialog");
  // - Định dạng dialog
  detailDialog.classList.add("dialog");
  detailDialog.classList.add("book");
  detailDialog.style.width = "1178px";
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
              <label>Hình ảnh</label>
              <img src="public/uploads/books/${book.image}" alt"book-image"></img>
              <input type="file" id="detail-book-image" disabled />
          </div>
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book"></div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Mã sách</label>
              <input type="text" id="detail-book-id" readonly value="${book.id}" />
          </div>
          <div class="dialog__form-group book">
              <label>Tiêu đề</label>
              <input type="text" id="detail-book-title" readonly value="${book.name}" />
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Tác giả</label>
              <select id="detail-book-author" class="changed" disabled>
                  <option value="" selected>${author[0].name}</option>
                  <option value="" >Chọn Tác giả</option>
                  <option value="1">Nguyễn Nhật Ánh</option>
                  <option value="0">Nguyễn </option>
              </select>
          </div>
          <div class="dialog__form-group book">
              <label>Thể loại</label>
              <select id="detail-book-type" disabled>
                  <option value="" selected>${category[0].name}</option>
                  <option value="" >Chọn Thể loại</option>
                  <option value="1">Trinh thám</option>
                  <option value="0">Tình cảm</option>
              </select>
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
           <div class="dialog__form-group book">
              <label>Số trang</label>
              <input type="text" id="detail-book-pages" readonly value="${book.numberOfPages}"/>
          </div>
          <div class="dialog__form-group book">
              <label>Loại bìa</label>
              <select id="detail-book-cover" disabled>
                  <option value="" selected>${corver[0].name}</option>
                  <option value="" >Chọn Loại bìa</option>
                  <option value="1">Bìa cứng</option>
                  <option value="0">Bìa mềm</option>
              </select>
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Nhà xuất bản</label>
              <select id="detail-book-publish-name" disabled>
                  <option value="" selected>${publisher[0].name}</option>
                  <option value="1">Nhà xuất bản 1</option>
                  <option value="0">Nhà xuất bản 2</option>
              </select>
          </div>
          <div class="dialog__form-group book">
              <label>Năm xuất bản</label>
              <input type="text" id="detail-book-publish-year" readonly value="${book.publishYear}" />
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book description">
              <label>Mô tả</label>
              <textarea id="detail-book-description" readonly>${book.description}</textarea>
          </div>
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book"></div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Giá gốc</label>
              <input type="text" id="detail-book-price-base" readonly value="${book.originalPrice}" />
          </div>
          <div class="dialog__form-group book">
              <label>Giá bán</label>
              <input type="text" id="detail-book-price-order" readonly value="${book.sellingPrice}" />
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Trạng thái</label>
              <select id="detail-book-status" disabled>
                  <option value="" selected>${book.status}</option>
                  <option value="1">Hoạt động</option>
                  <option value="0">Tạm dừng</option>
              </select>
          </div>
          <div class="dialog__form-group book"></div>
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
    detailButton.classList.remove("active");
  });
}
