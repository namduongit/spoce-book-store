<?php
class app_models_DonHang extends app_libs_DBConnection
{
    protected $table_name = 'donHang';

    // Lấy tất cả đơn hàng
    public function getAllOrders()
    {
        return $this->building_queryParam()->select();
    }

    // Lấy đơn hàng theo ID
    public function getOrderById($maDonHang)
    {
        return $this->building_queryParam([
            'where' => 'maDonHang = ?',
            'params' => [$maDonHang]
        ])->select_one();
    }

    // Thêm đơn hàng mới
    public function insertOrder($data)
    {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật đơn hàng
    public function updateOrder($maDonHang, $data)
    {
        $data['maDonHang'] = $maDonHang;
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maDonHang = :maDonHang'
        ])->update();
    }

    // Xóa đơn hàng
    public function deleteOrder($maDonHang)
    {
        return $this->building_queryParam([
            'where' => 'maDonHang = ?',
            'params' => [$maDonHang]
        ])->delete();
    }

    // Lấy đơn hàng theo mã khách hàng
    public function getOrdersByCustomer($maKhachHang)
    {
        return $this->building_queryParam([
            'where' => 'maKhachHang = ?',
            'params' => [$maKhachHang]
        ])->select();
    }

    // Lấy đơn hàng theo trạng thái
    public function getOrdersByStatus($trangThai)
    {
        return $this->building_queryParam([
            'where' => 'trangThai = ?',
            'params' => [$trangThai]
        ])->select();
    }

    // Lấy danh sách đơn hàng với các bộ lọc
    public function getOrderByFilters(
        $maDonHang = '',
        $maKhachHang = '',
        $trangThai = '',
        $ngayBatDau = '',
        $ngayKetThuc = '',
        $pageSize = 10,
        $page = 1
    ) {
        $conditions = [];
        $params = [];

        if (!empty($maDonHang)) {
            return $this->building_queryParam([
                'where' => 'maDonHang = ?',
                'params' => [$maDonHang]
            ])->select_one();
        }

        if (!empty($maKhachHang)) {
            $conditions[] = 'maKhachHang = ?';
            $params[] = $maKhachHang;
        }

        if (!empty($trangThai)) {
            $conditions[] = 'trangThai = ?';
            $params[] = $trangThai;
        }

        if (!empty($ngayBatDau)) {
            $conditions[] = 'ngayTaoDon >= ?';
            $params[] = $ngayBatDau;
        }

        if (!empty($ngayKetThuc)) {
            $conditions[] = 'ngayTaoDon <= ?';
            $params[] = $ngayKetThuc;
        }

        $whereClause = count($conditions) > 0 ? implode(' AND ', $conditions) : '1';

        // Tính toán offset cho phân trang
        $offset = ($page - 1) * $pageSize;

        $queryParams = [
            'where' => $whereClause,
            'params' => $params,
            'other' => "ORDER BY ngayTaoDon DESC LIMIT $offset, $pageSize"
        ];

        return $this->building_queryParam($queryParams)->select();
    }

    // Đếm tổng số đơn hàng theo bộ lọc
    public function countOrders(
        $maKhachHang = '',
        $trangThai = '',
        $ngayBatDau = '',
        $ngayKetThuc = ''
    ) {
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
            $conditions[] = 'ngayTaoDon >= ?';
            $params[] = $ngayBatDau;
        }

        if (!empty($ngayKetThuc)) {
            $conditions[] = 'ngayTaoDon <= ?';
            $params[] = $ngayKetThuc;
        }

        $whereClause = count($conditions) > 0 ? implode(' AND ', $conditions) : '1';

        return $this->building_queryParam([
            'select' => 'COUNT(*) as total',
            'where' => $whereClause,
            'params' => $params
        ])->select_one()['total'];
    }
}
