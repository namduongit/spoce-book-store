<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Phân trang mặc định là 10
$pageSize = isset($_GET['pageSize']) ? (int)$_GET['pageSize'] : 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

function returnJSONBook($books)
{
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
    return $response;
}

$book_model = new app_models_Sach();


$bookId = isset($_GET['bookID']) ? $_GET['bookID'] : '';
$bookName = isset($_GET['bookName']) ? trim($_GET['bookName']) : '';

$min_price = isset($_GET['minPrice']) ? $_GET['minPrice'] : 0;
$max_price = isset($_GET['maxPrice']) ? $_GET['maxPrice'] : null;
$order_by = isset($_GET['orderBy']) ? trim($_GET['orderBy']) : '';
$categoryId = isset($_GET['cateId']) ? $_GET['cateId'] : '';
$status = isset($_GET['bookStatus']) ? $_GET['bookStatus'] : '';
$publishYear = isset($_GET['publishYear']) ? $_GET['publishYear'] : '';

$authorId = isset($_GET['authorId']) ? $_GET['authorId'] : [];
if (!is_array($authorId)) {
    $authorId = explode(',', $authorId);
}

$coverType = isset($_GET['coverType']) ? $_GET['coverType'] : [];
if (!is_array($coverType)) {
    $coverType = explode(',', $coverType);
}

$publisher = isset($_GET['publisherId']) ? $_GET['publisherId'] : [];
if (!is_array($publisher)) {
    $publisher = explode(',', $publisher);
}

$totalBooks = $book_model->countBooks(
    $min_price,
    $max_price,
    $order_by,
    $categoryId,
    $authorId,
    $bookId,
    $status,
    $bookName,
    $coverType,
    $publisher,
    $publishYear
);

$books = $book_model->getBookByFilters(
    $min_price,
    $max_price,
    $order_by,
    $categoryId,
    $authorId,  
    $bookId,
    $status,
    $bookName,
    $coverType, 
    $publisher, 
    $publishYear,
    $pageSize,
    $page
);


$totalBooks = $book_model->countBooks(
    $min_price,
    $max_price,
    $order_by,
    $categoryId,
    $authorId,
    $bookId,
    $status,
    $bookName,
    $coverType,
    $publisher,
    $publishYear
);

$response = [
    "books" => returnJSONBook($books),
    "totalBooks" => $totalBooks,
    "currentPage" => $page,
    "pageSize" => $pageSize
];

echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>