<?php
class app_models_Sach extends app_libs_DBConnection {
    protected $table_name = 'Sach';

    // Lấy tất cả sách
    public function getAllBooks() {
        return $this->building_queryParam()->select();
    }

    // Lấy sách theo ID
    public function getBookById($maSach) {
        return $this->building_queryParam([
            'where' => 'maSach = ?',
            'params' => [$maSach]
        ])->select_one();
    }

    // Thêm sách mới
    public function insertBook($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật sách
    public function updateBook($maSach, $data) {
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maSach = ?',
            'params' => [$maSach]
        ])->update();
    }

    // Xóa sách
    public function deleteBook($maSach) {
        return $this->building_queryParam([
            'where' => 'maSach = ?',
            'params' => [$maSach]
        ])->delete();
    }

    // Lấy sách theo mã loại
    public function getBooksByCategory($id) {
        return $this->building_queryParam([
            'where' => 'maTheLoai = ?',
            'params' => [$id]
        ])->select();
    }

    public function getBookByPrice($minPrice = 0, $maxPrice = INF) {
        return $this->building_queryParam([
            'where' => 'giaBan >= ? and giaBan <= ?',
            'params' => [$minPrice, $maxPrice]
        ]);
    }

    

}
?>
