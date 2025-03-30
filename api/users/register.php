<?php
require_once __DIR__ . '../../../app/config.php';

if (!function_exists('http_response_code')) {
    function http_response_code($code = null) {
        static $http_code = 200;
        if ($code !== null) {
            $http_code = $code;
            header('X-PHP-Response-Code: ' . $http_code, true, $http_code);
        }
        return $http_code;
    }
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Phương thức không được phép"]);
    exit();
}

$hoVaTen = $_POST["name"] ?? '';
$tenTaiKhoan = $_POST["username"] ?? '';
$matKhau = $_POST["password"] ?? '';
$xacNhanMatKhau = $_POST["confirm_password"] ?? '';

if (empty($hoVaTen) || empty($tenTaiKhoan) || empty($matKhau) || empty($xacNhanMatKhau)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Vui lòng nhập đầy đủ thông tin!"]);
    exit();
}

if ($matKhau !== $xacNhanMatKhau) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Mật khẩu xác nhận không khớp!"]);
    exit();
}

try {
    $user_model = new app_models_NguoiDung();
    $userList = $user_model->getAllUsers();

    $existUser = $user_model->isExistUsername($tenTaiKhoan);
    if ($existUser) {
        echo json_encode(["success" => false, "message" => "Tên tài khoản đã tồn tại!"]);
        exit();
    } else {
        $hashedPassword = md5($matKhau);
        $userData = [
            "hoVaTen" => $hoVaTen,
            "tenTaiKhoan" => $tenTaiKhoan,
            "matKhau" => $hashedPassword
        ];
        $result = $user_model->insertUser($userData);
        if ($result) {
            echo json_encode(["success" => true, "message" => "Đăng ký thành công!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Không thể tạo tài khoản. Vui lòng thử lại sau."]);
        }

    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Lỗi server: " . $e->getMessage()]);
}

exit();
?>
