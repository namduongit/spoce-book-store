<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Kiểm tra phương thức HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
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
            "username" => $user['tenTaiKhoan'],
            "role_id" => $user['maQuyen'],
            "status" => $user['trangThai'],
            "updated_at" => $user['ngayCapNhat']
        ];
    }, $users);

    http_response_code(200);
    echo json_encode($response);
}

// Khởi tạo model User
$user_model = new app_models_NguoiDung();

// Nhận tham số từ query string
$userId = isset($_GET['userId']) ? (int) $_GET['userId'] : null;
$username = isset($_GET['username']) ? trim($_GET['username']) : '';
$email = isset($_GET['email']) ? trim($_GET['email']) : '';
$phone = isset($_GET['phone']) ? trim($_GET['phone']) : '';

$roleId = isset($_GET['roleId']) ? (int) $_GET['roleId'] : null;
$status = isset($_GET['status']) ? (int) $_GET['status'] : null;

$startDate = isset($_GET['startDate']) ? trim($_GET['startDate']) : null;
$endDate = isset($_GET['endDate']) ? trim($_GET['endDate']) : null;

$order_by = isset($_GET['orderBy']) ? trim($_GET['orderBy']) : '';

// Gọi hàm lấy danh sách người dùng có lọc nâng cao
$users = $user_model->getUsersByFilters(
    $userId, $username, $email, $phone,
    $roleId, $status, $startDate, $endDate, $order_by
);

// Trả về kết quả
returnJSONUser($users);
?>
