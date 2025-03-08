# app_libs_DBConnection

## **Mô tả**
Đây là một class PHP giúp kết nối với cơ sở dữ liệu MySQL và thực hiện các thao tác **CRUD** (Create, Read, Update, Delete).
Tác giả: **Nguyễn Nam Dương**

---

## **1. Kết nối đến CSDL**
```php
$db = new app_libs_DBConnection();
$connection = $db->open_connect();
if ($connection) {
    echo "Kết nối thành công!";
} else {
    echo "Kết nối thất bại!";
}
```

---

## **2. Truy vấn `SELECT` dữ liệu**
### **Lấy tất cả sách**
```php
$db = new app_libs_DBConnection();
$db->table_name = 'Sach';
$data = $db->building_queryParam([
    'select' => '*'
])->select();

print_r($data);
```

### **Lấy danh sách sách theo thể loại**
```php
$db = new app_libs_DBConnection();
$db->table_name = 'Sach';
$data = $db->building_queryParam([
    'select' => '*',
    'where' => 'maTheLoai = :maTheLoai',
    'params' => [':maTheLoai' => 1] // Ví dụ: Lấy sách có mã thể loại là 1
])->select();

print_r($data);
```

---

## **3. Truy vấn `SELECT ONE` (lấy 1 bản ghi)**
### **Lấy thông tin của một cuốn sách cụ thể**
```php
$db = new app_libs_DBConnection();
$db->table_name = 'Sach';
$book = $db->building_queryParam([
    'select' => '*',
    'where' => 'maSach = :maSach',
    'params' => [':maSach' => 10] // Lấy sách có mã là 10
])->select_one();

print_r($book);
```

---

## **4. Thêm dữ liệu (`INSERT`)**
### **Thêm một cuốn sách mới**
```php
$db = new app_libs_DBConnection();
$db->table_name = 'Sach';
$bookId = $db->building_queryParam([
    'field' => [
        'maSach' => 101,
        'tenSach' => 'Lập trình PHP',
        'soTrang' => 300,
        'kichThuoc' => '15x20cm',
        'moTa' => 'Sách hướng dẫn lập trình PHP',
        'maTacGia' => 2,
        'maTheLoai' => 1,
        'maLoaiBia' => 3,
        'maNXB' => 4,
        'namXuatBan' => 2024,
        'giaTran' => 150000,
        'giaBan' => 120000,
        'hinhAnh' => 'php-book.jpg',
        'trangThai' => 1,
        'ngayCapNhat' => date('Y-m-d H:i:s')
    ]
])->insert();

echo "Thêm sách thành công, ID sách: " . $bookId;
```

---

## **5. Cập nhật dữ liệu (`UPDATE`)**
### **Cập nhật giá bán của một cuốn sách**
```php
$db = new app_libs_DBConnection();
$db->table_name = 'Sach';
$db->building_queryParam([
    'value' => [
        'giaBan' => 110000, // Cập nhật giá bán thành 110000
        'ngayCapNhat' => date('Y-m-d H:i:s')
    ],
    'where' => 'maSach = :maSach',
    'params' => [':maSach' => 101] // Cập nhật sách có mã 101
])->update();

echo "Cập nhật thành công!";
```

---

## **6. Xóa dữ liệu (`DELETE`)**
### **Xóa một cuốn sách khỏi CSDL**
```php
$db = new app_libs_DBConnection();
$db->table_name = 'Sach';
$db->building_queryParam([
    'where' => 'maSach = :maSach',
    'params' => [':maSach' => 101] // Xóa sách có mã 101
])->delete();

echo "Xóa thành công!";
```

---

## **7. Đóng kết nối CSDL**
```php
$db->close_connect();
echo "Đã đóng kết nối!";
```

