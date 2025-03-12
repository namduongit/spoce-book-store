<?php
class app_models_LoaiBia extends app_libs_DBConnection {
    protected $table_name = 'LoaiBia';

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

    // Thêm loại bìa mới
    public function insertCover($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật loại bìa
    public function updateCover($maLoaiBia, $data) {
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maLoaiBia = ?',
            'params' => [$maLoaiBia]
        ])->update();
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
