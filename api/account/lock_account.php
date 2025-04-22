<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ $_POST hoặc JSON
$data = $_POST;

// Gán các biến từ dữ liệu nhận được
$maNguoiDung = isset($data['maNguoiDung']) ? $data['maNguoiDung'] : null;

if (empty($maNguoiDung)) {
    echo json_encode(['status' => 'error', 'message' => 'Mã người dùng không hợp lệ.']);
    exit;
}
$accountStatus = isset($data['accountStatus']) ? $data['accountStatus'] : 'Hoạt động';
$ngayCapNhat = isset($data['ngayCapNhat']) ? $data['ngayCapNhat'] : date('Y-m-d H:i:s');




// Cập nhật người dùng
$account_model = new app_models_NguoiDung();
$updateSuccess = $account_model->updateUser($maNguoiDung, [
    "trangThai" => $accountStatus,
    "ngayCapNhat" => $ngayCapNhat
]);

if ($updateSuccess) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Cập nhật tài khoản thành công',
        'id' => $maNguoiDung
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Cập nhật tài khoản thất bại']);
}
