<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONCategory($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy ther loai!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maTheLoai'],
            "name" => $filter['tenTheLoai'],
            "status" => $filter['trangThai'],
            "updatedAt" => $filter['ngayCapNhat']
        ];
    }, is_array($filters[0]) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(
        ["categoryList" => $response, "pageCount" => $pageCount],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );
        exit();
}

$id_or_Name = isset($_GET['id_or_Name']) ? trim($_GET['id_or_Name']) : '';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maTheLoai';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : '10';
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';



$columns = [
    'theLoai.maTheLoai AS maTheLoai',
    'theLoai.tenTheLoai AS tenTheLoai',
    'theLoai.trangThai AS trangThai',
    'theLoai.ngayCapNhat AS ngayCapNhat' 
];

$tables = ['theLoai'];

$joins = [];    

$conditions = [];

$params = [];


if (!empty($id_or_Name)) {
    $conditions[] = "(theLoai.tenTheLoai LIKE :name or theLoai.maTheLoai like :name)";
    $params[':name'] = "%$id_or_Name%";  
}    

if (!empty($status)) {
    $conditions[] = "theLoai.trangThai = :status";
    $params[':status'] = $status;
}    


$db = new app_libs_DBConnection();
$result = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2)/$limit);

// print_r($result);
if (empty($result)) {
    echo json_encode(["categoryList" => [], "error" => "Không có ther loaij nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONCategory($result, $pageCount);

?>



