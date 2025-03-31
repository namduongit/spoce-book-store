<?php
class app_models_GioHang extends app_libs_DBConnection {
    protected $table_name = 'gioHang';

    // Lấy toàn bộ giỏ hàng của tất cả người dùng
    public function getAllCarts() {
        return $this->building_queryParam()->select();
    }

    // Lấy giỏ hàng của một người dùng theo mã người dùng
    public function getCartByUserId($maNguoiDung) {
        return $this->building_queryParam([
            'where' => 'maNguoiDung = ?',
            'params' => [$maNguoiDung]
        ])->select();
    }

    public function getCartItem($maNguoiDung, $maSach) {
        return $this->building_queryParam([
            'where' => 'maNguoiDung = ? AND maSach = ?',
            'params' => [$maNguoiDung, $maSach]
        ])->select_one();
    }

    public function updateCart($maNguoiDung, $data) {
        $data['maNguoiDung'] = $maNguoiDung;
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maNguoiDung = :maNguoiDung AND maSach = :maSach',
            'params' => $data
        ])->update();
    }
    
    public function addCartItem($maNguoiDung, $maSach, $soLuong) {
        return $this->building_queryParam([
            'field' => [
                'maNguoiDung' => $maNguoiDung,
                'maSach' => $maSach,
                'soLuong' => $soLuong
            ]
        ])->insert();
    }
    

    // Thêm sản phẩm vào giỏ hàng
    public function addToCart($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public function updateCartItem($maNguoiDung, $maSach, $soLuong) {
        return $this->building_queryParam([
            'value' => ['soLuong' => $soLuong],
            'where' => 'maNguoiDung = :maNguoiDung AND maSach = :maSach',
            'params' => ['maNguoiDung' => $maNguoiDung, 'maSach' => $maSach]
        ])->update();
    }

    // Xóa một sản phẩm khỏi giỏ hàng
    public function removeCartItem($maNguoiDung, $maSach) {
        return $this->building_queryParam([
            'where' => 'maNguoiDung = ? AND maSach = ?',
            'params' => [$maNguoiDung, $maSach]
        ])->delete();
    }

    // Xóa toàn bộ giỏ hàng của một người dùng
    public function clearCartByUser($maNguoiDung) {
        return $this->building_queryParam([
            'where' => 'maNguoiDung = ?',
            'params' => [$maNguoiDung]
        ])->delete();
    }
}
?>