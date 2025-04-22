<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

if (!isset($_POST['maNguoiDung'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Thiếu mã người dùng ']);
    exit;
}

$maNguoiDung = $_POST['maNguoiDung'];

try {
    $cart_model = new app_models_GioHang();
    $result = $cart_model->clearCartByUser($maNguoiDung);

    if ($result) {
        // Luôn luôn trả về cái này
        echo json_encode(['success' => true, 'message' => 'Xóa toàn bộ sản phẩm khỏi giỏ hàng thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy sản phẩm trong giỏ hàng']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi server', 'message' => $e->getMessage()]);
}