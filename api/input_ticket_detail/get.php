<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONInputTicketDetail($InputTicketDetails) {
    if (!$InputTicketDetails) {
        echo json_encode(["error" => "Không tìm thấy chi tiêt phiếu nhập"]);
        exit();
    }
    if (!isset($InputTicketDetails[0])) {
        $InputTicketDetails = [$InputTicketDetails];
    }
    
    
    $allDetail = [];
    $book_model = new app_models_Sach();
    $cover_model = new app_models_LoaiBia();
    foreach ($InputTicketDetails as $InputTicket) {
        $book = $book_model->getBookById( $InputTicket['maSach']);
        $cover = $cover_model->getCoverById( $book['maLoaiBia']);
        
        $allDetail[] = [
            "id" => $InputTicket['maPhieuNhap'],
            "bookId" => $InputTicket['maSach'],
            "bookName" => $book['tenSach'],
            "basePrice" => $cover['giaBia'],
            "sellingPrice" => $book['giaBan'],
            "inputPrice" => $InputTicket['giaNhap'],
            "quantity" => $InputTicket['soLuong'],
            "total" => $InputTicket['tienNhap'],
        ];
    
    }

    
    $inputTicket_model = new app_models_PhieuNhap();
    $inputTicket = $inputTicket_model->getInputTicketById( $InputTicketDetails[0]['maPhieuNhap']);
    $supplier_model = new app_models_NhaCungCap();
    $supplier = $supplier_model->getSupplierById( $inputTicket['maNCC']);
    $response = [];
    $response[] = [
        "inputTicketId" => $inputTicket['maPhieuNhap'],
        "employeeUserName" => $inputTicket['taiKhoanNhanVien'],
        "status" => $inputTicket['trangThai'],
        "dateCreate" => $inputTicket['ngayTaoPhieu'],
        "status" => $inputTicket['trangThai'],
        "suplierName" => $supplier['tenNCC'],
        "allDetail" => $allDetail
    ];

    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

$inputTicket_model = new app_models_ChitietPhieuNhap();

$inputTicketId = isset($_GET['inputTicketId']) ? $_GET['inputTicketId'] : '1';

$result = $inputTicket_model->getInputTicketDetailByInputTicketId($inputTicketId);
// $authors = $author_model->getAllAuthors();

returnJSONInputTicketDetail($result);
?>
