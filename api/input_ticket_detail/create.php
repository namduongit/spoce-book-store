<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$inputTicketId = isset($_POST['inputTicketId']) ? $_POST['inputTicketId'] : '1';
$bookId = isset($_POST['bookId']) ? $_POST['bookId'] : '1';
$inputPrice = isset($_POST['inputPrice']) ? $_POST['inputPrice'] : '1';
$quantity = isset($_POST['quantity']) ? $_POST['quantity'] : '1';
$inputMoney = isset($_POST['inputMoney']) ? $_POST['inputMoney'] : '1';

// Kiểm tra bookId có hợp lệ không
if (empty($inputTicketId)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID phieu nhap."]);
    exit;
}


try {
    // Khởi tạo model tác giả
    $detail_model = new app_models_ChitietPhieuNhap();

    // Cập nhật trạng thái tác giả trong database
    $result = $detail_model->insertInputTicketDetail(
        [
            "maPhieuNhap" => $inputTicketId,
            "maSach" => $bookId,
            "giaNhap" => $inputPrice,
            "soLuong" => $quantity,
            "tienNhap" => $inputMoney,
        ]);

    
    if ($result) {
        echo json_encode(["success" => true, "message" => "thêm chi tiết phiếu nhập thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Không có thay đổi hoặc ID không tồn tại."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Lỗi hệ thống: " . $e->getMessage()]);
}

exit;
