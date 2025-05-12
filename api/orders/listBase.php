<?php
ini_set('display_errors', 0);
error_reporting(0);

require_once __DIR__ . '../../../app/config.php';


$raw = file_get_contents("php://input");
$data = json_decode($raw, true); 



function returnJSONOrder($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy đơn hàng!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maDonHang'],
            "createAt" => $filter['ngayTaoDon'],
            "employeeId" => $filter['maNhanVien'],
            "customerId" => $filter['maKhachHang'],
            "customerFullname" => $filter['hvtNguoiNhan'],
            "customerPhone" => $filter['sdtNguoiNhan'],
            "customerAddress" => $filter['dcNguoiNhan'],
            "customerEmail" => $filter['emailKhachHang'],
            "discountId" => $filter['maKhuyenMai'],
            "payId" => $filter['maPhuongThuc'],
            "payName" => $filter['tenPhuongThuc'],
            "payStatus" => $filter['trangThaiThanhToan'],
            "total" => $filter['tongTienThu'],
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
    'donHang.maDonHang', 'donHang.ngayTaoDon', 'donHang.maNhanVien', 'donHang.maKhachHang', 
    'donHang.hvtNguoiNhan', 'donHang.sdtNguoiNhan', 'donHang.dcNguoiNhan', 
    'donHang.maKhuyenMai', 'donHang.maPhuongThuc', 'donHang.trangThaiThanhToan',
    'donHang.tongTienThu', 'donHang.ngayCapNhat', 'donHang.trangThai',
    'phuongThucThanhToan.tenPhuongThuc',
    'khachHang.email as emailKhachHang',
];
$tables = ['donHang', 'phuongThucThanhToan', 'nguoiDung as khachHang'];
$joins = [
    'donHang.maPhuongThuc = phuongThucThanhToan.maPhuongThuc',
    'donHang.maKhachHang = khachHang.maNguoiDung',
];
$conditions = [];
$params = [];
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';

$id = isset($_GET['id']) ? trim($_GET['id']) : '';
$createStart = isset($_GET['createStart']) ? trim($_GET['createStart']) : '';
$createEnd = isset($_GET['createEnd']) ? trim($_GET['createEnd']) : '';
$employeeId = isset($_GET['employeeId']) ? trim($_GET['employeeId']) : '';
$customerId = isset($_GET['customerId']) ? trim($_GET['customerId']) : '';
$discountId = isset($_GET['discountId']) ? trim($_GET['discountId']) : '';
$payId = isset($_GET['payId']) ? trim($_GET['payId']) : '';
$addressToShip = isset($_GET['addressToShip']) ? trim($_GET['addressToShip']) : '';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maDonHang';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';

if (!empty($id)) {
    $conditions[] = "(donHang.maDonHang = :id)";
    $params[':id'] = $id;  
}
if (!empty($createStart)) {
    $conditions[] = "(donHang.ngayTaoDon >= :createStart)";
    $params[':createStart'] = $createStart;  
}
if (!empty($createEnd)) {
    $conditions[] = "(donHang.ngayTaoDon <= :createEnd)";
    $params[':createEnd'] = $createEnd;  
}
if (!empty($employeeId)) {
    $conditions[] = "(donHang.maNhanVien = :employeeId)";
    $params[':employeeId'] = $employeeId;  
}
if (!empty($customerId)) {
    $conditions[] = "(donHang.maKhachHang = :customerId)";
    $params[':customerId'] = $customerId;  
}
if (!empty($discountId)) {
    $conditions[] = "(donHang.maKhuyenMai = :discountId)";
    $params[':discountId'] = $discountId;  
}
if (!empty($payId)) {
    $conditions[] = "(donHang.maPhuongThuc = :payId)";
    $params[':payId'] = $payId;  
}
if (!empty($addressToShip)) {
    $conditions[] = "(donHang.diaChiGiao like :addressToShip)";
    $params[':addressToShip'] = "%$addressToShip%";  
}
if (!empty($status)) {
    $conditions[] = "(donHang.trangThai = :status)";
    $params[':status'] = $status;  
}

$db = new app_libs_DBConnection();
$result = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

if (empty($result)) {
    echo json_encode(["error" => "Không có đơn hàng nào phù hợp!", "pageCount" => 0]);
    exit();
}


returnJSONOrder($result, $pageCount);

?>