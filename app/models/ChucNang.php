<?php
class app_models_ChucNang extends app_libs_DBConnection {
    protected $table_name = 'chucNang';

    public function getAllPrivileges() {
        return $this->building_queryParam()->select();
    }
}

?>