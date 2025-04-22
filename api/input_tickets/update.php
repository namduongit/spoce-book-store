<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$id = isset($_POST['id']) ? $_POST['id'] : '1';
$employeeId = isset($_POST['employeeId']) ? $_POST['employeeId'] : '1';
$supplierId = isset($_POST['supplierId']) ? $_POST['supplierId'] : '1';
$total = isset($_POST['total']) ? $_POST['total'] : '1';
$status = isset($_POST['status']) ? $_POST['status'] : 'Đang chờ xác nhận';
$updateAt = date("Y-m-d H:i:s");

// Kiểm tra id có hợp lệ không
if (empty($id)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID phiếu nhập."]);
    exit;
}

try {
    $model = new app_models_PhieuNhap();

    // Cập nhật trạng thái phiếu nhập trong database
    $result = $model->updateInputTicket(
        $id,
        [  
            "maNhanVien" => $employeeId,
            "maNCC" => $supplierId,
            "tongTienNhap" => $total,
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