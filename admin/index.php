<?php
session_start();


if (!isset($_SESSION["user"]) || !isset($_SESSION["role"])) {
    // include 'index.php';
    include '../404-Page/index.php';
    die();
}

$user = $_SESSION["user"];
$role = $_SESSION["role"]["data"] ?? [];
if (count($role) <= 0) {
    include '../404-Page/index.php';
    die();
}
?>



<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Reset CSS -->
    <link rel="stylesheet" href="admin/assets/css/reset.css">
    <!-- Styles CSS -->
    <link rel="stylesheet" href="admin/assets/css/base.css">
    <link rel="stylesheet" href="admin/assets/css/common.css">

    <link rel="stylesheet" href="../public/css/toast.css">
    <link rel="stylesheet" href="admin/responsive/Responsive.css">

    <!-- Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js"
        integrity="sha512-bPh3uwgU5qEMipS/VOmRqynnMXGGSRv+72H/N260MQeXZIK4PG48401Bsby9Nq5P5fz7hy5UGNmC/W1Z51h2GQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

</head>

<body>
    <!-- thông báo -->
    <div id="toast"></div>
    <!-- Sidebar -->
    <sidebar class="sidebar">
        <!-- Brand -->
        <a href="#" class="sidebar__brand">
            <i class="icon fa-solid fa-shop"></i>
            <span class="name-brand">SPOCE STORE</span>
        </a>
        <!-- Menu -->
        <ul class="sidebar__menu">
            <?php

            // if (!isset($_SESSION["user"]) || !isset($_SESSION["role"])) {
            //     include '../404-Page/index.php';
            //     die();
            // }

            $user = $_SESSION["user"];
            $role = $_SESSION["role"]["data"] ?? [];
            if (count($role) <= 0) {
                include '../404-Page/index.php';
                die();
            }

            $role = $_SESSION["role"]["data"] ?? [];
            $printedPrivilegeIds = []; // Mảng lưu các privilegeId đã in

            foreach ($role as $item) {
                $privilegeId = $item["privilegeId"];

                // Kiểm tra nếu privilegeId chưa được in
                if (!in_array($privilegeId, $printedPrivilegeIds)) {

                    if ($privilegeId == 1) {
                        echo '
                        <li class="sidebar__item">
                            <a href="/profit_dashboard" class="sidebar__action" data-main-content="profit_dashboard">
                                <i class="icon fa-solid fa-dollar-sign"></i>
                                <span class="text">Thống kê lợi nhuận</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 2) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="revenue_dashboard">
                                <i class="icon fa-solid fa-money-bill-trend-up"></i>
                                <span class="text">Thống kê doanh thu</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 3) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="invest_dashboard">
                                <i class="icon fa-solid fa-file-invoice-dollar"></i>
                                <span class="text">Thống kê chi tiêu</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 4) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="order_dashboard">
                                <i class="icon fa-solid fa-hand-holding-dollar"></i>
                                <span class="text">Thống kê đơn hàng</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 5) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="order">
                                <i class="icon fa-solid fa-receipt"></i>
                                <span class="text">Đơn hàng</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 6) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="discount">
                                <i class="icon fa-solid fa-percent"></i>
                                <span class="text">Phiếu giảm giá</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 7) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="privilege">
                                <i class="icon fa-solid fa-users-line"></i>
                                <span class="text">Nhóm quyền</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 8) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="account">
                                <i class="icon fa-solid fa-user"></i>
                                <span class="text">Người dùng</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 9) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="supplier">
                                <i class="icon fa-solid fa-user-shield"></i>
                                <span class="text">Nhà cung cấp</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 10) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="input_ticket">
                                <i class="icon fa-solid fa-file-pen"></i>
                                <span class="text">Phiếu nhập</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 11) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="book">
                                <i class="icon fa-solid fa-book"></i>
                                <span class="text">Sách</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 12) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="author">
                                <i class="icon fa-solid fa-user-pen"></i>
                                <span class="text">Tác giả</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 13) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="category">
                                <i class="icon fa-solid fa-font-awesome"></i>
                                <span class="text">Thể loại</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 14) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="cover">
                                <i class="icon fa-solid fa-book-open"></i>
                                <span class="text">Loại bìa</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 15) {
                        echo '
                        <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="publisher">
                                <i class="icon fa-solid fa-user-tag"></i>
                                <span class="text">Nhà xuất bản</span>
                            </a>
                        </li>
                        ';
                    } else if ($privilegeId == 16) {
                        echo '
                       <li class="sidebar__item">
                            <a href="#" class="sidebar__action" data-main-content="payment">
                                <i class="icon fa-solid fa-money-check-dollar"></i>
                                <span class="text">Thẻ thanh toán</span>
                            </a>
                        </li>
                        ';
                    }

                    $printedPrivilegeIds[] = $privilegeId;
                }
            }
            ?>
        </ul>
    </sidebar>

    <!-- Main -->
    <main class="main">
        <!-- Line -->
        <nav class="main__line">
            <i class="icon fa-solid fa-bars"></i>
            <i class="icon fa-solid fa-gear tab-home"></i>
            <i class="icon fa-solid fa-power-off tab-logout"></i>
        </nav>
        <!-- Content -->
        <div class="main__content" id="main-content"></div>
    </main>

    <!-- Spinner chờ trong khi lấy dữ liệu từ Server -->
    <div class="loading-overlay" id="loading-overlay"
        style="position: absolute; top: 0; left: 0; height: auto; background: red">
        <div class="spinner"></div>
    </div>

    <script src="public/js/spinner.js"></script>

    <!-- Javascript -->
    <script type="module" src="admin/js/main.js"></script>
    <script type="module" src="admin/js/changeMainContent.js"></script>
    <script type="module" src="admin/js/showSidebar.js"></script>
    <script type="module" src="admin/responsive/responsive.js"></script>
    <script type="module" src="../public/js/toast.js"></script>

</body>

</html>