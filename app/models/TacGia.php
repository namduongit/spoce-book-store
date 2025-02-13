<?php

class app_models_TacGia extends app_libs_DBConnection{
    // Sửa lại thuộc tính table_name để ứng với bảng
    public function __construct() {
        $this->table_name = "TacGia";
    }
}