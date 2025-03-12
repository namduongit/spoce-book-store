function formatMoney(valueString = String) {
    let result = '';
    let count = 0;
    for (let i = valueString.length - 1; i >= 0; i++) {
        count += 1;
        if (count % 3 == 0 && i != 0) {
            result += '.';
        } else {
            result += valueString[i];
        }
    } return result +" VND";
}

async function showDetailProduct(product_id) {
    const URL = `public/handle/book.php?idBook=${product_id}`;
    let detail_html = ``;

    async function fetchData(URL) {
        try {
            let response = await fetch(URL);
            let dataProduct = await response.json();
            console.log(dataProduct);
            return dataProduct;
        } catch (error) {
            console.log('Lỗi khi fetch data sản phẩm sách: ', error);
            return null;
        }
    }

    let productDetail = await fetchData(URL);

    // Kiểm tra nếu có dữ liệu sách
    if (productDetail && productDetail.length > 0) {
        productDetail = productDetail[0];
        detail_html = `
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
                                <b class="font-weight-bold">${productDetail['authorId']}</b>
                            </p>
                            <p class="show-detail-product__genre">Thể loại:
                                <b class="font-weight-bold">${productDetail['genreId']}</b>
                            </p>
                            <p class="show-detail-product__genre">
                                Giá bán:&nbsp;
                                <b class="show-detail-product__price--old">${formatMoney(productDetail['originalPrice'])}₫</b>
                                <b class="show-detail-product__price--new">${productDetail['sellingPrice']}₫</b>
                            </p>
                        </div>

                        <div style="margin-top: auto;">
                            <div class="show-detail-product__quantity d-flex">
                                <p class="show-detail-product__status show-detail-product__status--instock">Còn hàng</p>
                                <button class="show-detail-product__quantity-btn show-detail-product__quantity-btn--decrease">-</button>
                                <input type="text" value="1" class="show-detail-product__quantity-input">
                                <button class="show-detail-product__quantity-btn show-detail-product__quantity-btn--increase">+</button>
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
                </div>

                <div class="show-detail-product__info">
                    <div class="show-detail-product__tabs">
                        <button class="show-detail-product__tab show-detail-product__tab--desc active margin-right-small" onclick="showOptionDetailProduct(this)">Mô tả</button>
                        <button class="show-detail-product__tab show-detail-product__tab--details margin-right-small" onclick="showOptionDetailProduct(this)">Thông tin chi tiết</button>
                        <button class="show-detail-product__tab show-detail-product__tab--reviews margin-right-small" onclick="showOptionDetailProduct(this)">Đánh giá</button>
                    </div>
                    <div class="show-detail-product__tab-content">
                        <div class="show-detail-product__desc active">
                            <p>${productDetail['description']}</p>
                        </div>
                    </div>
                </div>

                <div class="show-detail-product__close" onclick="closeDetailProduct()">X</div>
            </div>
        `;
    } else {
        detail_html = `<p>Không tìm thấy sản phẩm.</p>`;
    }

    // Thêm chi tiết sản phẩm vào trong HTML
    document.querySelector('.show-detail-product').innerHTML = detail_html;
    document.querySelector('.show-detail-product').style.display = 'block';
}



function showOptionDetailProduct(object) {
    document.querySelectorAll(".show-detail-product__tab").forEach(tab => {
        tab.classList.remove("active");
    });

    object.classList.add("active");

    let contentHTML = "";
    if (object.classList.contains("show-detail-product__tab--desc")) {
        contentHTML = `
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A alias doloribus, qui voluptas repellendus
                                        tempora iure atque dolorum at, earum tempore! Voluptas qui tempora nihil quas, sapiente enim quos sit?</p>`;
    } else if (object.classList.contains("show-detail-product__tab--details")) {
        contentHTML = `
            <ul>
                <li><strong>Số trang:</strong> 350</li>
                <li><strong>Loại bìa:</strong> Bìa cứng</li>
                <li><strong>Tác giả:</strong> Nguyễn Nam Dương</li>
                <li><strong>Nhà xuất bản:</strong> Spoce Book Store</li>
            </ul>
        `;
    } else {
        contentHTML = `<p>Chưa có đánh giá nào.</p>`;
    }

    document.querySelector(".show-detail-product__tab-content").innerHTML = contentHTML;
}


function closeDetailProduct() {
    document.querySelector('.show-detail-product').style.display = 'none';
}

function showFilter(element) {
    const contentFilter = element.closest(".filter-group").querySelector(".filter-group__content");

    contentFilter.classList.toggle("hide-item");

    element.classList.toggle("fa-minus");
    element.classList.toggle("fa-plus");
}


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


