<?php
class app_models_Sach extends app_libs_DBConnection {
    protected $table_name = 'sach';

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

    // Lấy sách theo khoảng giá
    public function getBookByPrice($minPrice = 0, $maxPrice = INF) {
        return $this->building_queryParam([
            'where' => 'giaBan >= ? and giaBan <= ?',
            'params' => [$minPrice, $maxPrice]
        ])->select();
    }



    public function getBookByFilters(
        $minPrice = 0,
        $maxPrice = null,
        $order_by = '',
        $category = '',
        $author = '',
        $id = '',
        $status = '',
        $name = '',
        $loaiBia = '',
        $nhaXuatBan = '',
        $namXuatBan = ''
    ) {

        if ($id === '' && $name === '' && $author === '' && $category === '' && $loaiBia === '' && $nhaXuatBan === '' && $namXuatBan === '') {
            return $this->building_queryParam()->select();
        }

        $conditions = [];
        $params = [];

        if (!empty($id)) {
            return $this->building_queryParam([
                'where' => 'maSach = ?',
                'params' => [$id]
            ])->select_one();
        }

        if ($minPrice > 0) {
            $conditions[] = 'giaBan >= ?';
            $params[] = $minPrice;
        }

        if ($maxPrice !== null) {
            $conditions[] = 'giaBan <= ?';
            $params[] = $maxPrice;
        }

        if (!empty($category) && $category !== 'allproduct') {
            $conditions[] = 'maTheLoai = ?';
            $params[] = $category;
        }

        if (!empty($author)) {
            $conditions[] = 'maTacGia = ?';
            $params[] = $author;
        }

        if ($status !== '') {
            $conditions[] = 'trangThai = ?';
            $params[] = $status;
        }

        if (!empty($name)) {
            $conditions[] = 'tenSach LIKE ?';
            $params[] = "%$name%";
        }

        if (!empty($loaiBia)) {
            $conditions[] = 'maLoaiBia = ?';
            $params[] = $loaiBia;
        }

        if (!empty($nhaXuatBan)) {
            $conditions[] = 'maNXB = ?';
            $params[] = $nhaXuatBan;
        }

        if (!empty($namXuatBan) && is_numeric($namXuatBan)) {
            $conditions[] = 'namXuatBan = ?';
            $params[] = $namXuatBan;
        }

        $whereClause = count($conditions) > 0 ? implode(' AND ', $conditions) : '1';

        $queryParams = [
            'where' => $whereClause,
            'params' => $params
        ];

        return $this->building_queryParam($queryParams)->select();
    }



}
?>
