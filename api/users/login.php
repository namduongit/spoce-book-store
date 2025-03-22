<?php

include_once __DIR__ .'../../../app/config.php';
// Bật báo cáo tất cả lỗi trong PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Thiết lập phản hồi dạng JSON
header("Content-Type: application/json");

// Cấu hình CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Chỉ chấp nhận phương thức POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Chỉ hỗ trợ phương thức POST!"]);
    exit;
}

$username = $_POST["username"] ?? '';
$password = $_POST["password"] ?? '';


if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Vui lòng nhập đầy đủ thông tin!"]);
    exit;
}

require_once __DIR__ . '../../../vendor/autoload.php';
use \Firebase\JWT\JWT;

try {
    $user_model = new app_models_NguoiDung();
    $user = $user_model->loginUser($username, md5($password));

    if (!$user) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Tài khoản hoặc mật khẩu không đúng!"]);
        exit;
    }

    $secret_key = "ThisIsSecretKeyByNamDuongit";
    $issuer = "https://namduong.id.vn/";
    $issued_at = time();
     // Token hết hạn trong 1 ngày
    $expiration_time = $issued_at + 86400;

    // Payload của token
    $payload = [
        "iss" => $issuer,
        "iat" => $issued_at,
        "exp" => $expiration_time,
        "data" => [
            "id" => $user["maNguoiDung"],
            "username" => $user["tenTaiKhoan"]
        ]
    ];

    $token = JWT::encode($payload, $secret_key, 'HS256');

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Đăng nhập thành công!",
        "token" => $token,
        "user" => [
            "id" => $user["maNguoiDung"],
            "username" => $user["tenTaiKhoan"],
            "name" => $user["hoVaTen"]
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Lỗi server: " . $e->getMessage()]);
    exit;
}
?>