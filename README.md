# 🚀 My PHP Project

![Project Banner](https://via.placeholder.com/1000x300?text=Welcome+to+My+Project)

## 📌 Giải thích sơ bộ class `DBConnection`
Lớp `DBConnection` dùng để kết nối và thực hiện các thao tác trên cơ sở dữ liệu.
(⚙️ Đang cập nhật nội dung chi tiết...)

---
## Quy định về CSS giao diện
- Về kích thước của các phần tử thì đa số dùng rem, hạn chế dùng pixel nhất có thể
- Quy định bạn đầu 1rem = 10px nó sẽ nhỏ dần theo màn hình
---

---
## Sử dụng gọi các gói (module)

### 1️⃣ **Dấu trang** 🛠️
📌 `./` → Thư mục hiện tại (cùng thư mục với tệp đang chạy).
📌 `../` → Thư mục cha (cấp trên của thư mục hiện tại).

### 2️⃣ **Về Ajax** 🛠️
📌 Do chạy từ trang đầu tiên `index.php` nên các trang `index.php` trong admin và public đều phải gọi
   các file `CSS` và `JavaScript` bằng admin hoặc public rồi đến `/` thì mới nhận được file
📌 Ngoài ra các file còn lại không cần gọi như như vậy muốn trỏ về thì dùng `../`
📌  Về bản chất khi thì vẫn tính là `index.php` đầu tiên của Project nên trong các hàm của `JavaScript` thì dùng khác với các import.  `url: "public/handle/book.php?page=" + mode`

### 3️⃣ **Import gói** 🛠️
📌 `JavaScript` là một trong những ngôn ngữ yêu cầu khi import bất kì 1 gói nào tự build phải xác định cấp cùng với thư mục gọi gói

---

## 📂 Phân bố các thư mục và ý nghĩa

### 1️⃣ **Admin** 🛠️
📌 Đây là khu vực dành cho **quản trị viên**, lưu trữ các giao diện và chức năng dành riêng cho admin.
📌 Có thể gọi các thư mục khác để **tái sử dụng** mã nguồn.

### 2️⃣ **App** 🔧
📌 Chứa thư viện và các thành phần quan trọng của ứng dụng, bao gồm:
✅ **`DBConnection`** – Kết nối đến cơ sở dữ liệu.
✅ **Models** – Lưu trữ các class tương ứng với thực thể trong mô hình ERD.
✅ **Config** – File cấu hình dùng chung cho toàn hệ thống.

### 3️⃣ **Media** 🎵🎬
📌 Lưu trữ các file đa phương tiện như **âm thanh, video, hình ảnh**.
📌 Có thể chứa **hình ảnh quảng cáo** để phân biệt với hình ảnh sản phẩm.

### 4️⃣ **Public** 🌐
📌 Chứa các file **assets** như CSS, JavaScript, hình ảnh cho phần giao diện khách hàng.
📌 **`index.php`** là file chính của website.

### 5️⃣ **Router** 🔀
📌 Xử lý điều hướng URL và chuyển đến đúng **Controller**.
📌 Nếu URL không hợp lệ, có thể trả về lỗi **404 hoặc 500** tùy theo thiết kế.

---

## 🛠️ Công nghệ sử dụng
- ![PHP](https://img.shields.io/badge/PHP-7.4-blue?style=flat&logo=php)
- ![MySQL](https://img.shields.io/badge/MySQL-5.7-blue?style=flat&logo=mysql)
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0-purple?style=flat&logo=bootstrap)
- ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat&logo=javascript)

---

## 📜 **Cách sử dụng**
1️⃣ Clone repo này về máy:
   ```sh
   git clone https://github.com/namduongit/spoce-book-store.git

