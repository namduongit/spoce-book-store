<?php
include_once '../../app/config.php';
require_once __DIR__ . '/../../vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

// Thiết lập phản hồi dạng JSON
header("Content-Type: application/json");

// Cấu hình CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

$secret_key = "ThisIsSecretKeyByNamDuongit";
$headers = getallheaders();
$auth_header = $headers['Authorization'] ?? '';

if (!$auth_header || !preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Thiếu hoặc sai định dạng token"]);
    exit;
}

$token = $matches[1];

try {
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));

    // Nếu token hợp lệ, trả về thành công
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Đăng xuất thành công!"
    ]);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Token không hợp lệ: " . $e->getMessage()
    ]);
    exit;
}
?>