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
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật thông tin tác giả
    public function updateInputTicket($maPhieuNhap, $data) {
        $fieldValues = [];
        $params = [':maPhieuNhap' => $maPhieuNhap];
    
        foreach ($data as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;
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
