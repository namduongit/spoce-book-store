import { formatMoney } from "./getDataBook.js";

let page = parseInt(localStorage.getItem("currentPage")) || 1;
let pageSize = parseInt(localStorage.getItem("pageSize")) || 10;
localStorage.setItem("pageSize", pageSize);

function formatJSONListFilter(key) {
  let list = JSON.parse(localStorage.getItem(key) || "[]");
  return Array.isArray(list) && list.length > 0 ? list.join(",") : "";
}


function formatNumber(numberString) {
  return numberString.replace(/\D/g, '');
}

function scrollToBook() {
  document.querySelector('.book-category').scrollIntoView(
      {
          behavior: "smooth",
          block: "start"
      }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  // const categoryType = document.getElementById("type-category");
  const sortType = document.getElementById("sort-combobox");
  const pageSizeSelect = document.getElementById("page-show-by");
  const minPrice = formatNumber(document.getElementById('min-price').innerText);
  const maxPrice = formatNumber(document.getElementById('max-price').innerText);

  // Hàm lấy danh sách sách từ API
  async function fetchBooks() {
    try {
      showLoading();
      // const categoryValue = categoryType !== "all-category" ? categoryType : "";
      const categoryValue = localStorage.getItem('selectedCategory') != 'all-category' ? localStorage.getItem('selectedCategory') : '';
      const sortValue = sortType.value !== "base" ? sortType.value : "";
      const pageSizeValue = parseInt(pageSizeSelect.value);

      // Dữ liệu từ LocalStorage
      const page = localStorage.getItem("currentPage") || 1;
      const minPrice = localStorage.getItem("minPrice") || 0;
      const maxPrice = localStorage.getItem("maxPrice") || 2000000;

      const authorIDList = formatJSONListFilter("selectedAuthors");
      const coverIDList = formatJSONListFilter("selectedCovers");
      const publisherIDList = formatJSONListFilter("selectedPublishers");

      // Lưu lại pageSize vào localStorage
      localStorage.setItem("pageSize", pageSizeValue);

      // Khởi tạo danh sách tham số
      let queryParams = [];

      if (categoryValue) queryParams.push(`cateId=${categoryValue}`);
      if (sortValue) queryParams.push(`orderBy=${sortValue}`);
      if (pageSizeValue) queryParams.push(`pageSize=${pageSizeValue}`);
      if (page) queryParams.push(`page=${page}`);
      if (authorIDList) queryParams.push(`authorId=${authorIDList}`);
      if (coverIDList) queryParams.push(`coverType=${coverIDList}`);
      if (publisherIDList) queryParams.push(`publisherId=${publisherIDList}`);
      if (minPrice) queryParams.push(`minPrice=${minPrice}`);
      if (maxPrice) queryParams.push(`maxPrice=${maxPrice}`);

      queryParams.push('bookStatus=Đang bán');
      // Tạo URL mới (KHÔNG encode dấu `,`)
      let newUrl = `${window.location.origin}${window.location.pathname}?${queryParams.join("&")}`;

      // Cập nhật URL mà không load lại trang
      history.replaceState(null, document.title, newUrl);
      let apiUrl = `api/books/get.php?${queryParams.join("&")}`;
      // console.log(apiUrl);

      let response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
      showLoading();
      let data = await response.json();
      // console.log("Dữ liệu API nhận được:", data);
      hideLoading();
      updateBookToMain(data.books);
      updatePagination(data.totalBooks);
    } catch (error) {
      document.getElementById("book-list").innerHTML = `<p class="error-message">Lỗi khi tải sách!</p>`;
    }
    hideLoading();
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
        statusProduct === "Đang bán"
          ? "book-category__item-status--true"
          : "book-category__item-status--false";

      bookList.innerHTML += `
        <div class="book-category__item" onclick="showDetailProduct(${product["id"]})">
            <img src="public/uploads/books/${product["image"]}" class="book-category__item-image"></img>
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

    if (maxPage <= 1) return;

    let prevButton = document.createElement("button");
    prevButton.textContent = "←";
    prevButton.classList.add("pagination-btn");
    if (page === 1) prevButton.disabled = true;
    prevButton.addEventListener("click", function () {
      if (page > 1) {
        page--;
        localStorage.setItem("currentPage", page);
        fetchBooks();
      }
    });
    paginationContainer.appendChild(prevButton);

    if (page > 2) {
      let firstPage = document.createElement("button");
      firstPage.textContent = "1";
      firstPage.classList.add("pagination-btn");
      firstPage.addEventListener("click", function () {
        page = 1;
        localStorage.setItem("currentPage", page);
        fetchBooks();
      });
      paginationContainer.appendChild(firstPage);
    }

    if (page > 3) {
      let dots = document.createElement("span");
      dots.textContent = "...";
      dots.classList.add("pagination-dots");
      paginationContainer.appendChild(dots);
    }

    for (let i = Math.max(1, page - 1); i <= Math.min(maxPage, page + 1); i++) {
      let button = document.createElement("button");
      button.textContent = i;
      button.classList.add("pagination-btn");
      if (i === page) button.classList.add("active");
      button.addEventListener("click", function () {
        if (i !== page) {
          page = i;
          localStorage.setItem("currentPage", page);
          fetchBooks();
        }
      });
      paginationContainer.appendChild(button);
    }

    if (page < maxPage - 2) {
      let dots = document.createElement("span");
      dots.textContent = " . . . ";
      dots.classList.add("pagination-dots");
      paginationContainer.appendChild(dots);
    }

    if (page < maxPage - 1) {
      let lastPage = document.createElement("button");
      lastPage.textContent = maxPage;
      lastPage.classList.add("pagination-btn");
      lastPage.addEventListener("click", function () {
        page = maxPage;
        localStorage.setItem("currentPage", page);
        fetchBooks();
      });
      paginationContainer.appendChild(lastPage);
    }

    let nextButton = document.createElement("button");
    nextButton.textContent = "→";
    nextButton.classList.add("pagination-btn");
    if (page === maxPage) nextButton.disabled = true;
    nextButton.addEventListener("click", function () {
      if (page < maxPage) {
        page++;
        localStorage.setItem("currentPage", page);
        fetchBooks();
      }
    });
    paginationContainer.appendChild(nextButton);
  }

  // Khi có thay đổi các combox thì tự động đưa về trang đầu
  // categoryType.addEventListener("change", () => {
  //   page = 1;
  //   localStorage.setItem("currentPage", page);
  //   fetchBooks();
  // });
  const categoryList = document.querySelectorAll('.menu-item');
    if (categoryList) {
        categoryList.forEach(category => {
            category.addEventListener('click', function () {
                page = 1;
                localStorage.setItem('currentPage', page);
                let categoryId = category.dataset.id;
                localStorage.setItem('selectedCategory', categoryId);
                fetchBooks();
                scrollToBook();
            });
        });
    }


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

  document.querySelectorAll('.list-author-content').forEach(boxItem => {
    boxItem.addEventListener("change", function (event) {
      if (event.target.classList.contains("filter-group__checkbox")) {
        fetchBooks();
      }
    });
  });

  document.querySelectorAll('.list-publisher-content').forEach(boxItem => {
    boxItem.addEventListener("change", function (event) {
      if (event.target.classList.contains("filter-group__checkbox")) {
        fetchBooks();
      }
    });
  });

  document.querySelectorAll('.list-cover-content').forEach(boxItem => {
    boxItem.addEventListener("change", function (event) {
      if (event.target.classList.contains("filter-group__checkbox")) {
        page = 1;
        localStorage.setItem("currentPage", page);
        fetchBooks();
      }
    });

    $("#price-slider").on("slidechange", function () {
      page = 1;
      localStorage.setItem("currentPage", page);
      fetchBooks();
    });

    $(".filter-group__input").on("input change", function () {
      page = 1;
      localStorage.setItem("currentPage", page);
      fetchBooks();
    });

  });



  // Khi load trang lần đầu
  window.addEventListener("load", () => {
    page = parseInt(localStorage.getItem("currentPage")) || 1;
    pageSize = parseInt(localStorage.getItem("pageSize")) || 10;
    fetchBooks();
  });
});


