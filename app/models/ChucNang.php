<?php
class app_models_ChucNang extends app_libs_DBConnection {
    protected $table_name = "ChucNang";

    // Lấy tất cả chức năng
    public function getAllFunctions() {
        return $this->building_queryParam()->select();
    }

    // Lấy chức năng theo ID
    public function getFunctionById($maChucNang) {
        return $this->building_queryParam([
            'where' => 'maChucNang = ?',
            'params' => [$maChucNang]
        ])->select_one();
    }

    // Thêm chức năng mới
    public function insertFunction($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật chức năng
    public function updateFunction($maChucNang, $data) {
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maChucNang = ?',
            'params' => [$maChucNang]
        ])->update();
    }

    // Xóa chức năng
    public function deleteFunction($maChucNang) {
        return $this->building_queryParam([
            'where' => 'maChucNang = ?',
            'params' => [$maChucNang]
        ])->delete();
    }
}
?>
