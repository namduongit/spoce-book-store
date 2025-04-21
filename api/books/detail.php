<?php
require_once __DIR__ . '/../../app/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Kiểm tra sách
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('Sách không được để trống');
    }
    $id = $_GET['id'];

    // Tạo đối tượng sách
    $model = new app_models_Sach();

    // Lấy thông tin chi tiết sách, kiểm tra
    $data = $model->getBookById($id);
    if (!$data) {
        throw new Exception('Không tìm thấy sách');
    }
    $dataFormat = [
        "id" => $data['maSach'],
        "name" => $data['tenSach'],
        "pages" => $data['soTrang'],
        "size" => $data['kichThuoc'],
        "description" => $data['moTa'],
        "publishYear" => $data['namXuatBan'],
        "basePrice" => $data['giaTran'],
        "sellPrice" => $data['giaBan'],
        "image" => $data['hinhAnh'],
        "inventory" => $data['soLuong'],
        "status" => $data['trangThai'],
        "updatedAt" => $data['ngayCapNhat'],
        "authorId" => $data['maTacGia'],
        "categoryId" => $data['maTheLoai'],
        "coverId" => $data['maLoaiBia'],
        "publisherId" => $data['maNXB'],
    ];

    echo json_encode([
        'status' => 'success',
        'data' => $dataFormat
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} 