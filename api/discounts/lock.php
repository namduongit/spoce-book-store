<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$id = isset($_POST['id']) ? $_POST['id'] : '1';
$status = isset($_POST['status']) ? $_POST['status'] : 'Hoạt động';
$updateAt = date("Y-m-d H:i:s");

// Kiểm tra id có hợp lệ không
if (empty($id)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID phiếu giảm giá."]);
    exit;
}

// Chuyển trạng thái phiếu giảm giá
$status = ($status === 'Hoạt động') ? 'Tạm dừng' : 'Hoạt động';

try {
    // Khởi tạo model phiếu giảm giá
    $model = new app_models_PhieuGiamGia();

    // Cập nhật trạng thái phiếu giảm giá trong database
    $result = $model->updateDiscount(
        $id,
        [
            "trangThai" => $status,
            "ngayCapNhat" => $updateAt
        ]
    );

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