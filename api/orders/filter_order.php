<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONOrders($orders, $pageCount)
{
    // Nếu không có đơn hàng trả về
    if (!is_array($orders) || empty($orders)) {
        http_response_code(200);
        echo json_encode([
            "orderList" => [],
            "pageCount" => 0
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // Chuẩn hóa dữ liệu trả về
    $response = array_map(function ($order) {
        return [
            "orderId" => $order['maDonHang'] ?? '',
            "customerName" => $order['tenKhachHang'] ?? '',
            "status" => $order['trangThai'] ?? '',
            "createdAt" => $order['ngayTao'] ?? '',
            "totalPrice" => $order['tongTien'] ?? 0,
            "fullAddress" => $order['diachiDayDu'] ?? '',
        ];
    }, $orders);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        "orderList" => $response,
        "pageCount" => $pageCount
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Lấy tham số từ URL
$id = $_GET['id'] ?? '';
$orderType = $_GET['orderType'] ?? 'DESC';
$orderBy = $_GET['orderBy'] ?? 'donHang.maDonHang';
$status = $_GET['status'] ?? '';
$city = $_GET['tinh'] ?? '';
$district = $_GET['district'] ?? '';
$dateStart = $_GET['dateStart'] ?? '';
$dateEnd = $_GET['dateEnd'] ?? '';
$limit = $_GET['limit'] ?? PHP_INT_MAX;
$offset = $_GET['offset'] ?? 0;

// Cột cần lấy
$columns = [
    'donHang.*',
    'khachHang.tenKhachHang',
    'diaChi.diachiDayDu',
    'diaChi.tinhThanhPho',
    'diaChi.quanHuyen'
];

// Các bảng và điều kiện join
$tables = ['donHang', 'khachHang', 'diaChi'];
$joins = [
    'donHang.maKhachHang = khachHang.maKhachHang',
    'donHang.maDiaChi = diaChi.maDiaChi'
];

// Điều kiện WHERE
$conditions = [];
$params = [];

if (!empty($id)) {
    $conditions[] = 'donHang.maDonHang LIKE :id';
    $params[':id'] = "%$id%";
}

if (!empty($status)) {
    $conditions[] = 'donHang.trangThai = :status';
    $params[':status'] = $status;
}

if (!empty($city)) {
    $conditions[] = 'diaChi.tinhThanhPho = :city';
    $params[':city'] = $city;
}

if (!empty($district)) {
    $conditions[] = 'diaChi.quanHuyen = :district';
    $params[':district'] = $district;
}

if (!empty($dateStart)) {
    $conditions[] = 'donHang.ngayTao >= :dateStart';
    $params[':dateStart'] = $dateStart;
}

if (!empty($dateEnd)) {
    $conditions[] = 'donHang.ngayTao <= :dateEnd';
    $params[':dateEnd'] = $dateEnd;
}

// Gọi class kết nối DB
$db = new app_libs_DBConnection();

// Lấy dữ liệu đơn hàng theo phân trang
$result = $db->joinTables($columns, $tables, $joins, $conditions, $orderBy, $orderType, $limit, $offset, $params);

// Lấy toàn bộ để tính tổng số trang
$totalResult = $db->joinTables($columns, $tables, $joins, $conditions, $orderBy, $orderType, null, null, $params);
$pageCount = (is_array($totalResult) && count($totalResult) > 0)
    ? ceil(count($totalResult) / ($limit ?: 1))
    : 0;

// Trả dữ liệu JSON
returnJSONOrders($result, $pageCount);
