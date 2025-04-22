<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$inputTicketId = isset($_POST['inputTicketId']) ? $_POST['inputTicketId'] : '1';
$bookId = isset($_POST['bookId']) ? $_POST['bookId'] : '1';
$price = isset($_POST['price']) ? $_POST['price'] : 0;
$quantity = isset($_POST['quantity']) ? $_POST['quantity'] : 0;

// Kiểm tra inputTicketId và bookId có hợp lệ không
if (empty($inputTicketId)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID phiếu nhập."]);
    exit;
}
if (empty($bookId)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID sách."]);
    exit;
}

try {
   
    $model = new app_models_ChitietPhieuNhap();

    // Cập nhật dữ liệu chi tiết phiếu nhật trong database
    $result = $model->updateInputDetail(
        $inputTicketId,
        $bookId,
        [  
            "giaNhap" => $input,
            "soLuong" => $quantity,
        ]
    );

    // Kiểm tra số dòng bị ảnh hưởng
    if ($result && $result->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Cập nhật dữ liệu thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;