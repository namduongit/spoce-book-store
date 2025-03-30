<?php
require_once __DIR__ . '../../../app/config.php';

// echo 'Chạy dô đây';
// $address_model = new app_models_DiaChiNguoiDung();
// echo $address_model->open_connect() != null ? "Thành công" : "Thất bại";
// die();

if (!function_exists('http_response_code')) {
    function http_response_code($code = null) {
        static $http_code = 200;
        if ($code !== null) {
            $http_code = $code;
            header("X-PHP-Response-Code: $http_code", true, $http_code);
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

$maNguoiDung = $_POST['idUser'] ?? '';
$tinhThanh = $_POST['province'] ?? '';
$thanhPho = $_POST['city'] ?? '';
$phuongXa = $_POST['ward'] ?? '';
$soNha = $_POST['numberHouse'] ?? '';

if (empty($maNguoiDung) || empty($tinhThanh) || empty($thanhPho) || empty($phuongXa) || empty($soNha)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Vui lòng nhập đầy đủ thông tin!"]);
    exit();
}


try {
    $address_model = new app_models_DiaChiNguoiDung();
    $valueAddress = [
        'maNguoiDung' => $maNguoiDung,
        'tinhThanh' => $tinhThanh,
        'quanHuyen' => $thanhPho,
        'phuongXa' => $phuongXa,
        'soNha' => $soNha
    ];
    $result = $address_model->insertAddress($valueAddress);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Tạo địa chỉ mới thành công!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Không thể tạo địa chỉ. Vui lòng thử lại sau."]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Lỗi server: " . $e->getMessage()]);
}

exit();
?>