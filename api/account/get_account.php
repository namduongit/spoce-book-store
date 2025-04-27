<?php
// require_once __DIR__ . '../../../app/config.php';

// function returnJSONAccount($filters, $pageCount)
// {
//     if (!is_array($filters) || empty($filters)) {
//         http_response_code(404);
//         echo json_encode(["error" => "Không tìm thấy người dùng!"]);
//         exit();
//     }

//     $response = array_map(function ($filter) {
//         return [
//             "maNguoiDung" => $filter['maNguoiDung'] ?? '',
//             "hoVaTen" => $filter['hoVaTen'] ?? '',
//             "soDT" => $filter['soDT'] ?? '',
//             "email" => $filter['email'] ?? '',
//             "tenTaiKhoan" => $filter['tenTaiKhoan'] ?? '',
//             "matKhau" => $filter['matKhau'] ?? 0,
//             "tenQuyen" => $filter['tenQuyen'] ?? '',
//             "maQuyen" => $filter['maQuyen'] ?? '',
//             "trangThai" => $filter['trangThai'] ?? '',
//             "ngayCapNhat" => $filter['ngayCapNhat'] ?? 0
//         ];
//     }, (isset($filters[0])) ? $filters : [$filters]);

//     header('Content-Type: application/json; charset=UTF-8');
//     echo json_encode(["accountList" => $response, "pageCount" => $pageCount], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
//     exit();
// }

// $id_or_name = $_GET['id_or_name'] ?? '';
// $sortBy = $_GET['sortBy'] ?? 'maNguoiDung';
// $sortType = $_GET['sortType'] ?? 'ASC';
// $status = $_GET['status'] ?? '';
// $category = $_GET['category'] ?? '';
// $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : PHP_INT_MAX;
// $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;


// $db = new app_libs_DBConnection();

// $columns = ['nguoiDung.maNguoiDung', 'nguoiDung.hoVaTen', 'nguoiDung.soDT', 'nguoiDung.email', 'nguoiDung.tenTaiKhoan', 'nguoiDung.matKhau', 'nguoiDung.maQuyen', 'quyen.tenQuyen', 'nguoiDung.trangThai', 'nguoiDung.ngayCapNhat'];
// $tables = ['nguoiDung'];
// // $joins = ['nguoiDung.maQuyen = quyen.maQuyen'];
// $joins = ['LEFT JOIN quyen ON nguoiDung.maQuyen = quyen.maQuyen'];

// $conditions = [];
// $params = [];

// if (!empty($id_or_name)) {
//     $conditions[] = "(maNguoiDung = :id OR hoVaTen LIKE :name)";
//     $params[':id'] = $id_or_name;
//     $params[':name'] = "%$id_or_name%";
// }
// if (!empty($category)) {
//     $conditions[] = "quyen.tenQuyen = :category";
//     $params[':category'] = $category;
// }
// if (!empty($status)) {
//     $conditions[] = "nguoiDung.trangThai LIKE :status";
//     $params[':status'] = $status;
// }

// $result = $db->joinTables($columns, $tables, $joins, $conditions, $sortBy, $sortType, $limit, $offset, $params);
// $result2 = $db->joinTables($columns, $tables, $joins, $conditions, $sortBy, $sortType, null, null, $params);
// $pageCount = ceil(count($result2) / $limit);

// // print_r($result);
// if (empty($result)) {
//     echo json_encode(["accountList" => [], "error" => "Không có sách nào phù hợp!", "pageCount" => 0]);
//     exit();
// }
// // print_r($conditions);
// returnJSONAccount($result, $pageCount);












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
            "matKhau" => $filter['matKhau'] ?? '',
            // "tenQuyen" => $filter['tenQuyen'] ?? '',
            "maQuyen" => $filter['maQuyen'] ?? '',
            "trangThai" => $filter['trangThai'] ?? '',
            "ngayCapNhat" => $filter['ngayCapNhat'] ?? ''
        ];
    }, (isset($filters[0])) ? $filters : [$filters]);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(["accountList" => $response, "pageCount" => $pageCount], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

// Lấy tham số từ URL
$id_or_name = $_GET['id_or_name'] ?? '';
$sortBy = $_GET['sortBy'] ?? 'maNguoiDung';
$sortType = $_GET['sortType'] ?? 'ASC';
$status = $_GET['status'] ?? '';
$category = $_GET['category'] ?? '';
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : PHP_INT_MAX;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

$db = new app_libs_DBConnection();

// Các cột cần lấy
$columns = [
    'nguoiDung.maNguoiDung',
    'nguoiDung.hoVaTen',
    'nguoiDung.soDT',
    'nguoiDung.email',
    'nguoiDung.tenTaiKhoan',
    'nguoiDung.matKhau',
    'nguoiDung.maQuyen',
    // 'quyen.tenQuyen',
    // 'COALESCE(quyen.tenQuyen, "Chưa có quyền") AS tenQuyen',
    'nguoiDung.trangThai',
    'nguoiDung.ngayCapNhat'
];

// Chỉ cần bảng chính
$tables = ['nguoiDung'];

// LEFT JOIN để lấy cả những user không có quyền
// $joins = ['nguoiDung.maQuyen = quyen.maQuyen OR nguoiDung.maQuyen IS NULL'];
$joins = ['LEFT JOIN quyen ON nguoiDung.maQuyen = quyen.maQuyen'];

$conditions = [];
$params = [];

// Điều kiện tìm kiếm theo mã hoặc tên
if (!empty($id_or_name)) {
    $conditions[] = "(nguoiDung.maNguoiDung = :id OR nguoiDung.hoVaTen LIKE :name)";
    $params[':id'] = $id_or_name;
    $params[':name'] = "%$id_or_name%";
}

// Điều kiện lọc theo quyền (category)
if ($category !== '') {
    if (strtolower($category) === 'null') {
        // Nếu category = null (không có quyền)
        $conditions[] = "nguoiDung.maQuyen IS NULL";
    } else {
        $conditions[] = "nguoiDung.maQuyen = :category";
        $params[':category'] = $category;
    }
}

// Điều kiện lọc trạng thái
if (!empty($status)) {
    $conditions[] = "nguoiDung.trangThai LIKE :status";
    $params[':status'] = $status;
}

// Lấy dữ liệu theo phân trang
$result = $db->joinTables($columns, $tables, $joins, $conditions, $sortBy, $sortType, $limit, $offset, $params);

// Lấy toàn bộ dữ liệu để tính số trang
$resultAll = $db->joinTables($columns, $tables, $joins, $conditions, $sortBy, $sortType, null, null, $params);
$pageCount = ($limit != 0) ? ceil(count($resultAll) / $limit) : 1;

// Nếu không có dữ liệu
if (empty($result)) {
    echo json_encode(["accountList" => [], "error" => "Không có người dùng phù hợp!", "pageCount" => 0]);
    exit();
}

// print_r($result);
// Trả JSON
returnJSONAccount($result, $pageCount);
