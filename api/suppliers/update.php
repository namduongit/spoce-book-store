<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$id = isset($_POST['id']) ? $_POST['id'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '1';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';
$updateAt = date("Y-m-d H:i:s");

// Kiểm tra id có hợp lệ không
if (empty($id)) {
    echo json_encode(["success" => false, "message" => "Thiếu mã nhà cung cấp"]);
    exit;
}

try {
   
    $model = new app_models_NhaCungCap();

    // Cập nhật trạng thái tác giả trong database
    $result = $model->updateSupplier(
        $id,
        [  
            "tenNCC" => $name,
            "soDT" => $phone,
            "email" => $email,
            "diaChi" => $address,
            "ngayCapNhat" => $updateAt
        ]);

    // Kiểm tra số dòng bị ảnh hưởng
    if ($result && $result->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Cập nhật nhà cung cấp thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;