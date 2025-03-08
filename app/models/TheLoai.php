<?php
class app_models_TheLoai extends app_libs_DBConnection {
    protected $table_name = "TheLoai";

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
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maTheLoai = ?',
            'params' => [$maTheLoai]
        ])->update();
    }

    // Xóa thể loại
    public function deleteCategory($maTheLoai) {
        return $this->building_queryParam([
            'where' => 'maTheLoai = ?',
            'params' => [$maTheLoai]
        ])->delete();
    }
}
?>
