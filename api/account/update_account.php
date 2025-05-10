<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ $_POST hoặc JSON
// $data = $_POST;
$data = $_POST;
if (empty($data)) {
    $data = $_GET;
}
// Gán các biến từ dữ liệu nhận được
$maNguoiDung = isset($data['maNguoiDung']) ? $data['maNguoiDung'] : null;

if (empty($maNguoiDung)) {
    echo json_encode(['status' => 'error', 'message' => 'Mã người dùng không hợp lệ.']);
    exit;
}
$accountEmail = isset($data['accountEmail']) ? $data['accountEmail'] : '';
$accountFullName = isset($data['accountFullName']) ? $data['accountFullName'] : '';
$accountPassword = isset($data['accountPassword']) ? $data['accountPassword'] : '';
$accountRole = isset($data['accountRole']) ? $data['accountRole'] : null;
$accountPhone = isset($data['accountPhone']) ? $data['accountPhone'] : '';
$accountStatus = isset($data['accountStatus']) ? $data['accountStatus'] : 'Hoạt động';
$accountName = isset($data['accountName']) ? $data['accountName'] : '';
$ngayCapNhat = isset($data['ngayCapNhat']) ? $data['ngayCapNhat'] : date('Y-m-d H:i:s');

// Kết nối DB
$dbConnection = new app_libs_DBConnection();
$pdo = $dbConnection->open_connect();
if (empty($accountName)) {
    echo json_encode(['status' => 'error', 'message' => 'Tên tài khoản không được để trống.']);
    exit;
}


// Cập nhật người dùng
$account_model = new app_models_NguoiDung();
$updateSuccess = $account_model->updateUser($maNguoiDung, [
    "email" => $accountEmail,
    "hoVaTen" => $accountFullName,
    "matKhau" => $accountPassword,
    "maQuyen" => $accountRole,
    "soDT" => $accountPhone,
    "tenTaiKhoan" => $accountName,
    "ngayCapNhat" => $ngayCapNhat
]);
// var_dump($data, $_GET);

if ($updateSuccess) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Cập nhật tài khoản thành công',
        'id' => $maNguoiDung
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Cập nhật tài khoản thất bại']);
}
