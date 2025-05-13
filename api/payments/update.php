<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$id = isset($_POST['id']) ? $_POST['id'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '';
$icon = isset($_POST['icon']) ? $_POST['icon'] : '';
$status = isset($_POST['status']) ? $_POST['status'] : '';
$option = isset($_POST['option']) ? $_POST['option'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';
$bankaccount = isset($_POST['bankaccount']) ? $_POST['bankaccount'] : '';
$note = isset($_POST['note']) ? $_POST['note'] : '';


$payment_model = new app_models_PhuongThucThanhToan();

if (empty($address) || empty($bankaccount) || empty($note)) {
    $data = [
        'tenPhuongThuc' => $name,
        'icon_url' => $icon,
        'trangThai' => $status,
        'trucTuyen' => $option,
        'thongTin' => $address,
        'taiKhoan' => $bankaccount,
        'moTa' => $note
    ];
} else {
    $data = [
        'tenPhuongThuc' => $name,
        'icon_url' => $icon,
        'trangThai' => $status,
        'trucTuyen' => $option,
    ];
}

$result = $payment_model->updatePayment(
    $id,
    $data
);


if ($result) {
    echo json_encode([
        'success' => true,
        'message' => 'Cập nhật thành công',
        'title' => 'Thông báo',
        'type' => 'success'
    ]);
    exit();
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Không cập nhật được',
        'title' => 'Cảnh báo',
        'type' => 'warning'
    ]);
    exit();
}




?>