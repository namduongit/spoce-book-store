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
export async function addBookData() {
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
        <form method="post" class="dialog__form" autocomplete="off">
            <div class="dialog__row">
                <div class="dialog__form-group book image">
                    <label>Hình ảnh<span>*<span></label>
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
                    <label>Mã sách<span>*<span></label>
                    <input type="text" id="add-book-id" class="text-center" readonly value="Được xác định sau khi xác nhận thêm !" />
                </div>
                <div class="dialog__form-group book">
                    <label>Tiêu đề<span>*<span></label>
                    <input type="text" id="add-book-title" placeholder="Nhập Tiêu đề" />
                </div>
            </div>
            <div class="dialog__row">
                <div class="dialog__form-group book"></div>
                <div class="dialog__form-group book">
                    <label>Tác giả<span>*<span></label>
                    <select id="add-book-author">
                      <option value="">Chọn Tác giả</option>
                    </select>
                </div>
                <div class="dialog__form-group book">
                    <label>Thể loại<span>*<span></label>
                    <select id="add-book-category">
                      <option value="">Chọn Thể loại</option>
                    </select>
                </div>
            </div>
            <div class="dialog__row">
                <div class="dialog__form-group book"></div>
                <div class="dialog__form-group book half">
                    <label>Số trang<span>*<span></label>
                    <input type="number" id="add-book-pages" placeholder="Nhập Số trang" />
                </div>
                <div class="dialog__form-group book half">
                    <label>Kích thước<span>*<span></label>
                    <input type="number" id="add-book-size" placeholder="Nhập kích thước" />
                </div>
                <div class="dialog__form-group book">
                    <label>Loại bìa<span>*<span></label>
                    <select id="add-book-cover">
                      <option value="">Chọn Loại bìa</option>
                    </select>
                </div>
            </div>
            <div class="dialog__row">
                <div class="dialog__form-group book"></div>
                <div class="dialog__form-group book">
                    <label>Nhà xuất bản<span>*<span></label>
                    <select id="add-book-publisher-name">
                      <option value="">Chọn Nhà xuất bản</option>
                    </select>
                </div>
                <div class="dialog__form-group book">
                    <label>Năm xuất bản<span>*<span></label>
                    <input type="number" id="add-book-publisher-year" placeholder="Nhập Năm xuất bản" />
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
                    <label>Giá trần<span>*<span></label>
                    <input type="number" id="add-book-price-base" placeholder="Nhập Giá trần" />
                </div>
                <div class="dialog__form-group book">
                    <label>Giá bán<span>*<span></label>
                    <input type="number" id="add-book-price-order" placeholder="Nhập Giá bán" />
                </div>
            </div>
            <div class="dialog__row">
                <div class="dialog__form-group book"></div>
                <div class="dialog__form-group book">
                <label>Tồn kho</label>
                  <input type="text" id="create-book-inventory" readonly value="0" />
                </div>
                <div class="dialog__form-group book">
                    <label>Trạng thái<span>*<span></label>
                    <select id="add-book-status" >
                        <option selected  value="">Chọn Trạng thái</option>
                        <option value="Đang bán">Đang bán</option>
                        <option value="Dừng bán">Dừng bán</option>
                    </select>
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

    clickToShowDatePicker("add-book-publisher-year");
    defaultDateSelected("add-book-publisher-year");

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

    let selectedImageName = "";
    document
      .getElementById("add-book-image")
      .addEventListener("change", function (event) {
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

    // THÊM option các tác giả
    let authorList = await fetchData(`api/authors/list.php?status=Hoạt%20động`);
    let authorSelect = document.querySelector("#add-book-author");
    authorList.data.forEach((author) => {
      let op = document.createElement("option");
      op.value = author.id;
      op.textContent = author.name;
      authorSelect.appendChild(op);
    });

    // THÊM option các  thể loại
    let categoryList = await fetchData(
      `api/categories/list.php?status=Hoạt%20động`
    );
    let categorySelect = document.querySelector("#add-book-category");
    categoryList.data.forEach((author) => {
      let op = document.createElement("option");
      op.value = author.id;
      op.textContent = author.name;
      categorySelect.appendChild(op);
    });

    // THÊM option các  thể loại
    let coverList = await fetchData(`api/covers/list.php?status=Hoạt%20động`);
    let coverSelect = document.querySelector("#add-book-cover");
    coverList.data.forEach((author) => {
      let op = document.createElement("option");
      op.value = author.id;
      op.textContent = author.name;
      coverSelect.appendChild(op);
    });

    // THÊM option các  thể loại
    let publisherList = await fetchData(
      `api/publishers/list.php?status=Hoạt%20động`
    );
    let publisherLelect = document.querySelector("#add-book-publisher-name");
    publisherList.data.forEach((author) => {
      let op = document.createElement("option");
      op.value = author.id;
      op.textContent = author.name;
      publisherLelect.appendChild(op);
    });

    // Gán sự kiện cho nút "thêm" dialog
    document
      .getElementById("add-book-button")
      .addEventListener("click", async (e) => {
        e.preventDefault();

        const imageFile = document.getElementById("add-book-image").files[0]
          ? document.getElementById("add-book-image").files[0]
          : null;
        const title = document.getElementById("add-book-title").value
          ? document.getElementById("add-book-title").value
          : null;
        const author = document.getElementById("add-book-author").value
          ? Number(document.getElementById("add-book-author").value)
          : null;
        const category = document.getElementById("add-book-category").value
          ? document.getElementById("add-book-category").value
          : null;
        const pages = document.getElementById("add-book-pages").value
          ? document.getElementById("add-book-pages").value
          : null;
        const size = document.getElementById("add-book-size").value
          ? document.getElementById("add-book-size").value
          : null;
        const cover = document.getElementById("add-book-cover").value
          ? document.getElementById("add-book-cover").value
          : null;
        const publisherId = document.getElementById("add-book-publisher-name")
          .value
          ? document.getElementById("add-book-publisher-name").value
          : null;
        const publisherYear = document.getElementById("add-book-publisher-year")
          .value
          ? document.getElementById("add-book-publisher-year").value
          : null;
        const priceBase = document.getElementById("add-book-price-base").value
          ? document.getElementById("add-book-price-base").value
          : null;
        const priceOrder = document.getElementById("add-book-price-order").value
          ? document.getElementById("add-book-price-order").value
          : null;
        const description = document.getElementById("add-book-description")
          .value
          ? document.getElementById("add-book-description").value
          : null;
        const status = document.getElementById("add-book-status").value
          ? document.getElementById("add-book-status").value
          : null;

        //
        const isNumber = (value) => value && !isNaN(value);
        console.log(
          "kkkkkk",
          imageFile,
          title,
          author,
          category,
          pages,
          size,
          cover,
          publisherId,
          publisherYear,
          status
        );
        // Kiểm tra các trường, nếu có lỗi thì dừng lại và hiển thị lỗi đầu tiên
        if (!imageFile) {
          toast({
            title: "Lỗi",
            message: "Vui lòng chọn ảnh.",
            type: "warning",
            duration: 3000,
          });
          return;
        } else if (!title) {
          toast({
            title: "Lỗi",
            message: "Vui lòng nhập tên sách.",
            type: "warning",
            duration: 3000,
          });
          return;
        } else if (!author) {
          toast({
            title: "Lỗi",
            message: "Vui lòng chọn tác giả.",
            type: "warning",
            duration: 3000,
          });
          return;
        } else if (!category) {
          toast({
            title: "Lỗi",
            message: "Vui lòng chọn thể loại.",
            type: "warning",
            duration: 3000,
          });
          return;
        }
        else if (!pages) {
          toast({
            title: "Lỗi",
            message: "Vui lòng nhập số trang.",
            type: "warning",
            duration: 3000,
          });
          return;
        } 
        else if (pages < 0) {
          toast({
            title: "Lỗi",
            message: "Số trang phải lớn hơn 0",
            type: "warning",
            duration: 3000,
          });
          return;
        }
         else if (!size) {
          toast({
            title: "Lỗi",
            message: "Vui lòng nhập kích thước.",
            type: "warning",
            duration: 3000,
          });
          return;
        }
         else if (size < 0) {
          toast({
            title: "Lỗi",
            message: "Kích thước phải lớn hơn 0",
            type: "warning",
            duration: 3000,
          });
          return;
        }
        else if (!cover) {
          toast({
            title: "Lỗi",
            message: "Vui lòng chọn loại bìa.",
            type: "warning",
            duration: 3000,
          });
          return;
        } else if (!publisherId) {
          toast({
            title: "Lỗi",
            message: "Vui lòng chọn nhà xuất bản.",
            type: "warning",
            duration: 3000,
          });
          return;
        }
        else if (publisherYear < 0) {
          toast({
            title: "Lỗi",
            message: "Năm xuất bản phải lớn hơn 0",
            type: "warning",
            duration: 3000,
          });
          return;
        }
        else if (publisherYear > (new Date()).getFullYear()) {
          toast({
            title: "Lỗi",
            message: "Năm xuất bản phải bé hơn hoặc bằng năm hiện tại",
            type: "warning",
            duration: 3000,
          });
          return;
        }
        else if (!priceBase) {
          toast({
            title: "Lỗi",
            message: "Vui lòng nhập giá trần.",
            type: "warning",
            duration: 3000,
          });
          return;
        } else if (priceBase < 0) {
          toast({
            title: "Lỗi",
            message: "Giá trần phải lớn hơn 0",
            type: "warning",
            duration: 3000,
          });
          return;
        } else if (!priceOrder) {
          toast({
            title: "Lỗi",
            message: "Vui lòng nhập giá bán.",
            type: "warning",
            duration: 3000,
          });
          return;
        } else if (priceOrder < 0) {
          toast({
            title: "Lỗi",
            message: "Giá bán phải là lớn hơn 0",
            type: "warning",
            duration: 3000,
          });
          return;
        } else if (priceBase > priceOrder) {
          toast({
            title: "Lỗi",
            message: "Giá bán phải lớn hoặc bằng giá trần.",
            type: "warning",
            duration: 3000,
          });
          return;
        }
        // else if (!description) {
        //   toast({
        //     title: "Lỗi",
        //     message: "Vui lòng nhập mô tả.",
        //     type: "warning",
        //     duration: 3000,
        //   });
        //   return;
        // }
        else if (!status) {
          toast({
            title: "Lỗi",
            message: "Vui lòng chọn trạng thái.",
            type: "warning",
            duration: 3000,
          });
          return;
        }

        let yes = await showNotification("Bạn có đồng ý thêm sách này không?");
        if (yes) {
          // Nếu hợp lệ thì tiếp tục gửi dữ liệu
          const formData = new FormData();
          formData.append("image", imageFile);
          formData.append("title", title);
          formData.append("authorId", author);
          formData.append("categoryId", category);
          formData.append("pages", pages);
          formData.append("size", size);
          formData.append("coverId", cover);
          formData.append("publisherId", publisherId);
          formData.append("publisherYear", publisherYear);
          formData.append("priceBase", priceBase);
          formData.append("priceOrder", priceOrder);
          formData.append("description", description);
          formData.append("status", status);

          try {
            const response = await fetch("api/books/create.php", {
              method: "POST",
              body: formData,
            });

            const result = await response.json();

            if (result.success) {
              toast({
                title: "Thành công",
                message: `Thêm sách thành công`,
                type: "success",
                duration: 3000,
              });
            } else {
              toast({
                title: "Cảnh báo",
                message: `${result.message}`,
                type: "warning",
                duration: 3000,
              });
            }
          } catch (error) {
            console.error("Lỗi fetch API:", error);
            alert("Không thể kết nối đến server!");
            toast({
              title: "Lỗi",
              message: `Lỗi fetch API:${error}`,
              type: "error",
              duration: 3000,
            });
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
