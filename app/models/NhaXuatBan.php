<?php
class app_models_NhaXuatBan extends app_libs_DBConnection {
    protected $table_name = "NhaXuatBan";

    public $id;
    public $name;
    public $active_status;
}