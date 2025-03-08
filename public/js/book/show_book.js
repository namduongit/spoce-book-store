
// Script hiển thị sách theo loại
$(document).ready(function () {
    function updateURL(params) {
        let currentParams = new URLSearchParams(window.location.search);
        Object.keys(params).forEach(key => {
            if (params[key]) {
                currentParams.set(key, params[key]);
            } else {
                currentParams.delete(key);
            }
        });
        history.pushState(null, "", "?" + currentParams.toString());
    }

    function loadPage(mode) {
        $.ajax({
            type: "GET",
            url: "public/handle/book.php?page=" + mode,
            dataType: "json",
            success: function (response) {
                $("#mid_menu__middle").html(response.html);

                if (mode === "productjson") {
                    let productHTML = "";
                    response.html.forEach(product => {
                        productHTML += `
                            <div class="sanpham">
                                <img src="${product.src}" alt="">
                                <div>Mã SP: ${product.id}</div>
                                <div>Tên SP: ${product.name}</div>
                                <div>Giá SP: ${product.price}</div>
                                <div>
                                    <span>Mua</span>
                                    <span>Chi tiết</span>
                                </div>
                            </div>
                        `;
                    });
                    $("#mid_menu__middle").html(productHTML);
                }

                updateURL({ page: mode });
            }
        });
    }

    function loadBooks(category) {
        $.ajax({
            type: "GET",
            url: "public/handle/book.php?book=" + category,
            dataType: "json",
            success: function (response) {
                if (response.error) {
                    $("#book-list").html(`<p>${response.error}</p>`);
                    return;
                }

                let bookHTML = "";
                response.forEach(book => {
                    bookHTML += `
                        <div class="book-category__item" onclick="show_detail_product(${book.id})">
                            <img src="public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                            <div class="book-category__item-name">${book.name}</div>
                            <div class="book-category-rate d-flex margin-top-small">
                                ${generateStarRating(book.rating)}
                            </div>
                            <div class="book-category__item-status ${book.in_stock ? 'book-category__item-status--true' : 'book-category__item-status--false'} margin-top-small">
                                ${book.in_stock ? 'Còn hàng' : 'Hết hàng'}
                            </div>
                            <div class="book-category__item-price">${book.price.toLocaleString()} đ</div>
                            <div class="book-category__item-add-to-cart margin-top-small">
                                <i class="fa-solid fa-cart-plus book-category__item-button-icon"></i>
                                <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                            </div>
                        </div>
                    `;
                });

                $("#book-list").html(bookHTML);

                updateURL({ book: category });
            }
        });
    }

    $(".menu-item").on("click", function (event) {
        event.preventDefault();
        let mode = $(this).data("mode");
        loadPage(mode);
    });

    $(".sidebar__item").on("click", function (event) {
        event.preventDefault();
        let bookCategory = $(this).data("mode");
        loadBooks(bookCategory);
    });

    function generateStarRating(rating) {
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? `<i class="fa-solid fa-star"></i>` : `<i class="fa-regular fa-star"></i>`;
        }
        return stars;
    }

    // Khi tải lại trang, kiểm tra URL để khôi phục trạng thái
    let urlParams = new URLSearchParams(window.location.search);
    let currentPage = urlParams.get("page") || "home";
    let currentBook = urlParams.get("book");

    loadPage(currentPage);
    if (currentBook) loadBooks(currentBook);
});

