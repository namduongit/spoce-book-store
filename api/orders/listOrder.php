<?php
ini_set('display_errors', 0);
error_reporting(0);

require_once __DIR__ . '../../../app/config.php';
$raw = file_get_contents("php://input");



function returnJSONOrder($filters, $pageCount) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy đơn hàng!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "customerFullname" => $filter['hoVaTen'],
            "idCustomer" =>$filter['maNguoiDung'],
            "soDonDaGiaoVaThanhToan" => $filter['soDonDaGiaoVaThanhToan'],
            "tongTienDaGiaoVaThanhToan" => $filter['tongTienDaGiaoVaThanhToan'],
            "soDonHuyVaChuaThanhToan" => $filter['soDonHuyVaChuaThanhToan'],
            "tongTienHuyVaChuaThanhToan" => $filter['tongTienHuyVaChuaThanhToan']
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
    'kh.maNguoiDung', 'kh.hoVaTen', 
    "COUNT(CASE WHEN dh.trangThai = 'Đã giao hàng' AND dh.trangThaiThanhToan = 'Đã thanh toán' THEN 1 END) AS soDonDaGiaoVaThanhToan", 
    "SUM(CASE WHEN dh.trangThai = 'Đã giao hàng' AND dh.trangThaiThanhToan = 'Đã thanh toán' THEN dh.tongTienThu ELSE 0 END) AS tongTienDaGiaoVaThanhToan",
    "COUNT(CASE WHEN dh.trangThai = 'Đã hủy đơn' AND dh.trangThaiThanhToan = 'Chưa thanh toán' THEN 1 END) AS soDonHuyVaChuaThanhToan",
    "SUM(CASE WHEN dh.trangThai = 'Đã hủy đơn' AND dh.trangThaiThanhToan = 'Chưa thanh toán' THEN dh.tongTienThu ELSE 0 END) AS tongTienHuyVaChuaThanhToan"
];
$tables = ['donHang dh' ,'nguoiDung kh'];
$joins = [
    'dh.maKhachHang = kh.maNguoiDung GROUP BY kh.maNguoiDung, kh.hoVaTen',
];
$conditions = [];
$params = [];
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';

$id = isset($_GET['id']) ? trim($_GET['id']) : '';
$createStart = isset($_GET['createStart']) ? trim($_GET['createStart']) : '';
$createEnd = isset($_GET['createEnd']) ? trim($_GET['createEnd']) : '';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maNguoiDung';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';

if (!empty($id)) {
    $conditions[] = "(donHang.maKhachHang = :id)";
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