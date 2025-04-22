<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONPublisher($list) {
    if (!$list) {
        echo json_encode(["error" => "Không tìm thấy nhà xuất bản"]);
        exit();
    }
    if (!isset($list[0])) {
        $list = [$list];
    }

    $response = [];

    foreach ($list as $element) {
        $response[] = [
            "id" => $element['maNXB'],
            "name" => $element['tenNXB'],
            "status" => $element['trangThai'],
            "updatedAt" => $element['ngayCapNhat']
        ];
    }
    echo json_encode($response);
}

$model = new app_models_NhaXuatBan();
$id = isset($_GET['id']) ? $_GET['id'] : '';
$name = isset($_GET['name']) ? $_GET['name'] : '';
$status = isset($_GET['status']) ? $_GET['status'] : '';

$list = $model->getPublisherByFilter($id, $name, $status);
returnJSONPublisher($list);

?>