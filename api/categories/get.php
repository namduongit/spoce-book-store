<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONCategory($categories) {
    if (!$categories) {
        echo json_encode(["error" => "Không tìm thấy danh mục thể loại"]);
        exit();
    }
    if (!isset($categories[0])) {
        $categories = [$categories];
    }

    $response = [];

    foreach($categories as $category) {
        $response[] = [
            "id" => $category['maTheLoai'],
            "name" => $category['tenTheLoai'],
            "status" => $category['trangThai'],
            "updatedAt" => $category['ngayCapNhat']
        ];
    }
    echo json_encode($response);
}

$category_model = new app_models_TheLoai();

$id = isset($_GET['cateId']) ? $_GET['cateId'] : '';
$name = isset($_GET['cateName']) ? $_GET['cateName'] : '';
$status = isset($_GET['cateStatus']) ? $_GET['cateStatus'] : '';


$categories = $category_model->getCategoryByFilter($id, $name, $status);
// $categories = $category_model->getAllCategories();

returnJSONCategory($categories);

?>