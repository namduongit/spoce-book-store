<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONOrder($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy chi tiết đơn hàng!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "orderId" => $filter['maDonHang'],
            "bookId" => $filter['maSach'],
            "bookName" => $filter['tenSach'],
            "price" => $filter['tienThu'],
            "quantity" => $filter['soLuong']
        ];
    }, is_array($filters[0]) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(
        ["data" => $response, "pageCount" => $pageCount],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );
        exit();
}

$columns = [
    'chiTietDonHang.maDonHang', 'chiTietDonHang.maSach', 'chiTietDonHang.tienThu', 
    'chiTietDonHang.soLuong', 'sach.tenSach'
];
$tables = ['chiTietDonHang', 'sach'];
$joins = [
    'chiTietDonHang.maSach = sach.maSach'
];
$conditions = [];
$params = [];
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maDonHang';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';

$orderId = isset($_GET['orderId']) ? trim($_GET['orderId']) : '';
$bookId = isset($_GET['bookId']) ? trim($_GET['bookId']) : '';
if (!empty($orderId)) {
    $conditions[] = "(chiTietDonHang.maDonHang = :orderId)";
    $params[':orderId'] = $orderId;  
}
if (!empty($bookId)) {
    $conditions[] = "(chiTietDonHang.maSach = :bookId)";
    $params[':bookId'] = $bookId;  
}

$db = new app_libs_DBConnection();  
$result = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

if (empty($result)) {
    echo json_encode(["error" => "Không có chi tiết đơn hàng nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONOrder($result, $pageCount);

?>