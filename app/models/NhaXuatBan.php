<?php
class app_models_NhaXuatBan extends app_libs_DBConnection {
    protected $table_name = 'nhaXuatBan';

    // Lấy tất cả nhà xuất bản
    public function getAllPublishers() {
        return $this->building_queryParam()->select();
    }

    // Lấy nhà xuất bản theo ID
    public function getPublisherById($maNXB) {
        return $this->building_queryParam([
            'where' => 'maNXB = ?',
            'params' => [$maNXB]
        ])->select_one();
    }

    // Lọc nhà xuất bản theo ID, tên, địa chỉ, trạng thái
    public function getPublisherByFilter($id = '', $name = '', $address = '', $status = '') {
        $conditions = [];
        $params = [];

        if (!empty($id)) {
            $conditions[] = 'maNXB = ?';
            $params[] = $id;
        }
        if (!empty($name)) {
            $conditions[] = 'tenNXB LIKE ?';
            $params[] = "%$name%";
        }
        if (!empty($address)) {
            $conditions[] = 'diaChi LIKE ?';
            $params[] = "%$address%";
        }
        if (!empty($status)) {
            $conditions[] = 'trangThai = ?';
            $params[] = $status;
        }

        $whereClause = !empty($conditions) ? implode(' AND ', $conditions) : '1';

        return $this->building_queryParam([
            'where' => $whereClause,
            'params' => $params
        ])->select();
    }

    // Thêm nhà xuất bản mới
    public function insertPublisher($data) {
        return $this->building_queryParam([
            'field' => $data
        ])->insert();
    }

    public function updatePublisher($maNXB, $data) {
        $fieldValues = [];
        $params = [':maNXB' => $maNXB];
    
        foreach ($data as $field => $value) {
            // Sử dụng cú pháp :{$field} để đảm bảo tên tham số được nối chính xác
            $fieldValues[] = "$field = :{$field}";
            $params[":{$field}"] = $value;
        }
    
        // Tạo câu SQL UPDATE
        $sql = "UPDATE " . $this->table_name . " SET " . implode(", ", $fieldValues) . " WHERE maNXB = :maNXB";
    
        // Thực thi câu lệnh SQL và trả về kết quả
        return $this->query($sql, $params);
    }
    
    

    // Xóa nhà xuất bản
    public function deletePublisher($maNXB) {
        return $this->building_queryParam([
            'where' => 'maNXB = ?',
            'params' => [$maNXB]
        ])->delete();
    }
}
?>
