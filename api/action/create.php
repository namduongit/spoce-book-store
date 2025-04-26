<?php
require_once __DIR__ . '../../../app/config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$raw = file_get_contents("php://input");
$payload = json_decode($raw, true);

$name = $payload['data']['name'];
$status = $payload['data']['status'];
$actionDetail = $payload['data']['action'];


if (empty($name) || empty($status)) {
    echo json_encode([
        "success" => false,
        "message" => "Dữ liệu truyền vào không khớp với yêu cầu"
    ]);
    exit();  
}

$roleDetail_model = new app_models_ChiTietQuyen();

$role_model = new app_models_Quyen();

$result = $role_model->insertRole([
    "tenQuyen" => $name,
    "trangThai" => $status
]);

if ($result > 0) {
    if (count($actionDetail) > 0) {
        foreach($actionDetail as $key => $actions) {
            foreach($actions as $action) {
                $roleDetail_model->insertRoleDetail($result, $key, $action);
            }
        }
    }
}

echo json_encode([
    "success" => true,
    "message" => "Thêm quyền mới thành công"
]);



exit();



?>