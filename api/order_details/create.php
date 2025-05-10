<?php
// require_once __DIR__ . '/../../../app/config.php';
require_once '../../app/config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$raw = file_get_contents("php://input");
$data = json_decode($raw, true); 

if (!isset($data['data'])) {
    echo json_encode([
        "success" => false,
        "message" => "Không có dữ liệu"
    ]);
    exit();
}

if (!class_exists('app_models_ChiTietDonHang')) {
    echo json_encode([
        "success" => false,
        "message" => "Class app_models_ChiTietDonHang chưa được load"
    ]);
    exit();
}

$maDonHang = $data['data']['maDonHang'];
$danhSachSanPham = $data['data']['danhSachSanPham'];

$detail_models = new app_models_ChiTietDonHang();
foreach ($danhSachSanPham as $sanPham) {    
    $result = $detail_models->insertDetailOrder([
        "maDonHang" => $maDonHang,
        "maSach" => $sanPham['bookId'],
        "soLuong" => $sanPham['quantity']
    ]);
}

echo json_encode([
    "success" => true,
    "message" => "Cập nhật chi tiết hóa đơn thành công"
]);
exit();
