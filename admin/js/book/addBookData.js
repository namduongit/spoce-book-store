import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Thêm một sách cho bảng
export function addBookData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-book");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một sách
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("book");
    addDialog.style.width = "1178px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
        <h1 class="dialog__title">Thêm sách</h1>
        <button id="close-book-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="dialog__line"></div>
        <div class="dialog__row">
            <div class="dialog__form-group book image">
                <label>Hình ảnh</label>
                <img src="" alt"book-image"></img>
                <input type="file" id="add-book-image" readonly />
                <button type="button" onclick="document.getElementById('add-book-image').click()">Tải hình ảnh</button>
            </div>
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book"></div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Mã sách</label>
                <input type="text" id="add-book-id" readonly />
            </div>
            <div class="dialog__form-group book">
                <label>Tiêu đề</label>
                <input type="text" id="add-book-title" placeholder="Nhập Tiêu đề" />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Tác giả</label>
                <select id="add-book-author">
                    <option value="" selected>Chọn Tác giả</option>
                    <option value="1">Nguyễn Nhật Ánh</option>
                    <option value="0">Nguyễn </option>
                </select>
            </div>
            <div class="dialog__form-group book">
                <label>Thể loại</label>
                <select id="add-book-type">
                    <option value="" selected>Chọn Thể loại</option>
                    <option value="1">Trinh thám</option>
                    <option value="0">Tình cảm</option>
                </select>
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Số trang</label>
                <input type="text" id="add-book-pages" placeholder="Nhập Số trang" />
            </div>
            <div class="dialog__form-group book">
                <label>Loại bìa</label>
                <select id="add-book-cover">
                    <option value="" selected>Chọn Loại bìa</option>
                    <option value="1">Bìa cứng</option>
                    <option value="0">Bìa mềm</option>
                </select>
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Nhà xuất bản</label>
                <select id="add-book-publish-name">
                    <option value="" selected>Chọn Nhà xuất bản</option>
                    <option value="1">Nhà xuất bản 1</option>
                    <option value="0">Nhà xuất bản 2</option>
                </select>
            </div>
            <div class="dialog__form-group book">
                <label>Năm xuất bản</label>
                <input type="text" id="add-book-publish-year" placeholder="Nhập Năm xuất bản" />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book description">
                <label>Mô tả</label>
                <textarea id="add-book-description" placeholder="Nhập Mô tả"></textarea>
            </div>
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book"></div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Giá bìa</label>
                <input type="text" id="add-book-price-base" placeholder="Nhập Giá bìa" />
            </div>
            <div class="dialog__form-group book">
                <label>Giá bán</label>
                <input type="text" id="add-book-price-order" placeholder="Nhập Giá bán" />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Trạng thái</label>
                <select id="add-book-status">
                    <option value="" selected>Chọn Trạng thái</option>
                    <option value="1">Hoạt động</option>
                    <option value="0">Tạm dừng</option>
                </select>
            </div>
            <div class="dialog__form-group book"></div>
        </div>
        <div class="dialog__buttons">
            <button id="add-book-button" class="add">Thêm</button>
        </div>
    `;

    // Thêm vào body
    document.body.appendChild(addDialog);

    // Hiển thị addDialog
    addDialog.showModal();

    // Sự kiện cho các thành phần trong dialog
    // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
    const selectElement = document.querySelectorAll(
      ".dialog__form-group > select"
    );
    selectElement.forEach((select) => {
      isNotFirstItemSelected(select);
    });
    // - Sự kiện thay đổi ảnh khi nhấn nút "Tải hình ảnh"
    const imageImg = document.querySelector(
      ".dialog__form-group.book.image > img"
    );
    const imageInput = document.querySelector(
      ".dialog__form-group.book.image > input"
    );
    imageInput.addEventListener("change", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Thay đổi ảnh hiển thị
      imageImg.src = window.URL.createObjectURL(imageInput.files[0]);
      console.log(imageInput.value);
    });

    // Gán sự kiện cho nút "thêm" dialog
    document.getElementById("add-book-button").addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const image = document.getElementById("add-book-image");
      const id = document.getElementById("add-book-id");
      const title = document.getElementById("add-book-title");
      const author = document.getElementById("add-book-author");
      const type = document.getElementById("add-book-type");
      const pages = document.getElementById("add-book-pages");
      const cover = document.getElementById("add-book-cover");
      const publishName = document.getElementById("add-book-publish-name");
      const publishYear = document.getElementById("add-book-publish-year");
      const priceBase = document.getElementById("add-book-price-base");
      const priceOrder = document.getElementById("add-book-price-order");
      const description = document.getElementById("add-book-description");
      const status = document.getElementById("add-book-status");

      // ... (Xử lý tiếp ở đây)
      console.log(image.value);
      console.log(id.value);
      console.log(title.value);
      console.log(author.value);
      console.log(type.value);
      console.log(publishName.value);
      console.log(pages.value);
      console.log(publishYear.value);
      console.log(cover.value);
      console.log(priceBase.value);
      console.log(priceOrder.value);
      console.log(description.value);
      console.log(status.value);
    });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-book-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
