import { isNotFirstItemSelected } from "../selectEvents.js";

// Hàm thiết lập sự kiện Sửa một sách cho bảng
export function updateBookData(idBookSelected) {
  // Phải truy vấn từ CSDL thông qua idBookSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-book");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một sách
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("book");
  updateDialog.style.width = "1146px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
        <h1 class="dialog__title">Sửa sách</h1>
        <button id="close-book-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="dialog__line"></div>
        <div class="dialog__row">
            <div class="dialog__form-group book image">
                <label>Hình ảnh</label>
                <img src="" alt"book-image"></img>
                <input type="file" id="update-book-image" readonly />
                <button type="button" onclick="document.getElementById('update-book-image').click()">Tải hình ảnh</button>
            </div>
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book"></div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Mã sách</label>  
                <input type="text" id="update-book-id" readonly />
            </div>
            <div class="dialog__form-group book">
                <label>Tiêu đề</label>
                <input type="text" id="update-book-title" placeholder="Nhập Tiêu đề" />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Tác giả</label>
                <select id="update-book-author">
                    <option value="" selected>Chọn Tác giả</option>
                    <option value="1">Nguyễn Nhật Ánh</option>
                    <option value="0">Nguyễn </option>
                </select>
            </div>
            <div class="dialog__form-group book">
                <label>Thể loại</label>
                <select id="update-book-type">
                    <option value="" selected>Chọn Thể loại</option>
                    <option value="1">Trinh thám</option>
                    <option value="0">Tình cảm</option>
                </select>
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Nhà xuất bản</label>
                <select id="update-book-publish-name">
                    <option value="" selected>Chọn Nhà xuất bản</option>
                    <option value="1">Nhà xuất bản 1</option>
                    <option value="0">Nhà xuất bản 2</option>
                </select>
            </div>
            <div class="dialog__form-group book">
                <label>Nhà phát hành</label>
                <select id="update-book-issuer">
                    <option value="" selected>Chọn Nhà phát hành</option>
                    <option value="1">Nhà phát hành 1</option>
                    <option value="0">Nhà phát hành 2</option>
                </select>
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Năm xuất bản</label>
                <input type="text" id="update-book-publish-year" placeholder="Nhập Năm xuất bản" />
            </div>
            <div class="dialog__form-group book">
                <label>Loại bìa</label>
                <select id="update-book-cover">
                    <option value="" selected>Chọn Loại bìa</option>
                    <option value="1">Bìa cứng</option>
                    <option value="0">Bìa mềm</option>
                </select>
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book description">
                <label>Mô tả</label>
                <textarea id="update-book-description" placeholder="Nhập Mô tả"></textarea>
            </div>
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book"></div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Giá bìa</label>
                <input type="text" id="update-book-price-base" placeholder="Nhập Giá bìa" />
            </div>
            <div class="dialog__form-group book">
                <label>Giá bán</label>
                <input type="text" id="update-book-price-order" placeholder="Nhập Giá bán" />
            </div>
        </div>
        <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Giảm giá</label>
                <select id="update-book-discount">
                    <option value="" selected>Chọn Giảm giá</option>
                    <option value="1">Hoạt động</option>
                    <option value="0">Tạm dừng</option>
                </select>
            </div>
            <div class="dialog__form-group book">
                <label>Trạng thái</label>
                <select id="update-book-status" disabled>
                    <option value="" selected>Chọn Trạng thái</option>
                    <option value="1">Hoạt động</option>
                    <option value="0">Tạm dừng</option>
                </select>
            </div>
        </div>
        <div class="dialog__buttons">
            <button id="update-book-button" class="add">Sửa</button>
        </div>
      `;

  // Thêm vào body
  document.body.appendChild(updateDialog);

  // Hiển thị updateDialog
  updateDialog.showModal();

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });

  // Gán sự kiện cho nút "Sửa" dialog
  document
    .getElementById("update-book-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const image = document.getElementById("update-book-image");
      //   const id = document.getElementById("update-book-id");
      const title = document.getElementById("update-book-title");
      const author = document.getElementById("update-book-author");
      const type = document.getElementById("update-book-type");
      const publishName = document.getElementById("update-book-publish-name");
      const issuer = document.getElementById("update-book-issuer");
      const publishYear = document.getElementById("update-book-publish-year");
      const cover = document.getElementById("update-book-cover");
      const priceBase = document.getElementById("update-book-price-base");
      const priceOrder = document.getElementById("update-book-price-order");
      const discount = document.getElementById("update-book-discount");
      const description = document.getElementById("update-book-description");
      //   const status = document.getElementById("update-book-status");

      // ... (Xử lý tiếp ở đây)
      console.log(image.value);
      //   console.log(id.value);
      console.log(title.value);
      console.log(author.value);
      console.log(type.value);
      console.log(publishName.value);
      console.log(issuer.value);
      console.log(publishYear.value);
      console.log(cover.value);
      console.log(priceBase.value);
      console.log(priceOrder.value);
      console.log(discount.value);
      console.log(description.value);
      //   console.log(status.value);
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document.getElementById("close-book-button").addEventListener("click", () => {
    // Xoá dialog
    updateDialog.remove();

    // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
    updateButton.classList.remove("active");
  });
}
