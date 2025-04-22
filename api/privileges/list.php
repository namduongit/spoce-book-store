<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


function returnJSONPrivilege($privileges)
{
    if (!$privileges) {
        return [];
    }
    if (!isset($privileges[0])) {
        $privileges = [$privileges];
    }

    $response = [];
    foreach ($privileges as $privilege) {
        $response[] = [
            "id" => $privilege['maChucNang'],
            "name" => $privilege['tenChucNang'],
            "status" => $privilege['trangThai']
        ];
    }
    return $response;
}

$privilege_model = new app_models_ChucNang();

$privileges = $privilege_model->getAllPrivileges();

$response = [
    "success" => true,
    "message" => !$privileges ? "Không có dữ liệu chức năng" : "Lấy dữ liệu chức năng thành công",
    "data" => returnJSONPrivilege($privileges),
];

echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>