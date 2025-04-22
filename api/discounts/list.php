<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONDiscount($filters, $pageCount)
{
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy mã giảm giá!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maPGG'] ?? '',
            "name" => $filter['tenPGG'] ?? '',
            "type" => $filter['loai'] ?? '',
            "discountV" => $filter['giaTriGiam'] ?? 0,
            "min" => $filter['toiThieu'] ?? '',
            "max" => $filter['toiDa'] ?? 0,
            "dateStart" => $filter['ngayBatDau'] ?? '',
            "dateEnd" => $filter['ngayKetThuc'] ?? '',
            "status" => $filter['trangThai'] ?? '',
            "updateAt" => $filter['ngayCapNhat'] ?? ''
        ];
    }, (isset($filters[0])) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(["data" => $response, "pageCount" => $pageCount], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

$columns = ['*'];
$tables = ['phieuGiamGia'];
$joins = []; 
$conditions = [];
$params = [];
$orderByColumn = $_GET['orderByColumn'] ?? 'maPGG';
$orderType = $_GET['orderType'] ?? 'ASC';
$limit = isset($_GET['limit']) ? $_GET['limit'] : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? $_GET['offset'] : 0;

$find = $_GET['find'] ?? '';
$type = $_GET['type'] ?? '';
$dateStart = $_GET['dateStart'] ?? '';
$dateEnd = $_GET['dateEnd'] ?? '';
$status = $_GET['status'] ?? '';
if (!empty($find)) {
    $conditions[] = "maPGG = :id OR tenPGG LIKE :name";
    $params[':id'] = $find;
    $params[':name'] = "%$find%";
}
if (!empty($type)) {
    $conditions[] = "loai = :type";
    $params[':type'] = $type;
}
if (!empty($dateStart)) {
    $conditions[] = "ngayBatDau >= :dateStart";
    $params[':dateStart'] = $dateStart;
}
if (!empty($dateEnd)) {
    $conditions[] = "ngayKetThuc <= :dateEnd";
    $params[':dateEnd'] = $dateEnd;
}
if (!empty($status)) {
    $conditions[] = "trangThai = :status";
    $params[':status'] = $status;
}

$db = new app_libs_DBConnection();
$result = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

if (empty($result)) {
    echo json_encode(["data" => [], "error" => "Không có PGG nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONDiscount($result, $pageCount);

?>