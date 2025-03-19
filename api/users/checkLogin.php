<?php
include_once '../../app/config.php';

session_start();
header("Content-Type: application/json");

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

try {
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
        $user_model = new app_models_NguoiDung();
        $user = $user_model->getUserById($_SESSION['user_id']);

        if (!$user) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Không tìm thấy thông tin người dùng!"]);
            exit;
        }

        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Đã đăng nhập",
            "user" => [
                "id" => $user['maNguoiDung'],
                "full_name" => $user['hoVaTen'],
                "phone" => $user['soDT'],
                "email" => $user['email'],
                "address" => $user['diaChi'],
                "username" => $user['tenTaiKhoan'],
                "role_id" => $user['maQuyen'],
                "status" => $user['trangThai'],
                "updated_at" => $user['ngayCapNhat']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Chưa đăng nhập"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Lỗi server: " . $e->getMessage()]);
}
?>