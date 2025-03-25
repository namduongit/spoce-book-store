-- Thiết lập bảng mã ký tự UTF-8
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection=utf8mb4;

-- Thêm dữ liệu mẫu vào bảng nguoiDung
INSERT INTO nguoiDung (maNguoiDung, tenNguoiDung, email, soDienThoai, diaChi, ngayTao, trangThai) VALUES
(10, 'Nguyen Van A', 'nguyenvana@email.com', '0123456789', '123 Duong Le Loi, Ha Noi', '2024-03-01', 1),
(11, 'Tran Thi B', 'tranthib@email.com', '0987654321', '456 Nguyen Trai, TP. HCM', '2024-03-01', 1),
(12, 'Le Van C', 'levanc@email.com', '0369852147', '78 Hai Ba Trung, Da Nang', '2024-03-01', 1),
(13, 'Pham Thi D', 'phamthid@email.com', '0147852369', '99 Ly Tu Trong, Can Tho', '2024-03-01', 1),
(14, 'Hoang Van E', 'hoangvane@email.com', '0258963147', '102 Phan Dinh Phung, Hai Phong', '2024-03-01', 1),
(15, 'Mai Thi F', 'maithif@email.com', '0369852147', '204 Tran Hung Dao, Bac Giang', '2024-03-01', 1),
(16, 'Dang Van G', 'dangvang@email.com', '0147852369', '34 Truong Chinh, Bac Ninh', '2024-03-01', 1); 