<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$name = isset($_POST['name']) ? $_POST['name'] : '';
$type = isset($_POST['type']) ? $_POST['type'] : 'Phần trăm';
$discountV = isset($_POST['discountV']) ? $_POST['discountV'] : 0;
$min = isset($_POST['min']) ? $_POST['min'] : 0;
$max = isset($_POST['max']) ? $_POST['max'] : 0;
$dateStart = isset($_POST['dateStart']) ? $_POST['dateStart'] : '2025-01-01';
$dateEnd = isset($_POST['dateEnd']) ? $_POST['dateEnd'] : '2025-01-01';
$status = isset($_POST['status']) ? $_POST['status'] : 'Hoạt động';
$updateAt = date("Y-m-d H:i:s");

try { 
    $model = new app_models_PhieuGiamGia();

    // Cập nhật trạng thái tác giả trong database
    $result = $model->insertDiscount(
        [   
            "tenPGG" => $name,
            "loai" => $type,
            "giaTriGiam" => $discountV,
            "toiThieu" => $min,
            "toiDa" => $max,
            "ngayBatDau" => $dateStart,
            "ngayKetThuc" => $dateEnd,
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