<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Kiểm tra loại bìa
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('Loại bìa không được để trống');
    }
    $id = $_GET['id'];

    // Tạo đối tượng nhaXuatBan
    $model = new app_models_LoaiBia();

    // Lấy thông tin chi tiết loại bìa, kiểm tra
    $data = $model->getCoverById($id);
    if (!$data) {
        throw new Exception('Không tìm thấy loại bìa');
    }
    $dataFormat = [
        "id" => $data['maLoaiBia'],
        "name" => $data['tenLoaiBia'],
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