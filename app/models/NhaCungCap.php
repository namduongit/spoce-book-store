<?php
class app_models_NhaCungCap extends app_libs_DBConnection {
    protected $table_name = 'nhaCungCap';

    // Lấy tất cả nhà xuất bản
    public function getAllSupplier() {
        return $this->building_queryParam()->select();
    }

    // Lấy nhà xuất bản theo ID
    public function getSupplierById($maNCC) {
        return $this->building_queryParam([
            'where' => 'maNCC = ?',
            'params' => [$maNCC]
        ])->select_one();
    }

    // Lọc nhà cung cấp theo ID, tên, địa chỉ, trạng thái
    public function getSupplierByFilter($id = '', $name = '' , $phone ='', $email = '', $address = '', $status = '') {
        $conditions = [];
        $params = [];

        if (!empty($id)) {
            $conditions[] = 'maNCC = ?';
            $params[] = $id;
        }
        if (!empty($name)) {
            $conditions[] = 'tenNCC LIKE ?';
            $params[] = "%$name%";
        }
        if (!empty($phone)) {
            $conditions[] = 'soDT = ?';
            $params[] = $phone;
        }
        if (!empty($email)) {
            $conditions[] = 'email = ?';
            $params[] = $email;
        }
        if (!empty($address)) {
            $conditions[] = 'diaChi LIKE ?';
            $params[] = "%$address%";
        }
        if (!empty($status)) {
            $conditions[] = 'trangThai = ?';
            $params[] = $status;
        }

        $whereClause = !empty($conditions) ? implode(' AND ', $conditions) : '1';

        return $this->building_queryParam([
            'where' => $whereClause,
            'params' => $params
        ])->select();
    }

    // Thêm nhà xuất bản mới
    public function insertSupplier($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật thông tin nhà xuất bản
    public function updateSupplier($maNCC, $data) {
        $fieldValues = [];
        $params = [':maNCC' => $maNCC];
    
        foreach ($data as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;  // Chỉ dùng tham số có tên
        }
        // Tạo câu SQL UPDATE
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maNCC = :maNCC";
        // Thực thi câu lệnh SQL
        return $this->query($sql, $params);
    }
    

    // Xóa nhà xuất bản
    public function deleteSuplier($maNCC) {
        return $this->building_queryParam([
            'where' => 'maNCC = ?',
            'params' => [$maNCC]
        ])->delete();
    }
}
?>
