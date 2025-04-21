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
$soNha = $_POST['houseAddress'] ?? '';
$tinhThanh = $_POST['provinceAddress'] ?? '';
$quanHuyen = $_POST['cityAddress'] ?? '';
$phuongXa = $_POST['wardAddress'] ?? '';
$maNguoiDung = $_POST['idUser'] ?? '';

if (empty($maNguoiDung) || empty($soNha) || empty($tinhThanh) || empty($quanHuyen) || empty($phuongXa)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Vui lòng nhập đầy đủ thông tin"
    ]);
    exit();
}

try {
    $address_model = new app_models_DiaChiNguoiDung();

    $result = $address_model->updateAddress($maNguoiDung, [
        'soNha' => $soNha,
        'tinhThanh' => $tinhThanh,
        'quanHuyen' => $quanHuyen,
        'phuongXa' => $phuongXa
    ]);

    if ($result) {
        echo json_encode(["success" => true, "message" => "Cập nhật địa chỉ thành công"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Không thể cập nhật địa chỉ"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Đã xảy ra lỗi: " . $e->getMessage()
    ]);
}
