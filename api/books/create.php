<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$image = isset($_POST['image']) ? $_POST['image'] : '80.png';
$title = isset($_POST['title']) ? $_POST['title'] : '';
$authorId = isset($_POST['authorId']) ? $_POST['authorId'] : '';
$categoryId = isset($_POST['categoryId']) ? $_POST['categoryId'] : '';
$numOfpages = isset($_POST['numOfpages']) ? $_POST['numOfpages'] : '';
$coverTypeId = isset($_POST['coverTypeId']) ? $_POST['coverTypeId'] : '';
$publisherId = isset($_POST['publisherId']) ? $_POST['publisherId'] : '';
$publishYear = isset($_POST['publishYear']) ? $_POST['publishYear'] : '';
$priceBase = isset($_POST['priceBase']) ? $_POST['priceBase'] : '';
$priceOrder = isset($_POST['priceOrder']) ? $_POST['priceOrder'] : '';
$description = isset($_POST['description']) ? $_POST['description'] : '';
$status = isset($_POST['status']) ? $_POST['status'] : '';
$size = isset($_POST['size']) ? $_POST['size'] : '';
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
