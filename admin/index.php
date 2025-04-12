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
            <li class="sidebar__item active">
                <a href="/profit_dashboard" class="sidebar__action" data-main-content="profit_dashboard">
                    <i class="icon fa-solid fa-dollar-sign"></i>
                    <span class="text">Thống kê lợi nhuận</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="revenue_dashboard">
                    <i class="icon fa-solid fa-money-bill-trend-up"></i>
                    <span class="text">Thống kê doanh thu</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="input_ticket_dashboard">
                    <i class="icon fa-solid fa-file-invoice-dollar"></i>
                    <span class="text">Thống kê phiếu nhập</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="order_dashboard">
                    <i class="icon fa-solid fa-hand-holding-dollar"></i>
                    <span class="text">Thống kê đơn hàng</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="order">
                    <i class="icon fa-solid fa-receipt"></i>
                    <span class="text">Đơn hàng</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="discount">
                    <i class="icon fa-solid fa-percent"></i>
                    <span class="text">Khuyến mãi</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="privilege">
                    <i class="icon fa-solid fa-users-line"></i>
                    <span class="text">Nhóm quyền</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="account">
                    <i class="icon fa-solid fa-user"></i>
                    <span class="text">Người dùng</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="supplies">
                    <i class="icon fa-solid fa-user-shield"></i>
                    <span class="text">Nhà cung cấp</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="input_ticket">
                    <i class="icon fa-solid fa-file-pen"></i>
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
                <a href="#" class="sidebar__action" data-main-content="author">
                    <i class="icon fa-solid fa-user-pen"></i>
                    <span class="text">Tác giả</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="category">
                    <i class="icon fa-solid fa-font-awesome"></i>
                    <span class="text">Thể loại</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="cover">
                    <i class="icon fa-solid fa-book-open"></i>
                    <span class="text">Loại bìa</span>
                </a>
            </li>
            <li class="sidebar__item">
                <a href="#" class="sidebar__action" data-main-content="publisher">
                    <i class="icon fa-solid fa-user-tag"></i>
                    <span class="text">Nhà xuất bản</span>
                </a>
            </li>
            <!-- <li class="sidebar__item">
                <a href="#" class="sidebar__action">
                    <i class="icon fa-solid fa-right-from-bracket"></i>
                    <span class="text">Đăng xuất</span>
                </a>
            </li> -->
        </ul>
    </sidebar>

    <!-- Main -->
    <main class="main">
        <!-- Line -->
        <nav class="main__line">
            <i class="icon fa-solid fa-bars"></i>
            <i class="icon fa-solid fa-gear"></i>
            <i class="icon fa-solid fa-power-off"></i>
        </nav>
        <!-- Content -->
        <div class="main__content" id="main-content">
            <h1 class="main__title">Thống kê lợi nhuận</h1>
            <div class="main__row">
                <div class="main__timeline-slt main__select slt-form-1">
                    <input required="" type="text" id="status-slt-profit_dashboard" />
                    <span><i class="fa-solid fa-timeline"></i></i>&nbsp;&nbsp;Chọn Khoảng thời gian</span>
                    <ul>
                        <li>Lọc theo năm</li>
                        <li>Lọc theo tháng</li>
                    </ul>
                </div>
                <div class="main__timeline-detail-slt main__select slt-form-1">
                    <input required="" type="text" id="status-slt-profit_dashboard" />
                    <span><i class="fa-solid fa-clock"></i>&nbsp;&nbsp;Chọn Thời gian cụ thể</span>
                    <ul>
                    </ul>
                </div>
                <button class="main__see-btn" id="filter-button-profit_dashboard">
                    <i class="fa-solid fa-eye"></i>
                    <span>Xem</span>
                </button>
                <button class="main__print-btn" id="print-button-profit_dashboard">
                    <i class="fa-solid fa-print"></i>
                    <span>In thống kê</span>
                </button>
            </div>
            <div class="main__data">
                <table class="main__table dashboard profit_dashboard">
                    <thead>
                        <tr>
                            <th width="100%">Thống kê lợi nhuận</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot></tfoot>
                </table>
                <p class="main__total-text"><strong>Viết bằng chữ:</strong> <span>0 đồng</span></p>
            </div>
        </div>
    </main>

    <!-- Javascript -->
    <script type="module" src="admin/js/changeMainContent.js"></script>
    <script type="module" src="admin/js/showSidebar.js"></script>
    <script type="module" src="../public/js/toast.js"></script>

</body>

</html>