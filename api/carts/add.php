<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

if (!isset($_POST['maNguoiDung']) || empty($_POST['maNguoiDung']) || 
    !isset($_POST['maSach']) || empty($_POST['maSach']) || 
    !isset($_POST['soLuong']) || empty($_POST['soLuong'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Thiếu thông tin giỏ hàng']);
    exit;
}

$maNguoiDung = $_POST['maNguoiDung'];
$maSach = $_POST['maSach'];
$soLuong = (int) $_POST['soLuong'];

try {
    $cart_model = new app_models_GioHang();
    $existingCart = $cart_model->getCartItem($maNguoiDung, $maSach);
    // Sản phẩm đã tồn tại trong giỏ hàng
    if ($existingCart) {
        $newQuantity = $existingCart['soLuong'] + $soLuong;
        $cart_model->updateCart($maNguoiDung, [
            'maSach' => $maSach,
            'soLuong' => $newQuantity
        ]);
    } else {
        // Nếu chưa có, thêm mới vào giỏ hàng
        $cart_model->addCartItem($maNguoiDung, $maSach, $soLuong);
    }

    echo json_encode(['success' => true, 'message' => 'Thêm vào giỏ hàng thành công !']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi server', 'message' => $e->getMessage()]);
}
?>