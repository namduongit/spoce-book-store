<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $donHang = new app_models_DonHang();

    // Lấy các tham số từ query string
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $status = isset($_GET['status']) ? $_GET['status'] : '';
    $maDonHang = isset($_GET['maDonHang']) ? $_GET['maDonHang'] : '';
    $maKhachHang = isset($_GET['maKhachHang']) ? $_GET['maKhachHang'] : '';
    $ngayBatDau = isset($_GET['ngayBatDau']) ? $_GET['ngayBatDau'] : '';
    $ngayKetThuc = isset($_GET['ngayKetThuc']) ? $_GET['ngayKetThuc'] : '';
    // Lấy danh sách đơn hàng với các bộ lọc
    $result = $donHang->getOrderByFilters(
        $maDonHang,
        $maKhachHang,
        $status,
        $ngayBatDau,
        $ngayKetThuc,
        $limit,
        $page
    );

    // Bổ sung địa chỉ đầy đủ
    foreach ($result as &$order) {
        if (isset($order['maDiaChi'])) {
            $order['diaChiDayDu'] = $donHang->getDiaChiDayDu($order['maDiaChi']);
        } else {
            $order['diaChiDayDu'] = '';
        }
    }
    unset($order);

    // Lấy tổng số đơn hàng theo bộ lọc
    $total = $donHang->countOrders(
        $maKhachHang,
        $status,
        $ngayBatDau,
        $ngayKetThuc
    );

    $result = [
        'total' => $total,
        'list' => $result,
        'page' => $page,
        'limit' => $limit,
        'total_pages' => ceil($total / $limit)
    ];


    echo json_encode([
        'status' => 'success',
        'data' => $result
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
