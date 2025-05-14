<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ $_POST hoặc JSON
$data = $_POST;

// Gán các biến từ dữ liệu nhận được
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
// Kiểm tra tên tài khoản có tồn tại chưa
$query = "SELECT COUNT(*) FROM nguoiDung WHERE tenTaiKhoan = :tenTaiKhoan";
$stmt = $pdo->prepare($query);
$stmt->execute([':tenTaiKhoan' => $accountName]);
if ($stmt->fetchColumn() > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Tên tài khoản đã tồn tại.']);
    exit;
}



// Thêm người dùng
$account_model = new app_models_NguoiDung();
$insertSuccess = $account_model->insertUser([
    "email" => $accountEmail,
    "hoVaTen" => $accountFullName,
    "matKhau" => md5($accountPassword),
    "maQuyen" => $accountRole,
    "soDT" => $accountPhone,
    "trangThai" => $accountStatus,
    "tenTaiKhoan" => $accountName,
    "ngayCapNhat" => $ngayCapNhat
]);

if ($insertSuccess) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Thêm tài khoản thành công',
        'id' => $pdo->lastInsertId()
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Thêm tài khoản thất bại']);
}
