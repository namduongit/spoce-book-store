-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: bookstore
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhang` (
  `maDonHang` int NOT NULL,
  `maSach` int NOT NULL,
  `soLuong` int NOT NULL,
  `tienThu` int NOT NULL,
  PRIMARY KEY (`maDonHang`,`maSach`),
  KEY `maSach` (`maSach`),
  CONSTRAINT `chiTietDonHang_ibfk_1` FOREIGN KEY (`maDonHang`) REFERENCES `donhang` (`maDonHang`) ON DELETE CASCADE,
  CONSTRAINT `chiTietDonHang_ibfk_2` FOREIGN KEY (`maSach`) REFERENCES `sach` (`maSach`) ON DELETE CASCADE,
  CONSTRAINT `chiTietDonHang_chk_1` CHECK ((`soLuong` > 0)),
  CONSTRAINT `chiTietDonHang_chk_2` CHECK ((`tienThu` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhang`
--

LOCK TABLES `chitietdonhang` WRITE;
/*!40000 ALTER TABLE `chitietdonhang` DISABLE KEYS */;
INSERT INTO `chitietdonhang` VALUES (63,2,1,75000),(63,4,3,240000),(63,6,1,70000),(63,7,2,170000),(63,14,1,280000),(63,19,1,210000),(63,21,3,660000),(63,26,1,220000),(63,31,5,425000),(63,52,1,220000),(65,20,1,300000),(89,6,8,560000),(89,49,1,70000),(90,2,4,300000),(90,24,4,280000),(90,49,6,420000),(91,11,4,360000),(91,41,4,360000),(92,8,1,120000),(101,24,1,70000),(101,49,1,70000),(103,2,7,525000),(104,8,4,480000),(104,29,1,140000),(108,35,4,480000),(111,6,4,280000),(111,24,4,280000),(112,58,1,160000),(113,46,5,850000),(114,6,1,70000),(114,10,2,230000),(114,45,1,120000),(114,49,11,770000),(116,2,9,675000),(117,2,4,300000),(117,6,18,1260000),(117,20,25,7500000),(118,1,99,9504000),(119,6,1,70000),(120,6,1,70000),(121,6,4,280000),(121,49,3,210000),(122,32,3,270000),(123,2,7,525000),(123,7,1,85000),(123,24,1,70000),(123,26,2,440000),(123,32,3,270000),(123,41,1,90000),(123,49,1,70000),(123,52,1,220000),(124,50,17,2720000),(125,43,1,100000),(126,6,2,140000),(127,2,85,6375000),(128,18,6,1560000),(129,5,6,660000),(130,9,11,2750000),(130,26,27,5940000),(130,48,17,3910000),(130,56,21,3780000),(131,48,6,1380000),(132,2,1,75000),(132,4,3,240000),(132,11,10,900000),(132,24,2,140000),(132,42,1,150000);
/*!40000 ALTER TABLE `chitietdonhang` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`bookStore`@`%`*/ /*!50003 TRIGGER `trg_chiTietDonHang_tinhTien_insert` BEFORE INSERT ON `chitietdonhang` FOR EACH ROW BEGIN
    DECLARE giaSach INT;
    SELECT giaBan INTO giaSach
    FROM sach
    WHERE maSach = NEW.maSach;

    SET NEW.tienThu = giaSach * NEW.soLuong;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`bookStore`@`%`*/ /*!50003 TRIGGER `trg_chiTietDonHang_tinhTien_update` BEFORE UPDATE ON `chitietdonhang` FOR EACH ROW BEGIN
    DECLARE giaSach INT;
    SELECT giaBan INTO giaSach
    FROM sach
    WHERE maSach = NEW.maSach;

    SET NEW.tienThu = giaSach * NEW.soLuong;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `chitietphieunhap`
--

DROP TABLE IF EXISTS `chitietphieunhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietphieunhap` (
  `maPhieuNhap` int NOT NULL,
  `maSach` int NOT NULL,
  `giaNhap` int NOT NULL,
  `soLuong` int NOT NULL,
  PRIMARY KEY (`maPhieuNhap`,`maSach`),
  KEY `maSach` (`maSach`),
  CONSTRAINT `chiTietPhieuNhap_ibfk_1` FOREIGN KEY (`maPhieuNhap`) REFERENCES `phieunhap` (`maPhieuNhap`) ON DELETE CASCADE,
  CONSTRAINT `chiTietPhieuNhap_ibfk_2` FOREIGN KEY (`maSach`) REFERENCES `sach` (`maSach`) ON DELETE CASCADE,
  CONSTRAINT `chiTietPhieuNhap_chk_1` CHECK ((`giaNhap` > 0)),
  CONSTRAINT `chiTietPhieuNhap_chk_2` CHECK ((`soLuong` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietphieunhap`
--

LOCK TABLES `chitietphieunhap` WRITE;
/*!40000 ALTER TABLE `chitietphieunhap` DISABLE KEYS */;
INSERT INTO `chitietphieunhap` VALUES (1,1,200,2),(1,2,1002,7),(1,3,2817,5),(1,4,2480,5),(1,5,9000,10),(1,14,1234,100),(2,2,324,2),(2,3,546475,56),(2,4,324,343),(2,6,324,2),(2,12,1000,100),(3,1,50000,10),(3,4,22222,22),(3,5,111111,10),(3,11,10000,100),(4,5,5678,234),(5,6,23213,545),(5,7,56788,234),(6,5,234,23),(6,8,234,23),(7,4,124,2414),(7,6,334,342),(7,8,23213,545),(8,3,80000,24),(8,9,20000,5),(9,1,779,76),(9,2,12412,24),(9,4,1244,24),(9,12,24124,24),(10,1,60000,2),(11,2,50000,1),(14,3,50000,2),(15,12,1000,2),(16,8,10000,10),(17,1,10000,5),(18,2,15000,10),(19,9,100000,2),(20,2,50000,2),(21,6,1000,200);
/*!40000 ALTER TABLE `chitietphieunhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietquyen`
--

DROP TABLE IF EXISTS `chitietquyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietquyen` (
  `maQuyen` int NOT NULL,
  `maChucNang` int NOT NULL,
  `maHanhDong` int NOT NULL,
  PRIMARY KEY (`maQuyen`,`maChucNang`,`maHanhDong`),
  KEY `maChucNang` (`maChucNang`),
  KEY `maHanhDong` (`maHanhDong`),
  CONSTRAINT `chiTietQuyen_ibfk_1` FOREIGN KEY (`maQuyen`) REFERENCES `quyen` (`maQuyen`) ON DELETE CASCADE,
  CONSTRAINT `chiTietQuyen_ibfk_2` FOREIGN KEY (`maChucNang`) REFERENCES `chucnang` (`maChucNang`) ON DELETE CASCADE,
  CONSTRAINT `chiTietQuyen_ibfk_3` FOREIGN KEY (`maHanhDong`) REFERENCES `hanhdong` (`maHanhDong`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietquyen`
--

LOCK TABLES `chitietquyen` WRITE;
/*!40000 ALTER TABLE `chitietquyen` DISABLE KEYS */;
INSERT INTO `chitietquyen` VALUES (11,1,1),(12,1,1),(12,1,2),(12,1,3),(14,1,1),(14,1,2),(15,1,1),(15,1,2),(15,1,3),(15,1,4),(11,2,1),(15,2,1),(15,2,2),(15,2,3),(15,2,4),(16,2,1),(3,3,1),(11,3,2),(12,3,4),(13,3,1),(13,3,2),(13,3,3),(13,3,4),(15,3,1),(15,3,2),(15,3,3),(15,3,4),(11,4,2),(12,4,4),(13,4,1),(13,4,2),(15,4,1),(15,4,2),(15,4,3),(15,4,4),(1,5,5),(11,5,3),(13,5,1),(15,5,1),(15,5,2),(15,5,3),(15,5,4),(15,5,5),(16,5,1),(16,5,2),(16,5,3),(16,5,4),(16,5,5),(1,6,5),(11,6,3),(15,6,1),(15,6,2),(15,6,3),(15,6,4),(15,6,5),(16,6,1),(16,6,2),(16,6,3),(16,6,4),(16,6,5),(1,7,5),(14,7,2),(14,7,3),(15,7,1),(15,7,2),(15,7,3),(15,7,4),(15,7,5),(1,8,5),(11,8,2),(14,8,2),(15,8,1),(15,8,2),(15,8,3),(15,8,4),(15,8,5),(1,9,5),(3,9,1),(3,9,2),(3,9,3),(3,9,4),(3,9,5),(14,9,2),(15,9,1),(15,9,2),(15,9,3),(15,9,4),(15,9,5),(1,10,5),(3,10,1),(3,10,2),(3,10,3),(3,10,4),(3,10,5),(11,10,1),(14,10,2),(15,10,1),(15,10,2),(15,10,3),(15,10,4),(15,10,5),(1,11,5),(3,11,1),(3,11,2),(3,11,3),(3,11,4),(3,11,5),(11,11,1),(15,11,1),(15,11,2),(15,11,3),(15,11,4),(15,11,5),(1,12,5),(3,12,1),(3,12,2),(3,12,3),(3,12,4),(3,12,5),(11,12,2),(14,12,1),(15,12,1),(15,12,2),(15,12,3),(15,12,4),(15,12,5),(1,13,5),(3,13,1),(3,13,2),(3,13,3),(3,13,4),(3,13,5),(11,13,2),(14,13,1),(15,13,1),(15,13,2),(15,13,3),(15,13,4),(15,13,5),(1,14,5),(3,14,1),(3,14,2),(3,14,3),(3,14,4),(3,14,5),(15,14,1),(15,14,2),(15,14,3),(15,14,4),(15,14,5),(1,15,5),(3,15,1),(3,15,2),(3,15,3),(3,15,4),(3,15,5),(14,15,4),(15,15,1),(15,15,2),(15,15,3),(15,15,4),(15,15,5),(1,16,5),(14,16,4),(15,16,1),(15,16,2),(15,16,3),(15,16,4),(15,16,5),(16,16,1),(16,16,2),(16,16,3),(16,16,4),(16,16,5);
/*!40000 ALTER TABLE `chitietquyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chucnang`
--

DROP TABLE IF EXISTS `chucnang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chucnang` (
  `maChucNang` int NOT NULL AUTO_INCREMENT,
  `tenChucNang` varchar(100) NOT NULL,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  PRIMARY KEY (`maChucNang`),
  UNIQUE KEY `tenchucNang` (`tenChucNang`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chucnang`
--

LOCK TABLES `chucnang` WRITE;
/*!40000 ALTER TABLE `chucnang` DISABLE KEYS */;
INSERT INTO `chucnang` VALUES (1,'Thống kê lợi nhuận','Hoạt động'),(2,'Thống kê doanh thu','Hoạt động'),(3,'Thống kê phiếu nhập','Hoạt động'),(4,'Thống kê đơn hàng','Hoạt động'),(5,'Đơn hàng','Hoạt động'),(6,'Phiếu giảm giá','Hoạt động'),(7,'Nhóm quyền','Hoạt động'),(8,'Người dùng','Hoạt động'),(9,'Nhà cung cấp','Hoạt động'),(10,'Phiếu nhập','Hoạt động'),(11,'Sách','Hoạt động'),(12,'Tác giả','Hoạt động'),(13,'Thể loại','Hoạt động'),(14,'Loại bìa','Hoạt động'),(15,'Nhà xuất bản','Hoạt động'),(16,'Thẻ thanh toán','Hoạt động');
/*!40000 ALTER TABLE `chucnang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diachinguoidung`
--

DROP TABLE IF EXISTS `diachinguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diachinguoidung` (
  `maDiaChi` int NOT NULL AUTO_INCREMENT,
  `maNguoiDung` int NOT NULL,
  `tinhThanh` varchar(255) DEFAULT NULL,
  `quanHuyen` varchar(255) DEFAULT NULL,
  `phuongXa` varchar(255) DEFAULT NULL,
  `soNha` varchar(255) DEFAULT NULL,
  `macDinh` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`maDiaChi`),
  KEY `maNguoiDung` (`maNguoiDung`),
  CONSTRAINT `diaChiNguoiDung_ibfk_1` FOREIGN KEY (`maNguoiDung`) REFERENCES `nguoidung` (`manguoiDung`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diachinguoidung`
--

LOCK TABLES `diachinguoidung` WRITE;
/*!40000 ALTER TABLE `diachinguoidung` DISABLE KEYS */;
INSERT INTO `diachinguoidung` VALUES (6,23,'Thành phố Hồ Chí Minh','Quận Bình Tân','Phường Bình Trị Đông','479 Hương Lộ 2',NULL),(7,22,'undefined','undefined','undefined','Chưa có địa chỉ',NULL),(8,52,'TP Hồ Chí Minh','Quận 1','Phường Bến Nghé','12 Nguyễn Huệ',NULL),(9,53,'Thành Phố Hà Nội','Quận Ba Đình','Phường Ngọc Hà','123',NULL),(10,23,'Thành phố Hồ Chí Minh','Quận 11','Phường 14','100 Hàm Tử',NULL),(11,1,'  TP Hồ Chí Minh','  Quận 1','  Phường Bến Nghé','12 Nguyễn Huệ',NULL),(12,1,'  TP Hồ Chí Minh','  Quận 1','  Phường Bến Nghé','12 Nguyễn Huệ',NULL),(13,1,'  TP Hồ Chí Minh','  Quận 1','  Phường Bến Nghé','12 Nguyễn Huệ',NULL),(14,1,'  TP Hồ Chí Minh','  Quận 1','  Phường Bến Nghé','12 Nguyễn Huệ',NULL),(15,1,'  TP Hồ Chí Minh','  Quận 1','  Phường Bến Nghé','12 Nguyễn Huệ',NULL),(16,23,'Tỉnh Bắc Kạn','Huyện Ba Bể','Xã Địa Linh','100 Hàm Tử',NULL),(17,55,'Thành phố Hà Nội','Huyện Mê Linh','Xã Văn Khê','bÁdadasd',NULL),(18,23,'Tỉnh Ninh Bình','Thành phố Hoa Lư','Phường Nam Bình','123 ronaldo',NULL),(20,64,'Tỉnh Bắc Kạn','Huyện Bạch Thông','Xã Mỹ Thanh','quanlykho1',NULL),(21,65,'undefined','undefined','undefined','Chưa có địa chỉ',NULL),(22,68,'TP HCM','Quận 12','phường Hiệp Thành','12 Đường Hiệp Thành',NULL),(23,69,' TP Hồ Chí Minh',' Quận 1',' Phường Bến Nghé','14',NULL),(24,70,'Thành Phố Hà Nội','Quận Ba Đình','Phường Ngọc Hà','123',NULL),(25,73,'Tỉnh Điện Biên','Huyện Tủa Chùa','Xã Tả Phìn','123',NULL),(26,74,' Tỉnh Đồng Nai',' Thành phố Long Khánh',' Phường Xuân Lập','142 Tổ 12 KP Phú Mỹ',NULL),(27,76,'Thành phố Hồ Chí Minh','Quận 1','Phường Bến Nghé','abc',NULL);
/*!40000 ALTER TABLE `diachinguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `maDonHang` int NOT NULL AUTO_INCREMENT,
  `ngayTaoDon` datetime DEFAULT CURRENT_TIMESTAMP,
  `maKhachHang` int NOT NULL,
  `maKhuyenMai` int DEFAULT NULL,
  `dcNguoiNhan` text,
  `tongTienThu` int NOT NULL DEFAULT '0',
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `maNhanVien` int DEFAULT NULL,
  `maPhuongThuc` int NOT NULL,
  `trangThaiThanhToan` enum('Đã thanh toán','Chưa thanh toán') DEFAULT NULL,
  `trangThai` enum('Đang chờ xác nhận','Đã xác nhận','Đã giao hàng','Đã hủy đơn') DEFAULT 'Đang chờ xác nhận',
  `hvtNguoiNhan` text,
  `sdtNguoiNhan` text,
  PRIMARY KEY (`maDonHang`),
  KEY `maKhachHang` (`maKhachHang`),
  KEY `maKhuyenMai` (`maKhuyenMai`),
  KEY `fk_maPhuongThuc` (`maPhuongThuc`),
  KEY `fk_maNhanVien` (`maNhanVien`),
  CONSTRAINT `donHang_ibfk_1` FOREIGN KEY (`maKhachHang`) REFERENCES `nguoidung` (`manguoiDung`) ON DELETE CASCADE,
  CONSTRAINT `donHang_ibfk_2` FOREIGN KEY (`maKhuyenMai`) REFERENCES `phieugiamgia` (`maPGG`) ON DELETE SET NULL,
  CONSTRAINT `fk_maNhanVien` FOREIGN KEY (`maNhanVien`) REFERENCES `nguoidung` (`manguoiDung`) ON DELETE CASCADE,
  CONSTRAINT `fk_phuongThucThanhToan` FOREIGN KEY (`maPhuongThuc`) REFERENCES `phuongthucthanhtoan` (`maPhuongThuc`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (63,'2025-04-22 07:11:06',23,NULL,'Thành phố Hồ Chí Minh / Quận 11 / Phường 11 / 123 Trần Bình Trọng',2570000,'2025-05-12 15:38:01',55,1,'Đã thanh toán','Đã giao hàng','Nguyễn Nam Dương','0388853835'),(65,'2025-04-22 07:58:23',1,NULL,'Thành phố Hồ Chí Minh / Quận 5 / Phường 2 / 237 An Dương Vương',300000,'2025-05-12 15:36:14',55,1,'Đã thanh toán','Đã xác nhận','Nguyễn Nam Dương','0388853835'),(89,'2025-05-10 02:02:30',23,NULL,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',650000,'2025-05-12 16:11:08',55,1,'Chưa thanh toán','Đã hủy đơn','Nguyễn Nam Dương','0388853835'),(90,'2025-05-10 02:03:48',23,NULL,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',1020000,'2025-05-13 11:46:20',23,1,'Đã thanh toán','Đã giao hàng','Nguyễn Nam Dương','0388853835'),(91,'2025-05-10 02:05:09',23,NULL,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',740000,'2025-05-13 11:47:40',1,1,'Chưa thanh toán','Đã hủy đơn','Nguyễn Nam Dương','0388853835'),(92,'2025-05-10 02:06:02',23,NULL,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',140000,'2025-05-14 10:07:11',55,1,'Chưa thanh toán','Đã xác nhận','Nguyễn Nam Dương','0388853835'),(100,'2025-05-10 02:24:38',23,NULL,'Test địa chỉ giao',400000,'2025-05-10 02:24:38',NULL,1,'Chưa thanh toán','Đang chờ xác nhận',NULL,NULL),(101,'2025-05-10 02:30:17',55,NULL,'Tỉnh Đồng Nai / Thành phố Long Khánh / Phường Xuân Lập / Bảo Bình',160000,'2025-05-10 02:30:17',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Phạm Thị Trà My','Phạm Thị Trà My'),(103,'2025-05-10 02:35:43',55,NULL,'Tỉnh Hải Dương / Thành phố Chí Linh / Phường Đồng Lạc / Hello My name is Quy',545000,'2025-05-10 02:35:43',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Trần Thanh Quy','0388853835'),(104,'2025-05-10 02:37:57',23,NULL,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',640000,'2025-05-10 02:37:57',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Chenh Tien Lam','0909380633'),(108,'2025-05-10 02:46:13',23,NULL,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',500000,'2025-05-10 02:46:13',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','My name is Nam Duong','0388853835'),(111,'2025-05-10 02:54:39',22,NULL,'undefined / undefined / undefined / Chưa có địa chỉ',580000,'2025-05-10 02:54:39',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Nguyen Nam Duong','0909385922'),(112,'2025-05-10 02:57:34',23,12,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',150000,'2025-05-10 02:57:34',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Chênh Tiên Luân','0909380633'),(113,'2025-05-10 03:04:24',23,12,'Thành phố Hồ Chí Minh / Quận 11 / Phường 14 / 100 Hàm Tử',657500,'2025-05-10 03:04:24',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Triệu Phú Lâm','0909380666'),(114,'2025-05-11 08:24:17',55,NULL,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',1800000,'2025-05-11 08:24:17',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Nguyễn Thành Đạt','0388853835'),(116,'2025-05-12 04:45:13',55,12,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',526250,'2025-05-12 04:45:13',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Triệu Lâm','0909385339'),(117,'2025-05-12 07:32:42',55,NULL,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',9080000,'2025-05-12 16:06:35',1,3,'Chưa thanh toán','Đang chờ xác nhận','Phạm Thị Trà My','0329276436'),(118,'2025-05-12 08:56:09',55,NULL,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',9524000,'2025-05-12 15:59:06',55,1,'Chưa thanh toán','Đang chờ xác nhận','Trần Thanh Quy','0965162116'),(119,'2025-05-13 03:17:18',23,12,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',90000,'2025-05-13 03:17:18',NULL,2,'Chưa thanh toán','Đang chờ xác nhận','Chênh Tiên Luân','0909385339'),(120,'2025-05-13 03:19:21',23,NULL,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',90000,'2025-05-13 03:19:21',NULL,2,'Chưa thanh toán','Đang chờ xác nhận','Chênh Tiên Luân','0909385339'),(121,'2025-05-13 04:32:15',23,12,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',387500,'2025-05-13 04:32:15',NULL,2,'Chưa thanh toán','Đang chờ xác nhận','Chênh Tiên Luân','0909385339'),(122,'2025-05-13 04:34:01',23,12,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',252500,'2025-05-13 04:34:01',NULL,2,'Chưa thanh toán','Đang chờ xác nhận','Chenh Tien Lam','0909385339'),(123,'2025-05-13 12:01:29',1,NULL,'undefined / undefined / undefined / Chưa có địa chỉ',1790000,'2025-05-13 12:01:29',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Nguyễn Nam Dương','0388853835'),(124,'2025-05-13 12:53:38',23,NULL,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',2740000,'2025-05-13 19:54:46',1,2,'Chưa thanh toán','Đã hủy đơn','nkJZCnm,czxnm,ZXCnm,xcz','0966970576'),(125,'2025-05-13 23:48:44',55,NULL,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',150000,'2025-05-13 23:48:44',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Nguyễn Nam Dương','0388853835'),(126,'2025-05-14 01:48:31',60,NULL,'Thành phố Hồ Chí Minh / Quận 12 / Phường Hiệp Thành / 17/4D Đường HT43 , phường Hiệp Thành, Quận 12',160000,'2025-05-14 08:53:22',60,1,'Chưa thanh toán','Đã xác nhận','autan','0869547255'),(127,'2025-05-14 03:01:06',55,NULL,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',6405000,'2025-05-14 03:01:06',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','thanh quy','0909090909'),(128,'2025-05-14 03:02:37',55,NULL,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',1580000,'2025-05-14 10:03:17',55,1,'Chưa thanh toán','Đã giao hàng','nam duong','1234567890'),(129,'2025-05-14 03:05:06',55,NULL,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',680000,'2025-05-14 10:05:52',55,1,'Chưa thanh toán','Đã hủy đơn','tuan','0909090909'),(130,'2025-05-14 03:08:31',55,NULL,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',16400000,'2025-05-14 10:09:12',55,1,'Chưa thanh toán','Đã giao hàng','Nguyễn Dương','0388853835'),(131,'2025-05-14 03:13:39',55,15,'Thành phố Hà Nội / Huyện Mê Linh / Xã Văn Khê / bÁdadasd',1300000,'2025-05-14 03:13:39',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','thanh quy','0909090923'),(132,'2025-05-14 09:14:44',23,NULL,'Thành phố Hồ Chí Minh / Quận Bình Tân / Phường Bình Trị Đông / 479 Hương Lộ 2',1525000,'2025-05-14 09:14:44',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','Chênh Tiên Luân','0909385339'),(133,'2025-05-15 07:38:49',76,NULL,'Thành phố Hồ Chí Minh / Quận 1 / Phường Bến Nghé / abc',4340000,'2025-05-15 07:38:49',NULL,2,'Chưa thanh toán','Đang chờ xác nhận','abc','0965162116'),(134,'2025-05-15 07:39:22',76,NULL,'Thành phố Hồ Chí Minh / Quận 1 / Phường Bến Nghé / abc',4350000,'2025-05-15 07:39:22',NULL,4,'Chưa thanh toán','Đang chờ xác nhận','abc','0388853835'),(135,'2025-05-15 07:40:22',76,NULL,'Thành phố Hồ Chí Minh / Quận 1 / Phường Bến Nghé / abc',1100000,'2025-05-15 07:40:22',NULL,1,'Chưa thanh toán','Đang chờ xác nhận','abc','0388853835');
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`bookStore`@`%`*/ /*!50003 TRIGGER `trg_update_soluong_sach` AFTER UPDATE ON `donhang` FOR EACH ROW BEGIN
  -- Trường hợp 1: Đang chờ xác nhận → Đã xác nhận (TRỪ số lượng)
  IF OLD.trangThai = 'Đang chờ xác nhận' AND NEW.trangThai = 'Đã xác nhận' THEN
    UPDATE sach s
    JOIN chiTietDonHang ctdh ON ctdh.maSach = s.maSach
    SET s.soLuong = s.soLuong - ctdh.soLuong
    WHERE ctdh.maDonHang = NEW.maDonHang;

  -- Trường hợp 2: KHÔNG phải "Đang chờ xác nhận" mà chuyển sang "Đã hủy đơn" (CỘNG lại số lượng)
  ELSEIF OLD.trangThai != 'Đang chờ xác nhận' AND NEW.trangThai = 'Đã hủy đơn' THEN
    UPDATE sach s
    JOIN chiTietDonHang ctdh ON ctdh.maSach = s.maSach
    SET s.soLuong = s.soLuong + ctdh.soLuong
    WHERE ctdh.maDonHang = NEW.maDonHang;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `giohang`
--

DROP TABLE IF EXISTS `giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giohang` (
  `maNguoiDung` int NOT NULL,
  `maSach` int NOT NULL,
  `soLuong` int DEFAULT '1',
  PRIMARY KEY (`maNguoiDung`,`maSach`),
  KEY `maSach` (`maSach`),
  CONSTRAINT `gioHang_ibfk_1` FOREIGN KEY (`maNguoiDung`) REFERENCES `nguoidung` (`manguoiDung`) ON DELETE CASCADE,
  CONSTRAINT `gioHang_ibfk_2` FOREIGN KEY (`maSach`) REFERENCES `sach` (`maSach`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang`
--

LOCK TABLES `giohang` WRITE;
/*!40000 ALTER TABLE `giohang` DISABLE KEYS */;
INSERT INTO `giohang` VALUES (24,3,1),(24,44,1),(55,5,1),(55,46,7),(76,8,9);
/*!40000 ALTER TABLE `giohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hanhdong`
--

DROP TABLE IF EXISTS `hanhdong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hanhdong` (
  `maHanhDong` int NOT NULL AUTO_INCREMENT,
  `tenHanhDong` text,
  `ngayCapNhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`maHanhDong`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hanhdong`
--

LOCK TABLES `hanhdong` WRITE;
/*!40000 ALTER TABLE `hanhdong` DISABLE KEYS */;
INSERT INTO `hanhdong` VALUES (1,'Lọc','2025-04-26 01:58:56'),(2,'Chi tiết','2025-04-26 01:58:56'),(3,'Thêm','2025-04-26 01:58:56'),(4,'Sửa','2025-04-26 01:58:56'),(5,'Xóa/Khóa','2025-04-26 01:58:56');
/*!40000 ALTER TABLE `hanhdong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaibia`
--

DROP TABLE IF EXISTS `loaibia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaibia` (
  `maLoaiBia` int NOT NULL AUTO_INCREMENT,
  `tenLoaiBia` varchar(100) NOT NULL,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  PRIMARY KEY (`maLoaiBia`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaibia`
--

LOCK TABLES `loaibia` WRITE;
/*!40000 ALTER TABLE `loaibia` DISABLE KEYS */;
INSERT INTO `loaibia` VALUES (1,'Bìa mềm','2025-04-19 16:45:00','Hoạt động'),(2,'Bìa cứng','2025-04-06 13:29:46','Hoạt động'),(3,'Bìa gập','2025-04-19 16:44:54','Hoạt động'),(4,'Bìa áo','2025-03-30 02:03:45','Hoạt động'),(5,'Bìa lụa','2025-03-30 02:03:45','Hoạt động'),(6,'Bìa da','2025-03-30 02:03:45','Hoạt động'),(7,'Bìa nhựa','2025-03-30 02:03:45','Hoạt động'),(8,'Bìa vải','2025-05-12 20:29:23','Hoạt động'),(9,'Bìa giấy kraft','2025-03-30 02:03:45','Hoạt động'),(10,'Bìa trong suốt','2025-03-30 02:03:45','Hoạt động'),(13,'Bìa lông','2025-05-09 17:27:02','Hoạt động'),(14,'Bìa Spoce','2025-05-15 04:19:23','Tạm dừng');
/*!40000 ALTER TABLE `loaibia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung` (
  `maNguoiDung` int NOT NULL AUTO_INCREMENT,
  `hoVaTen` varchar(100) NOT NULL,
  `soDT` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tenTaiKhoan` varchar(100) NOT NULL,
  `matKhau` varchar(255) NOT NULL,
  `maQuyen` int DEFAULT NULL,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  PRIMARY KEY (`maNguoiDung`),
  UNIQUE KEY `tenTaiKhoan` (`tenTaiKhoan`),
  UNIQUE KEY `soDT` (`soDT`),
  UNIQUE KEY `email` (`email`),
  KEY `maQuyen` (`maQuyen`),
  CONSTRAINT `nguoiDung_ibfk_1` FOREIGN KEY (`maQuyen`) REFERENCES `quyen` (`maQuyen`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES (1,'Nguyễn Nam Dương','0388853835','nguyennamduong205@gmail.com','namduongit','89a76f3e5e7ce360ca7487cd6dfe94d1',NULL,'2025-05-15 05:19:05','Hoạt động'),(11,'Dương Văn Sơn','0921345678','son.duong@example.com','duongson','f26a97e1c8e180233559be24baa310b1',3,'2025-05-14 20:53:59','Hoạt động'),(12,'Ngô Thị Hạnh','0919988776','hanh.ngo@example.com','ngohanh','1fdd11acb0a259f86b0b3bce2d8d61f2',NULL,'2025-05-12 17:23:54','Hoạt động'),(13,'Vũ Anh Dũng','0988111222','dung.vu@example.com','vudung','cf2e578e1e1a79528cac8b9ed524c314',NULL,'2025-05-10 09:07:28','Hoạt động'),(14,'Trịnh Thị Thu','0977222333','thu.trinh@example.com','trinhthu','c168a5ae38e6c3d1aa737674825a9de6',NULL,'2025-03-28 01:38:56','Hoạt động'),(15,'Lâm Văn Hòa','0955333444','hoa.lam@example.com','lamhoa','83b959282926655244495d10f565ff0f',NULL,'2025-03-28 01:38:56','Hoạt động'),(16,'Phan Thị Ngọc','0944555666','ngoc.phan@example.com','phanngoc','02837a8426b54c25b74559fb186f377d',NULL,'2025-03-28 01:38:56','Hoạt động'),(17,'Tô Minh Hải','0933666777','hai.to@example.com','tohai','41fe9e4e7f2e855f8dc2a9c473f270cf',NULL,'2025-03-28 01:38:56','Hoạt động'),(18,'Đoàn Thị Cẩm Ly','0922777888','ly.doan@example.com','doanly','c3c6eae239774cc195079611df4f9ddb',NULL,'2025-03-28 01:38:56','Hoạt động'),(19,'Châu Anh Vũ','0911888999','vu.chau@example.com','chauvu','1e97fb94ef3a655aec8ab876ae9accb6',NULL,'2025-03-28 01:38:56','Hoạt động'),(20,'Nguyễn Hoàng Bảo','0900777666','bao.nguyen@example.com','nguyenbao','b6c6cfe1a7ba5eac0f984f3ef97c8490',NULL,'2025-03-28 01:38:56','Hoạt động'),(22,'Phạm Thị Trà My','0329276436','tramy6436@gmail.com','tramy6436','89a76f3e5e7ce360ca7487cd6dfe94d1',1,'2025-05-12 13:25:16','Hoạt động'),(23,'Chênh Tiên Luân','0909380633','tienluanchenh192@gmail.com','luanchenh','5d9cfb0271f1b9d066fcec2858049cae',15,'2025-05-12 08:08:25','Hoạt động'),(55,'My name is Duong','0969297316','tramy64362@gmail.com','namduong','7ca44494898a453dd6ab41dc538c6eb8',15,'2025-05-12 14:54:11','Hoạt động'),(58,'VOTRINHKHANG',NULL,NULL,'VOTRINHKHANG','72cdc7d4a29f8da8210a3a06801319bf',15,'2025-05-12 10:01:03','Hoạt động'),(60,'atuan','','','atuan123','202cb962ac59075b964b07152d234b70',15,'2025-05-14 21:01:35','Hoạt động'),(64,'quanlykho1','0777777777','quanlykho1@gmail.com','quanlykho1','aaa2e6461d3b21a96dbaa7f39ed2c2d2',3,'2025-05-14 09:50:31','Hoạt động'),(65,'quanlybanhang1','0555555555','quanlybanhang1@gmail.com','quanlybanhang1','c7cd0622daa647737a903ba336b797ed',15,'2025-05-14 10:15:01','Hoạt động'),(66,'Ngô Thị Hạnh','0964665580','ocd@gmail.com','builana','e10adc3949ba59abbe56e057f20f883e',16,'2025-05-14 19:00:30','Hoạt động'),(67,'test lần n','0964665587','abcdef@gmail.com','abcdef','ef8d3823014e45d7572664fbaf99dfe6',15,'2025-05-14 19:12:44','Hoạt động'),(68,'test lần n2','0869547200','sgp@gmail.com','saigon','1e5c810d5d45f6de90ca1ecb3f4dcc48',3,'2025-05-14 19:14:33','Hoạt động'),(69,'flash','0869547202','flash@gmail.com','flash','a39401275d1b300aa789fb22aea4148a',3,'2025-05-14 19:29:44','Hoạt động'),(70,'testn3','0919988771','testn3@gmail.com,','testn3','f211e7ed1bb84727e22247c2c8c56f21',3,'2025-05-14 19:32:15','Hoạt động'),(71,'testn4','0388853830','testn4@gmail.com','testn4','d26fa2b98df6e862509d3cb37938424b',16,'2025-05-14 19:40:34','Hoạt động'),(73,'testn5','0919988777','testn5@gmail.com','testn5','a2a11c8f75854e0aeb78fc188da74750',1,'2025-05-14 22:08:18','Hoạt động'),(74,'testn6','0947891230','testn6@gmail.com','testn6','f4c97932a40cdef886b7501a265a0e9f',NULL,'2025-05-14 22:16:13','Hoạt động'),(75,'Quản trị viên','0385872250','quantrivien@gmail.com','quantrivien','fef1ddf26aacab614a822e243bdb16cb',15,'2025-05-15 06:53:04','Hoạt động'),(76,'abcabc','0388853838','abcabc@gmail.com','abcabc','440ac85892ca43ad26d44c7ad9d47d3e',NULL,'2025-05-15 07:36:21','Hoạt động');
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhacungcap`
--

DROP TABLE IF EXISTS `nhacungcap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhacungcap` (
  `maNCC` int NOT NULL AUTO_INCREMENT,
  `tenNCC` varchar(100) NOT NULL,
  `soDT` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `diaChi` varchar(100) DEFAULT NULL,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  PRIMARY KEY (`maNCC`),
  UNIQUE KEY `soDT` (`soDT`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhacungcap`
--

LOCK TABLES `nhacungcap` WRITE;
/*!40000 ALTER TABLE `nhacungcap` DISABLE KEYS */;
INSERT INTO `nhacungcap` VALUES (1,'Nhà cung cấp Thái Bình Dương','0123456789','thaibinhduong@gmail.com','Long Khánh Đồng Nai','2025-05-15 05:16:54','Hoạt động'),(2,'BBB','012345678','b@gmail.com','HN','2025-04-06 20:27:03','Hoạt động'),(3,'khagn','643894853','khang@gmai.com','QN','2025-03-29 02:40:58','Hoạt động'),(4,'Spoce Print','0909386033','spoceprint@gmail.com','125 Trần Bình Trọng','2025-05-06 09:53:10','Hoạt động'),(5,'fgdkhkhagn','0574395','khang345@gmai.com','QN','2025-04-06 20:31:20','Hoạt động'),(9,'Trần Thanh Quy','1234567890','tq@gmail.com','124, Phường 10, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu','2025-04-20 09:50:02','Tạm dừng'),(11,'Nhà cung cấp test','09876543211','ncctest@gmail.com','643334, Xã Giáo Hiệu, Huyện Pác Nặm, Tỉnh Bắc Kạn','2025-05-01 15:31:55','Tạm dừng'),(12,'NCC Spoce','1212454567','spocestore@gmail.com','12512, Xã An Phúc, Huyện Đông Hải, Tỉnh Bạc Liêu','2025-04-20 07:01:16','Tạm dừng'),(14,'khang','01234567891','khang@gmail.com','11, Xã Phước Tỉnh, Huyện Long Điền, Tỉnh Bà Rịa - Vũng Tàu','2025-05-11 13:14:12','Tạm dừng');
/*!40000 ALTER TABLE `nhacungcap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhaxuatban`
--

DROP TABLE IF EXISTS `nhaxuatban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhaxuatban` (
  `maNXB` int NOT NULL AUTO_INCREMENT,
  `tenNXB` varchar(100) NOT NULL,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  PRIMARY KEY (`maNXB`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhaxuatban`
--

LOCK TABLES `nhaxuatban` WRITE;
/*!40000 ALTER TABLE `nhaxuatban` DISABLE KEYS */;
INSERT INTO `nhaxuatban` VALUES (1,'Nhà xuất bản Trẻ','2025-05-15 04:17:17','Hoạt động'),(2,'Nhà xuất bản Kim Đồng','2025-04-06 14:24:41','Hoạt động'),(3,'Nhà xuất bản Tổng hợp Thành phố Hồ Chí Minh','2025-03-27 02:50:47','Hoạt động'),(4,'Nhà xuất bản Hội Nhà văn','2025-03-27 02:50:47','Hoạt động'),(5,'Nhà xuất bản Chính trị Quốc gia Sự thật','2025-04-21 20:04:40','Hoạt động'),(6,'Nhà xuất bản Phụ nữ Việt Nam','2025-03-27 02:50:47','Hoạt động'),(7,'Nhà xuất bản Lao Động','2025-03-28 13:14:35','Hoạt động'),(8,'Nhã Nam','2025-03-27 02:50:47','Hoạt động'),(9,'Đinh Tị Books','2025-03-27 02:50:47','Hoạt động'),(10,'Nhà xuất bản Giáo dục Việt Nam','2025-03-27 02:50:47','Hoạt động'),(11,'khan','2025-05-15 04:16:02','Tạm dừng'),(13,'NXB thửuu','2025-05-10 10:03:25','Tạm dừng'),(14,'quy ngu','2025-04-19 12:38:54','Tạm dừng'),(15,'12401204810','2025-04-19 12:41:08','Tạm dừng'),(16,'Thanh Quy','2025-04-20 06:00:10','Tạm dừng'),(18,'NXB Spoce','2025-05-11 13:12:08','Hoạt động'),(19,'test','2025-05-14 08:56:14','Tạm dừng');
/*!40000 ALTER TABLE `nhaxuatban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieugiamgia`
--

DROP TABLE IF EXISTS `phieugiamgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phieugiamgia` (
  `maPGG` int NOT NULL AUTO_INCREMENT,
  `tenPGG` varchar(100) NOT NULL,
  `toiThieu` int DEFAULT NULL,
  `toiDa` int DEFAULT NULL,
  `ngayBatDau` date NOT NULL,
  `ngayKetThuc` date NOT NULL,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `giaTriGiam` int DEFAULT NULL,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  `loai` enum('Phần trăm','Tiền') DEFAULT NULL,
  PRIMARY KEY (`maPGG`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieugiamgia`
--

LOCK TABLES `phieugiamgia` WRITE;
/*!40000 ALTER TABLE `phieugiamgia` DISABLE KEYS */;
INSERT INTO `phieugiamgia` VALUES (1,'Khuyến mãi Tết 2025',300000,2000000,'2025-06-04','2025-10-01','2025-05-10 09:47:43',10,'Hoạt động','Phần trăm'),(2,'TTT',200000,2000,'2025-05-10','2025-05-11','2025-05-10 09:48:27',1000000,'Hoạt động','Tiền'),(3,'TEST',200000,2000,'2025-05-10','2025-05-11','2025-05-10 09:48:46',10,'Hoạt động','Tiền'),(4,'Test3',200000,20000,'2025-04-02','2025-04-05','2025-04-19 11:19:13',NULL,'Hoạt động','Phần trăm'),(5,'tesst',1000,100,'2025-04-03','2025-04-04','2025-04-20 00:55:35',NULL,'Hoạt động','Tiền'),(6,'Mã thành viên',200000,100000,'2025-05-02','2025-05-03','2025-04-23 07:33:28',100000,'Hoạt động','Phần trăm'),(7,'Khách hàng mới',100000,10000,'2025-04-02','2025-04-04','2025-04-23 07:33:31',NULL,'Hoạt động','Phần trăm'),(8,'Phiếu này do Thanh Quy tạo',1,9999999,'2025-04-20','2025-12-31','2025-04-20 09:37:17',100,'Tạm dừng','Phần trăm'),(9,'Phiếu này cũng do Thanh Quy tạo nhưng nhầm do bị mù',1,9999999,'2025-04-20','2025-12-31','2025-04-20 09:38:19',100,'Tạm dừng','Phần trăm'),(10,'Spoce Deal 40% !!!',1,9999999,'2025-04-21','2025-04-30','2025-04-21 08:53:17',40,'Tạm dừng','Phần trăm'),(11,'test',10000,1000,'2025-04-23','2025-04-25','2025-04-22 11:42:34',11,'Tạm dừng','Phần trăm'),(12,'Hè 2025',100000,1000000,'2025-05-09','2025-09-01','2025-05-10 00:23:51',25,'Hoạt động','Phần trăm'),(13,'PGG têst',433,23,'2025-05-10','2025-05-17','2025-05-10 10:28:36',33,'Tạm dừng','Phần trăm'),(14,'PGG',34,4,'2025-05-17','2025-05-31','2025-05-10 10:31:32',4,'Hoạt động','Tiền'),(15,'123',100,1000000,'2025-05-14','2025-05-17','2025-05-14 10:12:33',100000,'Hoạt động','Tiền');
/*!40000 ALTER TABLE `phieugiamgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieunhap`
--

DROP TABLE IF EXISTS `phieunhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phieunhap` (
  `maPhieuNhap` int NOT NULL AUTO_INCREMENT,
  `ngayTaoPhieu` datetime DEFAULT CURRENT_TIMESTAMP,
  `maNCC` int NOT NULL,
  `tongTienNhap` int NOT NULL DEFAULT '0',
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trangThai` enum('Đang chờ xác nhận','Đã xác nhận','Đã thanh toán','Đã hủy phiếu') DEFAULT 'Đang chờ xác nhận',
  `maNhanVien` int DEFAULT NULL,
  PRIMARY KEY (`maPhieuNhap`),
  KEY `maNCC` (`maNCC`),
  KEY `fk_maTaiKhoanNhanVien` (`maNhanVien`),
  CONSTRAINT `fk_maTaiKhoanNhanVien` FOREIGN KEY (`maNhanVien`) REFERENCES `nguoidung` (`maNguoiDung`),
  CONSTRAINT `phieuNhap_ibfk_2` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieunhap`
--

LOCK TABLES `phieunhap` WRITE;
/*!40000 ALTER TABLE `phieunhap` DISABLE KEYS */;
INSERT INTO `phieunhap` VALUES (1,'2010-05-04 00:00:00',3,16733,'2025-05-12 17:37:59','Đã thanh toán',1),(2,'2010-05-15 00:00:00',2,548447,'2025-05-12 17:38:17','Đã thanh toán',1),(3,'2025-04-04 00:00:00',4,3099994,'2025-05-10 10:22:33','Đã thanh toán',1),(4,'2025-04-08 00:00:00',4,1328652,'2025-04-21 20:00:49','Đang chờ xác nhận',1),(5,'2025-04-16 00:00:00',3,25939477,'2025-04-21 19:06:36','Đang chờ xác nhận',1),(6,'2025-04-08 00:00:00',9,10764,'2025-04-21 19:06:36','Đang chờ xác nhận',1),(7,'2025-04-16 00:00:00',9,13064649,'2025-04-22 13:08:43','Đã hủy phiếu',1),(8,'2025-04-22 00:00:00',12,2020000,'2025-04-22 13:08:57','Đã xác nhận',1),(9,'2025-04-22 00:00:00',9,965924,'2025-04-22 13:09:37','Đã thanh toán',1),(10,'2025-05-11 00:00:00',1,120,'2025-05-11 23:55:13','Đang chờ xác nhận',55),(11,'2025-05-11 00:00:00',2,50,'2025-05-11 23:57:31','Đang chờ xác nhận',55),(12,'2025-05-11 00:00:00',2,100,'2025-05-12 00:02:37','Đang chờ xác nhận',55),(13,'2025-05-11 00:00:00',2,100,'2025-05-12 00:03:10','Đã hủy phiếu',1),(14,'2025-05-11 00:00:00',2,100,'2025-05-12 00:03:36','Đã xác nhận',1),(15,'2025-05-11 00:00:00',3,2,'2025-05-12 00:07:01','Đã xác nhận',1),(16,'2025-05-11 00:00:00',3,100,'2025-05-12 00:15:34','Đang chờ xác nhận',55),(17,'2025-05-12 00:00:00',1,50,'2025-05-12 17:28:03','Đã xác nhận',1),(18,'2025-05-12 00:00:00',5,150,'2025-05-12 17:33:22','Đã thanh toán',1),(19,'2025-05-12 00:00:00',3,200,'2025-05-12 20:03:47','Đang chờ xác nhận',55),(20,'2025-05-12 00:00:00',2,100,'2025-05-12 20:08:49','Đang chờ xác nhận',55),(21,'2025-05-12 00:00:00',3,200000,'2025-05-12 20:10:31','Đang chờ xác nhận',55);
/*!40000 ALTER TABLE `phieunhap` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`bookStore`@`%`*/ /*!50003 TRIGGER `trg_update_soluong_sach_phieuNhap` AFTER UPDATE ON `phieunhap` FOR EACH ROW BEGIN
    -- Khi chuyển từ "Đang chờ xác nhận" sang "Đã xác nhận" -> CỘNG số lượng vào kho
    IF OLD.trangThai = 'Đang chờ xác nhận' AND NEW.trangThai = 'Đã xác nhận' THEN
        UPDATE sach s
        JOIN chiTietPhieuNhap ct ON ct.maSach = s.maSach
        SET s.soLuong = s.soLuong + ct.soLuong
        WHERE ct.maPhieuNhap = NEW.maPhieuNhap;
    
    -- Khi từ trạng thái KHÁC "Đang chờ xác nhận" chuyển sang "Đã hủy phiếu" -> TRỪ số lượng khỏi kho
    ELSEIF OLD.trangThai != 'Đang chờ xác nhận' AND NEW.trangThai = 'Đã hủy phiếu' THEN
        UPDATE sach s
        JOIN chiTietPhieuNhap ct ON ct.maSach = s.maSach
        SET s.soLuong = s.soLuong - ct.soLuong
        WHERE ct.maPhieuNhap = NEW.maPhieuNhap;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `phuongthucthanhtoan`
--

DROP TABLE IF EXISTS `phuongthucthanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phuongthucthanhtoan` (
  `maPhuongThuc` int NOT NULL AUTO_INCREMENT,
  `icon_url` varchar(255) DEFAULT NULL,
  `tenPhuongThuc` varchar(100) NOT NULL,
  `thongTin` text,
  `moTa` text,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  `trucTuyen` tinyint(1) DEFAULT '0',
  `taiKhoan` text,
  PRIMARY KEY (`maPhuongThuc`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phuongthucthanhtoan`
--

LOCK TABLES `phuongthucthanhtoan` WRITE;
/*!40000 ALTER TABLE `phuongthucthanhtoan` DISABLE KEYS */;
INSERT INTO `phuongthucthanhtoan` VALUES (1,'NamABank.png','Thanh toán khi nhận hàng (COD)',NULL,NULL,'2025-05-15 07:39:59','Hoạt động',0,NULL),(2,'Techcombank.png','Chuyển khoản ngân hàng Techcombank','Chi nhánh: Long Khánh - Đồng Nai','Nội dung: Tên đăng nhập với số tiền, VD: namduong 100000','2025-05-12 13:23:40','Hoạt động',0,'Chuyển khoản: 8685.8888.888 - NGUYEN NAM DUONG'),(3,'CardBank.png','Thanh toán qua VNPAY',NULL,NULL,'2025-05-12 13:25:13','Hoạt động',1,NULL),(4,'PVBank.png','Chuyển khoản ngân hàng mới',NULL,NULL,'2025-05-12 13:22:52','Hoạt động',1,NULL);
/*!40000 ALTER TABLE `phuongthucthanhtoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quyen`
--

DROP TABLE IF EXISTS `quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quyen` (
  `maQuyen` int NOT NULL AUTO_INCREMENT,
  `tenQuyen` varchar(100) NOT NULL,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  PRIMARY KEY (`maQuyen`),
  UNIQUE KEY `tenQuyen` (`tenQuyen`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quyen`
--

LOCK TABLES `quyen` WRITE;
/*!40000 ALTER TABLE `quyen` DISABLE KEYS */;
INSERT INTO `quyen` VALUES (1,'Nhân viên','2025-05-15 05:13:50','Hoạt động'),(2,'Quản lí','2025-03-27 14:11:43','Hoạt động'),(3,'Quản lý kho','2025-05-14 02:19:10','Hoạt động'),(15,'Quản trị viên','2025-05-06 12:32:06','Hoạt động'),(16,'Quản lý bán hàng','2025-05-14 02:18:51','Hoạt động');
/*!40000 ALTER TABLE `quyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sach`
--

DROP TABLE IF EXISTS `sach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sach` (
  `maSach` int NOT NULL AUTO_INCREMENT,
  `tenSach` varchar(100) NOT NULL,
  `soTrang` int DEFAULT NULL,
  `kichThuoc` int DEFAULT NULL,
  `moTa` varchar(1000) DEFAULT NULL,
  `maTacGia` int DEFAULT NULL,
  `maTheLoai` int DEFAULT NULL,
  `maLoaiBia` int DEFAULT NULL,
  `maNXB` int DEFAULT NULL,
  `namXuatBan` int DEFAULT NULL,
  `giaTran` int DEFAULT NULL,
  `giaBan` int DEFAULT NULL,
  `hinhAnh` varchar(200) DEFAULT NULL,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `soLuong` int DEFAULT '0',
  `trangThai` enum('Đang bán','Dừng bán') DEFAULT 'Đang bán',
  PRIMARY KEY (`maSach`),
  KEY `maTacGia` (`maTacGia`),
  KEY `maTheLoai` (`maTheLoai`),
  KEY `maLoaiBia` (`maLoaiBia`),
  KEY `maNXB` (`maNXB`),
  CONSTRAINT `sach_ibfk_1` FOREIGN KEY (`maTacGia`) REFERENCES `tacgia` (`matacGia`) ON DELETE SET NULL,
  CONSTRAINT `sach_ibfk_2` FOREIGN KEY (`maTheLoai`) REFERENCES `theloai` (`matheLoai`) ON DELETE SET NULL,
  CONSTRAINT `sach_ibfk_3` FOREIGN KEY (`maLoaiBia`) REFERENCES `loaibia` (`maLoaiBia`) ON DELETE SET NULL,
  CONSTRAINT `sach_ibfk_4` FOREIGN KEY (`maNXB`) REFERENCES `nhaxuatban` (`maNXB`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sach`
--

LOCK TABLES `sach` WRITE;
/*!40000 ALTER TABLE `sach` DISABLE KEYS */;
INSERT INTO `sach` VALUES (1,'Tôi thấy hoa vàng trên cỏ xanhh',375,15,'Tiểu thuyết về tuổi thơ đầy hoài niệm',1,1,2,5,2022,76000,96000,'1.png','2025-05-15 04:30:22',72,'Dừng bán'),(2,'Người lớn không khóc',325,13,'Tản văn đầy cảm xúc về cuộc sống và tình cảm',4,1,2,5,2025,60000,75000,'2.png','2025-05-12 10:38:07',62,'Đang bán'),(3,'Đừng lựa chọn an nhàn khi còn trẻ',280,14,'Sách self-help dành cho người trẻ',3,5,3,3,2025,85000,99000,'3.png','2025-05-12 10:38:07',123,'Đang bán'),(4,'Cho tôi xin một vé đi tuổi thơ',250,13,'Cuốn sách tuổi thơ đầy kỷ niệm',1,1,1,1,2025,65000,80000,'4.png','2025-05-12 10:38:07',409,'Đang bán'),(5,'Bắt trẻ đồng xanh',277,14,'Tiểu thuyết văn học nổi tiếng',5,1,2,5,2025,90000,110000,'5.png','2025-05-14 03:05:51',65,'Đang bán'),(6,'Gió đầu mùa',200,12,'Tập truyện ngắn của Thạch Lam',6,2,3,4,2025,50000,70000,'6.png','2025-05-14 01:50:25',79,'Đang bán'),(7,'Cánh đồng bất tận',320,14,'Truyện ngắn đặc sắc của Nguyễn Ngọc Tư',7,2,1,6,2025,70000,85000,'7.png','2025-05-10 01:44:05',78,'Đang bán'),(8,'Truyện ngắn Nguyễn Huy Thiệp',450,15,'Tuyển tập truyện ngắn hay nhất của Nguyễn Huy Thiệp',8,2,2,7,2025,100000,120000,'8.png','2025-05-14 03:07:10',81,'Đang bán'),(9,'Những người khốn khổ',1200,17,'Tác phẩm kinh điển của Victor Hugo',5,1,5,5,2025,200000,250000,'9.png','2025-05-14 03:08:45',36,'Đang bán'),(10,'Đắc Nhân Tâm',320,13,'Cuốn sách kỹ năng sống nổi tiếng',4,5,1,2,2025,90000,115000,'10.png','2025-05-10 01:44:05',39,'Đang bán'),(11,'Nhà giả kim',208,14,'Tác phẩm kinh điển của Paulo Coelho',7,1,1,3,2025,70000,90000,'11.png','2025-05-10 03:20:13',176,'Đang bán'),(12,'Muôn kiếp nhân sinh',400,15,'Tác phẩm về tâm linh và nhân quả',6,5,2,6,2025,160000,180000,'12.png','2025-05-12 10:38:07',134,'Đang bán'),(13,'Dám nghĩ lớn',250,14,'Sách phát triển tư duy thành công',8,5,3,4,2025,85000,99000,'13.png','2025-05-10 01:44:05',43,'Đang bán'),(14,'Chiến tranh và hòa bình',1300,18,'Tiểu thuyết lịch sử nổi tiếng của Tolstoy',5,7,4,5,2025,230000,280000,'14.png','2025-05-12 10:37:23',148,'Đang bán'),(15,'Lịch sử thế giới',700,16,'Cuốn sách tổng hợp về lịch sử nhân loại',9,8,3,7,2025,150000,180000,'15.png','2025-05-10 01:44:05',80,'Đang bán'),(16,'Sapiens: Lược sử loài người',450,15,'Cuốn sách lịch sử nhân loại nổi tiếng',10,8,2,4,2025,180000,210000,'16.png','2025-05-10 01:44:05',73,'Đang bán'),(17,'1984',328,14,'Tiểu thuyết dystopia kinh điển',3,1,1,3,2025,95000,115000,'17.png','2025-05-10 01:44:05',44,'Đang bán'),(18,'Dune',800,17,'Tiểu thuyết khoa học viễn tưởng nổi tiếng',4,9,5,8,2025,220000,260000,'18.png','2025-05-14 03:02:57',67,'Đang bán'),(19,'Harry Potter và Hòn đá phù thủy',350,15,'Tập đầu tiên của Harry Potter',2,9,4,9,2025,180000,210000,'19.png','2025-05-10 01:44:05',51,'Đang bán'),(20,'Sherlock Holmes toàn tập',1200,17,'Bộ truyện trinh thám kinh điển',1,10,1,10,2025,250000,300000,'20.png','2025-05-10 01:44:05',57,'Đang bán'),(21,'Bố già',600,16,'Tiểu thuyết kinh điển về thế giới mafia',1,1,1,1,2025,180000,220000,'21.png','2025-05-10 01:44:05',53,'Đang bán'),(22,'Thiên thần và ác quỷ',710,16,'Tiểu thuyết trinh thám ly kỳ của Dan Brown',2,10,2,2,2025,150000,180000,'22.png','2025-05-10 01:44:05',62,'Đang bán'),(23,'Mật mã Da Vinci',689,16,'Tiểu thuyết trinh thám bí ẩn nổi tiếng',3,10,3,3,2025,160000,190000,'23.png','2025-05-10 01:44:05',72,'Đang bán'),(24,'Hoàng tử bé',120,12,'Tác phẩm văn học nổi tiếng về tình yêu và cuộc sống',4,1,4,4,2025,50000,70000,'24.png','2025-05-12 09:50:05',40,'Đang bán'),(25,'Hai vạn dặm dưới đáy biển',500,15,'Tác phẩm khoa học viễn tưởng kinh điển',5,9,5,5,2025,120000,150000,'25.png','2025-05-10 01:44:05',76,'Đang bán'),(26,'Tội ác và trừng phạt',670,17,'Tác phẩm kinh điển của Dostoyevsky',6,1,1,6,2025,180000,220000,'26.png','2025-05-14 03:08:45',37,'Đang bán'),(27,'Những cuộc phiêu lưu của Tom Sawyer',300,14,'Tiểu thuyết thiếu nhi kinh điển',7,1,2,7,2025,80000,100000,'27.png','2025-05-10 01:44:05',62,'Đang bán'),(28,'Bí mật tư duy triệu phú',256,14,'Sách kỹ năng tài chính nổi tiếng',8,5,3,8,2025,90000,115000,'28.png','2025-05-10 01:44:05',39,'Đang bán'),(29,'Trí tuệ Do Thái',420,15,'Sách phát triển tư duy',9,5,4,9,2025,120000,140000,'29.png','2025-05-10 01:44:05',80,'Đang bán'),(30,'Suy nghĩ nhanh và chậm',610,16,'Sách tâm lý học kinh điển',10,5,5,10,2025,180000,200000,'30.png','2025-05-10 01:44:05',50,'Đang bán'),(31,'Bí mật của may mắn',200,12,'Câu chuyện truyền cảm hứng về thành công',1,5,1,2,2025,70000,85000,'31.png','2025-05-10 01:44:05',32,'Đang bán'),(32,'Tuổi trẻ đáng giá bao nhiêu?',280,13,'Sách self-help dành cho giới trẻ',2,5,2,3,2025,75000,90000,'32.png','2025-05-10 01:44:05',30,'Đang bán'),(33,'Cách nghĩ để thành công',320,14,'Cuốn sách kinh điển về thành công',3,5,3,4,2025,90000,110000,'33.png','2025-05-10 01:44:05',74,'Đang bán'),(34,'Tâm lý học đám đông',250,14,'Cuốn sách tâm lý học nổi tiếng',4,5,4,5,2025,95000,115000,'34.png','2025-05-10 01:44:05',50,'Đang bán'),(35,'Cư xử như đàn bà suy nghĩ như đàn ông',340,15,'Cuốn sách tâm lý tình cảm phổ biến',5,5,5,6,2025,100000,120000,'35.png','2025-05-10 01:44:05',49,'Đang bán'),(36,'Lược sử thời gian',280,14,'Cuốn sách khoa học nổi tiếng của Stephen Hawking',6,8,1,7,2025,140000,170000,'36.png','2025-05-10 01:44:05',64,'Đang bán'),(37,'Bách khoa toàn thư vũ trụ',500,17,'Cuốn sách khoa học về vũ trụ',7,8,2,8,2025,200000,230000,'37.png','2025-05-10 01:44:05',42,'Đang bán'),(38,'Hành trình về phương Đông',320,14,'Cuốn sách huyền bí về tri thức phương Đông',8,5,3,9,2025,120000,150000,'38.png','2025-05-10 01:44:05',39,'Đang bán'),(39,'Vũ trụ trong vỏ hạt dẻ',450,16,'Cuốn sách khoa học của Stephen Hawking',9,8,4,10,2025,180000,200000,'39.png','2025-05-10 01:44:05',38,'Đang bán'),(40,'Những người sống sót',600,16,'Tiểu thuyết tâm lý ly kỳ',10,10,5,1,2025,150000,180000,'40.png','2025-05-10 01:44:05',46,'Đang bán'),(41,'Hạt giống tâm hồn',250,14,'Tuyển tập những câu chuyện truyền cảm hứng',1,5,1,1,2025,70000,90000,'41.png','2025-05-10 01:44:05',35,'Đang bán'),(42,'Giết con chim nhại',400,16,'Tiểu thuyết kinh điển về phân biệt chủng tộc',2,1,2,2,2025,120000,150000,'42.png','2025-05-10 01:44:05',56,'Đang bán'),(43,'Tôi là Bêtô',300,14,'Truyện thiếu nhi nổi tiếng của Nguyễn Nhật Ánh',3,1,3,3,2025,80000,100000,'43.png','2025-05-10 01:44:05',47,'Đang bán'),(44,'Cuộc sống không giới hạn',280,14,'Tự truyện của Nick Vujicic',4,5,4,4,2025,90000,110000,'44.png','2025-05-10 01:44:05',36,'Đang bán'),(45,'Bí mật của Phan Thiên Ân',350,15,'Cuốn sách phát triển bản thân đầy triết lý',5,5,5,5,2025,95000,120000,'45.png','2025-05-10 01:44:05',61,'Đang bán'),(46,'Sherlock Holmes: Dấu bộ tứ',400,15,'Tập truyện trinh thám nổi tiếng',6,10,1,6,2025,140000,170000,'46.png','2025-05-10 01:44:05',66,'Đang bán'),(47,'Thế giới phẳng',500,17,'Cuốn sách về toàn cầu hóa',7,8,2,7,2025,160000,190000,'47.png','2025-05-10 01:44:05',68,'Đang bán'),(48,'Nhà thờ Đức Bà Paris',650,17,'Tác phẩm kinh điển của Victor Hugo',8,1,3,8,2025,200000,230000,'48.png','2025-05-14 03:08:45',41,'Đang bán'),(49,'Lão Hạc',120,12,'Truyện ngắn nổi tiếng của Nam Cao',9,2,4,9,2025,50000,70000,'49.png','2025-05-12 09:50:05',52,'Đang bán'),(50,'Những kẻ xuất chúng',320,14,'Cuốn sách về sự thành công',10,5,5,10,2025,130000,160000,'50.png','2025-05-10 01:44:05',36,'Đang bán'),(51,'Những tấm lòng cao cả',280,13,'Truyện thiếu nhi kinh điển',1,1,1,2,2025,70000,90000,'51.png','2025-05-10 01:44:05',77,'Đang bán'),(52,'Đông A liệt truyện',750,18,'Lịch sử nhà Trần',2,8,2,3,2025,180000,220000,'52.png','2025-05-10 01:44:05',43,'Đang bán'),(53,'Lược sử tương lai',430,15,'Sách khoa học dự đoán tương lai',3,8,3,4,2025,160000,190000,'53.png','2025-05-10 01:44:05',57,'Đang bán'),(54,'Truyện Kiều',500,16,'Tác phẩm kinh điển của Nguyễn Du',4,2,4,5,2025,100000,130000,'54.png','2025-05-10 01:44:05',74,'Đang bán'),(55,'Sống xanh',270,14,'Cuốn sách về bảo vệ môi trường',5,5,5,6,2025,110000,130000,'55.png','2025-05-10 01:44:05',70,'Đang bán'),(56,'Kẻ trộm sách',600,17,'Tiểu thuyết về chiến tranh và sách',6,1,1,7,2025,150000,180000,'56.png','2025-05-14 03:08:45',25,'Đang bán'),(57,'Sự im lặng của bầy cừu',380,14,'Tiểu thuyết trinh thám nổi tiếng',7,10,2,8,2025,140000,170000,'57.png','2025-05-10 01:44:05',43,'Đang bán'),(58,'Nghệ thuật tư duy rành mạch',350,14,'Sách về cách tư duy hiệu quả',8,5,3,9,2025,130000,160000,'58.png','2025-05-10 01:44:05',47,'Đang bán'),(59,'Làm giàu không khó',300,14,'Cuốn sách dạy kinh doanh',9,5,4,10,2025,90000,110000,'59.png','2025-05-10 01:44:05',78,'Đang bán'),(60,'Mắt biếc',260,13,'Tiểu thuyết nổi tiếng của Nguyễn Nhật Ánh',10,1,5,1,2025,80000,100000,'60.png','2025-05-10 01:44:05',67,'Đang bán');
/*!40000 ALTER TABLE `sach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tacgia`
--

DROP TABLE IF EXISTS `tacgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tacgia` (
  `maTacGia` int NOT NULL AUTO_INCREMENT,
  `tenTacGia` varchar(100) NOT NULL,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  PRIMARY KEY (`maTacGia`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tacgia`
--

LOCK TABLES `tacgia` WRITE;
/*!40000 ALTER TABLE `tacgia` DISABLE KEYS */;
INSERT INTO `tacgia` VALUES (1,'Nguyễn Nhật Ánh','2025-05-13 01:18:38','Hoạt động'),(2,'Nguyễn Ngọc Thạch','2025-04-06 08:27:23','Hoạt động'),(3,'Trang Hạ','2025-04-06 08:19:12','Hoạt động'),(4,'Gào (Vũ Phương Thanh)','2025-03-28 07:37:46','Hoạt động'),(5,'Minh Nhật','2025-03-28 07:38:05','Hoạt động'),(6,'Phan Ý Yên','2025-04-21 20:16:45','Hoạt động'),(7,'Tờ Pi','2025-03-27 02:50:47','Hoạt động'),(8,'Kawi Hồng Phương','2025-03-27 02:50:47','Hoạt động'),(9,'Nguyễn Huy Thiệp','2025-03-28 05:07:14','Hoạt động'),(10,'Nguyễn Ngọc Tư','2025-03-27 02:50:47','Hoạt động'),(22,'Trần Thanh Quy ngu','2025-05-15 04:24:55','Hoạt động'),(23,'Tác giả Spoce','2025-05-09 17:53:33','Tạm dừng');
/*!40000 ALTER TABLE `tacgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theloai`
--

DROP TABLE IF EXISTS `theloai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theloai` (
  `maTheLoai` int NOT NULL AUTO_INCREMENT,
  `tenTheLoai` varchar(100) NOT NULL,
  `ngayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trangThai` enum('Hoạt động','Tạm dừng') DEFAULT 'Hoạt động',
  PRIMARY KEY (`maTheLoai`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theloai`
--

LOCK TABLES `theloai` WRITE;
/*!40000 ALTER TABLE `theloai` DISABLE KEYS */;
INSERT INTO `theloai` VALUES (1,'Tiểu thuyết','2025-04-07 02:40:31','Hoạt động'),(2,'Truyện ngắn','2025-04-06 10:08:23','Hoạt động'),(3,'Thơ ca','2025-03-28 02:57:01','Hoạt động'),(4,'Khoa học viễn tưởng','2025-03-28 03:18:35','Hoạt động'),(5,'Tâm lý học','2025-03-28 02:26:50','Hoạt động'),(6,'Kinh tế','2025-03-28 05:39:57','Hoạt động'),(7,'Lịch sử','2025-03-27 02:50:47','Hoạt động'),(8,'Tôn giáo','2025-03-27 02:50:47','Hoạt động'),(9,'Giáo dục','2025-03-27 02:50:47','Hoạt động'),(10,'Truyện tranh','2025-04-20 00:32:38','Hoạt động'),(13,'Chính kịch','2025-05-13 07:21:37','Hoạt động'),(14,'Thần thoại','2025-05-09 17:39:36','Hoạt động'),(15,'Thể loại Spoce','2025-05-09 18:21:17','Tạm dừng'),(16,'Trinh thám','2025-05-12 10:45:02','Tạm dừng'),(17,'Địa lý','2025-05-12 10:44:55','Tạm dừng'),(18,'Kinh dị','2025-05-12 10:44:49','Tạm dừng'),(19,'Lập trình','2025-05-12 10:44:46','Tạm dừng'),(20,'Thiếu nhi','2025-05-12 10:44:42','Tạm dừng'),(21,'Khoa học','2025-05-12 10:44:36','Tạm dừng'),(22,'Giải trí','2025-05-12 10:44:31','Tạm dừng');
/*!40000 ALTER TABLE `theloai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vnpay`
--

DROP TABLE IF EXISTS `vnpay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vnpay` (
  `maGiaoDichVNPAY` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maDonHang` int NOT NULL,
  `soTien` int NOT NULL,
  `trangThai` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`maGiaoDichVNPAY`),
  KEY `fk_vnpay_donhang` (`maDonHang`),
  CONSTRAINT `fk_vnpay_donhang` FOREIGN KEY (`maDonHang`) REFERENCES `dondang` (`maDonHang`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vnpay`
--

LOCK TABLES `vnpay` WRITE;
/*!40000 ALTER TABLE `vnpay` DISABLE KEYS */;
INSERT INTO `vnpay` VALUES ('202522150016',66,280000000,'Thanh toán thành công');
/*!40000 ALTER TABLE `vnpay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bookstore'
--

--
-- Dumping routines for database 'bookstore'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-23 14:58:56
