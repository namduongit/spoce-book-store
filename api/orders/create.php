<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Thông tin chính
$idCustomer = isset($_POST['maKhachHang']) ? $_POST['maKhachHang'] : '';
$address = isset($_POST['diaChiGiao']) ? $_POST['diaChiGiao'] : '';
$totalCost = isset($_POST['tongTienThu']) ? $_POST['tongTienThu'] : '';
$idWayOrder = isset($_POST['maPhuongThuc']) ? $_POST['maPhuongThuc'] : '';

$customerName = isset($_POST['tenNguoiNhan']) ? $_POST['tenNguoiNhan'] : '';
$customerPhone = isset($_POST['soDienThoai']) ? $_POST['soDienThoai'] : '';


// Thông tin phụ
$idVoucher = isset($_POST['maKhuyenMai']) ? $_POST['maKhuyenMai'] : '';



if (empty($idCustomer) || empty($address) || empty($totalCost) || empty($idWayOrder) || empty($customerName) || empty($customerPhone)) {
    echo "thieu data";
    echo json_encode([
        "success" => false,
        "message" => "Thiếu dữ liệu để tạo hóa đơn. Vui lòng làm lại",
        "data" => -1
    ]);
    exit();
}


$order_models = new app_models_DonHang();

$orderData = [
    "maKhachHang" => $idCustomer,
    "dcNguoiNhan" => $address,
    "tongTienThu" => $totalCost,
    "maPhuongThuc" => $idWayOrder,
    "hvtNguoiNhan" => $customerName,
    "sdtNguoiNhan" => $customerPhone,
    "trangThaiThanhToan" => "Chưa thanh toán",
    "trangThai" => "Đang chờ xác nhận"
];

if ($idVoucher != '') {
    $orderData["maKhuyenMai"] = $idVoucher ? $idVoucher : NULL;
}



$result = $order_models->insertOrder($orderData);



if ($result > 0) {
    echo json_encode([
        "success" => true,
        "message" => "Tạo hóa đơn thành công",
        "data" => $result
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Có lỗi trong việc tạo hóa đơn",
        "data" => -1
    ]);
}


exit();

?>