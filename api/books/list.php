<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONBook($filters, $pageCount)
{
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy sách!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maSach'] ?? '',
            "name" => $filter['tenSach'] ?? '',
            "pages" => $filter['soTrang'] ?? 0,
            "size" => $filter['kichThuoc'] ?? '',
            "description" => $filter['moTa'] ?? '',
            "publishYear" => $filter['namXuatBan'] ?? '',
            "basePrice" => $filter['giaTran'] ?? 0,
            "sellPrice" => $filter['giaBan'] ?? 0,
            "image" => $filter['hinhAnh'] ?? '',
            "inventory" => $filter['soLuong'] ?? '',
            "status" => $filter['trangThai'] ?? '',
            "updatedAt" => $filter['ngayCapNhat'] ?? '',
            "authorId" => $filter['maTacGia'] ?? '',
            "authorName" => $filter['tenTacGia'] ?? '',
            "categoryId" => $filter['sach.maTheLoai'] ?? '',
            "categoryName" => $filter['tenTheLoai'] ?? '',
            "coverId" => $filter['maLoaiBia'] ?? '',
            "coverName" => $filter['tenLoaiBia'] ?? '',
            "publisherId" => $filter['maNXB'] ?? '',
            "publisherName" => $filter['tenNXB'] ?? ''
        ];
    }, is_array($filters[0]) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(
        ["data" => $response, "pageCount" => $pageCount],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );
    exit();
}

$columns = ['sach.maSach', 'sach.tenSach', 'sach.soTrang', 'sach.kichThuoc', 'sach.moTa', 'sach.maTacGia',
    'sach.maTheLoai', 'sach.maLoaiBia', 'sach.maNXB', 'sach.namXuatBan', 'sach.giaTran', 'sach.giaBan',
    'sach.hinhAnh', 'sach.soLuong', 'sach.ngayCapNhat', 'sach.trangThai',
    'tacGia.tenTacGia', 'nhaXuatBan.tenNXB', 'theLoai.tenTheLoai', 'loaiBia.tenLoaiBia'];
$tables = ['sach', 'tacGia', 'nhaXuatBan', 'theLoai', 'loaiBia'];
$joins = [
    'sach.maTacGia = tacGia.maTacGia',
    'sach.maNXB = nhaXuatBan.maNXB',
    'sach.maTheLoai = theLoai.maTheLoai',
    'sach.maLoaiBia = loaiBia.maLoaiBia'
];
$conditions = [];
$params = [];

$limit = isset($_GET['limit']) ? trim($_GET['limit']) : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';

$find = isset($_GET['find']) ? trim($_GET['find']) : '';
$author = isset($_GET['author']) ? trim($_GET['author']) : '';
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$cover = isset($_GET['cover']) ? trim($_GET['cover']) : '';
$publisher = isset($_GET['publisher']) ? trim($_GET['publisher']) : '';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maSach';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
if (!empty($find)) {
    $conditions[] = "(sach.maSach = :id or sach.tenSach like :name)";
    $params[':id'] = $find;
    $params[':name'] = "%$find%";
}
if (!empty($author)) {
    $conditions[] = "tacGia.tenTacGia like :author";
    $params[':author'] = "%$author%";
}
if (!empty($category)) {
    $conditions[] = "theLoai.tenTheLoai like :category";
    $params[':category'] = "%$category%";
}
if (!empty($publisher)) {
    $conditions[] = "nhaXuatBan.tenNXB like :publisher";
    $params[':publisher'] = "%$publisher%";
}
if (!empty($cover)) {
    $conditions[] = "loaiBia.tenLoaiBia like :cover";
    $params[':cover'] = "%$cover%";
}
if (!empty($status)) {
    $conditions[] = "sach.trangThai = :status";
    $params[':status'] = $status;
}


$db = new app_libs_DBConnection();
$result = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

if (empty($result)) {
    echo json_encode(["data" => [], "error" => "Không có sách nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONBook($result, $pageCount);