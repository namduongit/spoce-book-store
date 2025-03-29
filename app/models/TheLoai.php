<?php
class app_models_TheLoai extends app_libs_DBConnection {
    protected $table_name = "theLoai";

    // Lấy tất cả thể loại
    public function getAllCategories() {
        return $this->building_queryParam()->select();
    }

    // Lấy thể loại theo ID
    public function getCategoryById($maTheLoai) {
        return $this->building_queryParam([
            'where' => 'maTheLoai = ?',
            'params' => [$maTheLoai]
        ])->select_one();
    }

    // Thêm thể loại mới
    public function insertCategory($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật thể loại
    public function updateCategory($maTheLoai, $data) {
        $fieldValues = [];
        $params = [':maTheLoai' => $maTheLoai];
    
        foreach ($data as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;
        }
    
        // Tạo câu SQL UPDATE
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maTheLoai = :maTheLoai";
    
        // Thực thi câu lệnh SQL
        return $this->query($sql, $params);
    }
    
    // Xóa thể loại
    public function deleteCategory($maTheLoai) {
        return $this->building_queryParam([
            'where' => 'maTheLoai = ?',
            'params' => [$maTheLoai]
        ])->delete();
    }

    public function getCategoryByFilter($id = '', $name = '', $status = '') {
        $conditions = [];
        $params = [];

        if (!empty($id)) {
            $conditions[] = 'maTheLoai = ?';
            $params[] = $id;
        }

        if (!empty($name)) {
            $conditions[] = 'tenTheLoai LIKE ?';
            $params[] = "%$name%";
        }

        if ($status !== '') {
            $conditions[] = 'trangThai = ?';
            $params[] = $status;
        }

        $query = [];

        if (!empty($conditions)) {
            $query['where'] = implode(' AND ', $conditions);
            $query['params'] = $params;
        }

        return $this->building_queryParam($query)->select();
    }


}
?>
