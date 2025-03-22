<?php
// include_once './api/authors/get.php';
// include_once './api/users/checkLogin.php';
// die();
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

    <!-- Nhúng các thư viện Css -->
    <link rel="stylesheet" href="public/css/reset.css">
    <link rel="stylesheet" href="public/css/animation.css">
    <link rel="stylesheet" href="public/css/toast.css">
    <link rel="stylesheet" href="public/css/spinner.css">
    <link rel="stylesheet" href="public/css/base.css">
    <link rel="stylesheet" href="public/css/responsive.css">
    <link rel="stylesheet" href="public/css/style.css">

    <!-- Nhúng các thư viện Js -->
    <script type="module" src="public/js/auth/authMain.js" defer></script>
    <script type="module" src="public/js/book/bookMain.js" defer></script>
    <script type="module" src="public/js/cart/cartMain.js" defer></script>
    <script type="module" src="public/js/filter/filterMain.js" defer></script>
    <script type="module" src="public/js/slideshow.js" defer></script>

    <script type="module" src="public/js/book/showBook.js" defer></script>

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

            <div class="result-search">
                <div class="result-search__wrapper">
                    <div class="result-search__wrapper-title"></div>
                    <div class="result-search__list">

                    </div>

                    <i class="result-search__close fa-solid fa-xmark" id="close-result-search"></i>
                </div>
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
                            <option value="10" selected>Mặc định</option>
                            <option value="15">15 sản phẩm</option>
                            <option value="20">20 sản phẩm</option>
                            <option value="25">25 sản phẩm</option>
                        </select>
                    </div>



                    <div class="book-category__button d-flex">
                        <div class="btn sort-btn" onclick="filterBookList()">Lọc sách</div>
                        <div class="btn reset-btn" onclick="resetFilterBook()">Đặt lại</div>
                    </div>
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


    <div class="self-infomation"></div>

    <div class="checkout"></div>

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
    <div class="confirmation-dialog">
    </div>


    <!-- Spinner chờ trong khi lấy dữ liệu từ Server -->
    <div class="loading-overlay" id="loading-overlay">
        <div class="spinner"></div>
    </div>


</body>
<script src="public/js/spinner.js"></script>

</html>