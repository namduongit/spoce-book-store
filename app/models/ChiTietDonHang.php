<?php
class app_models_ChiTietDonHang extends app_libs_DBConnection {
    protected $table_name = 'chiTietDonHang';

    public function getAllOrderDetail() {
        return $this->building_queryParam()->select();
    }

    public function getOrderDetailByOrderId($orderId) {
        return $this->building_queryParam(
            [
                'where' => 'maDonHang = ?',
                'params' => [$orderId]
            ]
        )->select();
    }

    public function insertDetailOrder($data) {; 
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }
}
?>
