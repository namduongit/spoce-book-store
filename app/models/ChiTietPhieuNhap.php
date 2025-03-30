<?php
class app_models_ChitietPhieuNhap extends app_libs_DBConnection {
    protected $table_name = 'chiTietPhieuNhap';



    // Thêm  mới
    public function insertInputTicketDetail($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

  
    // public function updateInputTicketDetail($data) {
    //     $fieldValues = [];
    //     $params = [':maTacGia' => $maTacGia];
    
    //     foreach ($data as $field => $value) {
    //         $fieldValues[] = "$field = :$field";
    //         $params[":$field"] = $value;
    //     }
    
    //     // Tạo câu SQL UPDATE
    //     $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maTacGia = :maTacGia";
    
    //     // Thực thi câu lệnh SQL
    //     return $this->query($sql, $params);
    // }
    
    public function deleteAuthor($maInputTicket) {
        return $this->building_queryParam([
            'where' => 'maPhieuNhap = ?',
            'params' => [$maInputTicket]
        ])->delete();
    }
    

    public function getInputTicketDetailByInputTicketId($maInputTicket) {
         return $this->building_queryParam([
            'where' => 'maPhieuNhap = ?',
            'params' => [$maInputTicket]
        ])->select();
        // echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    


}
?>
