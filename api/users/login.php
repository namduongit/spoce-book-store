<?php
// Bật báo cáo tất cả lỗi trong PHP
error_reporting(E_ALL);
// Hiển thị các lỗi trực tiếp ra output (chỉ dùng khi phát triển)
ini_set('display_errors', 1);
// Khởi tạo phiên Session
session_start();
// Thiết lập phản hồi dạng JSON
header("Content-Type: application/json");
require_once __DIR__ . '../../../app/config.php';

// Cấu hình CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Chỉ chấp nhận phương thức POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["success" => false, "message" => "Chỉ hỗ trợ phương thức POST!"]);
    exit;
}

$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING) ?? '';
$password = $_POST["password"] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Vui lòng nhập đầy đủ thông tin!"]);
    exit;
}

try {
    $user_model = new app_models_NguoiDung();
    $user = $user_model->loginUser($username, md5($password));

    if (!$user) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Tài khoản hoặc mật khẩu không đúng!"]);
        exit;
    }

    $_SESSION["loggedin"] = true;
    $_SESSION["username"] = $user["tenTaiKhoan"];
    $_SESSION["user_id"] = $user["maNguoiDung"];

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Đăng nhập thành công!",
        "user" => [
            "id" => $user["maNguoiDung"],
            "username" => $user["tenTaiKhoan"],
            "name" => $user["hoVaTen"],
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Lỗi server: " . $e->getMessage()]);
    exit;
}
?>