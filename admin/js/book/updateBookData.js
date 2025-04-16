import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";

// Hàm thiết lập sự kiện Sửa một sách cho bảng
export async function updateBookData(idBookSelected) {
  // Phải truy vấn từ CSDL thông qua idBookSelected để lấy được dữ liệu của đối tượng hiện tại
    const res = await fetchData(`api/books/get.php?bookID=${idBookSelected}`);
      const book = res.books[0];
      const author = await fetchData(`api/authors/get.php?authorId=${book.authorId}`);
      const category = await fetchData(`api/categories/get.php?cateId=${book.genreId}`);
      const corver = await fetchData(`api/covers/get.php?coverId=${book.coverTypeId}`);
      const publisher = await fetchData(`api/publishers/get.php?publisherId=${book.publisherId}`);
  
  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.querySelector(".update-button-book");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một sách
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("book");
  updateDialog.style.width = "1178px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
  <h1 class="dialog__title">Sửa sách</h1>
  <button id="close-book-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
  </button>
  <div class="dialog__line"></div>
  
  <form method="post" class="dialog__form">
      <div class="dialog__row">
          <div class="dialog__form-group book image">
              <label>Hình ảnh</label>
              <img id="preview-image"  src="public/uploads/books/${book.image}" alt"book-image"></img>
              <input type="file" id="update-book-image" accept="image/*" style="display: none;" />
              <button type="button" onclick="document.getElementById('update-book-image').click()">Tải hình ảnh</button>
          </div>
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book"></div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Mã sách</label>  
              <input type="text" id="update-book-id" readonly value="${book.id}"/>
          </div>
          <div class="dialog__form-group book">
              <label>Tiêu đề</label>
              <input type="text" id="update-book-title" placeholder="Nhập Tiêu đề" value="${book.name}" />
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Tác giả</label>
              <select id="update-book-author" class="changed">
                  <option value="4" selected>${author[0].name}</option>
                  <option value="1">Nguyễn Nhật Ánh</option>
                  <option value="2">J.K. Rowling</option>
                  <option value="3">Haruki Murakami</option>
              </select>
          </div>
          <div class="dialog__form-group book">
              <label>Thể loại</label>
              <select id="update-book-type"  class="changed">
                  <option value="1" selected>${category[0].name}</option>
                  <option value="2">Trinh thám</option>
                  <option value="3">Tình cảm</option>
              </select>
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Số trang</label>
              <input type="text" id="update-book-pages" placeholder="Nhập Số trang" value="${book.numberOfPages}" />
          </div>
          <div class="dialog__form-group book">
              <label>Loại bìa</label>
              <select id="update-book-cover"  class="changed">
                  <option value="2" selected>${corver[0].name}</option>
                  <option value="1">Bìa cứng</option>
                  <option value="3">Bìa mềm</option>
              </select>
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Nhà xuất bản</label>
              <select id="update-book-publish-name"  class="changed">
                  <option value="5" selected>${publisher[0].name}</option>
                  <option value="1">Nhà xuất bản 1</option>
                  <option value="0">Nhà xuất bản 2</option>
              </select>
          </div>
          <div class="dialog__form-group book">
              <label>Năm xuất bản</label>
              <input type="text" id="update-book-publish-year" placeholder="Nhập Năm xuất bản" value="${book.publishYear}" />
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book description">
              <label>Mô tả</label>
              <textarea id="update-book-description" placeholder="Nhập Mô tả">${book.description}</textarea>
          </div>
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book"></div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Giá gốc</label>
              <input type="text" id="update-book-price-base" placeholder="Nhập giá gốc" value="${book.originalPrice}"/>
          </div>
          <div class="dialog__form-group book">
              <label>Giá bán</label>
              <input type="text" id="update-book-price-order" placeholder="Nhập Giá bán" value="${book.sellingPrice}" />
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Trạng thái</label>
              <select id="update-book-status" class="changed" disabled>
                  <option value="4" selected>${book.status}</option>
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Tạm ngưng">Tạm ngưng</option>
              </select>
          </div>
          <div class="dialog__form-group book">
              <label>Kích thước</label>
              <input type="text" id="update-book-size" placeholder="Kích thước" value="${book.size}" />
          </div>
      </div>
      <div class="dialog__buttons">
          <button id="update-book-button" class="add">Sửa</button>
      </div>
  </form>
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

// thêm sự kiẹn chọn ảnh
let selectedImageName = `${book.image}`; // Biến lưu tên ảnh

document.getElementById("update-book-image").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
      selectedImageName = file.name; 
      // console.log( selectedImageName); 
  
      const reader = new FileReader();
      reader.onload = function (e) {
          const imgElement = document.getElementById("preview-image");
          if (imgElement) {
              imgElement.src = e.target.result;
          }
      };
      reader.readAsDataURL(file);
  }
});
// console.log(selectedImageName);

// Gán sự kiện cho nút "Sửa" dialog
document.getElementById("update-book-button").addEventListener("click", async (e) => {
    e.preventDefault();

    const id = document.getElementById("update-book-id").value;
    const title = document.getElementById("update-book-title").value;
    const author = document.getElementById("update-book-author").value;
    const type = document.getElementById("update-book-type").value;
    const pages = document.getElementById("update-book-pages").value;
    const cover = document.getElementById("update-book-cover").value;
    const publishName = document.getElementById("update-book-publish-name").value;
    const publishYear = document.getElementById("update-book-publish-year").value;
    const priceBase = document.getElementById("update-book-price-base").value;
    const priceOrder = document.getElementById("update-book-price-order").value;
    const description = document.getElementById("update-book-description").value;
    const size = document.getElementById("update-book-size").value;

    const imageInput = document.getElementById("update-book-image");

    let formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("authorId", author);
    formData.append("categoryId", type);
    formData.append("numOfpages", pages);
    formData.append("coverTypeId", cover);
    formData.append("publisherId", publishName);
    formData.append("publishYear", publishYear);
    formData.append("priceBase", priceBase);
    formData.append("priceOrder", priceOrder);
    formData.append("description", description);
    formData.append("size", size);

    if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    } else {
        formData.append("image", selectedImageName);
    }

    try {
        const response = await fetch("api/books/update.php", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            alert("Sửa sách thành công!");
        } else {
            alert("Lỗi sửa sách: " + (result.message || "Không rõ nguyên nhân"));
        }
    } catch (error) {
        console.error("Lỗi fetch API:", error);
        alert("Không thể kết nối đến server!");
    }
});


// Gán sự kiện cho nút "Đóng" dialog
document.getElementById("close-book-button").addEventListener("click", () => {
// Xoá dialog
updateDialog.remove();

});
}
