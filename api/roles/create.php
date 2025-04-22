<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$name = isset($_POST['name']) ? $_POST['name'] : '';
$status = isset($_POST['status']) ? $_POST['status'] : '';

if (!$name || !$status) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu dữ liệu truyền vào",
        "result" => -1
    ]);
    exit;
}

$role_model = new app_models_Quyen();

$result = $role_model->insertRole([
    "tenQuyen" => $name,
    "trangThai" => $status
]);

if ($result > 0) {
    echo json_encode([
        "success" => true,
        "message" => "Thêm thành công quyền mới",
        "result" => $result
    ]);

} else {
    echo json_encode([
        "success" => false,
        "message" => "Không có thay đổi hoặc ID không tồn tại",
        "result" => 0
    ]);
}

?>