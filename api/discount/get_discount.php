<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $maGiamGia = isset($_GET['maGiamGia']) ? $_GET['maGiamGia'] : '';
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $tenPGG = isset($_GET['tenPGG']) ? $_GET['tenPGG'] : '';
    $trangThai = isset($_GET['trangThai']) ? $_GET['trangThai'] : '';
    $maKhachHang = isset($_GET['maKhachHang']) ? $_GET['maKhachHang'] : '';
    $maSanPham = isset($_GET['maSanPham']) ? $_GET['maSanPham'] : '';
    $ngayBatDau = isset($_GET['ngayBatDau']) ? $_GET['ngayBatDau'] : '';
    $ngayKetThuc = isset($_GET['ngayKetThuc']) ? $_GET['ngayKetThuc'] : '';

    $phieuGiamGia = new app_models_PhieuGiamGia();

    // Lấy danh sách phiếu giảm giá với các bộ lọc
    $result = $phieuGiamGia->getDiscountByFilter(
        $maGiamGia,
        $maKhachHang,
        $maSanPham,
        $trangThai,
        $ngayBatDau,
        $ngayKetThuc,
        $limit,
        $page
    );

    // Lấy tổng số phiếu giảm giá theo bộ lọc
    $params = [];
    if (!empty($maKhachHang)) $params[] = $maKhachHang;
    if (!empty($trangThai)) $params[] = $trangThai;
    if (!empty($ngayBatDau)) $params[] = $ngayBatDau;
    if (!empty($ngayKetThuc)) $params[] = $ngayKetThuc;

    $total = $phieuGiamGia->countDiscounts(
        $maKhachHang,
        $trangThai,
        $ngayBatDau,
        $ngayKetThuc
    );

    echo json_encode([
        'status' => 'success',
        'data' => [
            'list' => $result,
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'total_pages' => ceil($total / $limit)
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
