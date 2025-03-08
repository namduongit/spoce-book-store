<?php
class app_models_ChiTietQuyen extends app_libs_DBConnection {
    protected $table_name = "ChiTietQuyen";

    // Lấy tất cả chi tiết quyền
    public function getAllRoleDetails() {
        return $this->building_queryParam()->select();
    }

    // Lấy chi tiết quyền theo mã quyền
    public function getRoleDetailsByRoleId($maQuyen) {
        return $this->building_queryParam([
            'where' => 'maQuyen = ?',
            'params' => [$maQuyen]
        ])->select();
    }

    // Lấy chi tiết quyền theo mã chức năng
    public function getRoleDetailsByFunctionId($maChucNang) {
        return $this->building_queryParam([
            'where' => 'maChucNang = ?',
            'params' => [$maChucNang]
        ])->select();
    }

    // Thêm chi tiết quyền mới
    public function insertRoleDetail($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật chi tiết quyền
    public function updateRoleDetail($maQuyen, $maChucNang, $maHanhDong, $data) {
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maQuyen = ? AND maChucNang = ? AND maHanhDong = ?',
            'params' => [$maQuyen, $maChucNang, $maHanhDong]
        ])->update();
    }

    // Xóa chi tiết quyền
    public function deleteRoleDetail($maQuyen, $maChucNang, $maHanhDong) {
        return $this->building_queryParam([
            'where' => 'maQuyen = ? AND maChucNang = ? AND maHanhDong = ?',
            'params' => [$maQuyen, $maChucNang, $maHanhDong]
        ])->delete();
    }
}
?>
