<?php
class app_models_DiaChiNguoiDung extends app_libs_DBConnection {
    protected $table_name = 'diaChiNguoiDung';

    // Lấy tất cả địa chỉ
    public function getAllAddresses() {
        return $this->building_queryParam()->select();
    }

    // Lấy địa chỉ theo mã người dùng
    public function getAddressesByUserId($maNguoiDung) {
        return $this->building_queryParam([
            'where' => 'maNguoiDung = ?',
            'params' => [$maNguoiDung]
        ])->select();
    }

    // Thêm địa chỉ mới
    public function insertAddress($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    // Cập nhật địa chỉ
    public function updateAddress($maDiaChi, $data) {
        $data['maDiaChi'] = $maDiaChi;
    
        return $this->building_queryParam([
            'value' => $data,
            'where' => 'maDiaChi = :maDiaChi',
            'params' => $data
        ])->update();
    }
    

    public function getAddressById($idAddress) {
        return $this->building_queryParam([
            'where' => 'maDiaChi = ?',
            'params' => [$idAddress]
        ])->select_one();
    }

    // Xóa địa chỉ
    public function deleteAddress($maDiaChi) {
        return $this->building_queryParam([
            'where' => 'maDiaChi = ?',
            'params' => [$maDiaChi]
        ])->delete();
    }

    public function deleteAddressByUser($maDiaChi, $maNguoiDung) {
        return $this->building_queryParam([
            'where' => 'maDiaChi = ? AND maNguoiDung = ?',
            'params' => [$maDiaChi, $maNguoiDung]
        ])->delete();
    }
    
}
?>
