<?php
require_once __DIR__ . '../../../app/config.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$id = isset($_POST['id']) ? $_POST['id'] : '';
$status = isset($_POST['status']) ? $_POST['status'] : 'Hoạt động';
$updateAt = date("Y-m-d H:i:s");

if (empty($id)) {
    echo json_encode(["success" => false, "message" => "Thiếu mã quyền."]);
    exit;
}

$status = ($status === 'Hoạt động') ? 'Tạm dừng' : 'Hoạt động';
try {
    // Khởi tạo model sách
    $model = new app_models_Quyen();

    // Cập nhật trạng thái sách trong database
    $result = $model->updateRole(
        $id, 
        [
            "trangThai" => $status,
            "ngayCapNhat" => $updateAt
        ]
    );

    // Kiểm tra số dòng bị ảnh hưởng
    if ($result && $result->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Cập nhật trạng thái thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;

?>