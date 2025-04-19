<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONOrder($filters, $pageCount)
{
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy đơn hàng!"]);
        exit();
    }
    $response = array_map(function ($filter) {
        return [
            "maDonHang" => $filter['maDonHang'] ?? '',
            "maKhachHang" => $filter['maKhachHang'] ?? '',
            "status" => $filter['trangThai'] ?? '',
            "ngayTaoDon" => $filter['ngayTaoDon'] ?? '',
            "maKhuyenMai" => $filter['maKhuyenMai'] ?? '',
            "tongTien" => $filter['tongTienThu'] ?? 0,
            "maNhanVien" => $filter['maNhanVien'] ?? '',
            "diaChiGiao" => $filter['diaChiGiao'] ?? '',
            "ngayCapNhat" => $filter['ngayCapNhat'] ?? '',
            "maPhuongThuc" => $filter['maPhuongThuc'] ?? '',
            "trangThaiThanhToan" => $filter['trangThaiThanhToan'] ?? '',
        ];
    }, (is_array($filters) && isset($filters[0])) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(
        ["orderList" => $response, "pageCount" => $pageCount],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );
    exit();
}

$id = isset($_GET['id']) ? trim($_GET['id']) : '';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maDonHang';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
$city = isset($_GET['city']) ? trim($_GET['city']) : '';
$district = isset($_GET['district']) ? trim($_GET['district']) : '';
$ngayTaoDon = isset($_GET['ngayTaoDon']) ? trim($_GET['ngayTaoDon']) : '';
$ngayCapNhat = isset($_GET['ngayCapNhat']) ? trim($_GET['ngayCapNhat']) : '';
$limit = isset($_GET['limit']) ? (int)trim($_GET['limit']) : 5;
$offset = isset($_GET['offset']) ? (int)trim($_GET['offset']) : 0;

$db = new app_libs_DBConnection();

$columns = [
    'donHang.maDonHang',
    'donHang.trangThai',
    'donHang.ngayTaoDon',
    'khachHang.maNguoiDung',
    'phieuGiamGia.maPGG',
    'nhanVien.maNguoiDung',
    'donHang.tongTienThu',
    'donHang.diaChiGiao',
    'donHang.trangThaiThanhToan',
    'phuongThucThanhToan.maPhuongThuc',
    'donHang.ngayCapNhat'
];

$tables = [
    'donHang',
    'nguoiDung AS khachHang',
    'nguoiDung AS nhanVien',
    'phieuGiamGia',
    'phuongThucThanhToan'
];
$joins = [
    'donHang.maKhachHang = khachHang.maNguoiDung',
    'donHang.maNhanVien = nhanVien.maNguoiDung',
    'donHang.maKhuyenMai = phieuGiamGia.maPGG',
    'donHang.maPhuongThuc = phuongThucThanhToan.maPhuongThuc'
];
$conditions = [];
$params = [];

if (!empty($id)) {
    $conditions[] = "donHang.maDonHang LIKE :id";
    $params[':id'] = "%$id%";
}
if (!empty($status)) {
    $conditions[] = "donHang.trangThai = :status";
    $params[':status'] = $status;
}
if (!empty($city)) {
    $conditions[] = "diaChiNguoiDung.tinhThanh = :city";
    $params[':city'] = $city;
}
if (!empty($district)) {
    $conditions[] = "diaChiNguoiDung.quanHuyen = :district";
    $params[':district'] = $district;
}
if (!empty($ngayTaoDon)) {
    $conditions[] = "donHang.ngayTaoDon = :ngayTaoDon";
    $params[':ngayTaoDon'] = $ngayTaoDon;
}
if (!empty($ngayCapNhat)) {
    $conditions[] = "donHang.ngayCapNhat = :ngayCapNhat";
    $params[':ngayCapNhat'] = $ngayCapNhat;
}
if (empty($conditions)) {
    $conditions = null;
}

$result = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / ($limit == null ? PHP_INT_MAX : $limit));

if (empty($result)) {
    echo json_encode(["orderList" => [], "error" => "Không có đơn hàng nào phù hợp!", "pageCount" => 0]);
    exit();
}


echo "<pre>";
print_r($result);
echo "</pre>";
exit();
returnJSONOrder($result, $pageCount);
