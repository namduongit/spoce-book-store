<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


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

$imageName = 'default.jpg';

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/../../public/uploads/books/'; // Thư mục đích

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true); 
    }

    $newImageTmpPath = $_FILES['image']['tmp_name'];
    $newImageType = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

    $imageName = uniqid('book_') . '.' . $newImageType; // Tạo tên file duy nhất

    $newImagePath = $uploadDir . $imageName;

    if (!move_uploaded_file($newImageTmpPath, $newImagePath)) {
        // Nếu thất bại, dùng default
        $imageName = 'default.jpg';
    }
}



// Khởi tạo model sách
$book_model = new app_models_Sach();


// ínert sách trong database
$insertSuccess = $book_model->insertBook( 
    [   
        "hinhAnh" => $imageName,
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
