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
                <div class="topbar__auth-btn topbar__auth-btn--login margin-right-medium">
                    <i class="fa-solid fa-street-view"></i>
                    <span>Đăng nhập</span>
                </div>
                <div class="topbar__auth-btn topbar__auth-btn--register margin-right-medium">
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
                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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
                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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
                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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
                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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

                    <div class="book-category__item">
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


    <footer class="footer">
        <div class="footer__container container">
            <p class="footer__text">&copy; 2025 Spoce Book Store. All rights reserved.</p>
        </div>
    </footer>
</body>

</html>
