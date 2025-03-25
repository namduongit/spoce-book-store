-- Thiết lập bảng mã ký tự UTF-8
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection=utf8mb4;

-- Thay đổi giá trị ENUM của cột type trong bảng phieuGiamGia
ALTER TABLE phieuGiamGia MODIFY COLUMN type ENUM('phan tram', 'gia tri hien kim');

-- Thêm dữ liệu mẫu vào bảng quyen
INSERT INTO quyen (maQuyen, tenQuyen, trangThai)
VALUES
(1, 'Nhan vien', 'Hoat dong'),
(2, 'Quan li', 'Hoat dong'),
(3, 'Quan kho', 'Hoat dong'),
(4, 'Khach hang', 'Hoat dong');

-- Thêm dữ liệu mẫu vào bảng nguoiDung
INSERT INTO nguoiDung (maNguoiDung, hoVaTen, soDT, email, diaChi, tenTaiKhoan, matKhau, maQuyen, trangThai, ngayCapNhat)
VALUES
(1, 'Nguyen Van Hung', '0987654321', 'hung.nguyen@example.com', '123 Duong Le Loi, Ha Noi', 'nguyenhung', 'mk123456', 1, 'Hoat dong', '2024-03-12'),
(2, 'Tran Thi Mai', '0912345678', 'mai.tran@example.com', '456 Nguyen Trai, TP. HCM', 'tranmai', 'maimatkhau', 1, 'Hoat dong', '2024-03-10'),
(3, 'Le Quoc Bao', '0902233445', 'bao.le@example.com', '89 Duong Hoang Hoa Tham, Da Nang', 'lebao', 'bao123', 1, 'Hoat dong', '2024-03-09'),
(4, 'Pham Thi Hong', '0934567890', 'hong.pham@example.com', '99 Ly Tu Trong, Can Tho', 'hongpham', 'hongmatkhau', 2, 'Hoat dong', '2024-03-08'),
(5, 'Vu Minh Quan', '0911122334', 'quan.vu@example.com', '25 Nguyen Thi Minh Khai, Hai Phong', 'vuquan', 'quanpass', 2, 'Hoat dong', '2024-03-07'),
(6, 'Do Thi Thanh', '0968555777', 'thanh.do@example.com', '34 Truong Chinh, Bac Ninh', 'dothanh', 'thanhmk', 2, 'Hoat dong', '2024-03-06'),
(7, 'Dang Van Phuc', '0976543210', 'phuc.dang@example.com', '102 Phan Dinh Phung, Hai Phong', 'dangphuc', 'phuc123', 3, 'Hoat dong', '2024-03-05'),
(8, 'Hoang Minh Tuan', '0965124789', 'tuan.hoang@example.com', '204 Tran Hung Dao, Bac Giang', 'hoangtuan', 'tuanpass', 3, 'Hoat dong', '2024-03-04'),
(9, 'Nguyen Thi Ngoc Lan', '0958333444', 'lan.nguyen@example.com', '78 Pham Van Dong, Binh Dinh', 'ngoclan', 'lan123', 3, 'Hoat dong', '2024-03-03'),
(10, 'Bui Thi Lan', '0947891230', 'lan.bui@example.com', '36 Ho Xuan Huong, Nghe An', 'builan', 'lanmatkhau', 4, 'Hoat dong', '2024-03-02'),
(11, 'Duong Van Son', '0921345678', 'son.duong@example.com', '15 Nguyen Van Cu, Quang Ninh', 'duongson', 'sonpass', 4, 'Hoat dong', '2024-03-01'),
(12, 'Ngo Thi Hanh', '0919988776', 'hanh.ngo@example.com', '789 Lac Long Quan, Vinh Phuc', 'ngohanh', 'hanh1234', 4, 'Hoat dong', '2024-02-29'),
(13, 'Vu Anh Dung', '0988111222', 'dung.vu@example.com', '100 Le Van Luong, Hue', 'vudung', 'dungmk', 4, 'Hoat dong', '2024-02-28'),
(14, 'Trinh Thi Thu', '0977222333', 'thu.trinh@example.com', '25 Pham Van Dong, Binh Dinh', 'trinhthu', 'thu123', 4, 'Hoat dong', '2024-02-27'),
(15, 'Lam Van Hoa', '0955333444', 'hoa.lam@example.com', '178 Ly Thuong Kiet, Long An', 'lamhoa', 'hoa123', 4, 'Hoat dong', '2024-02-26'),
(16, 'Phan Thi Ngoc', '0944555666', 'ngoc.phan@example.com', '34 Vo Nguyen Giap, Quang Nam', 'phanngoc', 'ngocpass', 4, 'Hoat dong', '2024-02-25'),
(17, 'To Minh Hai', '0933666777', 'hai.to@example.com', '90 Nguyen Du, Bac Lieu', 'tohai', 'haipass', 4, 'Hoat dong', '2024-02-24'),
(18, 'Doan Thi Cam Ly', '0922777888', 'ly.doan@example.com', '22 Tran Quang Khai, Dong Nai', 'doanly', 'ly12345', 4, 'Hoat dong', '2024-02-23'),
(19, 'Chau Anh Vu', '0911888999', 'vu.chau@example.com', '77 Hoang Hoa Tham, Tay Ninh', 'chauvu', 'vupass', 4, 'Hoat dong', '2024-02-22'),
(20, 'Nguyen Hoang Bao', '0900777666', 'bao.nguyen@example.com', '88 Nguyen Thai Hoc, Hau Giang', 'nguyenbao', 'bao123', 4, 'Hoat dong', '2024-02-21');

-- Thêm dữ liệu mẫu vào bảng phieuGiamGia
INSERT INTO phieuGiamGia (maPGG, tenPGG, type, phanTram, toiThieu, toiDa, ngayBatDau, ngayKetThuc, trangThai)
VALUES
(1, 'Khuyen mai Tet 2025', 'phan tram', 15, 500000, 2000000, '2025-01-01', '2025-02-01', 'Hoat dong'); 