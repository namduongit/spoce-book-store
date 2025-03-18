<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
header("Content-Type: application/json"); // Trả về JSON
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



$user_model = new app_models_NguoiDung();

// Lấy danh sách tất cả người dùng
$userList = $user_model->getAllUsers();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Tìm người dùng trong danh sách
    $user = null;
    foreach ($userList as $u) {
        if ($u["tenTaiKhoan"] === $username) {
            $user = $u;
            break;
        }
    }

    if ($user) {
        if ($password === $user["matKhau"]) {
            $_SESSION["loggedin"] = true;
            $_SESSION["username"] = $user["hoVaTen"];
            $_SESSION["user_id"] = $user["maNguoiDung"];
            $_SESSION["password"] = $user["matKhau"];
            // Trả về thông tin người dùng nếu đăng nhập thành công
            echo json_encode([
                "success" => true,
                "message" => "Đăng nhập thành công!",
                "user" => [
                "id" => $user["maNguoiDung"],
                "name" => $user["hoVaTen"],
                "username" => $user["tenTaiKhoan"],
                "password" => $user["matKhau"],
                "email" => $user["email"],
                "phone" => $user["soDT"],
                "address" => $user["diaChi"],
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Sai mật khẩu!"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Tài khoản không tồn tại!"]);
    }
}
?>
