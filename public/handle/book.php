<?php

require_once __DIR__ . '../../../app/config.php';


header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$book_model = new app_models_Sach();


$min_price = isset($_GET['minPrice']) ? $_GET['minPrice'] : '';
$max_price = isset($_GET['maxPrice']) ? $_GET['maxPrice'] : '';

$order_by = isset($_GET['order']) ? $_GET['order'] : '';

$category = isset($_GET['category']) ? $_GET['category'] : '';

$auth = isset($_GET['author']) ? $_GET['author'] : '';




$response = [];


$books = $book_model->getBookByPrice($min_price, $max_price);

if (!$books) {
    echo json_encode(["error" => "Không tìm thấy sách!"]);
    exit();
}

foreach ($books as $book) {
    $response[] = [
        "id" => $book['maSach'],
        "name" => $book['tenSach'],
        "numberOfPages" => $book['soTrang'],
        "size" => $book['kichThuoc'],
        "description" => $book['moTa'],
        "authorId" => $book['maTacGia'],
        "genreId" => $book['maTheLoai'],
        "coverTypeId" => $book['maLoaiBia'],
        "publisherId" => $book['maNXB'],
        "publishYear" => $book['namXuatBan'],
        "originalPrice" => $book['giaTran'],
        "sellingPrice" => $book['giaBan'],
        "image" => $book['hinhAnh'],
        "status" => $book['trangThai'],
        "updatedAt" => $book['ngayCapNhat']
    ];
}

echo json_encode($response);

?>