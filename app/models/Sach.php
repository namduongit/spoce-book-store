<?php
class app_models_Sach extends app_libs_DBConnection
{
    protected $table_name = 'sach';

    // Lấy tất cả sách
    public function getAllBooks()
    {
        return $this->building_queryParam()->select();
    }

    // Lấy sách theo ID
    public function getBookById($maSach)
    {
        return $this->building_queryParam([
            'where' => 'maSach = ?',
            'params' => [$maSach]
        ])->select_one();
    }

    // Thêm sách mới
    public function insertBook($data)
    {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật sách
    public function updateBook($maSach, $data)
    {
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maSach = ?',
            'params' => [$maSach]
        ])->update();
    }

    // Xóa sách
    public function deleteBook($maSach)
    {
        return $this->building_queryParam([
            'where' => 'maSach = ?',
            'params' => [$maSach]
        ])->delete();
    }

    // Lấy sách theo mã loại
    public function getBooksByCategory($id)
    {
        return $this->building_queryParam([
            'where' => 'maTheLoai = ?',
            'params' => [$id]
        ])->select();
    }

    // Lấy sách theo khoảng giá
    public function getBookByPrice($minPrice = 0, $maxPrice = INF)
    {
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
        $author = [],
        $id = '',
        $status = '',
        $name = '',
        $loaiBia = '',
        $nhaXuatBan = '',
        $namXuatBan = '',
        $pageSize = 10,  // trang mặc đinh là 10
        $page = 1        // trang đầu tiên
    ) {
        if ($id === '' && $name === '' && empty($author) && $category === '' && empty($loaiBia) && empty($nhaXuatBan) && $namXuatBan === '') {
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
            if (!is_array($author)) {
                $author = explode(',', $author);
            }
            $placeholders = implode(',', array_fill(0, count($author), '?'));
            $conditions[] = "maTacGia IN ($placeholders)";
            $params = array_merge($params, $author);
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
            if (!is_array($loaiBia)) {
                $loaiBia = explode(',', $loaiBia);
            }
            $placeholders = implode(',', array_fill(0, count($loaiBia), '?'));
            $conditions[] = "maLoaiBia IN ($placeholders)";
            $params = array_merge($params, $loaiBia);
        }

        if (!empty($nhaXuatBan)) {
            if (!is_array($nhaXuatBan)) {
                $nhaXuatBan = explode(',', $nhaXuatBan);
            }
            $placeholders = implode(',', array_fill(0, count($nhaXuatBan), '?'));
            $conditions[] = "maNXB IN ($placeholders)";
            $params = array_merge($params, $nhaXuatBan);
        }

        if (!empty($namXuatBan) && is_numeric($namXuatBan)) {
            $conditions[] = 'namXuatBan = ?';
            $params[] = $namXuatBan;
        }

        $whereClause = count($conditions) > 0 ? implode(' AND ', $conditions) : '1';

        //tính toán và OFFSET
        $offset = ($page - 1) * $pageSize;

        $queryParams = [
            'where' => $whereClause,
            'params' => $params,
            //thêm phân trang
            'limit' => $pageSize,
            'offset' => $offset
        ];

        return $this->building_queryParam($queryParams)->select();
    }
    public function countBooks(
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
        $conditions = [];
        $params = [];

        if ($minPrice > 0) {
            $conditions[] = 'giaBan >= ?';
            $params[] = $minPrice;
        }

        if ($maxPrice !== null) {
            $conditions[] = 'giaBan <= ?';
            $params[] = $maxPrice;
        }

        if (!empty($category)) {
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
        return $this->building_queryParam([
            'select' => 'COUNT(*) as total',
            'where' => $whereClause,
            'params' => $params
        ])->select_one()['total'];
    }
}
