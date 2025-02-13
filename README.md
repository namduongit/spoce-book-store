# Giải thích sơ bộ class DBConnection: lớp dùng để kết nối và thực hiện lên cơ sở dữ liệu
1. Cú pháp
- implode(separator, array): tức là để nối các phần tử trong mảng và cách nhau thông qua separator
- array_keys($this->queryParam['field']); tức là lấy tức cả các key trong mảng liên kết
    + Ví dụ:
        $this->queryParam['field'] = [
            'name' => 'Building X',
            'street' => '123 Example St',
            'ward' => 'Ward 1',
            'number_of_basement' => 5
        ];
    + Kết quả: ['name', 'street', 'ward', 'number_of_basement']
- array_fill(0, count($fields), '?'); sẽ fill từ đâu đến đâu
    + Ví dụ: $placeholders = array_fill(0, 4, '?');
    + Kết quả: ['?', '?', '?', '?']

2. Cách sử dụng: Đọc ở admin/index.php có sử dụng