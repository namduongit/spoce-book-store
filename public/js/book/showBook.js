import { formatMoney } from "./getDataBook.js";

let page = parseInt(localStorage.getItem("currentPage")) || 1;
let pageSize = parseInt(localStorage.getItem("pageSize")) || 10;
localStorage.setItem("pageSize", pageSize);

document.addEventListener("DOMContentLoaded", function () {
  const categoryType = document.getElementById("type-category");
  const statusType = document.getElementById("book-status");
  const sortType = document.getElementById("sort-combobox");
  const pageSizeSelect = document.getElementById("page-show-by");

  // Hàm lấy danh sách sách từ API
  async function fetchBooks() {
    try {
      const categoryValue = categoryType.value !== "all-category" ? categoryType.value : "";
      const statusValue = statusType.value !== "base" ? statusType.value : "";
      const sortValue = sortType.value !== "base" ? sortType.value : "";
      const pageSizeValue = parseInt(pageSizeSelect.value);

      // Lưu lại pageSize vào localStorage
      localStorage.setItem("pageSize", pageSizeValue);
      
      let queryParams = new URLSearchParams({
        page: page,
        pageSize: pageSizeValue,
      });

      if (categoryValue) queryParams.append("cateId", categoryValue); 
      if (statusValue) queryParams.append("bookStatus", statusValue === "has" ? "Còn hàng" : "Tạm ngưng");
      if (sortValue) queryParams.append("orderBy", sortValue);

      let apiUrl = `api/books/get.php?${queryParams.toString()}`;

      let response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);

      let data = await response.json();
      console.log("Dữ liệu API nhận được:", data);

      updateBookToMain(data.books);
      updatePagination(data.totalBooks);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
      document.getElementById("book-list").innerHTML = `<p class="error-message">Lỗi khi tải sách!</p>`;
    }
  }

  // Cập nhật danh sách sách vào giao diện
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
            <div class="book-category__item-price">${formatMoney(product["sellingPrice"])}</div>
            <div class="book-category__item-add-to-cart margin-top-small">
                <i class="fa-solid fa-cart-plus book-category__item-button-icon"></i>
                <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
            </div>
        </div>
      `;
    });
  }

  // Cập nhật giao diện phân trang
  function updatePagination(totalBooks) {
    let maxPage = Math.ceil(totalBooks / pageSize);
    let paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    if (maxPage <= 1) return; // Không hiển thị phân trang nếu chỉ có 1 trang

    for (let i = 1; i <= maxPage; i++) {
      let button = document.createElement("button");
      button.textContent = i;
      button.classList.add("pagination-btn");

      if (i === page) {
        button.classList.add("active");
      }

      button.addEventListener("click", function () {
        if (i !== page) {
          page = i;
          localStorage.setItem("currentPage", page);
          fetchBooks();
        }
      });

      paginationContainer.appendChild(button);
    }
  }

  // Xử lý sự kiện khi thay đổi bộ lọc
  categoryType.addEventListener("change", () => {
    page = 1; // Reset trang về 1 khi thay đổi bộ lọc
    localStorage.setItem("currentPage", page);
    fetchBooks();
  });

  statusType.addEventListener("change", () => {
    page = 1;
    localStorage.setItem("currentPage", page);
    fetchBooks();
  });

  sortType.addEventListener("change", () => {
    page = 1;
    localStorage.setItem("currentPage", page);
    fetchBooks();
  });

  pageSizeSelect.addEventListener("change", () => {
    page = 1;
    localStorage.setItem("currentPage", page);
    fetchBooks();
  });

  // Khi load trang lần đầu
  window.addEventListener("load", () => {
    page = parseInt(localStorage.getItem("currentPage")) || 1;
    pageSize = parseInt(localStorage.getItem("pageSize")) || 10;
    fetchBooks();
  });
});
