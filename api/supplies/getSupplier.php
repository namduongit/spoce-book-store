<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONSupplier($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy nhà cung cấp!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maNCC'],
            "name" => $filter['tenNCC'],
            "phone" => $filter['soDT'] ?? null,
            "email" => $filter['email'] ?? null,
            "address" => $filter['diaChi'] ?? null,
            "status" => $filter['trangThai'],
            "updatedAt" => $filter['ngayCapNhat'] ?? null
        ];
    }, is_array($filters[0]) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(
        ["supplierList" => $response, "pageCount" => $pageCount],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );
    exit();
}

$id_or_Name = isset($_GET['id_or_Name']) ? trim($_GET['id_or_Name']) : '';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maNCC';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
$limit = isset($_GET['limit']) ? (int)trim($_GET['limit']) : 10;
$offset = isset($_GET['offset']) ? (int)trim($_GET['offset']) : 0;

$columns = [
    'nhaCungCap.maNCC AS maNCC',
    'nhaCungCap.tenNCC AS tenNCC',
    'nhaCungCap.soDT AS soDT',
    'nhaCungCap.email AS email',
    'nhaCungCap.diaChi AS diaChi',
    'nhaCungCap.trangThai AS trangThai',
    'nhaCungCap.ngayCapNhat AS ngayCapNhat'
];

$tables = ['nhaCungCap'];
$joins = [];  // Không cần JOIN nếu chỉ có một bảng

$conditions = [];
$params = [];

if (!empty($id_or_Name)) {
    $conditions[] = "(nhaCungCap.tenNCC LIKE :name OR nhaCungCap.maNCC LIKE :name)";
    $params[':name'] = "%$id_or_Name%";  
}

if (!empty($status)) {
    $conditions[] = "nhaCungCap.trangThai = :status";
    $params[':status'] = $status;
}

$db = new app_libs_DBConnection();
$result = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

if (empty($result)) {
    echo json_encode(["supplierList" => [], "error" => "Không có nhà cung cấp nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONSupplier($result, $pageCount);
?>
