<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');

spl_autoload_register(function ($class_name) {
    $export_class = str_replace('_', '/', $class_name);
    /**
     * Do đang nằm trong thư mục cha là app
     * Nên phải xóa chữ 'app' để đưa thành thư mục gốc
     * Xong rồi include thêm .php đằng sau cho export_class
     */
    $path_class = str_replace('app', '', dirname(__FILE__));
    // echo $path_class . ''. $export_class . '.php';
    include $path_class . '' . $export_class . '.php';
});