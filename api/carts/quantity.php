<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

if (!isset($_GET['maNguoiDung']) || empty($_GET['maNguoiDung'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Thiếu thông tin người dùng']);
    exit;
}

$maNguoiDung = $_GET['maNguoiDung'];

try {
    $cart_model = new app_models_GioHang();
    $cartItems = $cart_model->getCartByUserId($maNguoiDung);
    $totalQuantity = array_sum(array_column($cartItems, 'soLuong'));

    echo json_encode([
        'success' => true,
        'totalQuantity' => $totalQuantity
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi server', 'message' => $e->getMessage()]);
}
?>
