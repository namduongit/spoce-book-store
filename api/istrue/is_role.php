<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$maQuyen = isset($_POST['idPrivilege']) ? $_POST['idPrivilege'] : '';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo json_encode([
        "success" => false,
        "message" => "Phương thức không hợp lệ"
    ]);
    exit();
}

if (empty($maQuyen)) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu trường dữ liệu"
    ]);
    exit();
}

$columns = [
    'quyen.maQuyen',
    'chucNang.maChucNang',
    'hanhDong.maHanhDong',
    'quyen.tenQuyen',
    'chucNang.tenChucNang',
    'hanhDong.tenHanhDong'
];

$tables = ['chiTietQuyen', 'quyen', 'chucNang', 'hanhDong'];

$joins = [
    'chiTietQuyen.maQuyen = quyen.maQuyen',
    'chiTietQuyen.maChucNang = chucNang.maChucNang',
    'chiTietQuyen.maHanhDong = hanhDong.maHanhDong'
];

$conditions = [];
$params = [];

$conditions[] = "chiTietQuyen.maQuyen = :maQuyen";
$params[':maQuyen'] = $maQuyen;

$orderByColumn = 'maChucNang, maHanhDong';

$database = new app_libs_DBConnection();

$role_model = new app_models_Quyen();
$role = $role_model->getRoleById($maQuyen);

$detail_role = $database->namduongFind($columns, $tables, $joins, $conditions, $orderByColumn, '', $params);

if ($role && $detail_role) {
    $response = [];

    foreach ($detail_role as $detail) {
        $maChucNang = $detail['maChucNang'];
        $maHanhDong = $detail['maHanhDong'];

        if (!isset($response[$maChucNang])) {
            $response[$maChucNang] = [];
        }

        if (!in_array($maHanhDong, $response[$maChucNang])) {
            $response[$maChucNang][] = $maHanhDong;
        }
    }

    echo json_encode([
        "success" => true,
        "message" => "Dữ liệu hợp lệ",
        "result" => [
            "roleID" => $role['maQuyen'],
            "roleName" => $role['tenQuyen'],
            "data" => $response
        ]
    ]);

    exit();
}

else {
    echo json_encode([
        "success" => false,
        "message" => "Có lỗi trong việc tìm kiếm dữ liệu"
    ]);
    exit();
}
