<?php
class app_models_LoaiBia extends app_libs_DBConnection {
    protected $table_name = 'loaiBia';

    // Lấy tất cả loại bìa
    public function getAllCovers() {
        return $this->building_queryParam()->select();
    }

    // Lấy loại bìa theo ID
    public function getCoverById($maLoaiBia) {
        return $this->building_queryParam([
            'where' => 'maLoaiBia = ?',
            'params' => [$maLoaiBia]
        ])->select_one();
    }

    // Lọc loại bìa theo ID, tên, trạng thái
    public function getCoverByFilter($id = '', $name = '', $status = '') {
        $conditions = [];
        $params = [];

        if (!empty($id)) {
            $conditions[] = 'maLoaiBia = ?';
            $params[] = $id;
        }
        if (!empty($name)) {
            $conditions[] = 'tenLoaiBia LIKE ?';
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

    // Thêm loại bìa mới
    public function insertCover($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật loại bìa
    public function updateCover($maLoaiBia, $data) {
        $fieldValues = [];
        $params = [':maLoaiBia' => $maLoaiBia];
    
        foreach ($data as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;  // Chỉ dùng tham số có tên
        }
    
        // Tạo câu SQL UPDATE
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maLoaiBia = :maLoaiBia";
        // Thực thi câu lệnh SQL
        return $this->query($sql, $params);
    }
    

    // Xóa loại bìa
    public function deleteCover($maLoaiBia) {
        return $this->building_queryParam([
            'where' => 'maLoaiBia = ?',
            'params' => [$maLoaiBia]
        ])->delete();
    }
}
?>
