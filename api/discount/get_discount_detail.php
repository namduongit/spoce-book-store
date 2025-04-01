<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Kiểm tra mã giảm giá
    if (!isset($_GET['maGiamGia']) || empty($_GET['maGiamGia'])) {
        throw new Exception('Mã giảm giá không được để trống');
    }

    $maGiamGia = $_GET['maGiamGia'];

    // Tạo đối tượng PhieuGiamGia
    $phieuGiamGia = new app_models_PhieuGiamGia();

    // Lấy thông tin chi tiết phiếu giảm giá
    $discount = $phieuGiamGia->getDiscountById($maGiamGia);

    if (!$discount) {
        throw new Exception('Không tìm thấy phiếu giảm giá');
    }

    // Chuyển đổi giá trị số thành chuỗi để tránh lỗi JSON
    $discount['toiThieu'] = (string)$discount['toiThieu'];
    $discount['toiDa'] = (string)$discount['toiDa'];
    if ($discount['giaTriGiam'] !== null) {
        $discount['giaTriGiam'] = (string)$discount['giaTriGiam'];
    }
    if ($discount['phanTram'] !== null) {
        $discount['phanTram'] = (string)$discount['phanTram'];
    }

    echo json_encode([
        'status' => 'success',
        'data' => $discount
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} 