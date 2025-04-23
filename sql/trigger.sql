
-- Trigger: Tính tiền khi INSERT vào chiTietDonHang
DELIMITER //

CREATE TRIGGER trg_chiTietDonHang_tinhTien_insert
BEFORE INSERT ON chiTietDonHang
FOR EACH ROW
BEGIN
    DECLARE giaSach INT;
    
    SELECT giaBan INTO giaSach
    FROM sach
    WHERE maSach = NEW.maSach;
    
    SET NEW.tienThu = giaSach * NEW.soLuong;
END;
//

DELIMITER ;



-- Trigger: Tính lại tiền khi UPDATE chiTietDonHang
DELIMITER //

CREATE TRIGGER trg_chiTietDonHang_tinhTien_update
BEFORE UPDATE ON chiTietDonHang
FOR EACH ROW
BEGIN
    DECLARE giaSach INT;
    
    SELECT giaBan INTO giaSach
    FROM sach
    WHERE maSach = NEW.maSach;
    
    SET NEW.tienThu = giaSach * NEW.soLuong;
END;
//

DELIMITER ;




-- Trigger: Cập nhật số lượng và trạng thái sách khi thêm chiTietPhieuNhap


DELIMITER //

CREATE TRIGGER trg_themChiTietPhieuNhap
AFTER INSERT ON chiTietPhieuNhap
FOR EACH ROW
BEGIN
    -- Cập nhật số lượng sách
    UPDATE sach
    SET soLuong = soLuong + NEW.soLuong
    WHERE maSach = NEW.maSach;

    -- Cập nhật trạng thái sách
    UPDATE sach
    SET trangThai = CASE
        WHEN soLuong > 0 THEN 'Đang bán'
        ELSE 'Dừng bán'
    END
    WHERE maSach = NEW.maSach;
END;
//

DELIMITER ;
