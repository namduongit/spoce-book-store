<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$image = isset($_GET['image']) ? $_GET['image'] : '80.png';
$title = isset($_GET['title']) ? $_GET['title'] : '';
$authorId = isset($_GET['authorId']) ? $_GET['authorId'] : '';
$categoryId = isset($_GET['categoryId']) ? $_GET['categoryId'] : '';
$numOfpages = isset($_GET['numOfpages']) ? $_GET['numOfpages'] : '';
$coverTypeId = isset($_GET['coverTypeId']) ? $_GET['coverTypeId'] : '';
$publisherId = isset($_GET['publisherId']) ? $_GET['publisherId'] : '';
$publishYear = isset($_GET['publishYear']) ? $_GET['publishYear'] : '';
$priceBase = isset($_GET['priceBase']) ? $_GET['priceBase'] : '';
$priceOrder = isset($_GET['priceOrder']) ? $_GET['priceOrder'] : '';
$description = isset($_GET['description']) ? $_GET['description'] : '';
$status = isset($_GET['status']) ? $_GET['status'] : '';
$size = isset($_GET['size']) ? $_GET['size'] : '';
$updateDate = date('Y-m-d'); 




// Khởi tạo model sách
$book_model = new app_models_Sach();


// ínert sách trong database
$insertSuccess = $book_model->insertBook( 
    [   
        "hinhAnh" => $image,
        "tenSach" => $title,
        "maTacGia" => $authorId,
        "maTheLoai" => $categoryId,
        "soTrang" => $numOfpages,
        "maLoaiBia" => $coverTypeId,
        "maNXB" => $publisherId,
        "namXuatBan" => $publishYear,
        "giaTran" => $priceBase,
        "giaBan" => $priceOrder,
        "moTa" => $description,
        "kichThuoc" => $size,
        "ngayCapNhat" => $updateDate,
        "trangThai" => $status,
    ]);

// Kiểm tra kết quả cập nhật
if ($insertSuccess) {
    echo json_encode(["success" => true, "message" => "them sachs thành công."]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi theme sách."]);
}

exit;
