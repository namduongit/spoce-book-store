<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$categoryStatus = isset($_POST['categoryStatus']) ? $_POST['categoryStatus'] : '';
$categoryId = isset($_POST['categoryId']) ? $_POST['categoryId'] : '1';
$categoryName = isset($_POST['categoryName']) ? $_POST['categoryName'] : '';
$updateDateTime = date("Y-m-d H:i:s");

// Kiểm tra categoryId có hợp lệ không
if (empty($categoryId)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID thể loại."]);
    exit;
}

// Chuyển trạng thái tác giả
$categoryStatus = ($categoryStatus === 'ACTIVE') ? 'ACTIVE' : 'INACTIVE';

try {
   
    $category_model = new app_models_TheLoai();

    // Cập nhật trạng thái tác giả trong database
    $result = $category_model->updatecategory(
        $categoryId,
        [  "tenTheLoai" => $categoryName,
            "trangThai" => $categoryStatus,
            "ngayCapNhat" => $updateDateTime
        ]);

    // Kiểm tra số dòng bị ảnh hưởng
    if ($result && $result->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Cập nhật thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;
