import { formatMoney, getBookByTrueName, getNameAuthorByID, getNameCategoryByID, getNameCoverByID, getNamePublisherByID } from "./getDataBook.js";


async function showDetailProduct(product_id) {
    const URL = `api/books/get.php?bookId=${product_id}`;

    async function fetchData(URL) {
        try {
            let response = await fetch(URL);
            let dataResponse = await response.json();
            return dataResponse;
        } catch (error) {
            console.log('Lỗi khi fetch data: ', error);
            return null;
        }
    }

    let productDetail = await fetchData(URL);
    if (!productDetail || productDetail.length === 0) {
        document.querySelector('.show-detail-product').innerHTML = `<p>Không tìm thấy sản phẩm.</p>`;
        return;
    }

    productDetail = productDetail[0];

    let nameCategory = await getNameCategoryByID(productDetail['genreId']);
    let nameAuthor = await getNameAuthorByID(productDetail['authorId']);
    let nameCover = await getNameCoverByID(productDetail['coverTypeId']);
    let namePublisher = await getNamePublisherByID(productDetail['publisherId']);

    let detail_html = `
        <div class="show-detail-product__container">
            <div class="show-detail-product__content d-flex just-content-spbt">
                <div class="show-detail-product__image">
                    <img src="public/uploads/${productDetail['image']}" alt="Hình ảnh sách">
                </div>

                <div class="show-detail-product__purchase">
                    <div class="show-detail-product__header">
                        <h1 class="show-detail-product__title">${productDetail['name']}</h1>
                        <p class="show-detail-product__genre"> Mã sách:
                            <b class="font-weight-bold">${productDetail['id']}</b>
                        </p>
                        <p class="show-detail-product__genre">Tác giả:
                            <b class="font-weight-bold">${nameAuthor}</b>
                        </p>
                        <p class="show-detail-product__genre">Thể loại:
                            <b class="font-weight-bold">${nameCategory}</b>
                        </p>
                        <p class="show-detail-product__genre">
                            Giá bán:&nbsp;
                            <b class="show-detail-product__price--old">${formatMoney(productDetail['originalPrice'])}</b>
                            <b class="show-detail-product__price--new">${formatMoney(productDetail['sellingPrice'])}</b>
                        </p>
                    </div>
                    <div class="show-detail-product__actions">
                        <button class="show-detail-product__btn show-detail-product__btn--buy-now">
                            <i class="fa-solid fa-bolt"></i>&nbsp;Mua ngay
                        </button>
                        <button class="show-detail-product__btn show-detail-product__btn--add-to-cart">
                            <i class="fa-solid fa-cart-plus"></i>&nbsp;Giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
            <div class="show-detail-product__info">
                <div class="show-detail-product__tabs margin-bottom-medium">
                    <button class="show-detail-product__tab show-detail-product__tab--desc margin-right-small active" onclick="showOptionDetailProduct(this)">Giới thiệu sơ lược</button>
                    <button class="show-detail-product__tab show-detail-product__tab--details margin-right-small" onclick="showOptionDetailProduct(this)">Thông tin chi tiết</button>
                </div>
                <div class="show-detail-product__desc">
                        <p>${productDetail['description']}</p>
                </div>
                 <ul class="show-detail-product__details hide-item">
                    <li><strong>Số trang:</strong> ${productDetail['numberOfPages']} trang</li>
                    <li><strong>Năm xuất bản:</strong> ${productDetail['publishYear']}</li>
                    <li><strong>Kích thước:</strong> ${productDetail['size']}</li>
                    <li><strong>Loại bìa:</strong>  ${nameCover}</li>
                    <li><strong>Nhà xuất bản:</strong> ${namePublisher}</li>
                </ul>
            </div>
            <div class="show-detail-product__close" onclick="closeDetailProduct()">X</div>
        </div>
    `;

    // Thêm chi tiết sản phẩm vào trong HTML
    document.querySelector('.show-detail-product').innerHTML = detail_html;
    document.querySelector('.show-detail-product').style.display = 'block';

    let urlSource = new URLSearchParams();
    urlSource.set("showBook", `${productDetail['id']}`);

    // 🟢 Lưu state với dữ liệu sản phẩm
    history.pushState({ product: productDetail }, '', window.location.pathname + '?' + urlSource.toString());
}



function showOptionDetailProduct(object) {
    if (object.classList.contains('show-detail-product__tab--desc')) {
        document.querySelector('.show-detail-product__desc').classList.remove('hide-item');
        document.querySelector('.show-detail-product__tab--desc').classList.add('active');

        document.querySelector('.show-detail-product__details').classList.add('hide-item');
        document.querySelector('.show-detail-product__tab--details').classList.remove('active');

    } else {
        document.querySelector('.show-detail-product__desc').classList.add('hide-item');
        document.querySelector('.show-detail-product__tab--desc').classList.remove('active');

        document.querySelector('.show-detail-product__details').classList.remove('hide-item');
        document.querySelector('.show-detail-product__tab--details').classList.add('active');
    }

    document.querySelectorAll('.show-detail-product__tabs button').forEach(button => {
        if (button.classList.contains('active')) {
            button.style.backgroundColor = '#0458a3';
            button.style.color = 'white';
        } else {
            button.style.color = 'gray';
            button.style.backgroundColor = '#DDDDDD';
        }
    });
}


function closeDetailProduct() {
    document.querySelector('.show-detail-product').style.display = 'none';

    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.delete('showBook');

    let newUrl = url.pathname + (params.toString() ? '?' + params.toString() : '');

    // 🟢 Thay vì pushState, dùng replaceState để tránh tạo lịch sử thừa
    window.history.replaceState({}, document.title, newUrl);
}



window.onpopstate = function(event) {
    if (event.state && event.state.product) {
        let productDetail = event.state.product;
        showDetailProduct(productDetail.id);
    } else {
        closeDetailProduct();
    }
};



// Hiển thị lại sách nếu trong URL có
document.addEventListener("DOMContentLoaded", async function () {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    if (params.has('showBook')) {
        let bookId = params.get('showBook');
        showDetailProduct(bookId);
    }
});




$(function () {
    $("#price-slider").slider({
        range: true,
        min: 0,
        max: 2000000, // Giới hạn max là 2 triệu
        values: [0, 500000], // Giá trị mặc định
        slide: function (event, ui) {
            $("#min-price").text(ui.values[0].toLocaleString());
            $("#max-price").text(ui.values[1].toLocaleString());

            // Cập nhật vào input
            $(".filter-group__input").eq(0).val(ui.values[0].toLocaleString());
            $(".filter-group__input").eq(1).val(ui.values[1].toLocaleString());
        }
    });

    // Cập nhật slider khi nhập giá trị vào input
    $(".filter-group__input").on("input", function () {
        let minVal = parseInt($(".filter-group__input").eq(0).val().replace(/\D/g, "")) || 0;
        let maxVal = parseInt($(".filter-group__input").eq(1).val().replace(/\D/g, "")) || 2000000;

        // Đảm bảo giá trị hợp lệ
        if (minVal < 0) minVal = 0;
        if (maxVal > 2000000) maxVal = 2000000;
        if (minVal > maxVal) minVal = maxVal;

        $("#price-slider").slider("values", [minVal, maxVal]);

        // Cập nhật lại UI
        $("#min-price").text(minVal.toLocaleString());
        $("#max-price").text(maxVal.toLocaleString());
    });
});

// gán hàm thành biến toàn cục (global scope)
window.showDetailProduct = showDetailProduct;
window.closeDetailProduct = closeDetailProduct;