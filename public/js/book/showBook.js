document.addEventListener("DOMContentLoaded", async function () {
  let allproduct = await getAllBookProduct();
  if (Array.isArray(allproduct)) {
    updateBookToMain(allproduct);
  } else {
    console.error("Dữ liệu allproduct không hợp lệ:", allproduct);
  }
});

// Hàm lấy dữ liệu từ API
export async function getAllBookProduct() {
  try {
    let response = await fetch("api/books/get.php");

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Lỗi lấy dữ liệu");
    return [];
  }
}

// Cập nhật giao diện với danh sách sách
export function updateBookToMain(allproduct = []) {
  if (!Array.isArray(allproduct)) {
    console.log("Lỗi allProduct không phải là mảng");
    return;
  }

  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  allproduct.forEach((product) => {
    let statusProduct = product["status"];
    let className = "";
    if (statusProduct === "Còn hàng") {
      className = "book-category__item-status--true";
    } else {
      className = "book-category__item-status--false";
    }
    bookList.innerHTML += `
                <div class="book-category__item" onclick="showDetailProduct(${product["id"]})">
                    <img src="public/uploads/${product["image"]}" class="book-category__item-image"></img>
                    <div class="book-category__item-name">${product["name"]}</div>
                    <div class="book-category-rate d-flex margin-top-small">
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div class="book-category__item-status ${className} margin-top-small">${statusProduct}</div>
                    <div class="book-category__item-price">${product["sellingPrice"]}</div>
                    <div class="book-category__item-add-to-cart margin-top-small">
                        <i class="fa-solid fa-cart-plus book-category__item-button-icon"></i>
                        <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                    </div>
                </div>
            `;
  });
}

//phân trang sẩn phẩm

const PRODUCT_PER_PAGE = 10;
let currentPage = localStorage.getItem("currentPage")
  ? parseInt(localStorage.getItem("currentPage"))
  : 1;
let allProducts = [];

document.addEventListener("DOMContentLoaded", async function () {
  allProducts = await getAllBookProduct();
  if (Array.isArray(allProducts)) {
    showProductList(currentPage); // Hiển thị trang đã lưu
    setPagination();
  } else {
    console.error("Dữ liệu allproduct không hợp lệ:", allProducts);
  }
});

// Hiển thị sản phẩm theo trang
function showProductList(page) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  let start = (page - 1) * PRODUCT_PER_PAGE;
  let end = start + PRODUCT_PER_PAGE;
  let productsToShow = allProducts.slice(start, end);

  productsToShow.forEach((product) => {
    let statusProduct = product["status"];
    let className =
      statusProduct === "Còn hàng"
        ? "book-category__item-status--true"
        : "book-category__item-status--false";

    bookList.innerHTML += `
      <div class="book-category__item" onclick="showDetailProduct(${product["id"]})">
          <img src="public/uploads/${product["image"]}" class="book-category__item-image">
          <div class="book-category__item-name">${product["name"]}</div>
          <div class="book-category-rate d-flex margin-top-small">
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
          </div>
          <div class="book-category__item-status ${className} margin-top-small">${statusProduct}</div>
          <div class="book-category__item-price">${product["sellingPrice"]}</div>
          <div class="book-category__item-add-to-cart margin-top-small">
              <i class="fa-solid fa-cart-plus book-category__item-button-icon"></i>
              <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
          </div>
      </div>
    `;
  });
}

// Hàm tạo nút phân trang
function setPagination() {
  let totalPage = Math.ceil(allProducts.length / PRODUCT_PER_PAGE);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  if (totalPage <= 1) return;

  for (let i = 1; i <= totalPage; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("pagination-btn");
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", function () {
      currentPage = i;
      localStorage.setItem("currentPage", i); // Lưu trang hiện tại vào localStorage
      showProductList(i);
      updateActivePage();
    });

    paginationContainer.appendChild(btn);
  }
}

// Cập nhật trạng thái nút trang hiện tại
function updateActivePage() {
  document.querySelectorAll(".pagination-btn").forEach((btn, index) => {
    btn.classList.toggle("active", index + 1 === currentPage);
  });
}

// document.addEventListener("DOMContentLoaded", function () {
//   let perPage = localStorage.getItem("itemsPerPage") || 10; // Lấy số sản phẩm mỗi trang từ localStorage hoặc mặc định là 10
//   let currentPage = localStorage.getItem("currentPage") || 1;

//   document.getElementById("page-show-by").value = perPage; // Cập nhật giao diện dropdown theo giá trị đã lưu

//   // Lấy dữ liệu và hiển thị sản phẩm
//   loadProducts(currentPage, perPage);

//   // Xử lý sự kiện khi người dùng thay đổi số sản phẩm hiển thị
//   document
//     .getElementById("page-show-by")
//     .addEventListener("change", function () {
//       perPage = this.value === "base" ? 10 : parseInt(this.value); // Nếu chọn "Mặc định", đặt về 10
//       localStorage.setItem("itemsPerPage", perPage); // Lưu số sản phẩm mỗi trang vào localStorage
//       loadProducts(1, perPage); // Khi thay đổi, luôn về trang 1
//     });
// });

// // Hàm gọi AJAX để lấy sản phẩm theo trang và số sản phẩm trên mỗi trang
// function loadProducts(page = 1, perPage = 10) {
//   $.ajax({
//     url: "api/books/get.php",
//     type: "GET",
//     data: { page: page, limit: perPage },
//     dataType: "json",
//     success: function (response) {
//       if (Array.isArray(response.products)) {
//         showProductList(response.products); // Hiển thị sản phẩm
//         setPagination(response.totalPages, page, perPage); // Cập nhật nút phân trang
//       } else {
//         console.error("Dữ liệu từ API không hợp lệ:", response);
//       }
//     },
//     error: function () {
//       console.error("Lỗi khi lấy dữ liệu sản phẩm!");
//     },
//   });
// }

// // Cập nhật danh sách sản phẩm
// function showProductList(products) {
//   const bookList = document.getElementById("book-list");
//   bookList.innerHTML = "";
//   products.forEach((product) => {
//     let className =
//       product["status"] === "Còn hàng"
//         ? "book-category__item-status--true"
//         : "book-category__item-status--false";
//     bookList.innerHTML += `
//           <div class="book-category__item" onclick="showDetailProduct(${product.id})">
//               <img src="public/uploads/${product.image}" class="book-category__item-image">
//               <div class="book-category__item-name">${product.name}</div>
//               <div class="book-category-rate d-flex margin-top-small">
//                   <i class="fa-regular fa-star"></i>
//                   <i class="fa-regular fa-star"></i>
//                   <i class="fa-regular fa-star"></i>
//                   <i class="fa-regular fa-star"></i>
//                   <i class="fa-regular fa-star"></i>
//               </div>
//               <div class="book-category__item-status ${className} margin-top-small">${product.status}</div>
//               <div class="book-category__item-price">${product.sellingPrice}</div>
//               <div class="book-category__item-add-to-cart margin-top-small">
//                   <i class="fa-solid fa-cart-plus book-category__item-button-icon"></i>
//                   <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
//               </div>
//           </div>
//       `;
//   });
// }

// // Hàm tạo nút phân trang
// function setPagination(totalPages, currentPage, perPage) {
//   let paginationContainer = document.getElementById("pagination");
//   paginationContainer.innerHTML = "";

//   for (let i = 1; i <= totalPages; i++) {
//     let btn = document.createElement("button");
//     btn.innerText = i;
//     btn.classList.add("pagination-button");
//     if (i == currentPage) btn.classList.add("active");

//     btn.addEventListener("click", function () {
//       localStorage.setItem("currentPage", i); // Lưu trang hiện tại vào localStorage
//       loadProducts(i, perPage);
//     });

//     paginationContainer.appendChild(btn);
//   }
// }
