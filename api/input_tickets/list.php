<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONInputTicket($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy phiếu nhập!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maPhieuNhap'],
            "createAt" => $filter['ngayTaoPhieu'],
            "supplierId" => $filter['maNCC'],
            "supplierName" => $filter['tenNCC'],
            "supplierPhone" => $filter['sodtNCC'],
            "supplierEmail" => $filter['emailNCC'],
            "employeeId" => $filter['maNhanVien'],
            "employeeName" => $filter['tenNV'],
            "employeePhone" => $filter['sodtNV'],
            "employeeEmail" => $filter['emailNV'],
            "totalPrice" => $filter['tongTienNhap'],
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

$columns = [
    'phieuNhap.maPhieuNhap', 'phieuNhap.ngayTaoPhieu', 'phieuNhap.maNCC', 'phieuNhap.maNhanVien', 
    'phieuNhap.tongTienNhap', 'phieuNhap.ngayCapNhat', 'phieuNhap.trangThai', 
    'nguoiDung.hoVaTen AS tenNV', 'nguoiDung.soDT AS sodtNV', 'nguoiDung.email AS emailNV',
    'nhaCungCap.tenNCC', 'nhaCungCap.soDT AS sodtNCC', 'nhaCungCap.email AS emailNCC'
];
$tables = ['phieuNhap', 'nguoiDung', 'nhaCungCap'];
$joins = [
    'phieuNhap.maNhanVien = nguoiDung.maNguoiDung',
    'phieuNhap.maNCC = nhaCungCap.maNCC'
];
$conditions = [];
$params = [];
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maPhieuNhap';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';

$id = isset($_GET['id']) ? trim($_GET['id']) : '';
$employeeId = isset($_GET['employeeId']) ? trim($_GET['employeeId']) : '';
$supplierId = isset($_GET['supplierId']) ? trim($_GET['supplierId']) : '';
$createStart = isset($_GET['createStart']) ? trim($_GET['createStart']) : '';
$createEnd = isset($_GET['createEnd']) ? trim($_GET['createEnd']) : '';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
if (!empty($id)) {
    $conditions[] = "(phieuNhap.maPhieuNhap = :id)";
    $params[':id'] = $id;  
}
if (!empty($employeeId)) {
    $conditions[] = "(phieuNhap.maNhanVien = :employeeId)";
    $params[':employeeId'] = $employeeId;  
}
if (!empty($supplierId)) {
    $conditions[] = "(phieuNhap.maNCC = :supplierId)";
    $params[':supplierId'] = $supplierId;  
}
if (!empty($createStart)) {
    $conditions[] = "(phieuNhap.ngayTaoPhieu >= :createStart)";
    $params[':createStart'] = $createStart;  
}
if (!empty($createEnd)) {
    $conditions[] = "(phieuNhap.ngayTaoPhieu <= :createEnd)";
    $params[':createEnd'] = $createEnd;  
}
if (!empty($status)) {
    $conditions[] = "(phieuNhap.trangThai = :status)";
    $params[':status'] = $status;  
}

$db = new app_libs_DBConnection();
$result = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

if (empty($result)) {
    echo json_encode(["error" => "Không có phiếu nhập nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONInputTicket($result, $pageCount);

?>