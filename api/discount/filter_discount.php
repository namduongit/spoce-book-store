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
            "maPGG" => $filter['maPGG'] ?? '',
            "tenPGG" => $filter['tenPGG'] ?? '',
            "type" => $filter['type'] ?? '',
            "phanTram" => $filter['phanTram'] ?? '',
            "toiThieu" => $filter['toiThieu'] ?? '',
            "toiDa" => $filter['toiDa'] ?? 0,
            "ngayBatDau" => $filter['ngayBatDau'] ?? '',
            "ngayKetThuc" => $filter['ngayKetThuc'] ?? '',
            "ngayCapNhat" => $filter['ngayCapNhat'] ?? '',
            "trangThai" => $filter['trangThai'] ?? '',
            "giaTriGiam" => $filter['giaTriGiam'] ?? 0
        ];
    }, (isset($filters[0])) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(["discountList" => $response, "pageCount" => $pageCount], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

$id = $_GET['id'] ?? '';
$discountType = $_GET['discountType'] ?? 'ASC';
$discountByColumn = $_GET['discountByColumn'] ?? 'maPGG';
$status = $_GET['status'] ?? '';
$ngayBatDau = $_GET['ngayBatDau'] ?? '';
$ngayKetThuc = $_GET['ngayKetThuc'] ?? '';
$category = $_GET['category'] ?? '';
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

$db = new app_libs_DBConnection();

$columns = ['*'];
$tables = ['phieuGiamGia'];
$joins = []; // không join bảng nào
$conditions = [];
$params = [];

if (!empty($id)) {
    $conditions[] = "maPGG LIKE :id OR tenPGG LIKE :id";
    $params[':id'] = "%$id%";
}
if (!empty($status)) {
    $conditions[] = "trangThai = :status";
    $params[':status'] = $status;
}
if (!empty($ngayBatDau)) {
    $conditions[] = "ngayBatDau >= :ngayBatDau";
    $params[':ngayBatDau'] = $ngayBatDau;
}
if (!empty($ngayKetThuc)) {
    $conditions[] = "ngayKetThuc <= :ngayKetThuc";
    $params[':ngayKetThuc'] = $ngayKetThuc;
}
if (!empty($category)) {
    $conditions[] = "type = :category";
    $params[':category'] = $category;
}


if (empty($conditions)) $conditions = null;

$result = $db->joinTables($columns, $tables, $joins, $conditions, $discountByColumn, $discountType, $limit, $offset, $params);
$result2 = $db->joinTables($columns, $tables, $joins, $conditions, $discountByColumn, $discountType, null, null, $params);
$pageCount = ceil(count($result2) / ($limit ?: 1));

returnJSONDiscount($result, $pageCount);