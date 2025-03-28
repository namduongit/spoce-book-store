<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$orderId = (int)$_POST['orderId'] ?? '';
$userId = (int)$_POST['userId'] ?? '';
$startDate = $_POST['startDate'] ?? '';
$endDate = $_POST['endDate'] ?? '';
$status = $_POST['status'] ?? '';
$currentTime = date('Y-m-d H:i:s');

try {
    $orderModel = new app_models_DonHang();

    $newOrderData = [
        "trangThai" => $status
    ];

    $result = $orderModel->updateOrder($orderId, $newOrderData);

    if ($result) {
        echo json_encode(
            [
                "success" => true,
                "message" => "Hủy đơn hàng thành công!"
            ]
        );
    } else {
        echo json_encode(
            [
                "success" => false,
                "message" => "Hủy đơn hàng không thành công!"
            ]
    );
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(
        [
            "success" => false,
            "message" => "Hủy đơn hàng không thành công!"
        ]
    );
}

?>