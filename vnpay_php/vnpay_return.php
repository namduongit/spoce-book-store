<?php
require_once("./config.php");

$vnp_SecureHash = $_GET['vnp_SecureHash'];
$inputData = array();

foreach ($_GET as $key => $value) {
    if (substr($key, 0, 4) == "vnp_") {
        $inputData[$key] = $value;
    }
}
unset($inputData['vnp_SecureHash']);
ksort($inputData);

$hashData = "";
$first = true;
foreach ($inputData as $key => $value) {
    if (!$first) {
        $hashData .= '&';
    }
    $hashData .= urlencode($key) . "=" . urlencode($value);
    $first = false;
}

$secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);


require_once '../app/config.php';
require_once '../app/libs/DBConnection.php';

if ($secureHash == $vnp_SecureHash) {
    if ($_GET['vnp_ResponseCode'] == '00') {

        $order_model = new app_models_DonHang();
        $data = [
            "trangThaiThanhToan" => "Đã thanh toán"
        ];
        $order_model->updateOrder($_GET['vnp_TxnRef'], $data);

        $database = new app_libs_DBConnection();
        $database->set_tableName('vnpay');
        $database->building_queryParam([
            'field' => [
                "maGiaoDichVNPAY" => date("YdHis"),
                "maDonHang" => $_GET['vnp_TxnRef'],
                "soTien" => $_GET['vnp_Amount'],
                "trangThai" => "Thanh toán thành công"
            ]
        ]);

        $database->insert();


        header("Location: http://localhost:$port");

        exit();
    } else {
        $order_model = new app_models_DonHang();
        $data = [
        "trangThaiThanhToan" => "Chưa thanh toán"
        ];

        $order_model->updateOrder($_GET['vnp_TxnRef'], $data);

        $database = new app_libs_DBConnection();
        $database->set_tableName('vnpay');
        $database->building_queryParam([
            'field' => [
                "maGiaoDichVNPAY" => date("YdHis"),
                "maDonHang" => $_GET['vnp_TxnRef'],
                "soTien" => $_GET['vnp_Amount'],
                "trangThai" => "Thanh toán thất bại"
            ]
        ]);

        $database->insert();

        header("Location: http://localhost:$port");
        exit();
    }
} else {
    $order_model = new app_models_DonHang();
    $data = [
        "trangThaiThanhToan" => "Chưa thanh toán"
    ];

    $order_model->updateOrder($_GET['vnp_TxnRef'], $data);

    $database = new app_libs_DBConnection();
     $database->set_tableName('vnpay');
        $database->building_queryParam([
            'field' => [
                "maGiaoDichVNPAY" => date("YdHis"),
                "maDonHang" => $_GET['vnp_TxnRef'],
                "soTien" => $_GET['vnp_Amount'],
                "trangThai" => "Sai chữ ký"
            ]
        ]);

        $database->insert();

    header("Location: http://localhost:$port");
    exit();
}
?>
