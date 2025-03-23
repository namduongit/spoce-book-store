<?php
class app_models_NguoiDung extends app_libs_DBConnection {
    protected $table_name = "nguoiDung";

    // Lấy tất cả người dùng
    public function getAllUsers() {
        return $this->building_queryParam()->select();
    }

    // Lấy người dùng theo ID
    public function getUserById($maNguoiDung) {
        return $this->building_queryParam([
            'where' => 'maNguoiDung = ?',
            'params' => [$maNguoiDung]
        ])->select_one();
    }

    // Lấy người dùng theo tài khoản
    public function getUserByUsername($tenTaiKhoan) {
        return $this->building_queryParam([
            'where' => 'tenTaiKhoan = ?',
            'params' => [$tenTaiKhoan]
        ])->select_one();
    }

    // Thêm người dùng mới
    public function insertUser($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật người dùng
    public function updateUser($maNguoiDung, $data) {
        $data['maNguoiDung'] = $maNguoiDung;
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maNguoiDung = :maNguoiDung'
        ])->update();
    }

    // Xóa người dùng
    public function deleteUser($maNguoiDung) {
        return $this->building_queryParam([
            'where' => 'maNguoiDung = ?',
            'params' => [$maNguoiDung]
        ])->delete();
    }

    // Kiểm tra đăng nhập
    public function checkLogin($tenTaiKhoan, $matKhau) {
        return $this->building_queryParam([
            'where' => 'tenTaiKhoan = ? AND matKhau = ?',
            'params' => [$tenTaiKhoan, $matKhau]
        ])->select_one();
    }

    // Cập nhật mật khẩu người dùng
    public function updatePassword($maNguoiDung, $newPassword) {
        return $this->building_queryParam([
            'value' => ['matKhau' => $newPassword],
            'where' => 'maNguoiDung = ?',
            'params' => [$maNguoiDung]
        ])->update();
    }


    // Đăng nhập
    public function loginUser($username, $password) {
        return $this->building_queryParam([
            'where' => 'tenTaiKhoan = ? and matKhau = ?',
            'params' => [
                $username,
                $password
            ]
        ])->select_one();
    }

    // Kiểm tra tài khoản đẫ tồn tại
    public function isExistUsername($username) {
        return $this->building_queryParam([
            'where' => 'tenTaiKhoan = ?',
            'params' => [$username]
        ])->select_one();
    }

    public function getUsersByFilters(
        $userId = null,
        $username = '',
        $phone = '',
        $email = '',
        $role_id = null,
        $status = null,
        $updated_from = '',
        $updated_to = '',
        $order_by = ''
    ) {
        $conditions = [];
        $params = [];

        if (!empty($userId)) {
            $conditions[] = "maNguoiDung = ?";
            $params[] = $userId;
        }
        if (!empty($username)) {
            $conditions[] = "tenTaiKhoan LIKE ?";
            $params[] = "%$username%";
        }
        if (!empty($phone)) {
            $conditions[] = "soDT LIKE ?";
            $params[] = "%$phone%";
        }
        if (!empty($email)) {
            $conditions[] = "email LIKE ?";
            $params[] = "%$email%";
        }
        if (!empty($role_id)) {
            $conditions[] = "maQuyen = ?";
            $params[] = $role_id;
        }
        if (!empty($status)) {
            $conditions[] = "trangThai = ?";
            $params[] = $status;
        }
        if (!empty($updated_from)) {
            $conditions[] = "ngayCapNhat >= ?";
            $params[] = $updated_from;
        }
        if (!empty($updated_to)) {
            $conditions[] = "ngayCapNhat <= ?";
            $params[] = $updated_to;
        }

        $where_clause = count($conditions) > 0 ? implode(" AND ", $conditions) : '';

        $order_by_clause = !empty($order_by) ? "ORDER BY $order_by" : '';

        return $this->building_queryParam([
            'where' => $where_clause,
            'params' => $params,
            'other' => $order_by_clause
        ])->select();
    }
}
?>
