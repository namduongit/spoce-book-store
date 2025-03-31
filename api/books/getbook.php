<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONBook($filters) {
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy sách!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "id" => $filter['maSach'] ?? '',
            "name" => $filter['tenSach'] ?? '',
            "numberOfPages" => $filter['soTrang'] ?? 0,
            "quantity" => $filter['soLuong'] ?? 0,
            "size" => $filter['kichThuoc'] ?? '',
            "description" => $filter['moTa'] ?? '',
            "authorId" => $filter['maTacGia'] ?? '',
            "authorName" => $filter['tenTacGia'] ?? '',
            "genreId" => $filter['maTheLoai'] ?? '',
            "genreName" => $filter['tenTheLoai'] ?? '',
            "coverTypeId" => $filter['maLoaiBia'] ?? '',
            "coverTypeName" => $filter['tenLoaiBia'] ?? '',
            "publisherId" => $filter['maNXB'] ?? '',
            "publisherName" => $filter['tenNXB'] ?? '',
            "publishYear" => $filter['namXuatBan'] ?? '',
            "originalPrice" => $filter['giaTran'] ?? 0,
            "sellPrice" => $filter['giaBan'] ?? 0,
            "image" => $filter['hinhAnh'] ?? '',
            "status" => $filter['trangThai'] ?? '',
            "updatedAt" => $filter['ngayCapNhat'] ?? ''
        ];
    }, is_array($filters[0]) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

$tables = ['sach', 'tacGia', 'nhaXuatBan', 'theLoai', 'loaiBia'];
$joins = [
    'sach.maTacGia = tacGia.maTacGia',
    'sach.maNXB = nhaXuatBan.maNXB',
    'sach.maTheLoai = theLoai.maTheLoai',
    'sach.maLoaiBia = loaiBia.maLoaiBia'
];

$id_or_bookName = isset($_GET['id_or_bookName']) ? trim($_GET['id_or_bookName']) : '';
$bookId = $_GET['bookId'] ?? '';
$statusBook = isset($_GET['statusBook']) ? trim($_GET['statusBook']) : '';
$categoryBook = isset($_GET['categoryBook']) ? trim($_GET['categoryBook']) : '';
// echo $status;
$conditions = [];
$params = [];

if (!empty($id_or_bookName)) {
    $conditions[] = "(sach.tenSach LIKE :name or sach.maSach like :name)";
    $params[':name'] = "%$id_or_bookName%";  
}

if (!empty($bookId)) {
    $conditions[] = 'sach.maSach = :maSach';
    $params[':maSach'] = $bookId;
}

if (!empty($statusBook)) {
    $conditions[] = "sach.trangThai = :status";
    $params[':status'] = $statusBook;
}
if (!empty($categoryBook)) {
    $conditions[] = "theLoai.tenTheLoai = :category";
    $params[':category'] = $categoryBook;
}

// Kiểm soát biến orderBy để tránh SQL Injection
$validOrderColumns = ['tenSach', 'tenSach', 'namXuatBan', 'maSach', 'tenTheLoai'];
$orderByBook = isset($_GET['orderByBook']) && in_array($_GET['orderByBook'], $validOrderColumns) ? $_GET['orderByBook'] : 'sach.tenSach';

// Kiểm soát biến orderType (ASC/DESC)
$orderTypeBook = (isset($_GET['orderTypeBook']) && strtoupper($_GET['orderTypeBook']) === 'DESC') ? 'DESC' : 'ASC';

$limit = 10000;
$offset = 0;


$columns = ['sach.hinhAnh', 'sach.giaTran', 'sach.moTa', 'sach.kichThuoc', 'sach.giaBan', 'sach.maSach', 'sach.soTrang', 'sach.tenSach',  'theLoai.tenTheLoai', 'nhaXuatBan.tenNXB', 'tacGia.tenTacGia', 'sach.namXuatBan', 'sach.trangThai', 'loaiBia.tenLoaiBia'];

$db = new app_libs_DBConnection();
$result = $db->joinTables($tables, $joins, $conditions, $orderByBook, $orderTypeBook, $limit, $offset, $params, $columns);


// print_r($result);
if (empty($result)) {
    echo json_encode(["error" => "Không có sách nào phù hợp!"]);
    exit();
}

returnJSONBook($result);

?>
