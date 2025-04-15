<?php
require_once __DIR__ . '../../../app/config.php';

function returnJSONAccount($filters, $pageCount)
{
    if (!is_array($filters) || empty($filters)) {
        http_response_code(404);
        echo json_encode(["error" => "Không tìm thấy người dùng!"]);
        exit();
    }

    $response = array_map(function ($filter) {
        return [
            "maNguoiDung" => $filter['maNguoiDung'] ?? '',
            "hoVaTen" => $filter['hoVaTen'] ?? '',
            "soDT" => $filter['soDT'] ?? '',
            "email" => $filter['email'] ?? '',
            "tenTaiKhoan" => $filter['tenTaiKhoan'] ?? '',
            "matKhau" => $filter['matKhau'] ?? 0,
            "tenQuyen" => $filter['tenQuyen'] ?? '',
            "maQuyen" => $filter['maQuyen'] ?? '',
            "trangThai" => $filter['trangThai'] ?? '',
            "ngayCapNhat" => $filter['ngayCapNhat'] ?? 0
        ];
    }, (isset($filters[0])) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(["discountList" => $response, "pageCount" => $pageCount], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

$id_or_name = $_GET['id_or_name'] ?? '';
$sortBy = $_GET['sortBy'] ?? 'maNguoiDung';
$sortType = $_GET['sortType'] ?? 'ASC';
$status = $_GET['status'] ?? '';
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;


$db = new app_libs_DBConnection();
if ($db->open_connect()) {
    echo "Kết nối thành công!";
} else {
    echo "Không thể kết nối đến cơ sở dữ liệu.";
}
$columns = ['nguoiDung.maNguoiDung', 'nguoiDung.hoVaTen', 'nguoiDung.soDT', 'nguoiDung.email', 'nguoiDung.tenTaiKhoan', 'nguoiDung.matKhau', 'nguoiDung.maQuyen', 'quyen.tenQuyen', 'nguoiDung.trangThai', 'nguoiDung.ngayCapNhat'];
$tables = ['nguoiDung', 'quyen'];
$joins = ['nguoiDung.maQuyen = quyen.maQuyen'];

$conditions = [];
$params = [];

if (!empty($id_or_name)) {
    $conditions[] = "(maNguoiDung LIKE :id_or_name OR quyen.tenQuyen LIKE :id_or_name)";
    $params[':id_or_name'] = "%$id_or_name%";
}
if (!empty($status)) {
    $conditions[] = "trangThai = :status";
    $params[':status'] = $status;
}

$result = $db->joinTables($columns, $tables, $joins, $conditions, $sortBy, $sortType, $limit, $offset, $params);
$result2 = $db->joinTables($columns, $tables, $joins, $conditions, $sortBy, $sortType, null, null, $params);
$pageCount = ceil(count($result2) / ($limit == null ? PHP_INT_MAX : $limit));

print_r($result);
if (empty($result)) {
    echo json_encode(["accountList" => [], "error" => "Không có sách nào phù hợp!", "pageCount" => 0]);
    exit();
}
print_r($conditions);
returnJSONAccount($result, $pageCount);
