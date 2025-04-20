<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$name = isset($_POST['name']) ? $_POST['name'] : '1';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';
$status = isset($_POST['status']) ? $_POST['status'] : '';
$updateAt = date("Y-m-d H:i:s");

try {
    $model = new app_models_NhaCungCap();

    // Cập nhật trạng thái tác giả trong database
    $result = $model->insertSupplier(
        [  
            "tenNCC" => $name,
            "soDT" => $phone,
            "email" => $email,
            "diaChi" => $address,
            "trangThai" => $status,
            "ngayCapNhat" => $updateAt
        ]);

    // Kiểm tra số dòng bị ảnh hưởng
    if ($result  > 0) {
        echo json_encode(["success" => true, "message" => "Cập nhật nhà cung cấp thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;