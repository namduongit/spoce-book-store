<?php
class app_models_TacGia extends app_libs_DBConnection {
    protected $table_name = 'TacGia';

    // Lấy tất cả tác giả
    public function getAllAuthors() {
        return $this->building_queryParam()->select();
    }

    // Lấy tác giả theo ID
    public function getAuthorById($maTacGia) {
        return $this->building_queryParam([
            'where' => 'maTacGia = ?',
            'params' => [$maTacGia]
        ])->select_one();
    }

    // Thêm tác giả mới
    public function insertAuthor($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật thông tin tác giả
    public function updateAuthor($maTacGia, $data) {
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maTacGia = ?',
            'params' => [$maTacGia]
        ])->update();
    }

    // Xóa tác giả
    public function deleteAuthor($maTacGia) {
        return $this->building_queryParam([
            'where' => 'maTacGia = ?',
            'params' => [$maTacGia]
        ])->delete();
    }

    // Lấy danh sách sách của một tác giả
    public function getBooksByAuthor($maTacGia) {
        return $this->building_queryParam([
            'where' => 'maTacGia = ?',
            'params' => [$maTacGia]
        ])->select();
    }
}
?>
