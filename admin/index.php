<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Reset CSS -->
    <link rel="stylesheet" href="./public/css/reset.css">
    <!-- Styles CSS -->
    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/common.css">
</head>

<body>
    <!-- Sidebar -->
    <sidebar class="sidebar">
        <!-- Brand -->
        <a href="#" class="sidebar__brand">
            <i class="icon fa-solid fa-shop"></i>
            <span class="name-brand">SPOCE STORE</span>
        </a>
        <!-- Menu -->
        <ul class="sidebar__menu">
            <li class="sidebar__item active">
                <a href="#" class="sidebar__action" data-main-content="dashboard">
                    <i class="icon fa-solid fa-chart-line"></i>
                    <span class="text">Thống kê</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="order">
                    <i class="icon fa-solid fa-star"></i>
                    <span class="text">Đơn hàng</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="account">
                    <i class="icon fa-solid fa-user-gear"></i>
                    <span class="text">Người dùng</span>
                </a>
            </li>
            <!-- <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="customer">
                    <i class="icon fa-solid fa-user-tie"></i>
                    <span class="text">Khách hàng</span>
                </a>
            </li> -->
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="supplies">
                    <i class="icon fa-solid fa-user-tie"></i>
                    <span class="text">Nhà cung cấp</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="input-ticket">
                    <i class="icon fa-solid fa-clipboard-list"></i>
                    <span class="text">Phiếu nhập</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="book">
                    <i class="icon fa-solid fa-book"></i>
                    <span class="text">Sách</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="publisher">
                    <i class="icon fa-solid fa-user-tag"></i>
                    <span class="text">Nhà xuất bản</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="issuer">
                    <i class="icon fa-solid fa-user-shield"></i>
                    <span class="text">Nhà phát hành</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="type">
                    <i class="icon fa-solid fa-font-awesome"></i>
                    <span class="text">Thể loại</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action">
                    <i class="icon fa-solid fa-right-from-bracket"></i>
                    <span class="text">Đăng xuất</span>
                </a>
            </li>
        </ul>
    </sidebar>

    <!-- Main -->
    <main class="main">
        <!-- Line -->
        <nav class="main__line">
            <i class="icon fa-solid fa-bars"></i>
        </nav>
        <!-- Content -->
        <div class="main__content" id="main-content">
        </div>
    </main>

    <!-- Javascript -->
    <script type="module" src="js/changeMainContent.js"></script>
    <script type="module" src="js/showSidebar.js"></script>
</body>

</html>