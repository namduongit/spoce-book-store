<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONAccount($filters, $pageCount)
{
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy người dùng!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maNguoiDung'] ?? '',
            "fullname" => $filter['hoVaTen'] ?? '',
            "roleId" => $filter['maQuyen'] ?? '',
            "phone" => $filter['soDT'] ?? '',
            "email" => $filter['email'] ?? '',
            "username" => $filter['tenTaiKhoan'] ?? '',
            "status" => $filter['trangThai'] ?? '',
            "updateAt" => $filter['ngayCapNhat'] ?? 0
        ];
    }, (isset($filters[0])) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(["data" => $response, "pageCount" => $pageCount], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

$id = $_GET['id'] ?? '';
$orderByColumn = $_GET['orderByColumn'] ?? 'maNguoiDung';
$orderType = $_GET['orderType'] ?? 'ASC';
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

$columns = ['*'];
$tables = ['nguoiDung'];
$joins = [];
$conditions = [];
$params = [];
if (!empty($id)) {
    $conditions[] = "maNguoiDung = :id";
    $params[':id'] = $id;
}

$db = new app_libs_DBConnection();
$result = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

// print_r($result);
if (empty($result)) {
    echo json_encode(["data" => [], "error" => "Không có người dùng nào phù hợp!", "pageCount" => 0]);
    exit();
}
// print_r($conditions);
returnJSONAccount($result, $pageCount);