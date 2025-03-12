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

    public function getAuthorByFilter($id = '', $name = '', $status = '') {
        $conditions = [];
        $params = [];

        if (!empty($id)) {
            $conditions[] = 'maTacGia = ?';
            $params[] = $id;
        }

        if (!empty($name)) {
            $conditions[] = 'tenTacGia LIKE ?';
            $params[] = "%$name%";
        }

        if ($status !== '') {
            $conditions[] = 'trangThai = ?';
            $params[] = $status;
        }

        $whereClause = count($conditions) > 0 ? implode(' AND ', $conditions) : '';

        return $this->building_queryParam([
            'where' => $whereClause,
            'params' => $params
        ])->select();
    }

}
?>
