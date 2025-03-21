<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//phân trang mặc đinh là 10
$pageSize = isset($_GET['pageSize']) ? (int)$_GET['pageSize'] : 10;
//mặc đinh là trang 1
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
function returnJSONBook($books, $pageSize, $page)
{
    if (!$books) {
        echo json_encode(["error" => "Không tìm thấy sách!"]);
        exit();
    }

    // Nếu chỉ có một cuốn sách, đảm bảo nó là mảng chứa một phần tử
    if (!isset($books[0])) {
        $books = [$books];
    }

    //tính offset để lấy số sách cần trong trang vd trang 1 từ 1->10, trang 2 11->20
    $offset = ($page - 1) * $pageSize;
    $books = array_slice($books, $offset, $pageSize);

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

$bookId = isset($_GET['bookId']) ? $_GET['bookId'] : '';
$bookName = isset($_GET['bookName']) ? trim($_GET['bookName']) : '';

$min_price = isset($_GET['minPrice']) ? $_GET['minPrice'] : 0;
$max_price = isset($_GET['maxPrice']) ? $_GET['maxPrice'] : null;

$order_by = isset($_GET['orderBy']) ? trim($_GET['orderBy']) : '';

$categoryId = isset($_GET['cateId']) ? $_GET['cateId'] : '';
$authorId = isset($_GET['authorId']) ? $_GET['authorId'] : '';
$status = isset($_GET['bookStatus']) ? $_GET['bookStatus'] : '';

$coverType = isset($_GET['coverType']) ? trim($_GET['coverType']) : '';
$publisher = isset($_GET['publisher']) ? trim($_GET['publisher']) : '';
$publishYear = isset($_GET['publishYear']) ? $_GET['publishYear'] : '';



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
// Lấy tổng số sách
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
// Trả về kết quả dưới dạng JSON
$response = [
    "books" => returnJSONBook($books, $pageSize, $page),
    "totalBooks" => $totalBooks,
    "currentPage" => $page,
    "pageSize" => $pageSize
];
echo json_encode($response, JSON_UNESCAPED_UNICODE);
