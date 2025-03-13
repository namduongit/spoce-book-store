<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONCoverType($coverTypes) {
    if (!$coverTypes) {
        echo json_encode(["error" => "Không tìm thấy loại bìa"]);
        exit();
    }
    if (!isset($coverTypes[0])) {
        $coverTypes = [$coverTypes];
    }

    $response = [];

    foreach ($coverTypes as $cover) {
        $response[] = [
            "id" => $cover['maLoaiBia'],
            "name" => $cover['tenLoaiBia'],
            "status" => $cover['trangThai']
        ];
    }
    echo json_encode($response);
}

$cover_model = new app_models_LoaiBia();

$id = isset($_GET['coverId']) ? $_GET['coverId'] : '';
$name = isset($_GET['coverName']) ? $_GET['coverName'] : '';
$status = isset($_GET['coverStatus']) ? $_GET['coverStatus'] : '';

$coverTypes = $cover_model->getCoverByFilter($id, $name, $status);
// $coverTypes = $cover_model->getAllCovers();

returnJSONCoverType($coverTypes);
?>
