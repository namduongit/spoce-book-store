<?php
class app_models_Quyen extends app_libs_DBConnection {
    protected $table_name = "quyen";

    // Lấy tất cả quyền
    public function getAllRoles() {
        return $this->building_queryParam()->select();
    }

    // Lấy quyền theo ID
    public function getRoleById($maQuyen) {
        return $this->building_queryParam([
            'where' => 'maQuyen = ?',
            'params' => [$maQuyen]
        ])->select_one();
    }

    // Thêm quyền mới
    public function insertRole($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật quyền
    public function updateRole($maQuyen, $data) {
        $fieldValues = [];
        $params = [':maQuyen' => $maQuyen];

        foreach ($data as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;
        }
        // Câu SQL cập nhật
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maQuyen = :maQuyen";
        // Thực thi câu lệnh SQL
        return $this->query($sql, $params);
    }

    

    

    // Xóa quyền
    public function deleteRole($maQuyen) {
        return $this->building_queryParam([
            'where' => 'maQuyen = ?',
            'params' => [$maQuyen]
        ])->delete();
    }
}
?>
