<?php
class app_models_HanhDong extends app_libs_DBConnection {
    protected $table_name = 'hanhDong';

    public function getAllAction() {
        return $this->building_queryParam()->select();
    }
}

?>