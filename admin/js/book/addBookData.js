import { isNotFirstItemSelected } from "../selectEvents.js";
import { getAllAuthorData } from "../author/renderAuthorTable.js";
import { getAllCategoryData } from "../category/renderCategoryTable.js";
import { getAllPublisherData } from "../publisher/renderPublisherTable.js";
import { getAllCoverData } from "../cover/renderCoverTable.js";

// Hàm thiết lập sự kiện Thêm một sách cho bảng
export  async function addBookData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-book");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", async (e) => {
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
                    <img id="preview-image" src="alt"book-image"></img>
                    <input type="file" id="add-book-image" value="80.jpg"    />
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
                    </select>
                </div>
                <div class="dialog__form-group book">
                    <label>Thể loại</label>
                    <select id="add-book-type"> 
                        <option selected value="1">Tiểu thuyết</option>
                        <option  value="2">Trinh thám</option>
                        <option value="3">Khoa học viễn tưởng</option>
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
                        <option selected value="ACTIVE">ACTIVE</option>
                        <option selected value="INACTIVE">INACTIVE</option>
                        <option selected value="SUSPENDED">SUSPENDED</option>
                        
                
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
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("preview-image").src = e.target.result;
                document.getElementById("preview-image").style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });
    

    // THÊM option các  tác giả
    let authorList = await getAllAuthorData();
    let authorSelect = document.querySelector("#add-book-author");
    authorSelect.innerHTML = '';
    authorList.forEach(author => {
        let op = document.createElement("option");
        op.value = author.id;
        op.textContent = author.name;
        authorSelect.appendChild(op);
    });


    // THÊM option các  thể loại
    let categoryList = await getAllCategoryData();
    let categorySelect = document.querySelector("#add-book-type");
    categorySelect.innerHTML = '';
    categoryList.forEach(author => {
        let op = document.createElement("option");
        op.value = author.id;
        op.textContent = author.name;
        categorySelect.appendChild(op);
    });


     // THÊM option các  thể loại
     let coverList = await getAllCoverData();
     let coverSelect = document.querySelector("#add-book-cover");
     coverSelect.innerHTML = '';
     coverList.forEach(author => {
         let op = document.createElement("option");
         op.value = author.id;
         op.textContent = author.name;
         coverSelect.appendChild(op);
     });
 

      // THÊM option các  thể loại
      let publisherList = await getAllPublisherData();
      let publisherLelect = document.querySelector("#add-book-publish-name");
      publisherLelect.innerHTML = '';
      publisherList.forEach(author => {
          let op = document.createElement("option");
          op.value = author.id;
          op.textContent = author.name;
          publisherLelect.appendChild(op);
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

        if(image =='' || title=='' || author =='' || type=='' || pages=='' || cover=='' || publishName=='' || publishYear=='' || priceBase=='' || priceOrder=='' || description=='' ||status=='' || size==''){
            alert("chưa điền đur thông tin");
        }else{
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
