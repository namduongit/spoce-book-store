USE bookStore;
-- Thêm dữ liệu vào bảng tacGia
INSERT INTO tacGia (tenTacGia) VALUES 
('Nguyễn Nhật Ánh'),
('Nguyễn Ngọc Thạch'),
('Trang Hạ'),
('Gào (Vũ Phương Thanh)'),
('Minh Nhật'),
('Phan Ý Yên'),
('Tờ Pi'),
('Kawi Hồng Phương'),
('Nguyễn Huy Thiệp'),
('Nguyễn Ngọc Tư');

-- Thêm dữ liệu vào bảng nhaXuatBan
INSERT INTO nhaXuatBan (tenNXB) VALUES 
('Nhà xuất bản Trẻ'),
('Nhà xuất bản Kim Đồng'),
('Nhà xuất bản Tổng hợp Thành phố Hồ Chí Minh'),
('Nhà xuất bản Hội Nhà văn'),
('Nhà xuất bản Chính trị Quốc gia Sự thật'),
('Nhà xuất bản Phụ nữ Việt Nam'),
('Nhà xuất bản Lao Động'),
('Nhã Nam'),
('Đinh Tị Books'),
('Nhà xuất bản Giáo dục Việt Nam');

-- Thêm dữ liệu vào bảng theLoai
INSERT INTO theLoai (tenTheLoai) VALUES 
('Tiểu thuyết'),
('Truyện ngắn'),
('Thơ ca'),
('Khoa học viễn tưởng'),
('Tâm lý học'),
('Kinh tế'),
('Lịch sử'),
('Tôn giáo'),
('Giáo dục'),
('Truyện tranh');

-- Thêm dữ liệu vào bảng loaiBia
INSERT INTO loaiBia (tenLoaiBia) VALUES 
('Bìa mềm'),
('Bìa cứng'),
('Bìa gập'),
('Bìa áo'),
('Bìa lụa'),
('Bìa da'),
('Bìa nhựa'),
('Bìa vải'),
('Bìa giấy kraft'),
('Bìa trong suốt');

INSERT INTO sach (tenSach, soTrang, kichThuoc, moTa, maTacGia, maTheLoai, maLoaiBia, maNXB, namXuatBan, giaTran, giaBan, hinhAnh) VALUES
('Tôi thấy hoa vàng trên cỏ xanh', 370, 14, 'Tiểu thuyết về tuổi thơ đầy hoài niệm', 1, 1, 1, 1, '2010-05-15', 75000, 90000, '1.png'),
('Người lớn không khóc', 320, 13, 'Tản văn đầy cảm xúc về cuộc sống và tình cảm', 2, 2, 2, 2, '2017-10-20', 60000, 75000, '2.png'),
('Đừng lựa chọn an nhàn khi còn trẻ', 280, 14, 'Sách self-help dành cho người trẻ', 3, 5, 3, 3, '2018-07-05', 85000, 99000, '3.png'),
('Cho tôi xin một vé đi tuổi thơ', 250, 13, 'Cuốn sách tuổi thơ đầy kỷ niệm', 1, 1, 1, 1, '2008-02-14', 65000, 80000, '4.png'),
('Bắt trẻ đồng xanh', 277, 14, 'Tiểu thuyết văn học nổi tiếng', 5, 1, 2, 5, '1951-07-16', 90000, 110000, '5.png'),
('Gió đầu mùa', 200, 12, 'Tập truyện ngắn của Thạch Lam', 6, 2, 3, 4, '1937-10-10', 50000, 70000, '6.png'),
('Cánh đồng bất tận', 320, 14, 'Truyện ngắn đặc sắc của Nguyễn Ngọc Tư', 7, 2, 1, 6, '2005-09-30', 70000, 85000, '7.png'),
('Truyện ngắn Nguyễn Huy Thiệp', 450, 15, 'Tuyển tập truyện ngắn hay nhất của Nguyễn Huy Thiệp', 8, 2, 2, 7, '1995-11-25', 100000, 120000, '8.png'),
('Những người khốn khổ', 1200, 17, 'Tác phẩm kinh điển của Victor Hugo', 5, 1, 5, 5, '1862-01-01', 200000, 250000, '9.png'),
('Đắc Nhân Tâm', 320, 13, 'Cuốn sách kỹ năng sống nổi tiếng', 4, 5, 1, 2, '1936-04-07', 90000, 115000, '10.png'),
('Nhà giả kim', 208, 14, 'Tác phẩm kinh điển của Paulo Coelho', 7, 1, 1, 3, '1988-01-01', 70000, 90000, '11.png'),
('Muôn kiếp nhân sinh', 400, 15, 'Tác phẩm về tâm linh và nhân quả', 6, 5, 2, 6, '2020-06-20', 160000, 180000, '12.png'),
('Dám nghĩ lớn', 250, 14, 'Sách phát triển tư duy thành công', 8, 5, 3, 4, '1959-08-12', 85000, 99000, '13.png'),
('Chiến tranh và hòa bình', 1300, 18, 'Tiểu thuyết lịch sử nổi tiếng của Tolstoy', 5, 7, 4, 5, '1869-01-01', 230000, 280000, '14.png'),
('Lịch sử thế giới', 700, 16, 'Cuốn sách tổng hợp về lịch sử nhân loại', 9, 8, 3, 7, '2015-03-10', 150000, 180000, '15.png'),
('Sapiens: Lược sử loài người', 450, 15, 'Cuốn sách lịch sử nhân loại nổi tiếng', 10, 8, 2, 4, '2011-09-04', 180000, 210000, '16.png'),
('1984', 328, 14, 'Tiểu thuyết dystopia kinh điển', 3, 1, 1, 3, '1949-06-08', 95000, 115000, '17.png'),
('Dune', 800, 17, 'Tiểu thuyết khoa học viễn tưởng nổi tiếng', 4, 9, 5, 8, '1965-08-01', 220000, 260000, '18.png'),
('Harry Potter và Hòn đá phù thủy', 350, 15, 'Tập đầu tiên của Harry Potter', 2, 9, 4, 9, '1997-06-26', 180000, 210000, '19.png'),
('Sherlock Holmes toàn tập', 1200, 17, 'Bộ truyện trinh thám kinh điển', 1, 10, 1, 10, '1892-01-01', 250000, 300000, '20.png');

INSERT INTO sach (tenSach, soTrang, kichThuoc, moTa, maTacGia, maTheLoai, maLoaiBia, maNXB, namXuatBan, giaTran, giaBan, hinhAnh) VALUES
('Bố già', 600, 16, 'Tiểu thuyết kinh điển về thế giới mafia', 1, 1, 1, 1, '1969-03-10', 180000, 220000, '21.png'),
('Thiên thần và ác quỷ', 710, 16, 'Tiểu thuyết trinh thám ly kỳ của Dan Brown', 2, 10, 2, 2, '2000-05-30', 150000, 180000, '22.png'),
('Mật mã Da Vinci', 689, 16, 'Tiểu thuyết trinh thám bí ẩn nổi tiếng', 3, 10, 3, 3, '2003-03-18', 160000, 190000, '23.png'),
('Hoàng tử bé', 120, 12, 'Tác phẩm văn học nổi tiếng về tình yêu và cuộc sống', 4, 1, 4, 4, '1943-04-06', 50000, 70000, '24.png'),
('Hai vạn dặm dưới đáy biển', 500, 15, 'Tác phẩm khoa học viễn tưởng kinh điển', 5, 9, 5, 5, '1870-06-20', 120000, 150000, '25.png'),
('Tội ác và trừng phạt', 670, 17, 'Tác phẩm kinh điển của Dostoyevsky', 6, 1, 1, 6, '1866-01-01', 180000, 220000, '26.png'),
('Những cuộc phiêu lưu của Tom Sawyer', 300, 14, 'Tiểu thuyết thiếu nhi kinh điển', 7, 1, 2, 7, '1876-06-20', 80000, 100000, '27.png'),
('Bí mật tư duy triệu phú', 256, 14, 'Sách kỹ năng tài chính nổi tiếng', 8, 5, 3, 8, '2005-02-01', 90000, 115000, '28.png'),
('Trí tuệ Do Thái', 420, 15, 'Sách phát triển tư duy', 9, 5, 4, 9, '2013-05-07', 120000, 140000, '29.png'),
('Suy nghĩ nhanh và chậm', 610, 16, 'Sách tâm lý học kinh điển', 10, 5, 5, 10, '2011-10-25', 180000, 200000, '30.png'),
('Bí mật của may mắn', 200, 12, 'Câu chuyện truyền cảm hứng về thành công', 1, 5, 1, 2, '2004-03-30', 70000, 85000, '31.png'),
('Tuổi trẻ đáng giá bao nhiêu?', 280, 13, 'Sách self-help dành cho giới trẻ', 2, 5, 2, 3, '2016-09-10', 75000, 90000, '32.png'),
('Cách nghĩ để thành công', 320, 14, 'Cuốn sách kinh điển về thành công', 3, 5, 3, 4, '1937-04-12', 90000, 110000, '33.png'),
('Tâm lý học đám đông', 250, 14, 'Cuốn sách tâm lý học nổi tiếng', 4, 5, 4, 5, '1895-01-15', 95000, 115000, '34.png'),
('Cư xử như đàn bà suy nghĩ như đàn ông', 340, 15, 'Cuốn sách tâm lý tình cảm phổ biến', 5, 5, 5, 6, '2009-02-01', 100000, 120000, '35.png'),
('Lược sử thời gian', 280, 14, 'Cuốn sách khoa học nổi tiếng của Stephen Hawking', 6, 8, 1, 7, '1988-06-15', 140000, 170000, '36.png'),
('Bách khoa toàn thư vũ trụ', 500, 17, 'Cuốn sách khoa học về vũ trụ', 7, 8, 2, 8, '2017-07-20', 200000, 230000, '37.png'),
('Hành trình về phương Đông', 320, 14, 'Cuốn sách huyền bí về tri thức phương Đông', 8, 5, 3, 9, '1974-09-15', 120000, 150000, '38.png'),
('Vũ trụ trong vỏ hạt dẻ', 450, 16, 'Cuốn sách khoa học của Stephen Hawking', 9, 8, 4, 10, '2001-10-20', 180000, 200000, '39.png'),
('Những người sống sót', 600, 16, 'Tiểu thuyết tâm lý ly kỳ', 10, 10, 5, 1, '2019-03-20', 150000, 180000, '40.png');

