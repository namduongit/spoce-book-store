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

    // Lấy sách theo khoảng giá
    public function getBookByPrice($minPrice = 0, $maxPrice = INF) {
        return $this->building_queryParam([
            'where' => 'giaBan >= ? and giaBan <= ?',
            'params' => [$minPrice, $maxPrice]
        ])->select();
    }

    // Lọc sách theo nhiều điều kiện
    public function getBookByFilters($minPrice = 0, $maxPrice = INF, $order_by = '', $category = '', $author = '', $id = '', $status = '', $name = '') {
        $conditions = [];
        $params = [];

        if (!empty($id)) {
            return $this->building_queryParam([
                'where' => 'maSach = ?',
                'params' => [$id]
            ])->select_one();
        } else {
            return $this->building_queryParam()->select();
        }

        if ($minPrice > 0) {
            $conditions[] = 'giaBan >= ?';
            $params[] = $minPrice;
        }

        if ($maxPrice !== INF) {
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

        $whereClause = count($conditions) > 0 ? implode(' AND ', $conditions) : '';

        $queryParams = [
            'where' => $whereClause,
            'params' => $params
        ];

        if (!empty($order_by)) {
            $queryParams['order'] = $order_by;
        }

        return $this->building_queryParam($queryParams)->select();
    }


}
?>
