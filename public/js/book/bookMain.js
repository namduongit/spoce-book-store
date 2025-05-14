import { formatMoney, getNameAuthorByID, getNameCategoryByID, getNameCoverByID, getNamePublisherByID } from "./getDataBook.js";
import { toast } from '../toast.js'
import { getCurrentUser } from "../auth/displayInfoUser.js";
import { showConfirmationDialog } from '../question.js';
import { scrollToTop } from '../footer.js';

// Lưu dữ liệu vào LocalStorage
document.addEventListener("DOMContentLoaded", async function() {
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

    
    const currentUser = JSON.parse(sessionStorage.getItem("user")) || null;
    //  Kiểm tra có giỏ hàng tồn dư không
    if (localStorage.getItem('cart') && currentUser !== null) {
        const productList = JSON.parse(localStorage.getItem('cart'));
        console.log(productList);
        
        const resultAnswer = await showConfirmationDialog('Chúng tôi thấy giỏ hàng có sản phẩm lúc bạn chưa đăng nhập. Bạn có muốn thêm vào giỏ chính không ?');
        if (resultAnswer == true) {
            productList.forEach(product => {
                let formData = new URLSearchParams();
                formData.append('maNguoiDung', currentUser['user'].id);
                formData.append('maSach', product.bookId);
                formData.append('soLuong', product.quantity);
                fetch('api/carts/add.php', {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: formData.toString()
                })
                .then(response => response.json())
                .then(data => {
                    toast({
                        title: 'Thông báo',
                        message: data.message,
                        type: data.success ? 'success' : 'warning',
                        duration: 3000
                    });
                })
            });
            localStorage.removeItem('cart');
        } else {
            localStorage.removeItem('cart');
        }
    }

    updateQuantityCardHolder();

    // Hiển thị sách lên màn hình
    window.addEventListener("load", function() {
        if (currentParams.has('bookID') && currentParams.has('dislayBookName')) {
            let bookID = currentParams.get('bookID');
            showDetailProduct(bookID);
        }
    });

});


async function showDetailProduct(product_id) {
    const URL = `api/books/getBookDetail.php?find=${product_id}`;
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

    let productDetails = await fetchData(URL);
    let productDetail = productDetails['data'][0];

    hideLoading();

    let detail_html = `
        <div class="show-detail-product__container">
            <div class="show-detail-product__content d-flex just-content-spbt">
                <div class="show-detail-product__image">
                    <img src="public/uploads/books/${productDetail['image']}" alt="Hình ảnh sách">
                </div>

                <div class="show-detail-product__purchase">

                    <div class="show-detail-product__header">
                        <h1 class="show-detail-product__title">${productDetail['name']}</h1>
                        <p class="show-detail-product__genre"> Mã sách:
                            <b class="font-weight-bold">${productDetail['id']}</b>
                        </p>
                        <p class="show-detail-product__genre">Tác giả:
                            <b class="font-weight-bold">${productDetail['authorName']}</b>
                        </p>
                        <p class="show-detail-product__genre">Thể loại:
                            <b class="font-weight-bold">${productDetail['categoryName']}</b>
                        </p>
                        <p class="show-detail-product__genre">
                            Giá bán:&nbsp;
                            <b class="show-detail-product__price--new">${formatMoney(productDetail['sellPrice'])}</b>
                        </p>
                    </div>

                    <div class="show-detail-product__quantity">
                            <p class="quantity__button quantity__button-plus">+</p>
                            <input type="text" class="quantity__input quantity__button-number" value=1 disabled>
                            <p class="quantity__button quantity__button-min">-</p>
                    </div>

                    <div class="show-detail-product__actions">
                        <button class="show-detail-product__btn show-detail-product__btn--buy-now">
                            <i class="fa-solid fa-bolt" data-id="${productDetail['id']}"></i>&nbsp;Mua ngay
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
                        <li><strong>Số trang:</strong> ${productDetail['pages']} trang</li>
                        <li><strong>Năm xuất bản:</strong> ${productDetail['publishYear']}</li>
                        <li><strong>Kích thước:</strong> ${productDetail['size']}</li>
                        <li><strong>Loại bìa:</strong>  ${productDetail['coverName']}</li>
                        <li><strong>Nhà xuất bản:</strong> ${productDetail['publisherName']}</li>
                    </ul>
            </div>
            <div class="show-detail-product__close" onclick="closeDetailProduct()">X</div>
        </div>
    `;

    // Thêm chi tiết sản phẩm vào trong HTML
    document.querySelector('.show-detail-product').innerHTML = detail_html;
    document.querySelector('.show-detail-product').style.display = 'block';

    //  Xử lý thêm/ Mua hàng
    document.querySelector('.quantity__button-plus').addEventListener('click', function() {
        let valueQuantity = parseInt(document.querySelector('.quantity__button-number').value);
        if (valueQuantity === 99) {
            toast({
                title: 'Thông báo',
                message: `Giới hạn là 99 cuốn 1 lần thêm vào giỏ hàng !`,
                type: 'info',
                duration: 3000
            });
            return;
        } else document.querySelector('.quantity__button-number').value = valueQuantity + 1;
    });

    document.querySelector('.quantity__button-min').addEventListener('click', function() {
        let valueQuantity = parseInt(document.querySelector('.quantity__button-number').value);
        if (valueQuantity === 1) {
            toast({
                title: 'Thông báo',
                message: `Tối thiểu là 1 cuốn !`,
                type: 'info',
                duration: 3000
            });
            return;
        } else document.querySelector('.quantity__button-number').value = valueQuantity - 1;
    });

    document.querySelector('.show-detail-product__btn--add-to-cart').addEventListener('click',async function() {
        let valueQuantity = parseInt(document.querySelector('.quantity__button-number').value);

        let currentUser = JSON.parse(sessionStorage.getItem("user")) || null;
        if (currentUser !== null) { 
            const currentUserId = currentUser['user'].id;
            let formData = new URLSearchParams();
            formData.append('maNguoiDung', currentUserId);
            formData.append('maSach', product_id);
            formData.append('soLuong', valueQuantity);

            fetch('api/carts/add.php', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString()
            })
            .then(response => response.json())
            .then(data => {
                toast({
                    title: 'Thông báo',
                    message: data.message,
                    type: data.success ? 'success' : 'warning',
                    duration: 3000
                });
            })
            .catch(() => {
                console.log('Có lỗi trong khi thêm sản phẩm vào giỏ');
            })

        } else {

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let valueQuantity = parseInt(document.querySelector('.quantity__button-number').value);
            let product = {
                bookId: parseInt(product_id),
                quantity: valueQuantity
            }
            let existingProduct = cart.find(item => item.bookId === product.bookId);

            if (existingProduct) {
                existingProduct.quantity += valueQuantity;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
        }
        toast({
            title: 'Thông báo',
            message: `Đã thêm ${valueQuantity} sản phẩm ${productDetail['name']} vào giỏ hàng !`,
            type: 'success',
            duration: 3000
        });
        updateQuantityCardHolder();
        viewCart('Recursive');
    });

    document.querySelector('.show-detail-product__btn--buy-now').addEventListener('click', async function () {
        let quantity = parseInt(document.querySelector('.quantity__button-number').value);
        let currentUser = JSON.parse(sessionStorage.getItem('user')) || null;

        if (currentUser != null) {
            let userId = currentUser['user']['id'];
            let data = new URLSearchParams();
            data.append('maNguoiDung', userId);
            data.append('maSach', product_id);
            data.append('soLuong', quantity);
            fetch('api/carts/add.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data.toString()
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Có lỗi trong khi thêm sản phẩm vào giỏ để mua ngay');
                }

                return response.json();
            })
            .then(data => {
                toast(
                    {
                        title: "Thông báo",
                        message: data.message,
                        type: data.success ? "success" : "warning",
                        duration: 3000
                    }
                );
            })
            .catch(() => {
                console.error('Có lỗi trong khi thêm sản phẩm vào giỏ để mua ngay');
            });
            updateQuantityCardHolder();
            checkOutBill();
            scrollToTop();
        } else {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            let currentBook = {
                bookId: product_id,
                quantity: quantity
            };

            let existingProduct = cart.find(book => book.bookId == currentBook.bookId);
            if (existingProduct) {
                existingProduct.quantity += currentBook.quantity;
            } else {
                cart.push(currentBook);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            toast(
                {
                    title: 'Thông báo',
                    message: 'Sản phẩm đã được thêm vào giỏ hàng',
                    type: 'success',
                    duration: 3000
                }
            );
            toast(
                {
                    title: 'Thông báo',
                    message: 'Vui lòng đăng nhập để tiếp tục thanh toán',
                    type: 'warning',
                    duration: 3000
                }
            );
            updateQuantityCardHolder();
            viewCart('Recursive');
        }
    });

    const urlSource = new URLSearchParams(window.location.search);
    urlSource.set("bookID", productDetail["id"]);
    urlSource.set("dislayBookName", productDetail["name"]);
    window.history.replaceState(null, document.title, window.location.pathname + '?' + urlSource.toString());
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
    params.delete('bookID');
    params.delete('dislayBookName');
    let newUrl = url.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState(null, document.title, newUrl);
}


$(function () {
    let minInput = $(".filter-group__input").eq(0);
    let maxInput = $(".filter-group__input").eq(1);
    let minPriceText = $("#min-price");
    let maxPriceText = $("#max-price");

    // Lấy giá trị từ localStorage hoặc dùng giá trị mặc định
    let storedMin = parseInt(localStorage.getItem("minPrice")) || 0;
    let storedMax = parseInt(localStorage.getItem("maxPrice")) || 500000;

    $("#price-slider").slider({
        range: true,
        min: 0,
        max: 2000000,
        values: [storedMin, storedMax], // Gán giá trị đã lưu vào slider
        slide: function (event, ui) {
            minPriceText.text(ui.values[0].toLocaleString());
            maxPriceText.text(ui.values[1].toLocaleString());
            minInput.val(ui.values[0].toLocaleString());
            maxInput.val(ui.values[1].toLocaleString());

            // Lưu giá trị vào localStorage
            localStorage.setItem("minPrice", ui.values[0]);
            localStorage.setItem("maxPrice", ui.values[1]);
        }
    });

    function updateSliderFromInput() {
        let minVal = parseInt(minInput.val().replace(/\D/g, "")) || 0;
        let maxVal = parseInt(maxInput.val().replace(/\D/g, "")) || 2000000;

        if (minVal < 0) minVal = 0;
        if (maxVal > 2000000) maxVal = 2000000;
        if (minVal > maxVal) minVal = maxVal;

        $("#price-slider").slider("values", [minVal, maxVal]);

        minPriceText.text(minVal.toLocaleString());
        maxPriceText.text(maxVal.toLocaleString());

        // Lưu giá trị khi nhập vào input
        localStorage.setItem("minPrice", minVal);
        localStorage.setItem("maxPrice", maxVal);

        console.log("Input giá thay đổi:", minVal, "-", maxVal);
    }

    // Cập nhật input với giá trị từ localStorage khi load trang
    minInput.val(storedMin.toLocaleString());
    maxInput.val(storedMax.toLocaleString());
    minPriceText.text(storedMin.toLocaleString());
    maxPriceText.text(storedMax.toLocaleString());

    minInput.on("input change", updateSliderFromInput);
    maxInput.on("input change", updateSliderFromInput);
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