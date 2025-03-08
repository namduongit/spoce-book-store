<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spoce Book Store</title>
    <link rel="icon" type="image/png" href="../media/logo/human_book.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/animation.css">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/style.css">

    <!-- Nhúng các thư viện Css -->
    <script src="js/detail_product.js" defer></script>
    <script src="js/login_register.js" defer></script>
    <script src="js/cart.js" defer></script>
    <script src="js/payment.js" defer></script>
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
                <div class="topbar__auth-btn topbar__auth-btn--login margin-right-medium" onclick="show_form(this)">
                    <i class="fa-solid fa-street-view"></i>
                    <span>Đăng nhập</span>
                </div>
                <div class="topbar__auth-btn topbar__auth-btn--register margin-right-medium" onclick="show_form(this)">
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
                                <td><img src="images\vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="bookimg"></td>
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
                                <td><img src="images\vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="bookimg"></td>
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
                                <td><img src="images\vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="bookimg"></td>
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
                                <td><img src="images\vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="bookimg"></td>
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
                    <li class="sidebar__item d-flex just-content-spbt">
                        <a href="#">Sách Kinh Tế</a>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li class="sidebar__item d-flex just-content-spbt">
                        <a href="#">Sách Văn Học Trong Nước</a>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li class="sidebar__item d-flex just-content-spbt">
                        <a href="#">Sách Văn Học Nước Ngoài</a>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li class="sidebar__item d-flex just-content-spbt">
                        <a href="#">Sách Thiếu Nhi</a>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li class="sidebar__item d-flex just-content-spbt">
                        <a href="#">Sách Phát Triển Bản Thân</a>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li class="sidebar__item d-flex just-content-spbt">
                        <a href="#">Sách Tin Học Ngoại Ngữ</a>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li class="sidebar__item d-flex just-content-spbt">
                        <a href="#">Sách Chuyên Ngành</a>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li class="sidebar__item d-flex just-content-spbt">
                        <a href="#">Sách Kỹ Năng Sống</a>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                    <li class="sidebar__item d-flex just-content-spbt">
                        <a href="#">Truyện Tranh</a>
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
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
        <div class="body__container container">
            <section class="book-category book-category--bestseller">
                <h2 class="book-category__title">Sách bán chạy</h2>
                <div class="book-category__list">
                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                </div>
            </section>
            <section class="book-category book-category--vietnamese">
                <h2 class="book-category__title">Sách tiếng Việt</h2>
                <div class="book-category__list">
                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                </div>
            </section>
            <section class="book-category book-category--english">
                <h2 class="book-category__title">Sách tiếng Anh</h2>
                <div class="book-category__list">
                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                </div>
            </section>
            <section class="book-category book-category--textbook">
                <h2 class="book-category__title">Sách giáo khoa</h2>
                <div class="book-category__list">
                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

                    <div class="book-category__item" onclick="show_detail_product(1)">
                        <img src="../public/images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" class="book-category__item-image"></img>
                        <div class="book-category__item-name">Người thắp lửa</div>
                        <div class="book-category-rate d-flex margin-top-small">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="book-category__item-status book-category__item-status--true margin-top-small">Còn hàng</div>
                        <div class="book-category__item-status book-category__item-status--false margin-top-small hide-item">Hết hàng</div>
                        <div class="book-category__item-price">220,000</div>
                        <div class="book-category__item-add-to-cart margin-top-small">
                            <i class="fa-solid fa-cart-plus ook-category__item-button-icon"></i>
                            <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                        </div>
                    </div>

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

                    <img class="show-cart__img" src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                        
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

                <div class="show-cart__item d-flex">

                    <img class="show-cart__img" src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                        
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

                <div class="show-cart__item d-flex">

                    <img class="show-cart__img" src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                        
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

                <div class="show-cart__item d-flex">

                    <img class="show-cart__img" src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                        
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

                <div class="show-cart__item d-flex">

                    <img class="show-cart__img" src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                        
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


                <div class="show-cart__item d-flex">

                    <img class="show-cart__img" src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                        
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

                <div class="show-cart__item d-flex">

                    <img class="show-cart__img" src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                        
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

                <div class="show-cart__item d-flex">

                    <img class="show-cart__img" src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                        
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

                <div class="show-cart__item d-flex">

                    <img class="show-cart__img" src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product">
                        
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
                            <img src="images/download.svg" alt="package">
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
                                <img src="images/cod.svg" alt="payment_image">
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
                                <img src="images/type_atm.svg" alt="payment_image">
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
                                <img src="images/credit-card-removebg-preview.png" alt="payment_image">
                                <div class="checkout__credit-content-holder">
                                    <p>Thẻ Visa/Master/JCB/Amex/CUP</p>
                                    <img src="images/visa_master_jcb_amex_cup.svg" alt="credit-cards">
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
                                            <img src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product-image">
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
                                            <img src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product-image">
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
                                            <img src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product-image">
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
                                            <img src="images/vo-van-kiet-nguoi-thap-lua-tb-2025.png" alt="product-image">
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



</body>

</html>