<?php
include_once '../../app/config.php';

// Khởi động session
session_start();
// Thiết lập phản hồi dạng JSON
header("Content-Type: application/json");

// Cấu hình CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

try {
    // Xóa tất cả dữ liệu session
    session_unset();
    // Hủy session hoàn toàn
    session_destroy();

    // Trả về phản hồi thành công
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Đăng xuất thành công!"
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Lỗi server: " . $e->getMessage()
    ]);
}
?>