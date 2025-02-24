// Hàm thiết lập sự kiện thêm một người dùng cho bảng
export function addAccountData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-account");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một người dùng
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("account");
    addDialog.style.width = "672px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
      <h1 class="dialog__title">Thêm người dùng</h1>
      <button id="close-account-button" class="dialog__close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="dialog__line"></div>
      <div class="dialog__row">
        <div class="dialog__form-group">
          <label>Mã người dùng</label>
          <input type="text" id="add-account-id" readonly />
        </div>
        <div class="dialog__form-group">
          <label>Tên đăng nhập</label>
          <input type="text" id="add-account-username" placeholder="Nhập Tên đăng nhập" autofocus/>
        </div>
      </div>
      <div class="dialog__row">
        <div class="dialog__form-group">
          <label>Mật khẩu</label>
          <input type="text" id="add-account-password" placeholder="Nhập Mật khẩu" />
        </div>
        <div class="dialog__form-group">
          <label>Mật khẩu lần 2</label>
          <input type="text" id="add-account-password-2" placeholder="Nhập Mật khẩu lần 2" />
        </div>
      </div>
      <div class="dialog__row">
        <div class="dialog__form-group">
          <label>Số điện thoại</label>
          <input type="text" id="add-account-phone" placeholder="Nhập Số điện thoại" />
        </div>
        <div class="dialog__form-group">
          <label>Email</label>
          <input type="text" id="add-account-email" placeholder="Nhập Email"/>
        </div>
      </div>
      <div class="dialog__row">
        <div class="dialog__form-group">
        <label>Phân quyền</label>
        <select id="add-account-privilege">
            <option value="" selected>Chọn Phân quyền</option>
            <option value="1">Quản lý</option>
            <option value="2">Nhân viên</option>
            <option value="3">Khách hàng</option>
        </select>
      </div>
        <div class="dialog__form-group">
          <label>Trạng thái</label>
          <select id="add-account-status">
            <option value="" selected>Chọn Trạng thái</option>
            <option value="1">Hoạt động</option>
            <option value="2">Tạm dừng</option>
          </select>
        </div>
      </div>
      <div class="dialog__buttons">
        <button id="add-account-button" class="add">Thêm</button>
      </div>
    `;

    // Thêm vào body
    document.body.appendChild(addDialog);

    // Hiển thị addDialog
    addDialog.showModal();

    // Sự kiện cho các thành phần trong dialog
    // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
    const selectElement = document.querySelectorAll(
      ".dialog__form-group > select"
    );
    selectElement.forEach((select) => {
      select.addEventListener("change", function () {
        if (select.value !== "") {
          select.classList.add("changed");
        } else {
          select.classList.remove("changed");
        }
      });
    });

    // Gán sự kiện cho nút "Thêm" dialog
    document
      .getElementById("add-account-button")
      .addEventListener("click", () => {
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const id = document.getElementById("add-account-id");
        const username = document.getElementById("add-account-username");
        const password = document.getElementById("add-account-password");
        const password2 = document.getElementById("add-account-password-2");
        const phone = document.getElementById("add-account-phone");
        const email = document.getElementById("add-account-email");
        const privilege = document.getElementById("add-account-privilege");
        const status = document.getElementById("add-account-status");

        // ... (Xử lý tiếp ở đây)
        console.log(id.value);
        console.log(username.value);
        console.log(password.value);
        console.log(password2.value);
        console.log(phone.value);
        console.log(email.value);
        console.log(privilege.value);
        console.log(status.value);
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-account-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
