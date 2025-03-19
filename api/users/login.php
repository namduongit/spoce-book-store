<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
header("Content-Type: application/json");
require_once __DIR__ . '../../../app/config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Chỉ hỗ trợ phương thức POST!"]);
    exit;
}

$username = $_POST["username"] ?? '';
$password = $_POST["password"] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Vui lòng nhập đầy đủ thông tin!"]);
    exit;
}

$user_model = new app_models_NguoiDung();

$user = $user_model->loginUser($username, md5($password));

if (!$user) {
    echo json_encode(["success" => false, "message" => "Tài khoản không tồn tại!"]);
    exit;
}

$_SESSION["loggedin"] = true;
$_SESSION["username"] = $user["hoVaTen"];
$_SESSION["user_id"] = $user["maNguoiDung"];

echo json_encode([
    "success" => true,
    "message" => "Đăng nhập thành công!",
    "user" => [
        "id" => $user["maNguoiDung"],
        "name" => $user["hoVaTen"],
        "username" => $user["tenTaiKhoan"],
        "email" => $user["email"],
        "phone" => $user["soDT"],
        "address" => $user["diaChi"],
    ]
]);
?>
