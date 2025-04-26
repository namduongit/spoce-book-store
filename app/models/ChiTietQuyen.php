<?php 
class app_models_ChiTietQuyen extends app_libs_DBConnection {
    protected $table_name = 'chiTietQuyen';

    public function insertRoleDetail($maQuyen, $maChucNang, $maHanhDong) {
        $data = [
            'maQuyen' => $maQuyen,
            'maChucNang' => $maChucNang,
            'maHanhDong' => $maHanhDong
        ];

        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    public function detailsRole($maQuyen) {
        return $this->building_queryParam([
            'where' => 'maQuyen = ?',
            'params' => [$maQuyen]
        ])->select();
    }

    public function deleteRole($maQuyen) {
        return $this->building_queryParam([
            'where' => 'maQuyen = ?',
            'params' => [$maQuyen]
        ])->delete();
    }


}

?>