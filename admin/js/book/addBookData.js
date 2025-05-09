import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderBookTable } from "./renderBookTable.js";
import {
    vietnamMoneyFormat,
    clickToShowDatePicker,
    defaultDateSelected,
  } from "../others.js";
  


// Hàm thiết lập sự kiện Thêm một sách cho bảng
export  async function addBookData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-book");
  if (!addButton) return;

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
        <form method="post" class="dialog__form">
            <div class="dialog__row">
                <div class="dialog__form-group book image">
                    <label>Hình ảnh</label>
                    <img id="preview-image" src="" alt"book-image"></img>
                    <input type="file" id="add-book-image" value=""  accept="image/*"    />
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
                        <option selected value="">Tiểu thuyếtNguyễn Nhật Ánh</option>
                        <option value="2">J.K. Rowling</option>
                        <option value="3">Haruki Murakami</option>
                    </select>
                </div>
                <div class="dialog__form-group book">
                    <label>Thể loại</label>
                    <select id="add-book-type" "> 
                        <option selected value="">Tiểu thuyết</option>
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
                        <option selected value="">Bìa cứng</option>
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
                        <option selected value="">NXB Trẻ</option>
                        <option  value="2">NXB Kim Đồng</option>
                        <option value="3">NXB Văn Học</option>
                    </select>
                </div>
                <div class="dialog__form-group book">
                    <label>Năm xuất bản</label>
                    <input type="date" id="add-book-publish-year" placeholder="Nhập Năm xuất bản" />
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
                    <label>Giá gốc</label>
                    <input type="text" id="add-book-price-base" placeholder="Nhập Giá Gốc" />
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
                    <select id="add-book-status" >
                        <option selected  value="">Chọn trạng thái</option>
                        <option  value="Đang bán">Đang bán</option>
                        <option  value="Dừng bán">Dừng bán</option>
                        
                
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

    
clickToShowDatePicker("add-book-publish-year");
defaultDateSelected("add-book-publish-year");


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


  
    let selectedImageName = ``; // Biến lưu tên ảnh

    document.getElementById("add-book-image").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            selectedImageName = file.name;
    
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgElement = document.getElementById("preview-image");
                if (imgElement) {
                    imgElement.src = e.target.result;
                    imgElement.style.display = "block";
                }
            };
            reader.readAsDataURL(file);
        }
    });
    
    

    // THÊM option các  tác giả
    let authorList = await fetchData(`api/authors/list.php`);
    let authorSelect = document.querySelector("#add-book-author");
    authorSelect.innerHTML = '';
    let op = document.createElement("option");
        op.value = "";
        op.textContent = "Chọn tác giả";
        authorSelect.appendChild(op);
    authorList.data.forEach(author => {
        let op = document.createElement("option");
        op.value = author.id;
        op.textContent = author.name;
        authorSelect.appendChild(op);
    });


    // THÊM option các  thể loại
    let categoryList =await fetchData(`api/categories/list.php`);
    let categorySelect = document.querySelector("#add-book-type");
    categorySelect.innerHTML = '';
     op = document.createElement("option");
        op.value = "";
        op.textContent = "Chọn thể loại";
        categorySelect.appendChild(op);
    categoryList.data.forEach(author => {
        let op = document.createElement("option");
        op.value = author.id;
        op.textContent = author.name;
        categorySelect.appendChild(op);
    });


     // THÊM option các  thể loại
     let coverList = await fetchData(`api/covers/list.php`);
     let coverSelect = document.querySelector("#add-book-cover");
     coverSelect.innerHTML = '';
      op = document.createElement("option");
     op.value = "";
     op.textContent = "Chọn loại bìa";
     coverSelect.appendChild(op);
     coverList.data.forEach(author => {
         let op = document.createElement("option");
         op.value = author.id;
         op.textContent = author.name;
         coverSelect.appendChild(op);
     });
 

      // THÊM option các  thể loại
      let publisherList = await fetchData(`api/publishers/list.php`);
      let publisherLelect = document.querySelector("#add-book-publish-name");
      publisherLelect.innerHTML = '';
       op = document.createElement("option");
          op.value = "";
          op.textContent = "Chọn nhà xuất bản";
          publisherLelect.appendChild(op);
      publisherList.data.forEach(author => {
          let op = document.createElement("option");
          op.value = author.id;
          op.textContent = author.name;
          publisherLelect.appendChild(op);
      });

    // Gán sự kiện cho nút "thêm" dialog
    document.getElementById("add-book-button").addEventListener("click", async (e) => {
        e.preventDefault();
    
        const imageInput = document.getElementById("add-book-image");
        const imageFile = imageInput.files[0];
        const title = document.getElementById("add-book-title").value.trim();
        const author = document.getElementById("add-book-author").value.trim();
        const type = document.getElementById("add-book-type").value.trim();
        const pages = document.getElementById("add-book-pages").value.trim();
        const cover = document.getElementById("add-book-cover").value.trim();
        const publishName = document.getElementById("add-book-publish-name").value.trim();
        const publishYear = document.getElementById("add-book-publish-year").value.trim();
        const priceBase = document.getElementById("add-book-price-base").value.trim();
        const priceOrder = document.getElementById("add-book-price-order").value.trim();
        const description = document.getElementById("add-book-description").value.trim();
        const status = document.getElementById("add-book-status").value.trim();
        const size = document.getElementById("add-book-size").value.trim();
    
        const isNumber = (value) => !isNaN(value) && value !== '';
    
        // Kiểm tra các trường, nếu có lỗi thì dừng lại và hiển thị lỗi đầu tiên
        if (!imageFile) {
            toast({ title: "Lỗi", message: "Vui lòng chọn ảnh.", type: "warning", duration: 3000 });
            return;
        } else if (!title) {
            toast({ title: "Lỗi", message: "Vui lòng nhập tên sách.", type: "warning", duration: 3000 });
            return;
        } else if (!author) {
            toast({ title: "Lỗi", message: "Vui lòng chọn tác giả.", type: "warning", duration: 3000 });
            return;
        } else if (!type) {
            toast({ title: "Lỗi", message: "Vui lòng chọn thể loại.", type: "warning", duration: 3000 });
            return;
        } else if (!pages) {
            toast({ title: "Lỗi", message: "Vui lòng nhập số trang.", type: "warning", duration: 3000 });
            return;
        } else if (!isNumber(pages)) {
            toast({ title: "Lỗi", message: "Số trang phải là số.", type: "warning", duration: 3000 });
            return;
        } else if (!cover) {
            toast({ title: "Lỗi", message: "Vui lòng chọn loại bìa.", type: "warning", duration: 3000 });
            return;
        } else if (!publishName) {
            toast({ title: "Lỗi", message: "Vui lòng chọn nhà xuất bản.", type: "warning", duration: 3000 });
            return;
        } else if (!publishYear) {
            toast({ title: "Lỗi", message: "Vui lòng nhập năm xuất bản.", type: "warning", duration: 3000 });
            return;
        } else if (!priceBase) {
            toast({ title: "Lỗi", message: "Vui lòng nhập giá gốc.", type: "warning", duration: 3000 });
            return;
        } else if (!isNumber(priceBase)) {
            toast({ title: "Lỗi", message: "Giá gốc phải là số.", type: "warning", duration: 3000 });
            return;
        } else if (!priceOrder) {
            toast({ title: "Lỗi", message: "Vui lòng nhập giá bán.", type: "warning", duration: 3000 });
            return;
        } else if (!isNumber(priceOrder)) {
            toast({ title: "Lỗi", message: "Giá bán phải là số.", type: "warning", duration: 3000 });
            return;
        } else if (!description) {
            toast({ title: "Lỗi", message: "Vui lòng nhập mô tả.", type: "warning", duration: 3000 });
            return;
        } else if (!status) {
            toast({ title: "Lỗi", message: "Vui lòng chọn trạng thái.", type: "warning", duration: 3000 });
            return;
        } else if (!size) {
            toast({ title: "Lỗi", message: "Vui lòng nhập kích thước.", type: "warning", duration: 3000 });
            return;
        } else if (!isNumber(size)) {
            toast({ title: "Lỗi", message: "Kích thước phải là số.", type: "warning", duration: 3000 });
            return;
        }
    
        let yes = await showNotification("Bạn có đồng ý thêm sách này không?");
        if(yes){

            // Nếu hợp lệ thì tiếp tục gửi dữ liệu
            const formData = new FormData();
            formData.append("image", imageFile);
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
            formData.append("status", status);
            formData.append("size", size);
        
            try {
                const response = await fetch("api/books/create.php", {
                    method: "POST",
                    body: formData
                });
        
                const result = await response.json();
        
                if (result.success) {
                    // alert("Thêm sách thành công!");
                  toast({title :"Thành công", message :`Thêm sách thành công`, type : "success" , duration : 3000});

                } else {
                    // alert("Lỗi thêm sách: " + (result.error || "Không rõ nguyên nhân"));
                  toast({title :"Cảnh báo", message :`${result.message}`, type : "warning" , duration : 3000});

                }
            } catch (error) {
                console.error("Lỗi fetch API:", error);
                // alert("Không thể kết nối đến server!");
                toast({title :"Lỗi", message :`Lỗi fetch API:${error}`, type : "error" , duration : 3000});

            }
        
            await renderBookTable(1);
            addDialog.remove();
            addButton.classList.remove("active");
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
