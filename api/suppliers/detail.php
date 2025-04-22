<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Kiểm tra nhà cung cấp
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('Nhà cung cấp không được để trống');
    }
    $id = $_GET['id'];

    // Tạo đối tượng nhaXuatBan
    $model = new app_models_NhaCungCap();

    // Lấy thông tin chi tiết nhà cung cấp, kiểm tra
    $data = $model->getSupplierById($id);
    if (!$data) {
        throw new Exception('Không tìm thấy nhà cung cấp');
    }
    $dataFormat = [
        "id" => $data['maNCC'],
        "name" => $data['tenNCC'],
        "phone" => $data['soDT'],
        "email" => $data['email'],
        "address" => $data['diaChi'],
        "status" => $data['trangThai'],
        "updateAt" => $data['ngayCapNhat']
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