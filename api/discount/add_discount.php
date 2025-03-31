<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Phương thức không được hỗ trợ'
    ]);
    exit;
}

try {
    // Lấy dữ liệu từ request body
    $jsonData = file_get_contents('php://input');
    if (!$jsonData) {
        throw new Exception('Không có dữ liệu được gửi');
    }

    $data = json_decode($jsonData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Dữ liệu JSON không hợp lệ: ' . json_last_error_msg());
    }

    // Kiểm tra dữ liệu bắt buộc
    $requiredFields = ['tenPGG', 'type', 'toiThieu', 'toiDa', 'ngayBatDau', 'ngayKetThuc', 'trangThai'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            throw new Exception("Trường $field là bắt buộc");
        }
    }

    // Tạo đối tượng PhieuGiamGia
    $phieuGiamGia = new app_models_PhieuGiamGia();

    // Thêm phiếu giảm giá mới
    $result = $phieuGiamGia->insertDiscount($data);

    if ($result) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Thêm phiếu giảm giá thành công'
        ]);
    } else {
        throw new Exception('Không thể thêm phiếu giảm giá');
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} 