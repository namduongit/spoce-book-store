<?php
    require_once __DIR__ . '../../../app/config.php';

    header('Content-Type: application/json');

    function returnJSONDetails($orderDetails) {
        if (!$orderDetails) {
            echo json_encode(
                [
                    "error" => "Không có chi tiết đơn hàng"
                ]
            );
            exit();
        }

        $response = [];
        foreach ($orderDetails as $details) {
            $response[] = [
                "orderId" => $details['maDonHang'],
                "bookId" => $details['maSach'],
                "amount" => $details['soLuong'],
                "price" => $details['tienThu']
            ];
        }

        echo json_encode($response);
    }
    
    $orderId = $_GET['orderId'] ?? '';
    $orderDetail_model = new app_models_ChiTietDonHang();

    $orderDetails = $orderDetail_model->getOrderDetailByOrderId($orderId);

    returnJSONDetails($orderDetails);
?>