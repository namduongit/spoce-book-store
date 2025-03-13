<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONPublisher($publishers) {
    if (!$publishers) {
        echo json_encode(["error" => "Không tìm thấy nhà xuất bản"]);
        exit();
    }
    if (!isset($publishers[0])) {
        $publishers = [$publishers];
    }

    $response = [];

    foreach ($publishers as $publisher) {
        $response[] = [
            "id" => $publisher['maNXB'],
            "name" => $publisher['tenNXB'],
            "status" => $publisher['trangThai']
        ];
    }
    echo json_encode($response);
}

$publisher_model = new app_models_NhaXuatBan();

$id = isset($_GET['publisherId']) ? $_GET['publisherId'] : '';
$name = isset($_GET['publisherName']) ? $_GET['publisherName'] : '';
$status = isset($_GET['publisherStatus']) ? $_GET['publisherStatus'] : '';

$publishers = $publisher_model->getPublisherByFilter($id, $name, $status);

returnJSONPublisher($publishers);
?>
