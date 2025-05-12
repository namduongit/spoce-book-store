<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Kiểm tra mã nhà xuất bản
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('Mã phương thức không được để trống');
    }
    $id = $_GET['id'];

    // Tạo đối tượng nhaXuatBan
    $model = new app_models_PhuongThucThanhToan();

    // Lấy thông tin chi tiết nhà xuất bản, kiểm tra
    $data = $model->getPaymentById($id);
    if (!$data) {
        throw new Exception('Không tìm thấy phương thức');
    }
    $dataFormat = [
        "id" => $data['maPhuongThuc'],
        "name" => $data['tenPhuongThuc'],
        "status" => $data['trangThai'],
        "updatedAt" => $data['ngayCapNhat'],
        "icon" => $data['icon_url'],
        "data" => $data['thongTin'],
        "description" => $data['moTa'],
        "name_auth" => $data['taiKhoan'],
        "online" => $data['trucTuyen']
    ];

    echo json_encode([
        'status' => 'success',
        'data' => $dataFormat
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
