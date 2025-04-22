<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONBook($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy pn!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maPhieuNhap'] ?? '',
            "dateCreate" => explode(" ", $filter['ngayTaoPhieu'])[0],
            "employeeUserName" => $filter['taiKhoanNhanVien'],
            "inputTotal" => $filter['tongTienNhap'],
            "suplierId" => $filter['maNCC'],
            "suplierName" => $filter['tenNCC'],
            "status" => $filter['trangThai'] ?? '',
            "updatedAt" => $filter['ngayCapNhat'] ?? ''
        ];
    }, is_array($filters[0]) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(
        ["inputTicketList" => $response, "pageCount" => $pageCount],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );
        exit();
}



$inputTicketId = isset($_GET['inputTicketId']) ? trim($_GET['inputTicketId']) : '';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maPhieuNhap';
$inputTicketStatus = isset($_GET['inputTicketStatus']) ? trim($_GET['inputTicketStatus']) : '';
$startDate = isset($_GET['startDate']) ? trim($_GET['startDate']) : '';
$endDate = isset($_GET['endDate']) ? trim($_GET['endDate']) : '';


$columns = ['phieuNhap.maPhieuNhap', 'phieuNhap.ngayTaoPhieu', 'phieuNhap.taiKhoanNhanVien', 'phieuNhap.maNCC', 'nhaCungCap.tenNCC', 'phieuNhap.tongTienNhap', 'phieuNhap.trangThai', 'phieuNhap.ngayCapNhat'];
//  các bảng join
$tables = ['phieuNhap', 'nhaCungCap'];
//  diều kiện jôin
$joins = [
    'phieuNhap.maNCC = nhaCungCap.maNCC',
    
];


$conditions = [];
$params = [];

if (!empty($inputTicketId)) {
    $conditions[] = "(phieuNhap.maPhieuNhap LIKE :name)";
    $params[':name'] = "%$inputTicketId%";  
}

if (!empty($inputTicketStatus)) {
    $conditions[] = "(phieuNhap.trangThai = :status)";
    $params[':status'] = $inputTicketStatus;  
}

if (!empty($startDate)) {
    $conditions[] = "(phieuNhap.ngayTaoPhieu >= :startDate)";
    $params[':startDate'] = $startDate;  
}

if (!empty($endDate)) {
    $conditions[] = "(phieuNhap.ngayTaoPhieu <= :endDate)";
    $params[':endDate'] = $endDate;  
}



$limit = isset($_GET['limit']) ? trim($_GET['limit']) : '10';
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';


$db = new app_libs_DBConnection();
$result = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2)/$limit);

// print_r($result);
if (empty($result)) {
    echo json_encode(["error" => "Không có np nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONBook($result, $pageCount);

?>