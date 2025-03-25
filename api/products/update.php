<?php
require_once '../../app/init.php';

header('Content-Type: application/json');

try {
    // Kiểm tra phương thức request
    if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
        throw new Exception('Phương thức không được hỗ trợ');
    }

    // Lấy maDonHang từ query string
    $maDonHang = isset($_GET['maDonHang']) ? $_GET['maDonHang'] : null;
    if (!$maDonHang) {
        throw new Exception('Mã đơn hàng không được cung cấp');
    }

    // Lấy dữ liệu từ request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate dữ liệu
    if (empty($data['maKhachHang']) || empty($data['diaChiGiao']) || empty($data['tongTienThu']) || empty($data['chiTiet'])) {
        throw new Exception('Dữ liệu không hợp lệ');
    }

    $donHang = new app_models_DonHang();
    $donHang->update($maDonHang, $data);

    echo json_encode([
        'status' => 'success',
        'message' => 'Cập nhật đơn hàng thành công'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} 