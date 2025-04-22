<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONPublisher($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm nhà xuất bản!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maNXB'],
            "name" => $filter['tenNXB'],
            "status" => $filter['trangThai'],
            "updatedAt" => $filter['ngayCapNhat']
        ];
    }, is_array($filters[0]) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(
        ["data" => $response, "pageCount" => $pageCount],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );
        exit();
}

$columns = ['*'];
$tables = ['nhaXuatBan'];
$joins = [];    
$conditions = [];
$params = [];
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';

$find = isset($_GET['find']) ? trim($_GET['find']) : '';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maNXB';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
if (!empty($find)) {
    $conditions[] = "(nhaXuatBan.maNXB = :id or nhaXuatBan.tenNXB LIKE :name)";
    $params[':id'] = $find;  
    $params[':name'] = "%$find%";
}    

if (!empty($status)) {
    $conditions[] = "nhaXuatBan.trangThai = :status";
    $params[':status'] = $status;
}    


$db = new app_libs_DBConnection();
$result = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

if (empty($result)) {
    echo json_encode(["data" => [], "error" => "Không có NXB nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONPublisher($result, $pageCount);

?>