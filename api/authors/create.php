<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$name = isset($_POST['name']) ? $_POST['name'] : '';
$status = isset($_POST['status']) ? $_POST['status'] : '';
$updateAt = date("Y-m-d H:i:s");

try {

    $model = new app_models_TacGia();

    // Cập nhật trạng thái tác giả trong database
    $result = $model->insertAuthor(
        [  
            "tenTacGia" => $name,
            "trangThai" => $status,
            "ngayCapNhat" => $updateAt
        ]
    );
    
    if ($result  > 0) {
        echo json_encode(["success" => true, "message" => "Cập nhật trạng thái thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;