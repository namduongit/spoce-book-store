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

$maDiaChi = $_POST['idAddress'];

if (empty($maDiaChi)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Vui lòng nhập đầy đủ thông tin"
    ]);
    exit();
}

try {
    $address_model = new app_models_DiaChiNguoiDung();
    $result = $address_model->getAddressById($maDiaChi);

    if ($result) {
        echo json_encode([
            "success" => true,
            "message" => "Lấy địa chỉ thành công",
            "address" => [
                "id" => $result['maDiaChi'],
                "province" => $result['tinhThanh'],
                "city" => $result['quanHuyen'],
                "ward" => $result['phuongXa'],
                "house" => $result['soNha']
            ]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Không có địa chỉ",
            "address" => null
        ]);
    }
    exit();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Đã xảy ra lỗi: " . $e->getMessage()
    ]);
}

?>