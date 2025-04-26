<?php
require_once __DIR__ . '../../../app/config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$maQuyen = isset($_POST['maQuyen']) ? $_POST['maQuyen'] : '';

if (empty($maQuyen)) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu thông tin truyền vào",
        "data" => []
    ]);
    exit();
}

$responseFeature = [];
$responseAction = [];
$responseRole = [];
$responseDataRole = [];
$responseDetailRole = [];

// Thông tin của quyền đó gồm hành động gì
$roleDetail_model = new app_models_ChiTietQuyen();
$result = $roleDetail_model->detailsRole($maQuyen);
if ($result) {
    foreach($result as $item) {
        $responseDetailRole[] = [
            "roleId" => $item['maQuyen'],
            "privilegeId" => $item['maChucNang'],
            "actionId" => $item['maHanhDong']
        ];
    }
}

// Danh sách quyền
$role_model = new app_models_Quyen();
$result = $role_model->getAllRoles();
if ($result) {
    foreach($result as $item) {
        $responseRole[] = [
            "id" => $item['maQuyen'],
            "name" => $item['tenQuyen'],
            "status" => $item['trangThai'],
            "updateAt" => $item['ngayCapNhat']
        ];
    }
}


// Danh sách hành động (thêm sửa xóa)
$action_model = new app_models_HanhDong();
$result = $action_model->getAllAction();
if ($result) {
    foreach ($result as $item) {
        $responseAction[] = [
            "id" => $item['maHanhDong'],
            "name" => $item['tenHanhDong'],
            "createAt" => $item['ngayCapNhat']
        ];
    }
}


// Danh sách chức năng
$privilege_model = new app_models_ChucNang();
$privileges = $privilege_model->getAllPrivileges();
foreach ($privileges as $item) {
    $responseFeature[] = [
        "id" => $item['maChucNang'],
        "name" => $item['tenChucNang'],
        "status" => $item['trangThai']
    ];
}

// Thông tin ứng với mã quyền
$result = $role_model->getRoleById($maQuyen); 

if ($result) {
    $responseDataRole = [
    'id' => $result['maQuyen'],
    'name' => $result['tenQuyen'],
    'status' => $result['trangThai'],
    'updatedAt' => $result['ngayCapNhat']
    ];
}

echo json_encode([
    "success" => true,
    "data" => [
        "feature" => $responseFeature,
        "action" => $responseAction,
        "role" => $responseRole,
        "dataRole" => $responseDataRole,
        "detailRole" => $responseDetailRole
    ]
])



?>