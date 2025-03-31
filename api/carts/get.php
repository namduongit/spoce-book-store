<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

if (!isset($_POST['maNguoiDung']) || empty($_POST['maNguoiDung'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Thiếu mã người dùng']);
    exit;
}


$maNguoiDung = $_POST['maNguoiDung'];

try {
    $cart_model = new app_models_GioHang();
    $result = $cart_model->getCartByUserId($maNguoiDung);

    if ($result) {
        $response = array_map(function($cart) {
            return [
                "id" => $cart['maNguoiDung'],
                "bookId" => $cart['maSach'],
                "quantity" => $cart['soLuong']
            ];
        }, $result);
        echo json_encode(['success' => true, 'data' => $response]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy địa chỉ']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi server', 'message' => $e->getMessage()]);
}
?>