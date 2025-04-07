<?php
class app_models_PhuongThucThanhToan extends app_libs_DBConnection {
    protected $table_name = 'phuongThucThanhToan';

    // Lấy tất cả phương thức thanh toán
    public function getAllPayments() {
        return $this->building_queryParam()->select();
    }

    public function getPaymentsActive() {
        return $this->building_queryParam([
            'where' => 'trangThai = ?',
            'params' => ['active']
        ])->select();
    }

    public function getPaymentsByFilter($id = '', $name = '', $status = '') {
        $conditions = [];
        $params = [];

        if (!empty($id)) {
            $conditions[] = 'maPhuongThuc = ?';
            $params[] = $id;
        }
        if (!empty($name)) {
            $conditions[] = 'tenPhuongThuc LIKE ?';
            $params[] = "%$name%";
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

    public function insertPayment($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    public function updatePayment($maPhuongThuc, $data) {
        $fieldValues = [];
        $params = [':maPhuongThuc' => $maPhuongThuc];
    
        foreach ($data as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;  
        }
    
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maPhuongThuc = :maPhuongThuc";
        return $this->query($sql, $params);
    }

    public function deletePayment($maPhuongThuc) {
        return $this->building_queryParam([
            'where' => 'maPhuongThuc = ?',
            'params' => [$maPhuongThuc]
        ])->delete();
    }

    public function getPaymentById($maPhuongThuc) {
        return $this->building_queryParam([
            'where' => 'maPhuongThuc = ?',
            'params' => [$maPhuongThuc]
        ])->select_one();
    }
}
?>
