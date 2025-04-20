<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Kiểm tra thể loại
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('Thể loại không được để trống');
    }
    $id = $_GET['id'];

    // Tạo đối tượng thể loại
    $model = new app_models_TheLoai();

    // Lấy thông tin chi tiết thể loại, kiểm tra
    $data = $model->getCategoryById($id);
    if (!$data) {
        throw new Exception('Không tìm thấy thể loại');
    }
    $dataFormat = [
        "id" => $data['maTheLoai'],
        "name" => $data['tenTheLoai'],
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