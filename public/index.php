<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spoce Book Store</title>
    <link rel="icon" type="image/png" href="../media/logo/human_book.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <!-- Nhúng các thư viện Css -->
    <link rel="stylesheet" href="public/css/animation.css">
    <link rel="stylesheet" href="public/css/reset.css">
    <link rel="stylesheet" href="public/css/base.css">
    <link rel="stylesheet" href="public/css/responsive.css">
    <link rel="stylesheet" href="public/css/style.css">

    <!-- Nhúng các thư viện Js -->
    <script src="public/js/auth/login_register.js" defer></script>

    <script src="public/js/cart/cart.js" defer></script>
    <script src="public/js/cart/payment.js" defer></script>

    <script src="public/js/book/detailProduct.js" defer></script>
    <script src="public/js/book/showBook.js" defer></script>

    <script src="public/js/script.js" defer></script>

    <script src="public/js/filter/filter.js"></script>
</head>

<body>
    <div class="topbar">
        <div class="topbar__container container d-flex just-content-spbt">
            <div class="topbar__contact d-flex">
                <div class="topbar__contact-item margin-right-medium">
                    <i class="topbar__contact-icon fa-solid fa-phone-volume"></i>
                    <span class="topbar__contact-text">0388.853.835</span>
                </div>
                <div class="topbar__contact-item margin-right-medium">
                    <i class="topbar__contact-icon fa-solid fa-envelope-open-text"></i>
                    <span class="topbar__contact-text">spoce_bookstore@gmail.com</span>
                </div>
                <div class="topbar__contact-item margin-right-medium">
                    <i class="topbar__contact-icon fa-solid fa-location-dot "></i>
                    <span class="topbar__contact-text">273 An Dương Vương, P2, Q5, TP.HCM</span>
                </div>
            </div>
            <div class="topbar__auth d-flex ">
                <div class="topbar__auth-btn topbar__auth-btn--login margin-right-medium" onclick="showFormUser(this, null)">
                    <i class="fa-solid fa-street-view"></i>
                    <span>Đăng nhập</span>
                </div>
                <div class="topbar__auth-btn topbar__auth-btn--register margin-right-medium" onclick="showFormUser(this, null)">
                    <i class="fa-solid fa-user-pen"></i>
                    <span>Đăng ký</span>
                </div>
                <div class="topbar__auth-btn topbar__auth-btn--logout margin-right-medium hide-item">
                    <i class="fa-solid fa-person-through-window"></i>
                    <span>Đăng xuất</span>
                </div>
                <div class="topbar__auth-btn topbar__auth-btn--settings margin-right-medium hide-item">
                    <i class="fa-solid fa-user-gear"></i>
                    <span>Tài khoản</span>
                </div>
            </div>
        </div>

        <div class="topbart__cart-action">
            <span class="topbar__cart-holder">
                <i class="fa-solid fa-cart-shopping topbar__cart-icon"></i>
                <span class="topbar__count-holder">
                    <span class="topbar__count">0</span>
                </span>
            </span>

            <div class="topbar__cart-detail-holder">
                <div class="topbar__cart-detail">
                    <div class="topbar__cart-view">
                        <table>
                            <tr>
                                <td><img src="public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="bookimg"></td>
                                <td>
                                    <p class="topbar__product-info">
                                        <a href="#">Người thắp lửa</a>
                                        <span>893532502468 / Sách thiếu nhi / 220.000đ</span>
                                    </p>

                                    <div class="topbar__cart-view-amountprice-holder">
                                        <span>1</span>
                                        <div>220.000đ</div>
                                    </div>

                                    <div class="topbar__product-cancel"><i class="fa-solid fa-xmark"></i></div>
                                </td>
                            </tr>

                            <tr>
                                <td><img src="public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="bookimg"></td>
                                <td>
                                    <p class="topbar__product-info">
                                        <a href="#">Người thắp lửa</a>
                                        <span>893532502468 / Sách thiếu nhi / 220.000đ</span>
                                    </p>

                                    <div class="topbar__cart-view-amountprice-holder">
                                        <span>1</span>
                                        <div>220.000đ</div>
                                    </div>

                                    <div class="topbar__product-cancel"><i class="fa-solid fa-xmark"></i></div>
                                </td>
                            </tr>

                            <tr>
                                <td><img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="bookimg"></td>
                                <td>
                                    <p class="topbar__product-info">
                                        <a href="#">Người thắp lửa</a>
                                        <span>893532502468 / Sách thiếu nhi / 220.000đ</span>
                                    </p>

                                    <div class="topbar__cart-view-amountprice-holder">
                                        <span>1</span>
                                        <div>220.000đ</div>
                                    </div>

                                    <div class="topbar__product-cancel"><i class="fa-solid fa-xmark"></i></div>
                                </td>
                            </tr>

                            <tr>
                                <td><img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="bookimg"></td>
                                <td>
                                    <p class="topbar__product-info">
                                        <a href="#">Người thắp lửa</a>
                                        <span>893532502468 / Sách thiếu nhi / 220.000đ</span>
                                    </p>

                                    <div class="topbar__cart-view-amountprice-holder">
                                        <span>1</span>
                                        <div>220.000đ</div>
                                    </div>

                                    <div class="topbar__product-cancel"><i class="fa-solid fa-xmark"></i></div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="topbar__cart-detail-divide"></div>

                    <div class="topbar__cart-price">
                        <table>
                            <tr class="topbar__price-total">
                                <td>TỔNG TIỀN:</td>
                                <td>220.000đ</td>
                            </tr>

                            <tr class="topbar__cart-btn">
                                <td class="topbar__cart"><button>Xem giỏ hàng</button></td>
                                <td><button class="topbar__checkout-btn">Thanh toán</button></td>
                            </tr>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    </div>

    <header class="header">
        <div class="header__container container d-flex align-items-center just-content-spbt">
            <div class="header__logo">
                <img src="../media/logo/public_logo.png" alt="Logo Web">
            </div>

            <div class="header__search">
                <div class="header__search-wrapper">
                    <input class="header__search-input" type="text" placeholder="Tìm kiếm sản phẩm">
                    <button class="header__search-btn">Tìm kiếm</button>
                </div>
            </div>

            <div class="header__support d-flex just-content-spbt align-items-center">
                <i class="header__support-icon fa-solid fa-blender-phone"></i>
                <div class="header__support-info">
                    <span>Hỗ trợ khách hàng</span>
                    <div></div>
                    <span>0388 853 835</span>
                </div>
            </div>
        </div>
    </header>

    <div class="main">
        <div class="main__container container d-flex just-content-spbt">
            <aside class="sidebar">
                <h3 class="sidebar__title">Danh mục</h3>
                <ul class="sidebar__list">
                    <!--    <li class=\"sidebar__item d-flex just-content-spbt\" data-mode=\"$id_cate\">
                            <a href=\"/?category=$id_cate\" onclick=\"\"> $name_cate</a>
                            <i class=\"fa-solid fa-chevron-right\"></i>
                        </li>
                -->
                </ul>
            </aside>

            <section class="content">
                <div class="slider">
                    <button class="slider__btn slider__btn--left">&#10094;</button>
                    <img class="slider__image" src="../media/banner/banner_1.png" alt="Banner">
                    <button class="slider__btn slider__btn--right">&#10095;</button>
                </div>
                <div class="banner d-flex just-content-spbt">
                    <img class="banner__image" src="../media/banner/banner_2.png" alt="">
                    <img class="banner__image" src="../media/banner/banner_3.png" alt="">
                </div>
            </section>
        </div>
    </div>

    <main class="body">
        <div class="body__container container d-flex just-content-spbt">

            <section class="book-filter">
                <div class="book-filter__title pd-filter">Lọc sản phẩm</div>
                <div class="book-filter__list">

                    <!-- Bộ lọc Giá -->
                    <div class="filter-group pd-filter">
                        <div class="filter-group__header d-flex just-content-spbt">
                            <p class="filter-group__title">Giá</p>
                            <i class="filter-group__toggle fa-solid fa-minus" onclick="showFilter(this)"></i>
                        </div>
                        <div class="filter-group__content">
                            <div class="filter-group__inputs">
                                <div class="input-wraper">
                                    <input type="text" class="filter-group__input" value="0">
                                </div>
                                <div class="input-wraper">
                                    <input type="text" class="filter-group__input" value="500,000">
                                </div>
                            </div>
                            <div class="filter-group__range">
                                <div id="price-slider"></div>
                                <p><span id="min-price">0</span>đ - <span id="max-price">500,000</span>đ</p>
                            </div>
                        </div>
                    </div>

                    <!-- Bộ lọc tác giả -->
                    <div class="filter-group pd-filter">
                        <div class="filter-group__header d-flex just-content-spbt">
                            <p class="filter-group__title">Tác giả</p>
                            <i class="filter-group__toggle fa-solid fa-minus" onclick="showFilter(this)"></i>
                        </div>
                        <!-- Ô nhập tìm kiếm tác giả -->
                        <div class="filter-group__search">
                            <input type="text" class="filter-group__search-input" placeholder="Nhập tên tác giả . . .">
                        </div>

                        <div class="filter-group__content list-author-content">
                            <?php
                            include_once 'app/config.php';

                            $author_model = new app_models_TacGia();
                            $authors = $author_model->getAllAuthors();
                            $total_authors = count($authors);
                            $limit = 5;

                            foreach ($authors as $index => $author) {
                                $author_id = $author['maTacGia'];
                                $author_name = $author['tenTacGia'];
                                $hidden_class = $index >= $limit ? 'hide-item' : '';

                                echo "
                                    <div class=\"filter-group__option $hidden_class\">
                                        <input type=\"checkbox\" class=\"filter-group__checkbox\" value=\"$author_id\"> $author_name
                                    </div>";
                            }

                            if ($total_authors > $limit) {
                                echo '
                                    <div class="show-list-author show-more margin-top-small">
                                        <a href="#">Hiển thị tất cả (' . $total_authors . ')</a>
                                        <i class="fa-solid fa-chevron-down"></i>
                                    </div>';
                            }
                            ?>
                        </div>
                    </div>

                    <!-- Bộ lọc nhà xuất bản -->
                    <div class="filter-group pd-filter">
                        <div class="filter-group__header d-flex just-content-spbt">
                            <p class="filter-group__title">Nhà xuất bản</p>
                            <i class="filter-group__toggle fa-solid fa-minus" onclick="showFilter(this)"></i>
                        </div>
                        <!-- Ô nhập tìm kiếm tác giả -->
                        <div class="filter-group__search">
                            <input type="text" class="filter-group__search-input" placeholder="Nhập nhà xuất bản . . .">
                        </div>

                        <div class="filter-group__content list-publisher-content">
                            <?php
                            include_once 'app/config.php';

                            $publisher_model = new app_models_NhaXuatBan();
                            $publishers = $publisher_model->getAllPublishers();

                            $total_publisher = count($publishers);
                            $limit = 5;

                            foreach ($publishers as $index => $publisher) {
                                $publisher_id = $publisher['maNXB'];
                                $publisher_name = $publisher['tenNXB'];
                                $hidden_class = $index >= $limit ? 'hide-item' : '';

                                echo "
                                            <div class=\"filter-group__option $hidden_class\">
                                                <input type=\"checkbox\" class=\"filter-group__checkbox\" value=\"$publisher_id\"> $publisher_name
                                            </div>";
                            }

                            if ($total_authors > $limit) {
                                echo '
                                            <div class="show-list-publisher show-more margin-top-small">
                                                <a href="#">Hiển thị tất cả (' . $total_publisher . ')</a>
                                                <i class="fa-solid fa-chevron-down"></i>
                                            </div>';
                            }
                            ?>
                        </div>
                    </div>

                    <!-- Bộ lọc loại bìa -->
                    <div class="filter-group pd-filter">
                        <div class="filter-group__header d-flex just-content-spbt">
                            <p class="filter-group__title">Loại bìa</p>
                            <i class="filter-group__toggle fa-solid fa-minus" onclick="showFilter(this)"></i>
                        </div>
                        <!-- Ô nhập tìm kiếm tác giả -->
                        <div class="filter-group__search">
                            <input type="text" class="filter-group__search-input" placeholder="Nhập tên bìa . . .">
                        </div>

                        <div class="filter-group__content list-cover-content">
                            <?php
                            include_once 'app/config.php';

                            $cover_model = new app_models_LoaiBia();
                            $covers = $cover_model->getAllCovers();

                            $total_cover = count($covers);
                            $limit = 5;

                            foreach ($covers as $index => $cover) {
                                $cover_id = $cover['maLoaiBia'];
                                $cover_name = $cover['tenLoaiBia'];
                                $hidden_class = $index >= $limit ? 'hide-item' : '';

                                echo "
                                            <div class=\"filter-group__option $hidden_class\">
                                                <input type=\"checkbox\" class=\"filter-group__checkbox\" value=\"$cover_id\"> $cover_name
                                            </div>";
                            }

                            if ($total_authors > $limit) {
                                echo '
                                            <div class="show-list-cover show-more margin-top-small">
                                                <a href="#">Hiển thị tất cả (' . $total_cover . ')</a>
                                                <i class="fa-solid fa-chevron-down"></i>
                                            </div>';
                            }
                            ?>
                        </div>

                    </div>

                </div>
            </section>

            <section class="book-category">
                <h2 class="book-category__title">Danh sách sản phẩm</h2>



                <div class="book-category__sort d-flex">

                    <div class="book-category__sort-item">
                        <label for="type-category">Thể loại: </label>
                        <select name="" id="type-category">
                            <option value="all-category" selected>Tất cả</option>
                            <?php
                            include_once 'app/config.php';
                            $category_model = new app_models_TheLoai;

                            $categories = $category_model->getAllCategories();

                            if (!$categories) {
                                // Xử lý trường hợp chưa có sách nào
                            } else {
                                foreach ($categories as $cate) {
                                    $id_cate = $cate['maTheLoai'];
                                    $name_cate = $cate['tenTheLoai'];
                                    echo "
                                            <option value=\"$id_cate\">$name_cate</option>
                                        ";
                                }
                            }
                            ?>
                        </select>
                    </div>
                    <div class="book-category__sort-item">
                        <label for="sort-combobox">Sắp xếp theo: </label>
                        <select name="" id="sort-combobox">
                            <option value="base" selected>Mặc định</option>
                            <option value="desc">Giá giảm dần</option>
                            <option value="asc">Giá tăng dần</option>
                        </select>
                    </div>

                    <div class="book-category__sort-item">
                        <label for="page-show-by">Hiển thị theo: </label>
                        <select name="" id="page-show-by">
                            <option value="base" selected>Mặc định</option>
                            <option value="16">16 sản phẩm</option>
                            <option value="32">32 sản phẩm</option>
                            <option value="64">64 sản phẩm</option>
                        </select>
                    </div>



                    <div class="book-category__button d-flex">
                        <div class="btn sort-btn" onclick="consoleGetBook()">Lọc sách</div>
                        <div class="btn reset-btn">Đặt lại</div>
                    </div>
                </div>

                <div class="book-category__list" id="book-list">
                    <!-- Hiển thị danh sách sản phẩm -->

                </div>
            </section>
        </div>
    </main>

    <div class="show-cart">
        <div class="show-cart__container">
            <div class="show-cart__title">
                GIỎ HÀNG
            </div>
            <div class="show-cart__cart">
                <div class="show-cart__item d-flex">
                    <img class="show-cart__img" src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                    <div class="show-cart__detail d-flex">
                        <div class="show-cart__bookname">Người thắp lửa</div>
                        <div class="show-cart__price">893532502468 / Sách thiếu nhi / 220.000đ</div>
                    </div>
                    <div class="show-cart__amountbox">
                        <button class="show-cart__btn show-cart__btn--left">-</button>
                        <input type="text" name="product-amount" value="1">
                        <button class="show-cart__btn show-cart__btn--right">+</button>
                    </div>
                    <div class="show-cart__priceamount">220.000đ</div>
                    <a href="#" class="show-cart__remove"><i class="fa-solid fa-trash-can"></i></a>
                </div>
            </div>


            <div class="show-cart__checkout">
                <div class="show-cart__checkout-info">
                    <div class="show-cart__checkout-title">Thông tin đơn hàng</div>
                    <div class="show-cart__totalprice">Tổng số tiền: <span>220.000đ</span></div>
                    <span>Bạn có thể nhập mã giảm giá ở trang thanh toán.</span>
                    <p><a href="#" class="show-cart__continue-buy-btn"><i class="fa fa-reply"></i> Tiếp tục mua hàng</a></p>
                </div>
                <div class="show-cart__checkoutbox">
                    <button class="show-cart__to-checkout-btn"><i class="fa-regular fa-circle-check"></i> Thanh toán</button>
                    <button><i class="fa-solid fa-circle-xmark"></i> Xóa tất cả</button>
                </div>
            </div>
        </div>
    </div>

    <div class="checkout hide-item">
        <div class="checkout__container">
            <div class="checkout__customer-info-holder">
                <!-- <div class="checkout__logo-holder">
                    <a href="#"><img src="images/public_logo.png" alt="main-logo"></a>
                </div> -->

                <div class="checkout__customer-address-container">
                    <p>Thông tin giao hàng</p>
                    <div class="checkout__customer-address-field">
                        <div class="checkout__address-field-one">
                            <div class="checkout__input-field checkout__address-select">

                                <select name="address-holder" id="address-holder">
                                    <option value="default" selected>Địa chỉ đã lưu trữ</option>
                                </select>
                                <label for="address-holder">Thêm địa chỉ mới</label>
                            </div>
                            <div class="checkout__input-field">

                                <input type="text" id="fullname" name="fullname" placeholder=" ">
                                <label for="fullname">Họ và tên</label>
                            </div>
                            <p class="checkout__empty-field-warning hide-item">Vui lòng nhập họ tên</p>
                            <div class="checkout__input-field">

                                <input type="text" id="numberphone" name="numberphone" placeholder=" ">
                                <label for="numberphone">Số điện thoại</label>
                            </div>
                            <p class="checkout__empty-field-warning hide-item">Vui lòng nhập số điện thoại</p>
                            <p class="checkout__empty-field-warning hide-item">Số điện thoại không hợp lệ (độ dài 10 kí tự, không chứa ký tự đặc biệt và khoảng trắng)</p>
                            <div class="checkout__input-field">

                                <input type="text" id="address" name="address" placeholder=" ">
                                <label for="address">Địa chỉ</label>
                            </div>
                            <p class="checkout__empty-field-warning hide-item">Vui lòng nhập địa chỉ</p>
                        </div>
                        <div class="checkout__address-field-two">
                            <div class="checkout__input-field checkout__address-select">
                                <label>Tỉnh / thành</label>
                                <select name="city" id="city">
                                    <option value="default" selected>Chọn tỉnh / thành</option>
                                </select>
                                <p class="checkout__empty-field-warning-two hide-item">Vui lòng chọn tỉnh thành</p>
                            </div>
                            <div class="checkout__input-field checkout__address-select">
                                <label>Quận / huyện</label>
                                <select name="district" id="district">
                                    <option value="default" selected>Chọn quận / huyện</option>
                                </select>
                                <p class="checkout__empty-field-warning-two hide-item">Vui lòng chọn quận huyện</p>
                            </div>
                            <div class="checkout__input-field checkout__address-select">
                                <label>Phường / xã</label>
                                <select name="ward" id="ward">
                                    <option value="default" selected>Chọn phường / xã</option>
                                </select>
                                <p class="checkout__empty-field-warning-two hide-item">Vui lòng chọn phường xã</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="checkout__ship-container">
                    <p>Phương thức vận chuyển</p>
                    <div class="checkout__ship-method-holder">
                        <div class="checkout__ship-method-unchoose" style="display: none;">
                            <img src="public/images/download.svg" alt="package">
                            <p>Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.</p>
                        </div>

                        <div class="checkout__ship-method-choose">
                            <label class="checkout__ship-method" for="tietkiem">
                                <div class="checkout__ship-method-radiobtn-holder">

                                    <label class="checkout__ship-method-radiobtn">
                                        <input type="radio" id="tietkiem" name="shipping-method" value="tietkiem">
                                        <span></span>
                                    </label>
                                    <span>Giao hàng tiết kiệm</span>

                                </div>


                                <span>20.000đ</span>
                            </label>

                            <label class="checkout__ship-method" for="nhanh">
                                <div class="checkout__ship-method-radiobtn-holder">
                                    <label class="checkout__ship-method-radiobtn">
                                        <input type="radio" id="nhanh" name="shipping-method" value="nhanh">
                                        <span></span>
                                    </label>

                                    <span>Giao hàng nhanh</span>
                                </div>

                                <span>30.000đ</span>
                            </label>

                            <label class="checkout__ship-method" for="hoatoc">
                                <div class="checkout__ship-method-radiobtn-holder">

                                    <label class="checkout__ship-method-radiobtn">
                                        <input type="radio" id="hoatoc" name="shipping-method" value="hoatoc">
                                        <span></span>
                                    </label>
                                    <span>Giao hàng hỏa tốc</span>
                                </div>

                                <span>50.000đ</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="checkout__payment-container">
                    <p>Phương thức thanh toán</p>
                    <div class="checkout__payment-method-holder">
                        <label class="checkout__payment-method-option" for="cash">
                            <div class="checkout__payment-method-radiobtn">
                                <label class="checkout__payment-radiobtn-holder">
                                    <input type="radio" id="cash" name="payment" value="cash">
                                    <span></span>
                                </label>
                            </div>
                            <div class="checkout__payment-method-content">
                                <img src="../public/images/cod.svg" alt="payment_image">
                                <span>Thanh toán khi giao hàng (COD)</span>
                            </div>
                        </label>

                        <label class="checkout__payment-method-option" for="qrcode">
                            <div class="checkout__payment-method-radiobtn">

                                <label class="checkout__payment-radiobtn-holder">
                                    <input type="radio" id="qrcode" name="payment" value="qrcode">
                                    <span></span>
                                </label>
                            </div>
                            <div class="checkout__payment-method-content">
                                <img src="../public/images/type_atm.svg" alt="payment_image">
                                <span>Chuyển khoản qua ngân hàng</span>
                            </div>
                        </label>

                        <div class="checkout__qrcode-method-holder">
                            <div class="checkout__qrcode-text">• NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN NGOẠI THƯƠNG VIỆT NAM (VIETCOMBANK) - CHI NHÁNH SÀI GÒN
                                • SỐ TÀI KHOẢN: 1013999802
                                • TÊN TÀI KHOẢN: CTY CP TMDV SPOCE BOOK STORE
                            </div>
                        </div>

                        <label class="checkout__payment-method-option" for="credit">
                            <div class="checkout__payment-method-radiobtn">

                                <label class="checkout__payment-radiobtn-holder">
                                    <input type="radio" id="credit" name="payment" value="credit">
                                    <span></span>
                                </label>
                            </div>
                            <div class="checkout__payment-method-content">
                                <img src="../public/images/credit-card-removebg-preview.png" alt="payment_image">
                                <div class="checkout__credit-content-holder">
                                    <p>Thẻ Visa/Master/JCB/Amex/CUP</p>
                                    <img src="../public/images/visa_master_jcb_amex_cup.svg" alt="credit-cards">
                                </div>
                            </div>
                        </label>

                        <div class="checkout__credit-method-holder">
                            <div class="checkout__input-field">
                                <input type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" maxlength="19" id="card-number-field" name="card-number" placeholder="Số thẻ">
                                <label>Số thẻ (16 số)</label>
                            </div>

                            <div class="checkout__input-field">
                                <input type="tel" inputmode="numeric" maxlength="5" id="card-expiration-field" name="card-expiration" placeholder="Ngày hết hạn">
                                <label>Ngày hết hạn (MM/YY)</label>
                            </div>

                            <div class="checkout__input-field">
                                <input type="tel" inputmode="numeric" pattern="[0-9]{3}" maxlength="3" id="card-cvv-field" name="card-cvv" placeholder="Mã bảo mật">
                                <label>Mã bảo mật (3 số)</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="checkout__cart-info-holder">
                <div class="checkout__cart-products-holder">
                    <table class="checkout__cart-table">
                        <tbody>
                            <tr>
                                <td class="checkout__product-thumbnail">
                                    <div class="checkout__product-image">
                                        <div class="checkout__product-image-holder">
                                            <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product-image">
                                        </div>
                                        <span class="checkout__product-quantity">1</span>
                                    </div>

                                </td>
                                <td class="checkout__product-name">
                                    <div class="checkout__product-name-holder">
                                        <span>Người thắp lửa</span>
                                        <span>893532502468 / Sách thiếu nhi / 220.000đ</span>
                                    </div>
                                </td>
                                <td class="checkout__product-price">
                                    <span>220.220đ</span>
                                </td>
                            </tr>

                            <tr>
                                <td class="checkout__product-thumbnail">
                                    <div class="checkout__product-image">
                                        <div class="checkout__product-image-holder">
                                            <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product-image">
                                        </div>
                                        <span class="checkout__product-quantity">1</span>
                                    </div>

                                </td>
                                <td class="checkout__product-name">
                                    <div class="checkout__product-name-holder">
                                        <span>Người thắp lửa</span>
                                        <span>893532502468 / Sách thiếu nhi / 220.000đ</span>
                                    </div>
                                </td>
                                <td class="checkout__product-price">
                                    <span>220.220đ</span>
                                </td>
                            </tr>

                            <tr>
                                <td class="checkout__product-thumbnail">
                                    <div class="checkout__product-image">
                                        <div class="checkout__product-image-holder">
                                            <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product-image">
                                        </div>
                                        <span class="checkout__product-quantity">1</span>
                                    </div>

                                </td>
                                <td class="checkout__product-name">
                                    <div class="checkout__product-name-holder">
                                        <span>Người thắp lửa</span>
                                        <span>893532502468 / Sách thiếu nhi / 220.000đ</span>
                                    </div>
                                </td>
                                <td class="checkout__product-price">
                                    <span>220.220đ</span>
                                </td>
                            </tr>

                            <tr>
                                <td class="checkout__product-thumbnail">
                                    <div class="checkout__product-image">
                                        <div class="checkout__product-image-holder">
                                            <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product-image">
                                        </div>
                                        <span class="checkout__product-quantity">1</span>
                                    </div>

                                </td>
                                <td class="checkout__product-name">
                                    <div class="checkout__product-name-holder">
                                        <span>Người thắp lửa</span>
                                        <span>893532502468 / Sách thiếu nhi / 220.000đ</span>
                                    </div>
                                </td>
                                <td class="checkout__product-price">
                                    <span>220.220đ</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="checkout__cart-promotion-holder">
                    <form>
                        <div class="checkout__promotion-input-holder">
                            <div class="checkout__input-field">
                                <input type="text" id="promotion-code" name="promotion-code" placeholder=" ">
                                <label for="promotion-code">Mã giảm giá</label>
                            </div>
                        </div>
                        <div class="checkout__promotion-btn-holder">
                            <button class="checkout__promotion-btn">Sử dụng</button>
                        </div>
                    </form>
                </div>

                <div class="checkout__cart-submit-holder">
                    <table>
                        <tbody>
                            <tr class="checkout__temp-total-holder">
                                <td>Tạm tính</td>
                                <td>
                                    <span>220.000đ</span>
                                </td>
                            </tr>
                            <tr class="checkout__shipping-fee-holder">
                                <td>Phí vận chuyển</td>
                                <td>
                                    <span>—</span>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr class="checkout__final-total-holder">
                                <td>Tổng cộng</td>
                                <td>
                                    <span>VND</span>
                                    <span>220.000đ</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="checkout__submit-btn-container">
                        <span class="checkout__back-to-cart-btn">Giỏ hàng</span>
                        <div class="checkout__submit-btn-holder">
                            <button class="checkout__submit-btn-final">Hoàn tất đơn hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <footer class="footer">
        <div class="footer__container container">
            <p class="footer__text">&copy; 2025 Spoce Book Store. All rights reserved.</p>
        </div>
    </footer>


    <!-- Hiển thị thông tin chi tiết sách -->
    <div class="show-detail-product"></div>

    <!-- Hiển thị bảng nhập thông tin đăng nhập hoặc đăng xuất -->
    <div class="auth"></div>

    <!-- Ghi đè các thông tin -->
    <div id="main_source"></div>

</body>

</html>