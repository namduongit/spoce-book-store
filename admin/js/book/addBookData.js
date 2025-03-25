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
        <form method="get" class="dialog__form">
            <div class="dialog__row">
                <div class="dialog__form-group book image">
                    <label>Hình ảnh</label>
                    <img id="preview-image" src="" alt"book-image"></img>
                    <input type="text" id="add-book-image" value="80.jpg" readonly   />
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
                        <option selected value="1">Tiểu thuyếtNguyễn Nhật Ánh</option>
                        <option value="2">J.K. Rowling</option>
                        <option value="3">Haruki Murakami</option>
                        <option value="4">George Orwell</option>
                        <option value="5">Dan Brown</option>
                        <option value="6">Trần Thị Huyên Thảo</option>
                        <option value="7">Vương Kỳ</option>
                        <option value="8">Hoàng Anh Tú</option>
                        <option value="9">Elaine Lui</option>
                        <option value="10">TChris Tompskin</option>
                    </select>
                </div>
                <div class="dialog__form-group book">
                    <label>Thể loại</label>
                    <select id="add-book-type"> 
                        <option selected value="1">Tiểu thuyết</option>
                        <option  value="2">Trinh thám</option>
                        <option value="3">Khoa học viễn tưởng</option>
                        <option value="4">Kỹ năng sống</option>
                        <option value="5">Kinh tế</option>
                        <option value="6">Truyện</option>
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
                        <option selected value="1">Bìa cứng</option>
                        <option  value="2">Bìa mềm</option>
                        <option value="3">Bìa gấp</option>
                        <option value="4">Bìa bọc vải/bọc da </option>
                        <option value="5">Bia bọc chống bụi </option>
                        <option value="6">Bìa trượt </option>
                    </select>
                </div>
            </div>
            <div class="dialog__row">
                <div class="dialog__form-group book"></div>
                <div class="dialog__form-group book">
                    <label>Nhà xuất bản</label>
                    <select id="add-book-publish-name">
                        <option selected value="1">NXB Trẻ</option>
                        <option  value="2">NXB Kim Đồng</option>
                        <option value="3">NXB Văn Học</option>
                        <option value="4">Nhà Xuất Bản Trẻ</option>
                        <option value="5">Nhà Xuất Bản Văn Học</option>
                        <option value="6">Nhà Xuất Bản Thông Tin và Truyền Thông</option>
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
                        <option selected value="Còn hàng">Còn hàng</option>
                        <option  value="Tạm ngưng">Tạm ngưng</option>
                
                    </select>
                </div>
                <div class="dialog__form-group book">
                    <label>Kích thước</label>
                    <input type="text" id="add-book-size" placeholder="Nhập kích thước" />
                
                </div>
            </div>
            
            <div class="dialog__buttons">
                <button id="add-book-button" class="add">Thêm</button>
            </div>
        </form>
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


    // thêm sự kiẹn chọn ảnh
    let selectedImageName = ``; // Biến lưu tên ảnh

    document.getElementById("add-book-image").addEventListener("change", function (event) {
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

    // Gán sự kiện cho nút "thêm" dialog
    document.getElementById("add-book-button").addEventListener("click", async (e) => {
        e.preventDefault();
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const image = document.getElementById("add-book-image").value;
      const id = document.getElementById("add-book-id").value;
      const title = document.getElementById("add-book-title").value;
      const author = document.getElementById("add-book-author").value;
      const type = document.getElementById("add-book-type").value;
      const pages = document.getElementById("add-book-pages").value;
      const cover = document.getElementById("add-book-cover").value;
      const publishName = document.getElementById("add-book-publish-name").value;
      const publishYear = document.getElementById("add-book-publish-year").value;
      const priceBase = document.getElementById("add-book-price-base").value;
      const priceOrder = document.getElementById("add-book-price-order").value;
      const description = document.getElementById("add-book-description").value;
      const status = document.getElementById("add-book-status").value;
      const size = document.getElementById("add-book-size").value;


      
    let params = new URLSearchParams();
    params.append("image", image);
    params.append("title", title);
    params.append("authorId", author);
    params.append("categoryId", type);
    params.append("numOfpages", pages);
    params.append("coverTypeId", cover);
    params.append("publisherId", publishName);
    params.append("publishYear", publishYear);
    params.append("priceBase", priceBase);
    params.append("priceOrder", priceOrder);
    params.append("description", description);
    params.append("status", status);
    params.append("size", size);


    let url = `api/books/create.php?${params.toString()}`;
    console.log("Request URL:", url);


    try {
        const response = await fetch(url, { method: "GET" });
    
        const result = await response.json(); // Chuyển luôn về JSON
    
        if (result.success) {
            alert("thêm sách thành công!");
        } else {
            alert("Lỗi thêm sách: " + (result.error || "Không rõ nguyên nhân"));
        }
    } catch (error) {
        console.error("Lỗi fetch API:", error);
        alert("Không thể kết nối đến server!");
    }
      
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
