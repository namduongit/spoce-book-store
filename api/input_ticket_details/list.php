<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONInputTicket($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy chi tiết phiếu nhập!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "inputTicketId" => $filter['maPhieuNhap'],
            "bookId" => $filter['maSach'],
            "bookName" => $filter['tenSach'],
            "base" => $filter['giaTran'],
            "price" => $filter['giaNhap'],
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
    'chiTietPhieuNhap.maPhieuNhap', 'chiTietPhieuNhap.maSach', 'chiTietPhieuNhap.giaNhap', 'chiTietPhieuNhap.soLuong',
    'sach.tenSach', 'sach.giaTran'
];
$tables = ['chiTietPhieuNhap', 'sach'];
$joins = [
    'chiTietPhieuNhap.maSach = sach.maSach'
];
$conditions = [];
$params = [];
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maPhieuNhap';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';

$inputTicketId = isset($_GET['inputTicketId']) ? trim($_GET['inputTicketId']) : '';
$bookId = isset($_GET['bookId']) ? trim($_GET['bookId']) : '';
if (!empty($inputTicketId)) {
    $conditions[] = "(chiTietPhieuNhap.maPhieuNhap = :inputTicketId)";
    $params[':inputTicketId'] = $inputTicketId;  
}
if (!empty($bookId)) {
    $conditions[] = "(chiTietPhieuNhap.maSach = :bookId)";
    $params[':bookId'] = $bookId;  
}

$db = new app_libs_DBConnection();
$result = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

if (empty($result)) {
    echo json_encode(["error" => "Không có chi tiết phiếu nhập nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONInputTicket($result, $pageCount);

?>