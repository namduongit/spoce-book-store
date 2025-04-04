<?php
class app_models_PhieuNhap extends app_libs_DBConnection {
    protected $table_name = 'phieuNhap';

    // Lấy tất cả tác giả
    public function getAllInputTicket() {
        return $this->building_queryParam()->select();
    }

    // Lấy tác giả theo ID
    public function getInputTicketById($maPhieuNhap) {
        return $this->building_queryParam([
            'where' => 'maPhieuNhap = ?',
            'params' => [$maPhieuNhap]
        ])->select_one();
    }

    // Thêm tác giả mới
    public function insertInputTicket($data) {
        if (self::$connection == null) self::$connection = $this->open_connect();
    
        $fields = array_keys($data);
        $placeholders = array_map(fn($field) => ":$field", $fields);
    
        $sql = "INSERT INTO " . $this->table_name . " (" . implode(", ", $fields) . ") VALUES (" . implode(", ", $placeholders) . ")";
    
        try {
            $query = self::$connection->prepare($sql);
            if ($query->execute($data)) {
                return self::$connection->lastInsertId(); // Trả về ID nếu thành công
            }
            return false; // Nếu execute() thất bại, trả về false
        } catch (PDOException $e) {
            return false; // Trả về false nếu có lỗi SQL
        }
    }
    

    // Cập nhật thông tin tác giả
    public function updateInputTicket($maPhieuNhap, $data) {
        $fieldValues = [];
        $params = [':maPhieuNhap' => $maPhieuNhap];
    
        // Duyệt qua các trường trong mảng $data
        foreach ($data as $field => $value) {
            // Kiểm tra nếu giá trị không phải là chuỗi rỗng
            if ($value != '') {
                // Thêm vào mảng $fieldValues chỉ khi giá trị không rỗng
                $fieldValues[] = "$field = :$field";
                $params[":$field"] = $value;
            }
        }
    
        // Tạo câu SQL UPDATE
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maPhieuNhap = :maPhieuNhap";
    
        // Thực thi câu lệnh SQL
        return $this->query($sql, $params);
    }
    
    
    

    // Xóa tác giả
    public function deleteInputTicket($maPhieuNhap) {
        return $this->building_queryParam([
            'where' => 'maPhieuNhap = ?',
            'params' => [$maPhieuNhap]
        ])->delete();
    }

    // Lấy danh sách sách của một tác giả
    public function getBooksByInputTicket($maPhieuNhap) {
        return $this->building_queryParam([
            'where' => 'maPhieuNhap = ?',
            'params' => [$maPhieuNhap]
        ])->select();
    }

    public function getInputTicketByFilter($id = '', $DateInit = '', $userName = '', $supplierId = '', $total= '', $status = '') {
        $conditions = [];
        $params = [];

        if (!empty($id)) {
            $conditions[] = 'maPhieuNhap = ?';
            $params[] = $id;
        }

        if (!empty($DateInit)) {
            $conditions[] = 'ngayTaoPhieu = ?';
            $params[] = $DateInit;
        }
        if (!empty($userName)) {
            $conditions[] = 'taiKhoanNhanVien = ?';
            $params[] = $userName;
        }
        if (!empty($supplierId)) {
            $conditions[] = 'maNCC = ?';
            $params[] = $supplierId;
        }
        if (!empty($total)) {
            $conditions[] = 'tongTienNhap = ?';
            $params[] = $total;
        }
        
        if ($status !== '') {
            $conditions[] = 'trangThai = ?';
            $params[] = $status;
        }

        $whereClause = count($conditions) > 0 ? implode(' AND ', $conditions) : '';

        return $this->building_queryParam([
            'where' => $whereClause,
            'params' => $params
        ])->select();
    }

}
?>
