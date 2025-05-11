<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$createAt = isset($_POST['createAt']) ? $_POST['createAt'] : '';
$supplierId = isset($_POST['supplierId']) ? $_POST['supplierId'] : '';
$employeeId = isset($_POST['employeeId']) ? $_POST['employeeId'] : '';
$total = isset($_POST['total']) ? $_POST['total'] : '';
$status = isset($_POST['status']) ? $_POST['status'] : '';
$updateDateTime = date("Y-m-d H:i:s");

try {

    $cover_model = new app_models_PhieuNhap();

    $result = $cover_model->insertInputTicket(
        [
            "ngayTaoPhieu" => $createAt,
            "maNCC" => $supplierId,
            "maNhanVien" => $employeeId,
            "tongTienNhap" => $total,
            "trangThai" => $status,
            "ngayCapNhat" => $updateDateTime
        ]
    );

    // Kiểm tra số dòng bị ảnh hưởng
    if ($result) {
        echo json_encode(["success" => true, "message" => "Thêm phiếp nhập thành công.", "inputTicketId" => $result]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;
