<?php

require_once '../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$roleId = isset($_GET['roleId']) ? $_GET['roleId'] : '';

if (!$roleId) {
    echo json_encode([
        'response' => false,
        'role' => null
    ]);
    return;
}

$power_model = new app_models_Quyen();
$power = $power_model->getRoleById($roleId); // Truyền $roleId vào để lấy dữ liệu

if ($power) {
    echo json_encode([
        'response' => true,
        'data' => [
            'id' => $power['maQuyen'],
            'name' => $power['tenQuyen'],
            'status' => $power['trangThai'],
            'updatedAt' => $power['ngayCapNhat']
        ]
    ]);
    return;
}

echo json_encode([
    'response' => false,
    'role' => null
]);
return;

?>
