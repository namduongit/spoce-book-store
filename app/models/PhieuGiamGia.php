<?php
class app_models_PhieuGiamGia extends app_libs_DBConnection
{
    protected $table_name = 'phieuGiamGia';

    // Lấy tất cả phiếu giảm giá
    public function getAllDiscounts()
    {
        return $this->building_queryParam()->select();
    }

    // Lấy phiếu giảm giá theo ID
    public function getDiscountById($maPGG)
    {
        return $this->building_queryParam([
            'where' => 'maPGG = ?',
            'params' => [$maPGG]
        ])->select_one();
    }

    // Lọc phiếu giảm giá theo ID, mã khách hàng, mã sản phẩm, trạng thái
    public function getDiscountByFilter($id = '', $maKhachHang = '', $maSanPham = '', $trangThai = '', $ngayBatDau = '', $ngayKetThuc = '', $limit = 10, $page = 1)
    {
        $offset = ($page - 1) * $limit;
        $conditions = [];
        $params = [];

        if (!empty($id)) {
            $conditions[] = 'maPGG = ?';
            $params[] = $id;
        }
        if (!empty($maKhachHang)) {
            $conditions[] = 'maKhachHang = ?';
            $params[] = $maKhachHang;
        }
        if (!empty($maSanPham)) {
            $conditions[] = 'maSanPham = ?';
            $params[] = $maSanPham;
        }
        if (!empty($trangThai)) {
            $conditions[] = 'trangThai = ?';
            $params[] = $trangThai;
        }

        $whereClause = !empty($conditions) ? implode(' AND ', $conditions) : '1';

        return $this->building_queryParam([
            'where' => $whereClause,
            'params' => $params,
            'limit' => "$offset, $limit"
        ])->select();
    }

    // Đếm số lượng phiếu giảm giá theo bộ lọc
    public function countDiscounts($maKhachHang = '', $trangThai = '', $ngayBatDau = '', $ngayKetThuc = '')
    {
        $conditions = [];
        $params = [];

        if (!empty($maKhachHang)) {
            $conditions[] = 'maKhachHang = ?';
            $params[] = $maKhachHang;
        }
        if (!empty($trangThai)) {
            $conditions[] = 'trangThai = ?';
            $params[] = $trangThai;
        }
        if (!empty($ngayBatDau)) {
            $conditions[] = 'ngayBatDau >= ?';
            $params[] = $ngayBatDau;
        }
        if (!empty($ngayKetThuc)) {
            $conditions[] = 'ngayKetThuc <= ?';
            $params[] = $ngayKetThuc;
        }

        $whereClause = !empty($conditions) ? implode(' AND ', $conditions) : '1';

        $result = $this->building_queryParam([
            'where' => $whereClause,
            'params' => $params,
            'select' => 'COUNT(*) as total'
        ])->select_one();

        return $result ? $result['total'] : 0;
    }
    // Thêm phiếu giảm giá mới
    public function insertDiscount($data)
    {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }
    // Cập nhật thông tin phiếu giảm giá
    public function updateDiscount($maPGG, $data)
    {
        $fieldValues = [];
        $params = [':maPGG' => $maPGG];
    
        foreach ($data as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;  // Chỉ dùng tham số có tên
        }
        // Tạo câu SQL UPDATE
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maPGG = :maPGG";
        // Thực thi câu lệnh SQL
        return $this->query($sql, $params);
    }
    // Xóa phiếu giảm giá
    public function deleteDiscount($maPGG)
    {
        return $this->building_queryParam([
            'where' => 'maPGG = ?',
            'params' => [$maPGG]
        ])->delete();
    }
    // Lấy mã phiếu giảm giá mới
    public function getNewDiscountCode()
    {
        $result = $this->building_queryParam([
            'order' => 'maPGG DESC',
            'limit' => 1
        ])->select_one();

        if ($result) {
            $lastCode = $result['maPGG'];
            $newCode = (int)substr($lastCode, 2) + 1;
            return 'PG' . str_pad($newCode, 5, '0', STR_PAD_LEFT);
        } else {
            return 'PG00001'; // Mã đầu tiên nếu không có mã nào trong cơ sở dữ liệu
        }
    }
    // Lấy mã phiếu giảm giá theo mã khách hàng
    public function getDiscountByCustomerId($maKhachHang)
    {
        return $this->building_queryParam([
            'where' => 'maKhachHang = ?',
            'params' => [$maKhachHang]
        ])->select();
    }
    // Lấy mã phiếu giảm giá theo mã sản phẩm
    public function getDiscountByProductId($maSanPham)
    {
        return $this->building_queryParam([
            'where' => 'maSanPham = ?',
            'params' => [$maSanPham]
        ])->select();
    }
}