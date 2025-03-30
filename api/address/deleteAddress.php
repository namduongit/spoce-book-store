<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json'); // Thiết lập tiêu đề cho phản hồi JSON
header("Access-Control-Allow-Origin: *"); // Cho phép tất cả các nguồn gốc truy cập
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Cho phép các phương thức POST và OPTIONS
header("Access-Control-Allow-Headers: Content-Type"); // Cho phép tiêu đề Content-Type

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Phương thức không được phép
    echo json_encode(["success" => false, "message" => "Phương thức không được phép"]);
    exit();
}
$maDiaChi = $_POST['idAddress'] ?? ''; // Nhận ID địa chỉ từ POST request
$maNguoiDung = $_POST['idUser'] ?? ''; // Nhận ID người dùng từ POST request

if (empty($maDiaChi) || empty($maNguoiDung)) {
    http_response_code(400); // Yêu cầu không hợp lệ
    echo json_encode(["success" => false, "message" => "Vui lòng nhập đầy đủ thông tin!"]);
    exit();
}

try {
    $address_model = new app_models_DiaChiNguoiDung();
    $result = $address_model->deleteAddressByUser($maDiaChi, $maNguoiDung); 

    if ($result) {
        echo json_encode(["success" => true, "message" => "Xóa địa chỉ thành công!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Không thể xóa địa chỉ. Vui lòng thử lại sau."]);
    }
} catch (Exception $e) {
    http_response_code(500); // Lỗi máy chủ nội bộ
    echo json_encode(["success" => false, "message" => "Đã xảy ra lỗi: " . $e->getMessage()]);
} 

?>