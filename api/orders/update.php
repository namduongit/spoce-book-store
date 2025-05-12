<?php

require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Nhận dữ liệu từ POST
$id = isset($_POST['id']) ? $_POST['id'] : '1';  // id hóa đơn
$employeeId = isset($_POST['employeeId']) ? $_POST['employeeId'] : '1';
$status = isset($_POST['status']) ? $_POST['status'] : 'Đang chờ xác nhận';
$updateAt = date("Y-m-d H:i:s");
$statusPay = isset($_POST['statusPay']) ? $_POST['statusPay'] : 'Chưa thanh toán';

// Kiểm tra id có hợp lệ không
if (empty($id)) {
    echo json_encode(["success" => false, "message" => "Thiếu ID đơn hàng."]);
    exit;
}


// Kiểm tra số lượng có đủ hay không

function returnJSONOrder($filters, $pageCount)
{
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy chi tiết đơn hàng!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "orderId" => $filter['maDonHang'],
            "bookId" => $filter['maSach'],
            "bookName" => $filter['tenSach'],
            "price" => $filter['tienThu'],
            "quantity" => $filter['soLuong']
        ];
    }, is_array($filters[0]) ? $filters : [$filters]);

    // Kiểm tra số lượng của mỗi sản phẩm trong response
    $product_model = new app_models_Sach();
    foreach($response as $item) {
        $productId = $item['bookId'];
        $product = $product_model->getBookById($productId);
        if ($product['soLuong'] < $item['quantity']) {
            echo json_encode(["success" => false, "message" => "Số lượng trong kho không đủ"]);
            die();
        }

    }
}

$columns = [
    'chiTietDonHang.maDonHang',
    'chiTietDonHang.maSach',
    'chiTietDonHang.tienThu',
    'chiTietDonHang.soLuong',
    'sach.tenSach'
];
$tables = ['chiTietDonHang', 'sach'];
$joins = [
    'chiTietDonHang.maSach = sach.maSach'
];
$conditions = [];
$params = [];
$orderByColumn = isset($_GET['orderByColumn']) ? trim($_GET['orderByColumn']) : 'maDonHang';
$orderType = isset($_GET['orderType']) ? trim($_GET['orderType']) : 'ASC';
$limit = isset($_GET['limit']) ? trim($_GET['limit']) : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? trim($_GET['offset']) : '0';

if (!empty($id)) {
    $conditions[] = "(chiTietDonHang.maDonHang = :orderId)";
    $params[':orderId'] = $id;
}


$db = new app_libs_DBConnection();
$result = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, $limit, $offset, $params);
$result2 = $db->joinTables($columns, $tables, $joins, $conditions, $orderByColumn, $orderType, null, null, $params);
$pageCount = ceil(count($result2) / $limit);

if (empty($result)) {
    echo json_encode(["error" => "Không có chi tiết đơn hàng nào phù hợp!", "pageCount" => 0]);
    exit();
}

returnJSONOrder($result, $pageCount);

try {
    $model = new app_models_DonHang();

    // Cập nhật trạng thái đơn hàng trong database
    $result = $model->updateOrder(
        $id,
        [
            "maNhanVien" => $employeeId,
            "trangThai" => $status,
            "trangThaiThanhToan" => $statusPay,
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
