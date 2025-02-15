<?php
    include '../app/config.php';

    // $a = new app_test_building(
    //     'mysql',
    //     'localhost',
    //     'estatebasic',
    //     'root',
    //     'NDuong205'
    // );


    // if ($a->open_connect() != null) {
    //     echo "Kết nối thành công";
    // } else echo "Kết nối thất bại";

    // $result = $a->query('SELECT * FROM building', []);

    // foreach ($result->fetchAll(PDO::FETCH_ASSOC) as $row) {
    //     print_r($row);
    //     echo "<br>";
    // }
    // $a->open_connect();

    // $result = $a->building_queryParam([
    //     'field' => [
    //         'name' => 'namduongit',
    //         'street' => 'test_street',
    //         'ward' => 'test_ward',
    //         'number_of_basement' => 2005
    //     ]
    // ])->insert();

    // echo "ID vừa được thêm vào là: " . $result;

    // $a->close_connect();