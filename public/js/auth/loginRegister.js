import {toast} from '../toast.js'

document.addEventListener("DOMContentLoaded", () => {
    const URL = window.location.href;
    const regexSplit = URL.split('/');
    const lastPart = regexSplit.pop();
    const result = lastPart.replace(/[^a-zA-Z]/g, "");

    if (result === 'login') {
        showFormUser(null, 'Đăng nhập');
    } else if (result === 'signup') {
        showFormUser(null, 'Đăng ký');
    }
});

// Cập nhật URL khi chuyển đổi giữa đăng nhập & đăng ký
function updateURLAuth(type) {
    let baseParam = window.location.origin;

    if (type === 'login' || type === 'signup') {
        baseParam += '/' + type;
    }

    history.pushState(null, '', baseParam);
}

function clearURL() {
    history.pushState(null, '', window.location.origin);
}

// Hiển thị form đăng nhập hoặc đăng ký
function showFormUser(object, text_spans) {

    toast({
        title: "WARNING",
        message: "Không tìm thấy sản phẩm",
        type: "warning",
        duration: 3000,
      });
    return;
    let form_html = ``;
    let text_span = object ? object.innerText.trim() : text_spans;

    if (text_span === 'Đăng nhập' || text_span === 'Đăng nhập ngay') {
        updateURLAuth('login');
        form_html = `
            <div class="auth__form auth__form--login">
                <h2 class="auth__form-title">Đăng nhập</h2>
                <div class="auth__form-suggest">
                    <p>Chưa có tài khoản?</p>
                    <span onclick="showFormUser(this, null)">Đăng ký ngay</span>
                </div>
                <form id="loginForm" action="" method="POST">
                    <div class="auth__group">
                        <label for="login-username" class="auth__label">Tên người dùng</label>
                        <input type="text" id="login-username" name="username" class="auth__input" required>
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
        updateURLAuth('signup');
        form_html = `
            <div class="auth__form auth__form--register">
                <h2 class="auth__form-title">Đăng ký</h2>
                <div class="auth__form-suggest">
                    <p>Đã có tài khoản?</p>
                    <span onclick="showFormUser(this, null)">Đăng nhập ngay</span>
                </div>
                <form id="registerForm" method="POST">
                    <div class="auth__group">
                        <label for="register-name" class="auth__label">Họ và Tên</label>
                        <input type="text" id="register-name" name="name" class="auth__input" required>
                    </div>
                    <div class="auth__group">
                        <label for="register-username" class="auth__label">Tên người dùng</label>
                        <input type="text" id="register-username" name="username" class="auth__input" required>
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
                <img src="../../media/Logo/SPOCE_BOOK_STORE.png" alt="Logo Website">
            </div>
            <div class="auth__form-container">${form_html}</div>
            <div class="auth__container-close" onclick="close_auth_form()">X</div>
        </div>
    `;

    let authElement = document.querySelector('.auth');
    if (!authElement) {
        authElement = document.createElement('div');
        authElement.classList.add('auth');
        document.body.appendChild(authElement);
    }

    authElement.innerHTML = result_html;
    authElement.style.display = 'block';
}

// Đóng form và xóa URL
function close_auth_form() {
    let authElement = document.querySelector('.auth');
    if (authElement) {
        authElement.style.display = 'none';
    }
    clearURL();
}

window.showFormUser = showFormUser; 