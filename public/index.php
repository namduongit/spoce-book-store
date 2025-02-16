<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spoce Book Store</title>
    <!-- Logo chỗ này nè -->
    <link rel="icon" type="image/png" href="../media/Logo/human_book.png">
    <!-- File css nằm chỗ này -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/animation.css">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/style.css">
    <!-- File khởi tạo dữ liệu hay gì đó của Js nằm chỗ này -->
</head>

<body>
    <div class="topbar d-flex">
        <div class="topbar__container container d-flex just-content-spbt">
            <div class="topbar__phone d-flex">
                <div class="topbar__phone__icon">
                    <i class="fa-solid fa-phone-volume"></i>
                </div>
                <div class="topbar__phone__title">
                    0388.853.835
                </div>
            </div>

            <div class="topbar__email d-flex">
                <div class="topbar__email__icon">
                    <i class="fa-solid fa-envelope-open-text"></i>
                </div>
                <div class="topbar__email__title">
                    spoce_bookstore@gmail.com
                </div>
            </div>

            <div class="topbar__address d-flex">
                <div class="topbar__address__icon">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="topbar__address__title">
                    273 An Dương Vương, Phường 2, Quận 5, Thành Phố Hồ Chí Minh
                </div>
            </div>

            <div class="topbar__auth d-flex">
                <div class="topbar__auth__btn topbar__auth_btn--login d-flex margin-right-small">
                    <i class="fa-solid fa-street-view"></i>
                    <div class="topbar__auth__btn__title">Đăng nhập</div>
                </div>
                <div class="topbar__auth__btn topbar__auth_btn--register d-flex margin-right-small">
                    <i class="fa-solid fa-user-pen"></i>
                    <div class="topbar__auth__btn__title">Đăng ký</div>
                </div>
                <div class="topbar__auth__btn topbar__auth_btn--logout hide-items d-flex margin-right-small">
                    <i class="fa-solid fa-person-through-window"></i>
                    <div class="topbar__auth__btn__title">Đăng xuất</div>
                </div>
                <div class="topbar__auth__btn topbar__auth_btn--settings hide-items d-flex margin-right-small">
                    <i class="fa-solid fa-user-gear"></i>
                    <div class="topbar__auth__btn__title">Tài khoản</div>
                </div>
            </div>
        </div>
    </div>


    <header class="header">
        <div class="header__container container d-flex just-content-spbt align-items-center">
            <div class="header__logo">
                <img src="../media/Logo/public_logo.png" alt="This is Web's logo">
            </div>
            <div class="header__search">
                <div class="header__search__warp d-flex pos-relative">
                    <input type="text" name="search_product">
                    <div onclick="">Tìm kiếm</div>
                </div>
            </div>
            <div class="header__support d-flex align-items-center">
                <div class="header__support__icon">
                    <i class="fa-solid fa-blender-phone"></i>
                </div>
                <div class="header__support__title">
                    <div>Hỗ trợ khách hàng</div>
                    <div>0388 853 835</div>
                </div>
            </div>
            <div class="header__upper__icon hide-items">
                <i class="fa-solid fa-bars"></i>
            </div>
        </div>
    </header>

    <div class="body">
        <div class="body__container container d-flex just-content-spbt">
            <div class="body__container__slidebar">
                <div class="body__container__slidebar__title"> Danh mục </div>
                <ul class="body__container__slidebar__list">

                    <li class="has-child dropdown">
                        <a href="#">Sách Kinh Tế</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Văn Học Trong Nước</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Văn Học Nước Ngoài</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Thưởng Thức Đời Sống</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Thiếu Nhi</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Phát Triển Bản Thân</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Tin Học Ngoại Ngữ</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Chuyên Ngành</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Giáo Khoa - Giáo Trình</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Phát Hành 2024</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Sách Mới 2025</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                    <li class="has-child dropdown">
                        <a href="#">Review Sách</a>
                        <i class="fa-solid fa-angles-right"></i>
                        <ul>
                            <!-- Xây dựng Menu đa cấp ở đây -->
                        </ul>
                    </li>

                </ul>
            </div>
            <div class="body__container__content">
                <div class="body__container__content__homeslider">
                    <div class="body__container__content__homeslider__left"><</div>
                    <img src="../media/Banner/banner_1.png" alt="This is banner web">
                    <div class="body__container__content__homeslider__right">></div>
                </div>
                <div class="body__container__content__banner d-flex just-content-spbt">
                    <img src="../media/Banner/banner_2.png" alt=""></img>
                    <img src="../media/Banner/banner_3.png" alt=""></img>
                </div>
                <div class="body__container__content__product">

                </div>
            </div>
        </div>
    </div>



</body>

</html>