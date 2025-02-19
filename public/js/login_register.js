function show_form(object) {
    let form_html = ``;
    let text_span = object.innerText.trim(); // Loại bỏ khoảng trắng thừa

    if (text_span === 'Đăng nhập' || text_span === 'Đăng nhập ngay') {
        form_html = `
            <div class="auth__form auth__form--login">
                <h2 class="auth__form-title">Đăng nhập</h2>
                <div class="auth__form-suggest">
                    <p>Chưa có tài khoản</p>
                    <span onclick="show_form(this)">Đăng ký ngay</span>
                </div>
                <form action="" method="POST">
                    <div class="auth__group">
                        <label for="login-email" class="auth__label">Email</label>
                        <input type="email" id="login-email" name="email" class="auth__input" required>
                    </div>
                    <div class="auth__group">
                        <label for="login-password" class="auth__label">Mật khẩu</label>
                        <input type="password" id="login-password" name="password" class="auth__input" required>
                    </div>
                    <button type="submit" class="auth__button">Đăng nhập</button>
                </form>
            </div>
        `;
    } else if (text_span === 'Đăng ký' || text_span === 'Đăng ký ngay') {
        form_html = `
            <div class="auth__form auth__form--register">
                <h2 class="auth__form-title">Đăng ký</h2>
                <div class="auth__form-suggest">
                    <p>Đã có tài khoản</p>
                    <span onclick="show_form(this)">Đăng nhập ngay</span>
                </div>
                <form action="" method="POST">
                    <div class="auth__group">
                        <label for="register-name" class="auth__label">Họ và Tên</label>
                        <input type="text" id="register-name" name="name" class="auth__input" required>
                    </div>
                    <div class="auth__group">
                        <label for="register-email" class="auth__label">Email</label>
                        <input type="email" id="register-email" name="email" class="auth__input" required>
                    </div>
                    <div class="auth__group">
                        <label for="register-password" class="auth__label">Mật khẩu</label>
                        <input type="password" id="register-password" name="password" class="auth__input" required>
                    </div>
                    <div class="auth__group">
                        <label for="confirm-password" class="auth__label">Xác nhận mật khẩu</label>
                        <input type="password" id="confirm-password" name="confirm_password" class="auth__input" required>
                    </div>
                    <button type="submit" class="auth__button">Đăng ký</button>
                </form>
            </div>
        `;
    }

    let result_html = `
        <div class="auth__container d-flex just-content-spbt">
            <div class="auth__logo">
                <img src="../media/Logo/SPOCE BOOK STORE.png" alt="Logo Website">
            </div>
            <div class="auth__form-container">${form_html}</div> <!-- Đưa form vào container -->
            <div class="auth__container-close" onclick="close_auth_form()">X</div>
        </div>
    `;

    let authElement = document.querySelector('.auth');
    authElement.innerHTML = result_html;
    authElement.style.display = 'block';
}


function close_auth_form() {
    document.querySelector('.auth').style.display = 'none';
}