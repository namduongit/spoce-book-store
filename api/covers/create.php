<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$coverStatus = isset($_POST['coverStatus']) ? $_POST['coverStatus'] : '';
$coverName = isset($_POST['coverName']) ? $_POST['coverName'] : '';
$updateDateTime = date("Y-m-d H:i:s");

try {
   
    $cover_model = new app_models_LoaiBia();

    // Cập nhật trạng thái tác giả trong database
    $result = $cover_model->insertCover(
        [  "tenLoaiBia" => $coverName,
            "ngayCapNhat" => $updateDateTime,
            "trangThai" => $coverStatus
        ]);

    
    if ($result  > 0) {
        echo json_encode(["success" => true, "message" => "Cập nhật trạng thái thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;
