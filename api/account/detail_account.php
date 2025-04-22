<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Kiểm tra người dùng
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('Mã người dùng không được để trống');
    }
    $id = $_GET['id'];

    // Tạo đối tượng
    $model = new app_models_NguoiDung();

    // Lấy thông tin chi tiết người dùng, kiểm tra
    $data = $model->getUserById($id);
    if (!$data) {
        throw new Exception('Không tìm thấy');
    }
    $dataFormat = [
        "maNguoiDung" => $data['maNguoiDung'] ?? '',
        "hoVaTen" => $data['hoVaTen'] ?? '',
        "soDT" => $data['soDT'] ?? '',
        "email" => $data['email'] ?? '',
        "tenTaiKhoan" => $data['tenTaiKhoan'] ?? '',
        "matKhau" => $data['matKhau'] ?? 0,
        "tenQuyen" => $data['tenQuyen'] ?? '',
        "maQuyen" => $data['maQuyen'] ?? '',
        "trangThai" => $data['trangThai'] ?? '',
        "ngayCapNhat" => $data['ngayCapNhat'] ?? 0
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