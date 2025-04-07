<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONBook($filters, $pageCount) {
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
    echo json_encode(
        ["bookList" => $response, "pageCount" => $pageCount],
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );
        exit();
}

$id_or_bookName = isset($_GET['id_or_bookName']) ? trim($_GET['id_or_bookName']) : '';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maSach';
$status = isset($_GET['status']) ? trim($_GET['status']) : '';
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';



$columns = ['sach.hinhAnh', 'sach.giaTran', 'sach.moTa', 'sach.kichThuoc', 'sach.giaBan', 'sach.maSach', 'sach.soTrang', 'sach.tenSach',  'theLoai.tenTheLoai', 'nhaXuatBan.tenNXB', 'tacGia.tenTacGia', 'sach.namXuatBan', 'sach.trangThai', 'loaiBia.tenLoaiBia'];

$tables = ['sach', 'tacGia', 'nhaXuatBan', 'theLoai', 'loaiBia'];

$joins = [
    'sach.maTacGia = tacGia.maTacGia',
    'sach.maNXB = nhaXuatBan.maNXB',
    'sach.maTheLoai = theLoai.maTheLoai',
    'sach.maLoaiBia = loaiBia.maLoaiBia'
];    


$conditions = [];
$params = [];


if (!empty($id_or_bookName)) {
    $conditions[] = "(sach.tenSach LIKE :name or sach.maSach like :name)";
    $params[':name'] = "%$id_or_bookName%";  
}    

if (!empty($status)) {
    $conditions[] = "sach.trangThai = :status";
    $params[':status'] = $status;
}    
if (!empty($category)) {
    $conditions[] = "theLoai.tenTheLoai = :category";
    $params[':category'] = $category;
}    



$db = new app_libs_DBConnection();
$result = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables( $columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2)/($limit== null? PHP_INT_MAX : $limit));

// print_r($result);
if (empty($result)) {
    echo json_encode(["bookList" => [], "error" => "Không có sách nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONBook($result, $pageCount);


?>



