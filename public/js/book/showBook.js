let page = parseInt(localStorage.getItem("currentPage")) || 1;
let pageSize = parseInt(localStorage.getItem("pageSize")) || 10;
localStorage.setItem("pageSize", pageSize);
document.getElementById("page-show-by").addEventListener("change", function () {
  pageSize = parseInt(this.value);
  localStorage.setItem("pageSize", pageSize);
  page = 1;
  localStorage.setItem("currentPage", page);
  ajaxGetBook();
});
window.addEventListener("load", function () {
  page = localStorage.getItem("currentPage")
    ? parseInt(localStorage.getItem("currentPage"))
    : 1;
  pageSize = localStorage.getItem("pageSize")
    ? parseInt(localStorage.getItem("pageSize"))
    : 10;
  ajaxGetBook();
});
async function ajaxGetBook() {
  try {
    let response = await fetch(
      `api/books/get.php?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let data = await response.json();
    console.log("Dữ liệu API nhận được:", data);
    document.getElementById("book-list").innerHTML = ""; // xóa ds cũ
    updateBookToMain(data.books);
    updatePagination(data.totalBooks, page, pageSize);
  } catch (error) {
    console.error("Lỗi lấy dữ liệu:", error);
    return { books: [], totalBooks: 0 };
  }
}

// Cập nhật giao diện danh sách sách
function updateBookToMain(allproduct = []) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  if (allproduct.length === 0) {
    bookList.innerHTML = `<p class="no-books">Không tìm thấy sách!</p>`;
    return;
  }

  allproduct.forEach((product) => {
    let statusProduct = product["status"];
    let className =
      statusProduct === "Còn hàng"
        ? "book-category__item-status--true"
        : "book-category__item-status--false";

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
          <div class="book-category__item-price">${product["sellingPrice"]} VND</div>
          <div class="book-category__item-add-to-cart margin-top-small">
              <i class="fa-solid fa-cart-plus book-category__item-button-icon"></i>
              <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
          </div>
      </div>
    `;
  });
}
async function updatePagination(totalBooks) {
  let maxPage = Math.ceil(totalBooks / pageSize);
  let paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";
  if (maxPage === 1) return; // Không phân trang nếu chỉ có 1 trang

  for (let i = 1; i <= maxPage; i++) {
    let button = document.createElement("button");
    button.textContent = i;
    button.classList.add("pagination-btn");

    if (i === page) {
      button.classList.add("active");
    }
    button.addEventListener("click", function () {
      if (i !== page) {
        page = i; // Cập nhật page toàn cục
        localStorage.setItem("currentPage", page);
        ajaxGetBook();
      }
    });

    paginationContainer.appendChild(button);
  }
}
