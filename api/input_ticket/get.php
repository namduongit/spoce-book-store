<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONInputTicket($InputTickets) {
    if (!$InputTickets) {
        echo json_encode(["error" => "Không tìm thấy phiếu nhập"]);
        exit();
    }
    if (!isset($InputTickets[0])) {
        $InputTickets = [$InputTickets];
    }

    $response = [];

    // Chỉ khởi tạo model một lần
    $inputTicketDetailModel = new app_models_ChitietPhieuNhap();
    $supplier_model = new app_models_NhaCungCap();

    foreach ($InputTickets as $InputTicket) {


        // lấy tên nhà cung cấp
        $supplier = $supplier_model->getSupplierById($InputTicket['maNCC']);
        

        $response[] = [
            "id" => $InputTicket['maPhieuNhap'],
            // "dateCreate" => $InputTicket['ngayTaoPhieu'],
            "dateCreate" => explode(" ", $InputTicket['ngayTaoPhieu'])[0],
            "employeeUserName" => $InputTicket['taiKhoanNhanVien'],
            "inputTotal" => $InputTicket['tongTienNhap'],
            "suplierId" => $InputTicket['maNCC'],
            "suplierName" => $supplier['tenNCC'],
            "status" => $InputTicket['trangThai'],
            "updatedAt" => $InputTicket['ngayCapNhat'],
        ];
    }

    // In ra JSON một lần duy nhất
    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

// Khởi tạo model
$inputTicket_model = new app_models_PhieuNhap();

// Lấy dữ liệu từ query string
$inputTicketId = $_GET['inputTicketId'] ?? '';
$inputTicketDateInit = $_GET['inputTicketDateInit'] ?? '';
$employeeUserName = $_GET['employeeUserName'] ?? '';
$total = $_GET['total'] ?? '';
$suplierId = $_GET['suplierId'] ?? '';
$status = $_GET['status'] ?? '';
$updatedAt = $_GET['updatedAt'] ?? '';

// Lấy dữ liệu từ database
$result = $inputTicket_model->getInputTicketByFilter($inputTicketId, $inputTicketDateInit, $employeeUserName, $suplierId, $total, $status);

// Trả về JSON đúng định dạng
returnJSONInputTicket($result);
?>
