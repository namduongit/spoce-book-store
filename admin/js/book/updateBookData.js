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
  

// Hàm thiết lập sự kiện Sửa một sách cho bảng
export async function updateBookData(idBookSelected) {
  // Phải truy vấn từ CSDL thông qua idBookSelected để lấy được dữ liệu của đối tượng hiện tại
    const res = await fetchData(`api/books/detail.php?id=${idBookSelected}`);
      const book = res.data;
      const resultAuthor = await fetchData(`api/authors/detail.php?id=${book.authorId}`);
      const author = resultAuthor.data;
      const resultCategory = await fetchData(`api/categories/detail.php?id=${book.categoryId}`);
      const category = resultCategory.data;
      const resultCorver = await fetchData(`api/covers/detail.php?id=${book.coverId}`);
      const corver = resultCorver.data;
      const resultPublisher = await fetchData(`api/publishers/detail.php?id=${book.publisherId}`);
      const publisher = resultPublisher.data;

  
  // Biến chứa đối tượng là nút "Sửa"
//   const updateButton = document.querySelector(".update-button-book");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
//   updateButton.classList.add("active");

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
              <label>Hình ảnh <span>*<span></label>
              <img id="preview-image"  src="public/uploads/books/${book.image}?v=${Date.now()}" alt"book-image"></img>
              <input type="file" id="update-book-image" accept="image/*" style="display: none;" />
              <button type="button" onclick="document.getElementById('update-book-image').click()">Tải hình ảnh</button>
          </div>
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book"></div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Mã sách <span>*<span></label>  
              <input type="text" id="update-book-id" readonly value="${book.id}"/>
          </div>
          <div class="dialog__form-group book">
              <label>Tiêu đề <span>*<span></label>
              <input type="text" id="update-book-title" placeholder="Nhập Tiêu đề" value="${book.name}" />
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Tác giả <span>*<span></label>
              <select id="update-book-author" class="changed">
                  <option value="${author.id}" selected>${author.name}</option>

              </select>
          </div>
          <div class="dialog__form-group book">
              <label>Thể loại <span>*<span></label>
              <select id="update-book-type"  class="changed">
                  <option value="${category.id}" selected>${category.name}</option>

              </select>
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book half">
              <label>Số trang <span>*<span></label>
              <input type="number" id="update-book-pages" placeholder="Nhập Số trang" value="${book.pages}" />
          </div>
          <div class="dialog__form-group book half">
              <label>Kích thước <span>*<span></label>
              <input type="number" id="update-book-size" placeholder="Kích thước" value="${book.size}" />
          </div>
          <div class="dialog__form-group book">
              <label>Loại bìa <span>*<span></label>
              <select id="update-book-cover"  class="changed">
                  <option value="${corver.id}" selected>${corver.name}</option>
              </select>
          </div>
      </div>
      <div class="dialog__row">
          <div class="dialog__form-group book"></div>
          <div class="dialog__form-group book">
              <label>Nhà xuất bản <span>*<span></label>
              <select id="update-book-publish-name"  class="changed">
                  <option value="${publisher.id}" selected>${publisher.name}</option>
              </select>
          </div>
          <div class="dialog__form-group book">
              <label>Năm xuất bản <span>*<span></label>
              <input type="number" id="update-book-publish-year" class="hasValidDate" placeholder="Nhập Năm xuất bản" value="${book.publishYear}" />
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
              <label>Giá gốc <span>*<span></label>
              <input type="number" id="update-book-price-base" placeholder="Nhập giá gốc" value="${book.basePrice}"/>
          </div>
          <div class="dialog__form-group book">
              <label>Giá bán <span>*<span></label>
              <input type="number" id="update-book-price-order" placeholder="Nhập Giá bán" value="${book.sellPrice}" />
          </div>
      </div>
      <div class="dialog__row">
            <div class="dialog__form-group book"></div>
            <div class="dialog__form-group book">
                <label>Tồn kho</label>
                <input type="text" id="detail-book-inventory" readonly value="${book.inventory}" />
                </div>
            <div class="dialog__form-group book">
                <label>Trạng thái <span>*<span></label>
                <select id="update-book-status" class="changed" disabled>
                    <option value="${book.status}" selected>${book.status}</option>
                    <option value="Còn hàng">Còn hàng</option>
                    <option value="Tạm ngưng">Tạm ngưng</option>
                </select>
            </div>
    
        </div>
      <div class="dialog__buttons">
          <button id="update-book-button" class="update">Sửa</button>
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


clickToShowDatePicker("update-book-publish-year");
defaultDateSelected("update-book-publish-year");

// thêm sự kiẹn chọn ảnh
let selectedImageName = `${book.image}`; // Biến lưu tên ảnh

document.getElementById("update-book-image").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    //   selectedImageName = file.name; 
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


 // THÊM option các  tác giả
 let authorList = await fetchData(`api/authors/list.php`);
 authorList = authorList.data.filter(tacGia => tacGia.id !== author.id);
 let authorSelect = document.querySelector("#update-book-author");
 authorList.forEach(author => {
     let op = document.createElement("option");
     op.value = author.id;
     op.textContent = author.name;
     authorSelect.appendChild(op);
 });

  // THÊM option các  thể loại
  let categoryList =await fetchData(`api/categories/list.php`);
    categoryList = categoryList.data.filter(theLoai => theLoai.id !== category.id);
  let categorySelect = document.querySelector("#update-book-type");
  categoryList.forEach(category => {
      let op = document.createElement("option");
      op.value = category.id;
      op.textContent = category.name;
      categorySelect.appendChild(op);
  });


   // THÊM option các  thể loại
   let coverList = await fetchData(`api/covers/list.php`);
   coverList = coverList.data.filter(loaiBia => loaiBia.id !== corver.id);
   let coverSelect = document.querySelector("#update-book-cover");
   coverList.forEach(author => {
       let op = document.createElement("option");
       op.value = author.id;
       op.textContent = author.name;
       coverSelect.appendChild(op);
   });

    // THÊM option các  thể loại
      let publisherList = await fetchData(`api/publishers/list.php`);
        publisherList = publisherList.data.filter(nxb => nxb.id !== publisher.id);

      let publisherLelect = document.querySelector("#update-book-publish-name");
      publisherList.forEach(nxb => {
          let op = document.createElement("option");
          op.value = nxb.id;
          op.textContent = nxb.name;
          publisherLelect.appendChild(op);
      });


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
    // console.log(publishYear);
    const imageInput = document.getElementById("update-book-image");
    const oldImageName = selectedImageName;

    let checkTitle = true;
    if(title == ''){
        toast({title :"Lỗi", message :`Hãy nhập tên tiêu đề của sách.`, type : "warning" , duration : 3000});
        checkTitle = false;
    }

    let checkNumPage = true;
    if (!pages) {
        toast({ title: "Lỗi", message: "Vui lòng nhập số trang", type: "warning", duration: 3000 });
        checkNumPage = false;
    }
    if (pages < 0) {
        toast({ title: "Lỗi", message: "Số trang phải lơn hơn 0", type: "warning", duration: 3000 });
        checkNumPage = false;
    }

    let checkOriginPrice = true;
    if (!priceBase) {
        toast({ title: "Lỗi", message: "Vui lòng nhập giá gốc", type: "warning", duration: 3000 });
        checkOriginPrice = false;
    }
     if (priceBase < 0) {
        toast({ title: "Lỗi", message: "Giá gốc phải lớn hơn 0", type: "warning", duration: 3000 });
        checkOriginPrice = false;
    }

    let checkSellingPrice = true;
    if (!priceOrder) {
        toast({ title: "Lỗi", message: "Vui lòng nhập giá bán", type: "warning", duration: 3000 });
        checkSellingPrice = false;
    }
     if (priceOrder < 0) {
        toast({ title: "Lỗi", message: "Giá bán phải lơn hơn 0", type: "warning", duration: 3000 });
        checkSellingPrice = false;
    }



    let checkSize = true;
    if (!size ) {
        toast({ title: "Lỗi", message: "Vui lòng nhập kích thước.", type: "warning", duration: 3000 });
        checkSize = false;
    }
     if (size < 0 ) {
        toast({ title: "Lỗi", message: "Kích thước phải lớn hơn 0", type: "warning", duration: 3000 });
        checkSize = false;
    }

      let checkPublishYear = true;
    if (!publishYear ) {
        toast({ title: "Lỗi", message: "Vui lòng nhập năm xuất bản", type: "warning", duration: 3000 });
        checkPublishYear = false;
    }
     if (publishYear < 0 ) {
        toast({ title: "Lỗi", message: "Năm xuất bản phải lớn hơn 0", type: "warning", duration: 3000 });
        checkPublishYear = false;
    }
     if (publishYear  > (new Date()).getFullYear() ) {
        toast({ title: "Lỗi", message:"Năm xuất bản phải bé hơn hoặc bằng năm hiện tại", type: "warning", duration: 3000 });
        checkPublishYear = false;
    }


    if(checkTitle && checkNumPage && checkOriginPrice && checkSellingPrice && checkSize && checkPublishYear){

        let yes = await showNotification("Bạn có đồng ý lưu chỉnh sửa không ?");
        if(yes){
        
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
            formData.append("oldImageName", oldImageName);
            formData.append("newImage", imageInput.files.length > 0 ? imageInput.files[0] : '');
        
           
            try {
                const response = await fetch("api/books/update.php", {
                    method: "POST",
                    body: formData,
                });
        
                const result = await response.json();
        
                if (result.success) {
                    // alert("Sửa sách thành công!");
                  toast({title :"Thành công", message :`Cập nhật sách thành công`, type : "success" , duration : 3000});
    
                } else {
                    // alert("Lỗi sửa sách: " + (result.message || "Không rõ nguyên nhân"));
                  toast({title :"Cảnh báo", message :`${result.message}`, type : "warning" , duration : 3000});
    
                }
            } catch (error) {
                console.error("Lỗi fetch API:", error);
                // alert("Không thể kết nối đến server!");
                toast({title :"Lỗi", message :`Lỗi fetch API:${error}`, type : "error" , duration : 3000});
    
            }
            await renderBookTable(1);
            updateDialog.remove();
            // updateButton.classList.remove("active");
    
        }
    }



});


// Gán sự kiện cho nút "Đóng" dialog
document.getElementById("close-book-button").addEventListener("click", async () => {
    // let yes = await showNotification("Bạn có đồng ý thoát không?");
    // if(yes){
        // Xoá dialog
        updateDialog.remove();
        // updateButton.classList.remove("active");
    // }


});
}
