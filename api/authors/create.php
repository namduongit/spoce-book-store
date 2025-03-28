<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$authorStatus = isset($_POST['authorStatus']) ? $_POST['authorStatus'] : '';
$authorName = isset($_POST['authorName']) ? $_POST['authorName'] : '';
$updateDateTime = date("Y-m-d H:i:s");

try {
   
    $author_model = new app_models_TacGia();

    // Cập nhật trạng thái tác giả trong database
    $result = $author_model->insertAuthor(
        [  "tenTacGia" => $authorName,
            "ngayCapNhat" => $updateDateTime,
            "trangThai" => $authorStatus
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
