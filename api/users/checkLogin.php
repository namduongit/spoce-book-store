<?php
// require_once __DIR__ . '../../../vendor/autoload.php';
// use \Firebase\JWT\JWT;
// use \Firebase\JWT\Key;

// $secret_key = "ThisIsSecretKeyByNamDuongit";
// $headers = getallheaders();
// $auth_header = $headers['Authorization'] ?? '';
// if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
//     $token = $matches[1];
// } else {
//     http_response_code(401);
//     echo json_encode(["success" => false, "message" => "Thiếu hoặc sai định dạng token"]);
//     exit;
// }

// if (!$token) {
//     http_response_code(401);
//     echo json_encode(["success" => false, "message" => "Chưa đăng nhập"]);
//     exit;
// }

// try {
//     $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
//     http_response_code(200);
//     echo json_encode([
//         "success" => true,
//         "message" => "Đã đăng nhập",
//         "user" => [
//             "id" => $decoded->data->id,
//             "username" => $decoded->data->username
//         ]
//     ]);
// } catch (Exception $e) {
//     http_response_code(401);
//     echo json_encode(["success" => false, "message" => "Token không hợp lệ"]);
// }

?>
<?php
// Thiết lập session
session_start();

header("Content-Type: application/json");

// Kiểm tra nếu session không hoạt động
if (session_status() !== PHP_SESSION_ACTIVE) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Lỗi session!"]);
    exit;
}

// Kiểm tra nếu user chưa đăng nhập
if (!isset($_SESSION["user"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Bạn chưa đăng nhập", "logged_in" => false]);
    exit;
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Đã đăng nhập",
    "logged_in" => true,
    "session_id" => session_id(),
    "user" => $_SESSION["user"],
    "role" => $_SESSION["role"]
]);
?>