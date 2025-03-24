<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');


// var_dump($_POST);

// if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
//     http_response_code(405);
//     echo json_encode(["success" => false, "message" => "Phương thức không được phép"]);
//     return;
// }

$maNguoiDung = (int)$_POST["id"] ?? '';
$hovaten = $_POST["name"] ?? '';
$soDT = $_POST["phone"] ?? '';
$email = $_POST["email"] ?? '';
$matKhau = $_POST['password'] ?? '';
$xacNhanMatKhau = $_POST['confirm_password'] ?? '';
$isChangingPassword = false;
$currentTime = date('Y-m-d H:i:s');


if (empty($matKhau) && empty($xacNhanMatKhau)) {
    $isChangingPassword = false;
} else {
    if ((empty($matKhau) && !empty($xacNhanMatKhau)) || (!empty($matKhau) && empty($xacNhanMatKhau))) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Mật khẩu không khớp!"]);
        return;
    }

    $isChangingPassword = true;
}

try {
    $userModel = new app_models_NguoiDung();

    $userList = $userModel->getAllUsers();

    foreach ($userList as $user) {
        if ($user['soDT'] === $soDT && $user['maNguoiDung'] != $maNguoiDung) {
            echo json_encode(["success" => false, "message" => "Số điện thoại đã tồn tại!"]);
            return;
        }

        if ($user['email'] === $email && $user['maNguoiDung'] != $maNguoiDung) {
            echo json_encode(["success" => false, "message" => "Email đã tồn tại!"]);
            return;
        }
    }

    if ($isChangingPassword) {
        $hashedPassword = md5($matKhau);
        $newUserData = [
            "hoVaTen" => $hovaten,
            "soDT" => $soDT,
            "email" => $email,
            "matKhau" => $hashedPassword,
            "ngayCapNhat" => $currentTime
        ];
        $result = $userModel->updateUser($maNguoiDung, $newUserData);
        if ($result) {
            echo json_encode(["success" => true, "message" => "Cập nhật thành công!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Cập nhật không thành công!"]);
        }
    } else {
        $newUserData = [
            "hoVaTen" => $hovaten,
            "soDT" => $soDT,
            "email" => $email,
            "ngayCapNhat" => $currentTime
        ];
        $result = $userModel->updateUser($maNguoiDung, $newUserData);
        if ($result) {
            echo json_encode(["success" => true, "message" => "Cập nhật thành công!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Cập nhật không thành công!"]);
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>