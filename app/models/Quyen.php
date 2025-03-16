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
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maQuyen = ?',
            'params' => [$maQuyen]
        ])->update();
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
