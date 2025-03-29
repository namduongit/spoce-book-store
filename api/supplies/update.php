<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$supplierId = isset($_POST['supplierId']) ? $_POST['supplierId'] : '';
$supplierName = isset($_POST['supplierName']) ? $_POST['supplierName'] : '1';
$supplierPhone = isset($_POST['supplierPhone']) ? $_POST['supplierPhone'] : '';
$supplierEmail = isset($_POST['supplierEmail']) ? $_POST['supplierEmail'] : '';
$supplierAddress = isset($_POST['supplierAddress']) ? $_POST['supplierAddress'] : '';
$supplierStatus = isset($_POST['supplierStatus']) ? $_POST['supplierStatus'] : '';
$updateDateTime = date("Y-m-d H:i:s");

// Kiểm tra supplierId có hợp lệ không
if (empty($supplierId)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID tác giả."]);
    exit;
}

// Chuyển trạng thái tác giả
$supplierStatus = ($supplierStatus === 'ACTIVE') ? 'ACTIVE' : 'INACTIVE';

try {
   
    $supplier_model = new app_models_NhaCungCap();

    // Cập nhật trạng thái tác giả trong database
    $result = $supplier_model->updateSupplier(
        $supplierId,
        [  
            "tenNCC" => $supplierName,
            "soDT" => $supplierPhone,
            "email" => $supplierEmail,
            "diaChi" => $supplierAddress,
            "trangThai" => $supplierStatus,
            "ngayCapNhat" => $updateDateTime
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
