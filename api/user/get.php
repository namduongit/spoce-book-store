<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Phương thức không được phép"]);
    exit();
}

// Hàm trả về JSON danh sách người dùng
function returnJSONUser($users) {
    if (!$users) {
        echo json_encode(["error" => "Không tìm thấy người dùng"]);
        exit();
    }

    $response = array_map(function($user) {
        return [
            "id" => $user['maNguoiDung'],
            "full_name" => $user['hoVaTen'],
            "phone" => $user['soDT'],
            "email" => $user['email'],
            "address" => $user['diaChi'],
            "username" => $user['tenTaiKhoan'],
            "password" => $user['matKhau'],
            "role_id" => $user['maQuyen'],
            "status" => $user['trangThai'],
            "updated_at" => $user['ngayCapNhat']
        ];
    }, $users);

    http_response_code(200); // OK
    echo json_encode($response);
}

// Khởi tạo model User
$user_model = new app_models_NguoiDung();

try {
    $users = $user_model->getAllUsers();
    returnJSONUser($users);
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Lỗi server: " . $e->getMessage()]);
    exit();
}
?>
