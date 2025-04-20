<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$accountEmail = isset($_POST['accountEmail']) ? $_POST['accountEmail'] : '';
$accountFullName = isset($_POST['accountFullName']) ? $_POST['accountFullName'] : '';
$accountPassword = isset($_POST['accountPassword']) ? $_POST['accountPassword'] : '';
$accountRole = isset($_POST['accountRole']) ? $_POST['accountRole'] : 4; // Mặc định là 4 (khách hàng)
$accountPhone = isset($_POST['accountPhone']) ? $_POST['accountPhone'] : '';
$accountStatus = isset($_POST['accountStatus']) ? $_POST['accountStatus'] : 'Hoạt động';
$accountName = isset($_POST['accountName']) ? $_POST['accountName'] : '';
$ngayCapNhat = isset($_POST['ngayCapNhat']) ? $_POST['ngayCapNhat'] : date('Y-m-d H:i:s'); // Ngày cập nhật, mặc định là thời gian hiện tại
$validStatuses = ['Hoạt động', 'Tạm dừng'];
if (!in_array($accountStatus, $validStatuses)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Giá trị trạng thái không hợp lệ.'
    ]);
    exit;
}
$dbConnection = new app_libs_DBConnection();
$pdo = $dbConnection->open_connect();
var_dump($accountName);
// Kiểm tra nếu tên tài khoản đã tồn tại
$query = "SELECT COUNT(*) FROM nguoiDung WHERE tenTaiKhoan = :tenTaiKhoan";
$stmt = $pdo->prepare($query);
$stmt->execute([':tenTaiKhoan' => $accountName]);
if ($stmt->fetchColumn() > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Tên tài khoản đã tồn tại.']);
    exit;
}
$account_model = new app_models_NguoiDung();


$insertSuccess = $account_model->insertUser(
    [
        "email" => $accountEmail,
        "hoVaTen" => $accountFullName,
        "matKhau" => $accountPassword,
        "maQuyen" => $accountRole,
        "soDT" => $accountPhone,
        "trangThai" => $accountStatus,
        "tenTaiKhoan" => $accountName,
        "ngayCapNhat" => $ngayCapNhat
    ]
);

if ($insertSuccess) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Thêm tài khoản thành công'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Thêm tài khoản thất bại'
    ]);
}
