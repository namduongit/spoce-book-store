<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Kiểm tra mã phiếu giảm giá
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('Mã phiếu giảm giá không được để trống');
    }
    $id = $_GET['id'];

    // Tạo đối tượng phieuGiamGia
    $model = new app_models_PhieuGiamGia();

    // Lấy thông tin chi tiết phiếu giảm giá, kiểm tra
    $data = $model->getDiscountById($id);
    if (!$data) {
        throw new Exception('Không tìm thấy phiếu giảm giá');
    }
    $dataFormat = [
        "id" => $data['maPGG'],
        "name" => $data['tenPGG'],
        "type" => $data['loai'],
        "discountV" => $data['giaTriGiam'],
        "min" => $data['toiThieu'],
        "max" => $data['toiDa'],
        "dateStart" => $data['ngayBatDau'],
        "dateEnd" => $data['ngayKetThuc'],
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