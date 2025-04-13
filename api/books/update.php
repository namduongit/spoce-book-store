<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$id = isset($_POST['id']) ? $_POST['id'] : '';
$oldImageName = isset($_POST['oldImageName']) ? $_POST['oldImageName'] : 'default.jpg';
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

$image = $oldImageName;

if (isset($_FILES['newImage']) && $_FILES['newImage']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/../../public/uploads/books/';
    $newImageTmpPath = $_FILES['newImage']['tmp_name'];
    $newImageType = pathinfo($_FILES['newImage']['name'], PATHINFO_EXTENSION);

    $image = $oldImageName; // giữ tên cũ
    $newImagePath = $uploadDir . $image;

    if (file_exists($newImagePath)) {
        unlink($newImagePath);
    }

    move_uploaded_file($newImageTmpPath, $newImagePath);
}



// Khởi tạo model sách
$book_model = new app_models_Sach();


// ínert sách trong database
$updateSuccess = $book_model->updateBook( 
    $id,
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
        
    ]);

// Kiểm tra kết quả cập nhật
if ($updateSuccess) {
    echo json_encode(["success" => true, "message" => "sửa thành công."]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi sửa sách."]);
}

exit;
