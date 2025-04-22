<?php

use Dom\Text;

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Kiểm tra dữ liệu đầu vào
if (!isset($_POST['maNguoiDung']) || empty($_POST['maNguoiDung'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Thiếu mã người dùng']);
    exit;
}

$maNguoiDung = intval($_POST['maNguoiDung']);

try {
    $diaChiModel = new app_models_DiaChiNguoiDung();
    $result = $diaChiModel->getAddressesByUserId($maNguoiDung);

    if ($result) {
        $response = array_map(function ($address) {
            return [
                "id" => $address['maDiaChi'],
                "user_id" => $address['maNguoiDung'],
                "province" => $address['tinhThanh'],
                "district" => $address['quanHuyen'],
                "ward" => $address['phuongXa'],
                "street" => $address['soNha'],
                "is_default" => $address['macDinh']
            ];
        }, $result);

        echo json_encode(['success' => true, 'data' => $response]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy địa chỉ']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi server', 'message' => $e->getMessage()]);
}
