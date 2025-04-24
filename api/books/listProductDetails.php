<?php
require_once __DIR__ . '../../../app/config.php';

/**
 * Hàm trả về dữ liệu sách dưới dạng JSON
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$raw = file_get_contents("php://input");
$payload = json_decode($raw, true);


if (!isset($payload)) {
    echo json_encode([
        "success" => false,
        "message" => "Có lỗi xảy ra khi lấy giỏ hàng, vui lòng coi lại",
        "data" => []
    ]);
    exit();
}

$data = $payload['data']['cart'];

if (isset($data)) {

    $columns = [
        'sach.maSach',
        'sach.tenSach',
        'sach.soTrang',
        'sach.kichThuoc',
        'sach.moTa',
        'sach.namXuatBan',
        'sach.giaBan',
        'sach.hinhAnh',
        'sach.soLuong',
        'sach.ngayCapNhat',
        'sach.trangThai',
        'tacGia.tenTacGia',
        'nhaXuatBan.tenNXB',
        'theLoai.tenTheLoai',
        'loaiBia.tenLoaiBia'
    ];

    $tables = ['sach', 'tacGia', 'nhaXuatBan', 'theLoai', 'loaiBia'];
    $joins = [
        'sach.maTacGia = tacGia.maTacGia',
        'sach.maNXB = nhaXuatBan.maNXB',
        'sach.maTheLoai = theLoai.maTheLoai',
        'sach.maLoaiBia = loaiBia.maLoaiBia'
    ];

    $conditions = [];
    $params = [];
    $db = new app_libs_DBConnection();

    $dataDetails = [];
    
    foreach($data as $item) {
        $conditions[] = "(sach.maSach = :id)";
        $params[':id'] = $item['bookId'];
        $dataDetails[] = [
            "details" => $db->joinTables($columns, $tables, $joins, $conditions, null, null, null, null, $params),
            "quantity" => $item['quantity']
        ];
    }
    echo json_encode([
        "success" => true,
        "data" => $dataDetails
    ]);
    exit();
}
