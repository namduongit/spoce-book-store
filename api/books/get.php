<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONBook($books) {
    if (!$books) {
        echo json_encode(["error" => "Không tìm thấy sách!"]);
        exit();
    }

    // Nếu chỉ có một cuốn sách, đảm bảo nó là mảng chứa một phần tử
    if (!isset($books[0])) {
        $books = [$books];
    }

    $response = [];
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
}


$book_model = new app_models_Sach();

// Lấy tham số từ query string
$bookId = isset($_GET['bookId']) ? $_GET['bookId'] : '';

$bookName = isset($_GET['bookName']) ? $_GET['bookName'] : '';

$min_price = isset($_GET['minPrice']) ? $_GET['minPrice'] : '';
$max_price = isset($_GET['maxPrice']) ? $_GET['maxPrice'] : '';

$order_by = isset($_GET['orderBy']) ? $_GET['orderBy'] : '';

$categoryId = isset($_GET['cateId']) ? $_GET['cateId'] : '';

$authorId = isset($_GET['authorId']) ? $_GET['authorId'] : '';

$status = isset($_GET['bookStatus']) ? $_GET['bookStatus'] : '';


// Gọi phương thức lấy sách theo điều kiện
$books = $book_model->getBookByFilters($min_price, $max_price, $order_by, $categoryId, $authorId, $bookId, $status, $bookName);
// $books = $book_model->getAllBooks();

// Trả về kết quả dưới dạng JSON
returnJSONBook($books);
