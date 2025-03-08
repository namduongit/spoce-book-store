<?php

require_once '../../app/config.php';


header('Content-Type: application/json');



$book_model = new app_models_Sach();
$category_book = new app_models_TheLoai();

$mode_book = isset($_GET['book']) ? $_GET['book'] : 'getAllBooks';

$response = [];

switch ($mode_book) {
    case 'economics':
        $books = $book_model->getBooksByCategory(1);
        break;
    case 'domestic-literature':
        $books = $book_model->getBooksByCategory(2);
        break;
    case 'foreign-literature':
        $books = $book_model->getBooksByCategory(3);
        break;
    case 'children':
        $books = $book_model->getBooksByCategory(4);
        break;
    case 'self-development':
        $books = $book_model->getBooksByCategory(5);
        break;
    case 'computer-language':
        $books = $book_model->getBooksByCategory(6);
        break;
    case 'specialized':
        $books = $book_model->getBooksByCategory(7);
        break;
    case 'life-skills':
        $books = $book_model->getBooksByCategory(8);
        break;
    case 'comics':
        $books = $book_model->getBooksByCategory(9);
        break;
    default:
        $books = $book_model->getAllBooks();
}

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