<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONSupplies($supplies) {
    if (!$supplies) {
        echo json_encode(["error" => "Không tìm thấy tác giả"]);
        exit();
    }
    if (!isset($supplies[0])) {
        $supplies = [$supplies];
    }

    $response = [];

    foreach ($supplies as $author) {
        $response[] = [
            "id" => $author['maNCC'],
            "name" => $author['tenNCC'],
            "phone" => $author['soDT'],
            "email" => $author['email'],
            "address" => $author['diaChi'],
            "status" => $author['trangThai'],
            "updatedAt" => $author['ngayCapNhat']
        ];
    }
    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

$supplier_model = new app_models_NhaCungCap();

$id = isset($_GET['supplyId']) ? $_GET['supplyId'] : '';
$name = isset($_GET['supplyName']) ? $_GET['supplyName'] : '';
$phone = isset($_GET['supplyPhone']) ? $_GET['supplyPhone'] : '';
$email = isset($_GET['supplyEmail']) ? $_GET['supplyEmail'] : '';
$address = isset($_GET['supplyAddress']) ? $_GET['supplyAddress'] : '';
$status = isset($_GET['supplyStatus']) ? $_GET['supplyStatus'] : '';      
// $status = isset($_GET['supplyUpdatedAt']) ? $_GET['supplyUpdatedAt'] : '';

$suppliers = $supplier_model->getSupplierByFilter($id, $name, $phone, $email, $address, $status);
// $authors = $author_model->getAllAuthors();

returnJSONSupplies($suppliers);
?>
