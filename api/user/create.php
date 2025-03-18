<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Kiểm tra nếu không phải phương thức POST thì từ chối xử lý
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Phương thức không được phép"]);
    exit();
}

// Nhận dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra dữ liệu đầu vào
if (!$data || !isset($data['hoVaTen']) || !isset($data['tenTaiKhoan']) || !isset($data['matKhau'])) {
    http_response_code(400);
    echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
    exit();
}

try {
    $user_model = new app_models_NguoiDung();
    $userList = $user_model->getAllUsers();

    // Kiểm tra tên tài khoản đã tồn tại chưa
    foreach ($userList as $u) {
        if ($data['tenTaiKhoan'] === $u['tenTaiKhoan']) {
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "Tên tài khoản đã được đăng ký"]);
            exit();
        }
    }

   
    $result = $user_model->insertUser($data);

    if ($result) {
        http_response_code(201);
        echo json_encode(["message" => "Đăng ký thành công"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Không thể tạo tài khoản"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi server: " . $e->getMessage()]);
}

exit();
?>
