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
        $fieldValues = [];
        $params = [':maSach' => $maSach];
    
        foreach ($data as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;
        }
        // Câu SQL cập nhật
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maSach = :maSach";
    
        // Thực thi câu lệnh SQL
        return $this->query($sql, $params);
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
        $loaiBia = [],
        $nhaXuatBan = [],
        $namXuatBan = '',
        $pageSize = 10,
        $page = 1
    ) {
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
    
        if (!is_null($maxPrice)) {
            $conditions[] = 'giaBan <= ?';
            $params[] = $maxPrice;
        }
    
        if (!empty($category) && $category !== 'allproduct') {
            $conditions[] = 'maTheLoai = ?';
            $params[] = $category;
        }
    
        if (!empty($author)) {

            $authorList = is_array($author) ? $author : explode(',', $author);
            $placeholders = implode(',', array_fill(0, count($authorList), '?'));
            $conditions[] = "maTacGia IN ($placeholders)";
            $params = array_merge($params, $authorList);
        }
    
        if (!empty($status)) {
            $conditions[] = 'trangThai = ?';
            $params[] = $status;
        }
    
        if (!empty($name)) {
            $conditions[] = 'tenSach LIKE ?';
            $params[] = "%$name%";
        }
    
        if (!empty($loaiBia)) {
            $loaiBiaList = is_array($loaiBia) ? $loaiBia : explode(',', $loaiBia);
            $placeholders = implode(',', array_fill(0, count($loaiBiaList), '?'));
            $conditions[] = "maLoaiBia IN ($placeholders)";
            $params = array_merge($params, $loaiBiaList);
        }
    
        if (!empty($nhaXuatBan)) {
            $nhaXuatBanList = is_array($nhaXuatBan) ? $nhaXuatBan : explode(',', $nhaXuatBan);
            $placeholders = implode(',', array_fill(0, count($nhaXuatBanList), '?'));
            $conditions[] = "maNXB IN ($placeholders)";
            $params = array_merge($params, $nhaXuatBanList);
        }
    
        if (!empty($namXuatBan) && is_numeric($namXuatBan)) {
            $conditions[] = 'namXuatBan = ?';
            $params[] = $namXuatBan;
        }
    
        $whereClause = count($conditions) > 0 ? implode(' AND ', $conditions) : '1';
    
        // Phân trang
        $offset = ($page - 1) * $pageSize;

        $orderByClause = 'giaBan ' . (strtoupper($order_by) === 'DESC' ? 'DESC' : 'ASC');
    
        // Truy vấn
        $queryParams = [
            'where' => $whereClause,
            'params' => $params,
            'other' => "ORDER BY $orderByClause LIMIT $pageSize OFFSET $offset"
        ];

        // echo '<pre>';
        // print_r($queryParams);
        // echo '</pre>';
        // die();
    
        return $this->building_queryParam($queryParams)->select();
    }
    




    public function countBooks(
        $minPrice = 0,
        $maxPrice = null,
        $order_by = '',
        $category = '',
        $author = '', // Đổi sang mảng để đồng nhất với getBookByFilters
        $id = '',
        $status = '',
        $name = '',
        $loaiBia = '', // Đổi sang mảng
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
            $authorList = is_array($author) ? $author : explode(',', $author);
            $placeholders = implode(',', array_fill(0, count($authorList), '?'));
            $conditions[] = "maTacGia IN ($placeholders)";
            $params = array_merge($params, $authorList);
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
            $loaiBiaList = is_array($loaiBia) ? $loaiBia : explode(',', $loaiBia);
            $placeholders = implode(',', array_fill(0, count($loaiBiaList), '?'));
            $conditions[] = "maLoaiBia IN ($placeholders)";
            $params = array_merge($params, $loaiBiaList);
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
