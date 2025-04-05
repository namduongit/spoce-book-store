<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$id = isset($_GET['id']) ? $_GET['id'] : '';
$name = isset($_GET['name']) ? $_GET['name'] : '';
$type = isset($_GET['type']) ? $_GET['type'] : '';
$dateStart = isset($_GET['dateStart']) ? $_GET['dateStart'] : '';
$dateEnd = isset($_GET['dateEnd']) ? $_GET['dateEnd'] : '';
$minCost = isset($_GET['minCost']) ? $_GET['minCost'] : '';
$maxDiscount = isset($_GET['maxDiscount']) ? $_GET['maxDiscount'] : '';

// Xử lý giá trị dựa trên loại khuyến mãi
$value = null;
if ($type === 'PERCENTAGE') {
    $value = isset($_GET['phanTram']) ? $_GET['phanTram'] : null;
} else if ($type === 'FIXED_AMOUNT') {
    $value = isset($_GET['giaTriGiam']) ?$_GET['giaTriGiam'] : null;
}

$discount_model = new app_models_PhieuGiamGia();

$update = $discount_model->updateDiscount($id, [
    "tenPGG" => $name, 
    "type" => $type, 
    "giaTriGiam" => $type === 'FIXED_AMOUNT' ? $value : null,
    "phanTram" => $type === 'PERCENTAGE' ? $value : null,
    "ngayBatDau" => $dateStart, 
    "ngayKetThuc" => $dateEnd, 
    "toiThieu" => $minCost, 
    "toiDa" => $maxDiscount
]);

if($update){
    echo json_encode(["success" => true, "message" => "Sửa thành công."
, "data" => $update]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi sửa mã giảm giá."]);
}