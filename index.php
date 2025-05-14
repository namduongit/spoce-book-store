<?php

if ($_SERVER['REQUEST_URI'] !== '/' && !isset($_GET['pageSize']) && !isset($_GET['page']) && !isset($_GET['minPrice']) && !isset($_GET['maxPrice']) && !isset($_GET['cart-holder']) && !isset($_GET['page-action']) && !isset($_GET['account']) && !isset($_GET['info']) && !isset($_GET['order']) && !isset($_GET['orderId'])) {
    include './404-Page/index.php';
    die();
}



?>


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
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <!-- Nhúng các thư viện Css -->
    <link rel="stylesheet" href="public/css/reset.css">
    <link rel="stylesheet" href="public/css/animation.css">
    <link rel="stylesheet" href="public/css/toast.css">
    <link rel="stylesheet" href="public/css/spinner.css">
    <link rel="stylesheet" href="public/css/base.css">

    <link rel="stylesheet" href="public/css/style.css">
    <!-- <link rel="stylesheet" href="public/css/responsive.css">git rebase --abort
 -->
    <!-- Nhúng các thư viện Js -->
    <script type="module" src="public/js/auth/authMain.js" defer></script>
    <script type="module" src="public/js/book/bookMain.js" defer></script>
    <script type="module" src="public/js/cart/cartMain.js" defer></script>
    <script type="module" src="public/js/filter/filterMain.js" defer></script>
    <script type="module" src="public/js/slideshow.js" defer></script>
    <script type="module" src="public/js/footer.js" defer></script>
    <script type="module" src="public/js/book/showBook.js" defer></script>
    <!-- responsive -->
    <link rel="stylesheet" href="public/css/responsive.css">
</head>

<body>
    <!-- Thông báo -->
    <div id="toast"></div>


    <!-- Nội dung Web -->
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
                <div class="topbar__auth-btn topbar__auth-btn--login margin-right-medium" onclick="showFormUser('login')">
                    <i class="fa-solid fa-street-view"></i>
                    <span id="login-form">Đăng&nbsp;nhập</span>
                </div>
                <div class="topbar__auth-btn topbar__auth-btn--register margin-right-medium " onclick="showFormUser('register')">
                    <i class="fa-solid fa-user-pen"></i>
                    <span id="register-form">Đăng&nbsp;ký</span>
                </div>
            </div>
        </div>

        <div class="topbart__cart-action">
            <span class="topbar__cart-holder" onclick="viewCart(null)">
                <i class="fa-solid fa-cart-shopping topbar__cart-icon"></i>
                <span class="topbar__count-holder">
                    <span class="topbar__count">0</span>
                </span>
            </span>

            <div class="topbar__cart-detail-holder"></div>
        </div>
    </div>

    <header class="header">
        <div class="header__container container d-flex align-items-center just-content-spbt">
            <a href="/" class="header__logo">
                <img src="../media/logo/public_logo.png" alt="Logo Web">
            </a>

            <div class="header__search">
                <!-- Icon mở search mobile -->
                <div class="header__search-icon" onclick="toggleSearch()">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <!-- Lớp phủ trắng toàn màn hình -->

                <div class="header__search-wrapper mobile" id="searchWrapper" style="display: none;">
                    <input class="header__search-input" type="text" placeholder="Tìm kiếm sản phẩm">
                    <button class="header__search-btn">Tìm kiếm</button>
                </div>

                <!-- Khung ô tìm kiếm -->
                <div class="header__search-wrapper desktop">
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

            <div class="result-search">
                <div class="result-search__wrapper">
                    <div class="result-search__wrapper-title"></div>
                    <div class="result-search__list">

                    </div>

                    <i class="result-search__close fa-solid fa-xmark" id="close-result-search"></i>
                </div>
            </div>
        </div>

        <div class="menu-container">
            <div class="menu">
                <?php
                require_once __DIR__ . '/app/config.php';

                $category_model = new app_models_TheLoai();
                $categoryList = $category_model->getAllCategories();

                echo '<a class="menu-item" data-id="all-category">Tất cả</a>';
                foreach ($categoryList as $row) {
                    if ($row['trangThai'] == 'Hoạt động') {
                        echo '<a class="menu-item" data-id="' . $row['maTheLoai'] . '">' . $row['tenTheLoai'] . '</a>';
                    }
                }
                ?>
            </div>
        </div>
    </header>


    <div class="main">
        <div class="main__container container d-flex just-content-spbt">
            <section class="content">
                <div class="slider">
                    <button class="slider__btn slider__btn--left">&#10094;</button>
                    <div class="slide-container">
                        <div class="slide"><img class="slider__image" src="../media/banner/banner_1.png" alt="Banner"></div>
                        <div class="slide"><img class="slider__image" src="../media/banner/banner_4.png" alt="Banner"></div>
                        <div class="slide"><img class="slider__image" src="../media/banner/banner_7.png" alt="Banner"></div>
                        <div class="slide"><img class="slider__image" src="../media/banner/banner_8.png" alt="Banner"></div>
                    </div>
                    <button class="slider__btn slider__btn--right">&#10095;</button>
                    <div class="slide-position-btn-container">
                        <button class="position-btn" data-id="0"><span></span></button>
                        <button class="position-btn" data-id="1"><span></span></button>
                        <button class="position-btn" data-id="2"><span></span></button>
                        <button class="position-btn" data-id="3"><span></span></button>
                    </div>
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
            <!--  -->
            <button class="filter-toggle" onclick="toggleFilter()">
                <i class="fa fa-bars"></i> Lọc
            </button>

            <!-- Overlay nền mờ -->
            <div class="overlay-filter" onclick="toggleFilter()"></div>
            <!--  -->
            <section class="book-filter">
                <div class="book-filter__title pd-filter">Lọc sản phẩm</div>
                <div class="book-filter__list">

                    <script>
                        function showFilter(element) {
                            const contentFilter = element.closest(".filter-group").querySelector(".filter-group__content");

                            contentFilter.classList.toggle("hide-item");

                            element.classList.toggle("fa-minus");
                            element.classList.toggle("fa-plus");
                        }
                    </script>

                    <!-- Bộ lọc Giá -->
                    <div class="filter-group pd-filter">
                        <div class="filter-group__header d-flex just-content-spbt">
                            <p class="filter-group__title">Giá</p>
                            <i class="filter-group__toggle fa-solid fa-minus" onclick="showFilter(this)"></i>
                        </div>
                        <div class="filter-group__content list-price-content">
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
                        <!-- <div class="filter-group__search">
                            <input type="text" class="filter-group__search-input" placeholder="Nhập tên tác giả . . .">
                        </div> -->

                        <div class="filter-group__content list-author-content">
                            <?php
                            // include_once 'app/config.php';
                            require_once __DIR__ . '/app/config.php';

                            $author_model = new app_models_TacGia();
                            $authors = $author_model->getAllAuthors();
                            $total_authors = is_array($authors) ? count($authors) : 0;
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
                        <!-- <div class="filter-group__search">
                            <input type="text" class="filter-group__search-input" placeholder="Nhập nhà xuất bản . . .">
                        </div> -->

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
                        <!-- <div class="filter-group__search">
                            <input type="text" class="filter-group__search-input" placeholder="Nhập tên bìa . . .">
                        </div> -->

                        <div class="filter-group__content list-cover-content">
                            <?php
                            // include_once 'app/config.php';
                            require_once __DIR__ . '/app/config.php';

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

                    <!-- <div class="book-category__sort-item">
                        <label for="type-category">Thể loại: </label>
                        <select name="" id="type-category">
                            <option value="all-category" selected>Tất cả</option>
                            <?php
                            // include_once 'app/config.php';
                            require_once __DIR__ . '/app/config.php';

                            $category_model = new app_models_TheLoai();

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
                    </div> -->



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
                            <!-- <option value="10" selected>Mặc định</option>
                            <option value="15">15 sản phẩm</option>
                            <option value="20">20 sản phẩm</option>
                            <option value="25">25 sản phẩm</option> -->
                        </select>
                    </div>

                    <!-- <div class="book-category__button d-flex">
                        <div class="btn sort-btn" onclick="filterBookList()">Lọc sách</div>
                        <div class="btn reset-btn" onclick="resetFilterBook()">Đặt lại</div>
                    </div> -->
                </div>

                <div class="book-category__list" id="book-list">
                    <!-- Hiển thị danh sách sản phẩm -->
                </div>

                <!-- Nút phân trang -->
                <div id="pagination" class="pagination"></div>

            </section>
        </div>
    </main>

    <!-- ''''''''''''''''' NỘI DUNG LUÂN ĐÃ VIẾT Ở ĐÂY ''''''''''''''''' -->

    <div class="scroll-to-top-container">
        <span class="scroll-to-top-btn">
            <i class="fa-solid fa-up-long"></i>
        </span>
    </div>

    <div class="show-cart hide-item">
        <div class="show-cart__container">
            <div class="show-cart__title">
                GIỎ HÀNG
            </div>

            <div class="show-cart__cart">

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


    <!-- Thông tin cá nhân khách hàng -->
    <div class="self-infomation hide-item">
        <div class="info__container">
            <div class="info__title">THÔNG TIN TÀI KHOẢN</div>
            <div class="info-content d-flex">
                <div class="left-container">
                    <ul>
                        <li class="information">Tài khoản & Bảo mật</li>
                        <li class="address">Địa chỉ</li>
                    </ul>
                </div>
                <div class="right-container">

                </div>
            </div>
        </div>
    </div>

    <!-- Lịch sử mua hàng của khách hàng -->
    <div class="order-history hide-item">

    </div>

    <div class="checkout"></div>




    <div class="footer-info hide-item">
        <div class="footer-info__container">

        </div>
    </div>

    <footer class="footer">
        <div class="footer__container container">
            <div class="footer__top">
                <div class="footer__top-container">
                    <div class="footer__top-item">
                        <h3>VỀ CÔNG TY</h3>
                        <ul>
                            <li class="footer__aboutus">Giới thiệu công ty</li>
                            <li class="footer__contact">Liên hệ</li>
                            <li class="footer__warranty">Chính sách đổi trả</li>
                            <li class="footer__security">Chính sách bảo mật</li>
                        </ul>
                    </div>
                    <div class="footer__top-item">
                        <h3>TRỢ GIÚP</h3>
                        <ul>
                            <li class="footer__howto">Hướng dẫn mua hàng</li>
                            <li class="footer__shipment">Chính sách vận chuyển</li>
                            <li class="footer__payment">Chính sách thanh toán</li>
                        </ul>
                    </div>
                    <div class="footer__top-item">
                        <h3>CHẤP NHẬN THANH TOÁN</h3>
                        <div class="footer__payment-image-container">
                            <img src="public/images/footer_logo_payment_1.png" alt="payment1">
                            <img src="public/images/footer_logo_payment_2.png" alt="payment2">
                            <img src="public/images/footer_logo_payment_3.png" alt="payment3">
                        </div>
                    </div>
                    <div class="footer__top-item">
                        <h3>ĐỐI TÁC VẬN CHUYỂN</h3>
                        <div class="footer__payment-image-container-two">
                            <img src="public/images/footer_logo_shipment_2.png" alt="shipment2">
                            <img src="public/images/footer_logo_shipment_3.png" alt="shipment3">
                        </div>
                    </div>
                    <div class="footer__top-item">
                        <h3>ĐỐI TÁC BÁN HÀNG</h3>
                        <div class="footer__payment-image-container-three">
                            <img src="public/images/footer_logo_seller_1.png" alt="seller1">
                            <img src="public/images/footer_logo_seller_2.png" alt="seller2">
                            <img src="public/images/footer_logo_seller_3.png" alt="seller3">
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer__bottom">
                <div class="footer__bottom-container">
                    <div>
                        <img src="public/images/footer_logobct.png" alt="logobct">
                    </div>
                    <div>
                        <h3>CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ SPOCE GROUP</h3>
                        <p>Địa chỉ: 273 An Dương Vương, P2, Q5, TP.HCM MST:0303615027 do Sở Kế Hoạch Và Đầu Tư Tp.HCM cấp ngày 10/03/2011 Tel: 0388.853.835 Email: spoce_bookstore@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>


    <!-- Hiển thị thông tin chi tiết sách -->
    <div class="show-detail-product"></div>

    <!-- Hiển thị bảng nhập thông tin đăng nhập hoặc đăng xuất -->
    <div class="auth"></div>

    <!-- Hiển thị hỏi Yes/No -->
    <div class="confirmation-dialog"></div>


    <!-- Hiển thị thông tin thêm địa chỉ mới -->

    <!-- Spinner chờ trong khi lấy dữ liệu từ Server -->
    <div class="loading-overlay" id="loading-overlay">
        <div class="spinner"></div>
    </div>


</body>
<script src="public/js/spinner.js"></script>
<script>
    function toggleFilter() {
        const filter = document.querySelector('.book-filter');
        const overlay = document.querySelector('.overlay-filter');
        filter.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    // search sách mobile
    function toggleSearch() {
        const wrapper = document.getElementById('searchWrapper');
        wrapper.classList.toggle('active');
        document.addEventListener('click', function(e) {
            const wrapper = document.getElementById('searchWrapper');
            const icon = document.querySelector('.header__search-icon');

            if (!wrapper.contains(e.target) && !icon.contains(e.target)) {
                wrapper.classList.remove('active');
            }
        });
    }
    // function hiển thị sách theo breakpoint
    function updateSelectOptionsForBreakpoint() {
        console.log("Current width:", window.innerWidth);
        const select = document.getElementById('page-show-by');

        if (window.innerWidth <= 768) {
            // Mobile
            select.innerHTML = `
            <option value="12" selected>Mặc định</option>
            <option value="16">16 sản phẩm</option>
            <option value="20">20 sản phẩm</option>
            <option value="24">24 sản phẩm</option>
        `;
        } else if (window.innerWidth <= 1024) {
            // Tablet
            select.innerHTML = `
            <option value="12" selected>Mặc định</option>
            <option value="15">15 sản phẩm</option>
            <option value="18">18 sản phẩm</option>
            <option value="24">24 sản phẩm</option>
        `;
        } else {
            // Desktop
            select.innerHTML = `
            <option value="10" selected>Mặc định</option>
            <option value="15">15 sản phẩm</option>
            <option value="20">20 sản phẩm</option>
            <option value="25">25 sản phẩm</option>
        `;
        }
    }


    window.addEventListener('resize', updateSelectOptionsForBreakpoint);
    window.addEventListener('DOMContentLoaded', updateSelectOptionsForBreakpoint);
</script>

</html>