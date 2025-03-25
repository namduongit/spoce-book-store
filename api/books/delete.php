<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$statusInput = isset($_GET['statusInput']) ? $_GET['statusInput'] : 'Còn hàng';
$idInput = isset($_GET['idInput']) ? $_GET['idInput'] : '';

// Kiểm tra idInput có hợp lệ không
if (empty($idInput)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID sách."]);
    exit;
}

// Chuyển trạng thái sách
$statusInput = ($statusInput === 'Còn hàng') ? 'Tạm ngưng' : 'Còn hàng';

try {
    // Khởi tạo model sách
    $book_model = new app_models_Sach();

    // Cập nhật sách trong database
    $result = $book_model->updateBook($idInput, ["trangThai" => $statusInput]);

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
