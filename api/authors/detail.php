<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Kiểm tra tác giả
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('Tác giả không được để trống');
    }
    $id = $_GET['id'];

    // Tạo đối tượng tác giả
    $model = new app_models_TacGia();

    // Lấy thông tin chi tiết tác giả, kiểm tra
    $data = $model->getAuthorById($id);
    if (!$data) {
        throw new Exception('Không tìm thấy tác giả');
    }
    $dataFormat = [
        "id" => $data['maTacGia'],
        "name" => $data['tenTacGia'],
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