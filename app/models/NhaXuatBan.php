<?php
class app_models_NhaXuatBan extends app_libs_DBConnection {
    protected $table_name = 'NhaXuatBan';

    // Lấy tất cả nhà xuất bản
    public function getAllPublishers() {
        return $this->building_queryParam()->select();
    }

    // Lấy nhà xuất bản theo ID
    public function getPublisherById($maNXB) {
        return $this->building_queryParam([
            'where' => 'maNXB = ?',
            'params' => [$maNXB]
        ])->select_one();
    }

    // Thêm nhà xuất bản mới
    public function insertPublisher($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật thông tin nhà xuất bản
    public function updatePublisher($maNXB, $data) {
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maNXB = ?',
            'params' => [$maNXB]
        ])->update();
    }

    // Xóa nhà xuất bản
    public function deletePublisher($maNXB) {
        return $this->building_queryParam([
            'where' => 'maNXB = ?',
            'params' => [$maNXB]
        ])->delete();
    }
}
?>
