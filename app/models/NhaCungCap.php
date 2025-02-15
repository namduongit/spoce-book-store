<?php

class app_models_NhaCungCap extends app_libs_DBConnection {
    protected $table_name = "NhaCungCap";

    public $id;
    public $name;

    public $phone;
    public $email;
    public $address;
    public $active_status;
    public $date_update;
}