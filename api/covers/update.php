<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$coverStatus = isset($_POST['coverStatus']) ? $_POST['coverStatus'] : '';
$coverId = isset($_POST['coverId']) ? $_POST['coverId'] : '1';
$coverName = isset($_POST['coverName']) ? $_POST['coverName'] : '';
$updateDateTime = date("Y-m-d H:i:s");

// Kiểm tra coverId có hợp lệ không
if (empty($coverId)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID tthể loại."]);
    exit;
}

// Chuyển trạng thái tác giả
$coverStatus = ($coverStatus === 'ACTIVE') ? 'ACTIVE' : 'INACTIVE';

try {
   
    $cover_model = new app_models_LoaiBia();

    // Cập nhật trạng thái tác giả trong database
    $result = $cover_model->updatecover(
        $coverId,
        [  "tenLoaiBia" => $coverName,
            "trangThai" => $coverStatus,
            "ngayCapNhat" => $updateDateTime
        ]);

    // Kiểm tra số dòng bị ảnh hưởng
    if ($result && $result->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Cập nhật trạng thái thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;
