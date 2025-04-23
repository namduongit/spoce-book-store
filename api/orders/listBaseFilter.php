<?php
require_once '../../app/config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$raw = file_get_contents("php://input");
$payload = json_decode($raw, true); 

/**
 * payload
 *  + data: danh sách người dùng
 *  + createStart: date
 *  + createEnd: date
 */

if (isset($payload)) {
    $data = $payload['data'];
    $createStart = $payload['createStart'];
    $createEnd = $payload['createEnd'];

    $order_model = new app_models_DonHang();

    $dataResponse = [];

    foreach($data as $user) {
        $result = $order_model->filterOrderUser($user['id'], $createStart, $createEnd);

        foreach($result as $order) {
            $dataResponse[] = [
                "id" => $order['maDonHang'],
                "createAt" => $order['ngayTaoDon'],
                "employeeId" => $order['maNhanVien'],
                "customerId" => $order['maKhachHang'],
                "discountId" => $order['maKhuyenMai'],
                "payId" => $order['maPhuongThuc'],
                "payStatus" => $order['trangThaiThanhToan'],
                "total" => $order['tongTienThu'],
                "addressToShip" => $order['diaChiGiao'],
                "status" => $order['trangThai'],
                "updatedAt" => $order['ngayCapNhat']
            ];
        }
    }

    echo json_encode([
        "data" => $dataResponse,
        "createStart" => $createStart,
        "createEnd" => $createEnd
    ]);
    exit();

} else {
    echo json_encode(["error" => "Dữ liệu không phù hợp! Vui lòng xem lại", "pageCount" => 0]);
    exit();
}





?>