<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$inputTicketId = isset($_POST['inputTicketId']) ? $_POST['inputTicketId'] : '';

// Kiểm tra idInput có hợp lệ không
if (empty($inputTicketId)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID phiếu nhập"]);
    exit;
}


try {
    // Khởi tạo model ctpn
    $inputTicket_model = new app_models_ChitietPhieuNhap();

    // Xoá tất cả chi tiết phiếu nhập có mã phiếu được chọn trong database
    $result = $inputTicket_model->deleteAllInputTicketDetail($inputTicketId);

    if ($result ) {
        echo json_encode(["success" => true, "message" => "xoá thành công các ctpn của pn" . $inputTicketId]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;