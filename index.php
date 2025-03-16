<?php

    // include_once 'api/books/get.php';
    // die();

    // include_once 'app/libs/DBConnection.php';
    // $connection = new app_libs_DBConnection();
    // if ($connection->open_connect() != null) {
    //     echo "Kết nối thành công";
    // } else {
    //     echo "Kết nối thất bại";
    // }

    // die();

    $param = $_SERVER['REQUEST_URI'];
    $page = null;

    if (isset($_GET['page'])) {
        $page = $_GET['page'];
        if ($page === 'home') {
            include_once 'public/index.php';
            die();
        }
        else if ($page === 'admin') {
            include_once 'admin/index.php';
            die();
        }
        // Xử lí page thanh toán hay giỏ hàng hay đăng nhập đăng xuất ở đây
        else if ($page === 'shopping+cart') {
            die();
        }
        else {
            include_once 'public/index.php';
            die();
        }
    } else {
        include_once 'public/index.php';
        die();
    }

    $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    echo $url;

?>