<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONCover($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy bia!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maLoaiBia'],
            "name" => $filter['tenLoaiBia'],
            "status" => $filter['trangThai'],
            "updatedAt" => $filter['ngayCapNhat']
        ];
    }, is_array($filters[0]) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(
        ["coverList" => $response, "pageCount" => $pageCount],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );
        exit();
}

$id_or_Name = isset($_GET['id_or_Name']) ? trim($_GET['id_or_Name']) : '';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maLoaiBia';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : '10';
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';



$columns = [
    'loaiBia.maLoaiBia AS maLoaiBia',
    'loaiBia.tenLoaiBia AS tenLoaiBia',
    'loaiBia.trangThai AS trangThai',
    'loaiBia.ngayCapNhat AS ngayCapNhat' 
];

$tables = ['loaiBia'];

$joins = [];    

$conditions = [];

$params = [];


if (!empty($id_or_Name)) {
    $conditions[] = "(loaiBia.tenLoaiBia LIKE :name or loaiBia.maLoaiBia like :name)";
    $params[':name'] = "%$id_or_Name%";  
}    

if (!empty($status)) {
    $conditions[] = "loaiBia.trangThai = :status";
    $params[':status'] = $status;
}    


$db = new app_libs_DBConnection();
$result = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2)/$limit);

// print_r($result);
if (empty($result)) {
    echo json_encode(["coverList" => [], "error" => "Không có loai bìa nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONCover($result, $pageCount);

?>



