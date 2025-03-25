-- Thiết lập bảng mã ký tự UTF-8
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection=utf8mb4;

-- Thêm dữ liệu mẫu vào bảng donHang
INSERT INTO donHang (maDonHang, ngayTaoDon, maKhachHang, maKhuyenMai, diaChiGiao, tongTienThu, trangThai, ngayCapNhat) VALUES
(1, '2024-03-01', 10, 1, '123 Duong Le Loi, Ha Noi', 500000, 'Dang xu ly', '2024-03-01'),
(2, '2024-03-05', 10, 1, '123 Duong Le Loi, Ha Noi', 750000, 'Dang giao', '2024-03-06'),
(3, '2024-03-02', 11, 1, '456 Nguyen Trai, TP. HCM', 600000, 'Hoan thanh', '2024-03-03'),
(4, '2024-03-06', 11, 1, '456 Nguyen Trai, TP. HCM', 820000, 'Dang giao', '2024-03-07'),
(5, '2024-03-03', 12, 1, '78 Hai Ba Trung, Da Nang', 450000, 'Dang xu ly', '2024-03-03'),
(6, '2024-03-07', 12, 1, '78 Hai Ba Trung, Da Nang', 680000, 'Da huy', '2024-03-08'),
(7, '2024-03-04', 13, 1, '99 Ly Tu Trong, Can Tho', 720000, 'Hoan thanh', '2024-03-05'),
(8, '2024-03-08', 13, 1, '99 Ly Tu Trong, Can Tho', 900000, 'Dang xu ly', '2024-03-08'),
(9, '2024-03-05', 14, 1, '102 Phan Dinh Phung, Hai Phong', 550000, 'Da huy', '2024-03-06'),
(10, '2024-03-09', 14, 1, '102 Phan Dinh Phung, Hai Phong', 780000, 'Hoan thanh', '2024-03-10'),
(11, '2024-03-06', 15, 1, '204 Tran Hung Dao, Bac Giang', 630000, 'Dang giao', '2024-03-07'),
(12, '2024-03-10', 15, 1, '204 Tran Hung Dao, Bac Giang', 850000, 'Hoan thanh', '2024-03-11'),
(13, '2024-03-07', 16, 1, '34 Truong Chinh, Bac Ninh', 700000, 'Dang xu ly', '2024-03-07'),
(14, '2024-03-11', 16, 1, '34 Truong Chinh, Bac Ninh', 920000, 'Dang giao', '2024-03-12');

-- Thêm dữ liệu mẫu vào bảng chiTietDonHang
INSERT INTO chiTietDonHang (maDonHang, maSach, soLuong, tienThu) VALUES
(1, 'S001', 2, 80000),
(1, 'S002', 1, 70000),
(2, 'S003', 3, 150000),
(2, 'S004', 1, 100000),
(3, 'S005', 2, 90000),
(3, 'S001', 1, 90000),
(4, 'S002', 2, 140000),
(4, 'S003', 1, 160000),
(5, 'S004', 1, 120000); 