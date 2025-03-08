<?php
class app_models_HanhDong extends app_libs_DBConnection {
    protected $table_name = "HanhDong";

    // Lấy tất cả hành động
    public function getAllActions() {
        return $this->building_queryParam()->select();
    }

    // Lấy hành động theo ID
    public function getActionById($maHanhDong) {
        return $this->building_queryParam([
            'where' => 'maHanhDong = ?',
            'params' => [$maHanhDong]
        ])->select_one();
    }

    // Thêm hành động mới
    public function insertAction($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật hành động
    public function updateAction($maHanhDong, $data) {
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maHanhDong = ?',
            'params' => [$maHanhDong]
        ])->update();
    }

    // Xóa hành động
    public function deleteAction($maHanhDong) {
        return $this->building_queryParam([
            'where' => 'maHanhDong = ?',
            'params' => [$maHanhDong]
        ])->delete();
    }
}
?>
