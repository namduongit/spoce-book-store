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

$roleId = $payload['data']['roleId'];
$name = $payload['data']['name'];
$status = $payload['data']['status'];
$actionDetail = $payload['data']['action'];


if (empty($name) || empty($status) || empty($roleId)) {
    echo json_encode([
        "success" => false,
        "message" => "Coi lại dữ liệu chưa đầy đủ"
    ]);
    exit();  
}

$roleDetail_model = new app_models_ChiTietQuyen();
$role_model = new app_models_Quyen();

// Đầu tiên đổi tên hoặc trạng thái nếu có
if (!empty($name) || !empty($status)) {
    $data = [];
    if (!empty($name)) $data['tenQuyen'] = $name;
    if (!empty($status)) $data['trangThai'] = $status;
    $update = $role_model->updateRole($roleId, $data);
}


// Bước 1: Xóa hết quyền cũ
$resultDelete = $roleDetail_model->deleteRole($roleId);

// Bước 2: Insert lại theo mảng
if (count($actionDetail) > 0) {
    foreach($actionDetail as $key => $actions) {
        foreach($actions as $action) {
            $roleDetail_model->insertRoleDetail($roleId, $key, $action);
        }
    }
}

echo json_encode([
    "success" => true,
    "message" => "Cập nhật quyền mới thành công"
]);

exit();
?>
