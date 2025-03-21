import { formatMoney, getNameAuthorByID, getNameCategoryByID, getNameCoverByID, getNamePublisherByID } from "./getDataBook.js";
import { toast } from '../toast.js'

document.addEventListener("DOMContentLoaded", function () {
    const currentParams = new URLSearchParams(window.location.search);
    const url = new URL(window.location.href);

    /* Lọc theo tác giả */
    let authorListFilter = [];
    const authorCheckBoxList = document.querySelectorAll('.body .filter-group .list-author-content .filter-group__option input');

    let savedAuthors = JSON.parse(localStorage.getItem("selectedAuthors")) || [];
    authorCheckBoxList.forEach(checkbox => {
        if (savedAuthors.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });

    authorCheckBoxList.forEach(button => {
        button.addEventListener('change', function () {
            if (button.checked) {
                authorListFilter.push(button.value);
            } else {
                authorListFilter = authorListFilter.filter(item => item !== button.value);
            }

            localStorage.setItem("selectedAuthors", JSON.stringify(authorListFilter));
        });
    });

    /* Lọc theo nhà xuất bản */
    let publisherListFilter = [];
    const publisherCheckBoxList = document.querySelectorAll('.body .filter-group .list-publisher-content .filter-group__option input')

    let savedPublishers = JSON.parse(localStorage.getItem("selectedPublishers")) || [];
    publisherCheckBoxList.forEach(checkbox => {
        if (savedPublishers.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });

    publisherCheckBoxList.forEach(button => {
        button.addEventListener('change', function () {
            if (button.checked) {
                publisherListFilter.push(button.value);
            } else {
                publisherListFilter = publisherListFilter.filter(item => item !== button.value);
            }

            localStorage.setItem("selectedPublishers", JSON.stringify(publisherListFilter));
        });
    });

    /* Lọc theo loại bìa */
    let coverListFilter = [];
    const coverCheckBoxList = document.querySelectorAll('.body .filter-group .list-cover-content .filter-group__option input');

    let savedCovers = JSON.parse(localStorage.getItem("selectedCovers")) || [];
    coverCheckBoxList.forEach(checkbox => {
        if (savedCovers.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });

    coverCheckBoxList.forEach(button => {
        button.addEventListener('change', function () {
            if (button.checked) {
                coverListFilter.push(button.value);
            } else {
                coverListFilter = coverListFilter.filter(item => item !== button.value);
            }

            localStorage.setItem("selectedCovers", JSON.stringify(coverListFilter));
        });
    });


    /* Lọc theo thể loại */
    let tyeCategory = "";
    const categoryCombox = document.querySelector("#type-category");

    if (categoryCombox) {
        const savedCategory = localStorage.getItem("selectedCategory");
        if (savedCategory) {
            categoryCombox.value = savedCategory;
        }

        categoryCombox.addEventListener("change", function () {
            tyeCategory = categoryCombox.value;
            localStorage.setItem("selectedCategory", tyeCategory);
        });
    }


    /* Lọc theo sắp xếp theo */
    let typeOrderBy = "";
    const orderByCombox = document.querySelector("#sort-combobox");

    if (orderByCombox) {
        const savedOrderBy = localStorage.getItem("selectedOrderBy");
        if (savedOrderBy) {
            orderByCombox.value = savedOrderBy;
        }

        orderByCombox.addEventListener("change", function () {
            typeOrderBy = orderByCombox.value;
            localStorage.setItem("selectedOrderBy", typeOrderBy);
        });
    }

    /* Lọc theo hiển thị theo */
    let typeVisible = "";
    const visibleByCombox = document.querySelector("#page-show-by");

    if (visibleByCombox) {
        const savedVisible = localStorage.getItem("visibleBy");
        if (savedVisible) {
            visibleByCombox.value = savedVisible;
        }

        visibleByCombox.addEventListener("change", function () {
            typeVisible = visibleByCombox.value;
            localStorage.setItem("visibleBy", typeVisible);
        });
    }



    // Hiển thị sách lên màn hình
    if (currentParams.has('bookID') && currentParams.has('dislayBookName')) {
        let bookID = currentParams.get('bookID');
        showDetailProduct(bookID);
    }
});



async function showDetailProduct(product_id) {
    const URL = `api/books/get.php?bookId=${product_id}`;
    showLoading();
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
    console.log(productDetail)

    if (!productDetail || productDetail.length === 0) {
        document.querySelector('.show-detail-product').innerHTML = `<p>Không tìm thấy sản phẩm.</p>`;
        return;
    }

    productDetail = productDetail.books[0];

    let nameCategory = await getNameCategoryByID(productDetail['genreId']);
    let nameAuthor = await getNameAuthorByID(productDetail['authorId']);
    let nameCover = await getNameCoverByID(productDetail['coverTypeId']);
    let namePublisher = await getNamePublisherByID(productDetail['publisherId']);
    hideLoading();

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
                            <i class="fa-solid fa-cart-plus" data-id=${productDetail['id']}></i>&nbsp;Giỏ hàng
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
    urlSource.set("bookID", `${productDetail['id']}`)
    urlSource.set("dislayBookName", `${productDetail['name']}`);

    // Thêm vào giỏ hàng
    document.querySelector('.show-detail-product__btn--add-to-cart').addEventListener('click', function() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let product = {
            id: `${product_id}`,
            name: `${productDetail['name']}`,
            price: `${productDetail['sellingPrice']}`,
            genreId: `${productDetail['genreId']}`,
            quantity: 1,
            image: `${productDetail['image']}`
        }


        let existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        toast({
            title: 'Thông báo',
            message: `Đã thêm sản phẩm ${productDetail['name']} vào giỏ hàng !`,
            type: 'success',
            duration: 3000
        });
        updateQuantityCardHolder();
    });

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
    if (params.has('bookID') && params.has('dislayBookName')) {
        params.delete('bookID');
        params.delete('dislayBookName');
    }
    let newUrl = url.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({}, document.title, newUrl);
}



// window.onpopstate = function(event) {
//     if (event.state && event.state.product) {
//         let productDetail = event.state.product;
//         showDetailProduct(productDetail.id);
//     } else {
//         closeDetailProduct();
//     }
// };



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



function filterBookList() {
    // Lấy dữ liệu từ trong localStorage để đưa lên main
}

function resetFilterBook() {
    if (localStorage.getItem('selectedAuthors')) localStorage.removeItem('selectedAuthors');
    if (localStorage.getItem('selectedCovers')) localStorage.removeItem('selectedCovers');
    if (localStorage.getItem('selectedPublishers')) localStorage.removeItem('selectedPublishers');

}




// gán hàm thành biến toàn cục (global scope)
window.showDetailProduct = showDetailProduct;
window.closeDetailProduct = closeDetailProduct;
window.showOptionDetailProduct = showOptionDetailProduct;