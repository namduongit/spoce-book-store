<?php
class app_models_PhieuGiamGia extends app_libs_DBConnection {
    protected $table_name = "PhieuGiamGia";

    public $id;
    public $rate;
    public $day_start;
    public $day_end;
    public $active_status;
}