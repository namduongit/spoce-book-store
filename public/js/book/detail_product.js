function show_detail_product(product_id) {
    let detail_html = ``;

    detail_html = `
        <div class="show-detail-product__container">
            <div class="show-detail-product__content d-flex just-content-spbt">
                <div class="show-detail-product__image">
                    <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="Tên Sách">
                </div>

                <div class="show-detail-product__purchase">

                    <div class="show-detail-product__header">
                        <h1 class="show-detail-product__title">Người truyền lửa</h1>
                        <p class="show-detail-product__genre"> Barcode:
                            <b class="font-weight-bold">893532502468</b>
                        </p>
                        <p class="show-detail-product__genre">Tác giả:
                            <b class="font-weight-bold">Dương chưa thêm</b>
                        </p>
                        <p class="show-detail-product__genre">Thể loại:
                            <b class="font-weight-bold">Dương chưa thêm</b>
                        </p>


                        <p class="show-detail-product__genre">
                            Giá bán:&nbsp;
                            <b class="show-detail-product__price--old">300,000₫</b>
                            <b class="show-detail-product__price--new">250,000₫</b>
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
                    <button class="show-detail-product__tab show-detail-product__tab--desc active margin-right-small" onclick="show_option(this)">Mô tả</button>
                    <button class="show-detail-product__tab show-detail-product__tab--details margin-right-small" onclick="show_option(this)">Thông tin chi tiết</button>
                    <button class="show-detail-product__tab show-detail-product__tab--reviews margin-right-small" onclick="show_option(this)">Đánh giá</button>
                </div>
                <div class="show-detail-product__tab-content">
                    <div class="show-detail-product__desc active">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A alias doloribus, qui voluptas repellendus
                            tempora iure atque dolorum at, earum tempore! Voluptas qui tempora nihil quas, sapiente enim quos sit?
                        </p>
                    </div>
                </div>
            </div>

            <div class="show-detail-product__close" onclick="close_detail_product()">X</div>
        </div>
    `;

    document.querySelector('.show-detail-product').innerHTML = detail_html;
    document.querySelector('.show-detail-product').style.display = 'block';
}

function show_option(object) {
    document.querySelectorAll(".show-detail-product__tab").forEach(tab => {
        tab.classList.remove("active");
    });

    object.classList.add("active");

    let contentHTML = "";
    if (object.classList.contains("show-detail-product__tab--desc")) {
        contentHTML = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A alias doloribus, qui voluptas repellendus
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


function close_detail_product() {
    document.querySelector('.show-detail-product').style.display = 'none';
}

function show_filter(element) {
    const contentFilter = element.closest(".filter-group").querySelector(".filter-group__content");

    contentFilter.classList.toggle("hide-item");

    element.classList.toggle("fa-minus");
    element.classList.toggle("fa-plus");
}


$(function() {
    $("#price-slider").slider({
        range: true,
        min: 10000,
        max: 5000000, // Max 5 triệu
        values: [27000, 250000], // Giá trị mặc định
        slide: function(event, ui) {
            $("#min-price").text(ui.values[0].toLocaleString());
            $("#max-price").text(ui.values[1].toLocaleString());

            // Cập nhật vào input
            $(".filter-group__input").eq(0).val(ui.values[0].toLocaleString());
            $(".filter-group__input").eq(1).val(ui.values[1].toLocaleString());
        }
    });

    // Cập nhật slider khi nhập giá trị vào input
    $(".filter-group__input").on("input", function() {
        let minVal = parseInt($(".filter-group__input").eq(0).val().replace(/\D/g, "")) || 10000;
        let maxVal = parseInt($(".filter-group__input").eq(1).val().replace(/\D/g, "")) || 5000000;

        // Đảm bảo giá trị hợp lệ
        if (minVal < 10000) minVal = 10000;
        if (maxVal > 5000000) maxVal = 5000000;
        if (minVal > maxVal) minVal = maxVal;

        $("#price-slider").slider("values", [minVal, maxVal]);
    });
});


