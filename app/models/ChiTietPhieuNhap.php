<?php
class app_models_ChitietPhieuNhap extends app_libs_DBConnection {
    protected $table_name = 'chiTietPhieuNhap';



    public function insertInputTicketDetail($data)
    {
        // Kết nối đến cơ sở dữ liệu
        if (self::$connection == null) self::$connection = $this->open_connect();

        // Xây dựng mảng các cột và giá trị cho câu lệnh INSERT
        $fields = array_keys($data); // Lấy các cột từ mảng $data
        $placeholders = array_fill(0, count($fields), '?'); // Tạo các dấu hỏi cho placeholders trong câu lệnh SQL

        // Tạo câu lệnh SQL
        $sql = 'INSERT INTO ' . $this->table_name . ' (' . implode(', ', $fields) . ') VALUES (' . implode(', ', $placeholders) . ')';

        // Thực thi câu lệnh SQL với các giá trị tương ứng từ mảng $data
        try {
            $stmt = self::$connection->prepare($sql);
            $stmt->execute(array_values($data)); // Truyền các giá trị từ mảng $data vào câu lệnh SQL

            // Kiểm tra xem có bản ghi nào được thêm không
            if ($stmt->rowCount() > 0) {
                return true; // Trả về true nếu thành công
            } else {
                return false; // Trả về false nếu không có thay đổi
            }
        } catch (PDOException $e) {
            // Nếu có lỗi, trả về false và in ra lỗi
            error_log('Database Error: ' . $e->getMessage());
            return false;
        }
    }

     // Cập nhật loại bìa
     public function updateInputDetail($inputTicketId, $bookId, $data) {
        $fieldValues = [];
        $params = [':maLoaiBia' => $inputTicketId, ':maSach' => $bookId];
    
        foreach ($data as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;  // Chỉ dùng tham số có tên
        }
    
        // Tạo câu SQL UPDATE
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maPhieuNhap = :maLoaiBia AND maSach = :maSach";
        // Thực thi câu lệnh SQL
        return $this->query($sql, $params);
    }
    
    public function deleteAllInputTicketDetail($maInputTicket) {
        if (self::$connection == null) {
            self::$connection = $this->open_connect();
        }
    
        $sql = "DELETE FROM " . $this->table_name . " WHERE maPhieuNhap = ?";
        $stmt = self::$connection->prepare($sql);
        return $stmt->execute([$maInputTicket]);
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