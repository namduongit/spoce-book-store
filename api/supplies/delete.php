<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$supplierInput = isset($_POST['statusInput']) ? $_POST['statusInput'] : 'ACTIVE';
$idInput = isset($_POST['idInput']) ? $_POST['idInput'] : '1';

// Kiểm tra idInput có hợp lệ không
if (empty($idInput)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID nhà cung cấp."]);
    exit;
} 

// Chuyển trạng thái tác giả
$supplierInput = ($supplierInput === 'ACTIVE') ? 'INACTIVE' : 'ACTIVE';

try {
    // Khởi tạo model tác giả
    $author_model = new app_models_NhaCungCap();

    // Cập nhật trạng thái tác giả trong database
    $result = $author_model->updateSupplier($idInput, ["trangThai" => $supplierInput]);

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
