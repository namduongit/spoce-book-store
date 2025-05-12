<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONPaymentMethods($paymentMethods) {
    if (!$paymentMethods) {
        echo json_encode(["error" => "Không tìm thấy phương thức thanh toán"]);
        exit();
    }
    if (!isset($paymentMethods[0])) {
        $paymentMethods = [$paymentMethods];
    }

    $response = [];

    foreach ($paymentMethods as $paymentMethod) {
        $response[] = [
            "id" => $paymentMethod['maPhuongThuc'],
            "name" => $paymentMethod['tenPhuongThuc'],
            "info" => $paymentMethod['thongTin'],
            "desc" => $paymentMethod['moTa'],
            "auth" => $paymentMethod['taiKhoan'],
            "icon" => $paymentMethod['icon_url'],
            "status" => $paymentMethod['trangThai'],
        ];
    }
    echo json_encode($response);
}

$payment_method_model = new app_models_PhuongThucThanhToan();

$id = isset($_GET['paymentMethodId']) ? $_GET['paymentMethodId'] : '';
$name = isset($_GET['paymentMethodName']) ? $_GET['paymentMethodName'] : '';
$status = isset($_GET['paymentMethodStatus']) ? $_GET['paymentMethodStatus'] : 'Hoạt động';

$paymentMethods = $payment_method_model->getPaymentsByFilter($id, $name, $status);

returnJSONPaymentMethods($paymentMethods);
?>
