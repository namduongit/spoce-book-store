import { toast } from '../toast.js';
// import { checkLogin } from './displayInfoUser.js';
// import { getUserLogin } from './displayInfoUser.js';
// import { updateTopBar } from './displayInfoUser.js';

var currentUser = null;

document.addEventListener("DOMContentLoaded", async () => {
    let currentParams = new URLSearchParams(window.location.search);
    let isLogin = false;
    if (currentParams.has('auth') && isLogin === false) {
        const typeForm = currentParams.get('auth');
        showFormUser(typeForm);
    }
});

function clearURL() {
    let currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has('auth')) {
        currentParams.delete('auth');
    }
    const newURL = `${window.location.pathname}${currentParams.toString() ? '?' + currentParams.toString() : ''}`;
    history.replaceState(null, '', newURL);
}

function updateURLAuth(type) {
    let currentParams = new URLSearchParams(window.location.search);
    if (!currentParams.has('auth')) {
        currentParams.set('auth', type);
    }
    const newURL = `${window.location.pathname}${currentParams.toString() ? '?' + currentParams.toString() : ''}`;
    history.replaceState(null, '', newURL);
}

function showFormUser(type) {
    let formHTML = ``;
    updateURLAuth(type);
    if (type === 'login') {
        formHTML = `
            <div class="auth__form auth__form--login">
                <h2 class="auth__form-title">Đăng nhập</h2>
                <div class="auth__form-suggest">
                    <p>Chưa có tài khoản?</p>
                    <span onclick="changeForm(this)">Đăng ký ngay</span>
                </div>
                <form id="loginForm">
                    <div class="auth__group">
                        <input type="text" id="login-username" name="username" class="auth__input">
                        <label for="login-username" class="auth__label">Tên người dùng</label>
                    </div>
                    <div class="auth__group">
                        <input type="password" id="login-password" name="password" class="auth__input">
                        <label for="login-password" class="auth__label">Mật khẩu</label>
                    </div>
                    <button type="submit" class="auth__button">Đăng nhập</button>
                </form>
            </div>
        `;
    }

    else if (type === 'register') {
        formHTML = `
            <div class="auth__form auth__form--register">
                <h2 class="auth__form-title">Đăng ký</h2>
                <div class="auth__form-suggest">
                    <p>Đã có tài khoản?</p>
                    <span onclick="changeForm(this)">Đăng nhập ngay</span>
                </div>
                <form id="registerForm">
                    <div class="auth__group">
                        <input type="text" id="register-name" name="name" class="auth__input">
                        <label for="register-name" class="auth__label">Họ và Tên</label>
                    </div>
                    <div class="auth__group">
                        <input type="text" id="register-username" name="username" class="auth__input">
                        <label for="register-username" class="auth__label">Tên người dùng</label>
                    </div>
                    <div class="auth__group">
                        <input type="password" id="register-password" name="password" class="auth__input">
                        <label for="register-password" class="auth__label">Mật khẩu</label>
                    </div>
                    <div class="auth__group">
                        <input type="password" id="confirm-password" name="confirm_password" class="auth__input">
                        <label for="confirm-password" class="auth__label">Xác nhận mật khẩu</label>
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
            <div class="auth__form-container">${formHTML}</div>
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


    // Kiểm tra đã có chữ trong input thì active cho label lên trên
    const allGroupAuth = document.querySelectorAll('.auth__form form .auth__group');
    allGroupAuth.forEach(authGroup => {
        const inputField = authGroup.querySelector('.auth__input');
        inputField.oninput = function () {
            if (inputField.value !== '') {
                authGroup.querySelector('.auth__label').classList.add('auth__group--active');
            } else {
                authGroup.querySelector('.auth__label').classList.remove('auth__group--active');
            }
        };
    });

    // Xử lý đăng nhập/ Đăng ký
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("register-name").value;
            const username = document.getElementById("register-username").value;
            const password = document.getElementById("register-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            if (name === '' || username === '' || password === '' || confirmPassword === '') {
                if (name === '') {
                    toast({
                        title: 'Thông báo',
                        message: 'Họ và tên không được để trống !',
                        type: 'warning',
                        duration: 3000
                    });
                    document.getElementById("register-name").focus();
                    return;
                }
                if (username === '') {
                    toast({
                        title: 'Thông báo',
                        message: 'Tên đăng nhập không được để trống !',
                        type: 'warning',
                        duration: 3000
                    });
                    document.getElementById("register-username").focus();
                    return;
                }
                if (password === '') {
                    toast({
                        title: 'Thông báo',
                        message: 'Mật khẩu không được để trống !',
                        type: 'warning',
                        duration: 3000
                    });
                    document.getElementById("register-password").focus();
                    return;
                }
                if (confirmPassword === '') {
                    toast({
                        title: 'Thông báo',
                        message: 'Nhập lại mật khẩu không trống !',
                        type: 'warning',
                        duration: 3000
                    });
                    document.getElementById("confirm-password").focus();
                    return;
                }
                if (password !== confirmPassword) {
                    toast({
                        title: 'Thông báo',
                        message: 'Mật khẩu và mật khẩu xác nhận phải giống nhau !',
                        type: 'warning',
                        duration: 3000
                    });
                    return;
                }
            }

            showLoading();

            const formData = new URLSearchParams();
            formData.append("name", document.getElementById("register-name").value);
            formData.append("username", document.getElementById("register-username").value);
            formData.append("password", document.getElementById("register-password").value);
            formData.append("confirm_password", document.getElementById("confirm-password").value);

            fetch("../../../api/users/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            })
                .then(response => response.json())
                .then(data => {
                    toast({
                        title: "Thông báo",
                        message: data.message,
                        type: data.success === true ? 'success' : 'warning',
                        duration: 3000
                    });
                })
                .catch(error => {
                    console.log('Lỗi');
                })
                .finally(() => {
                    hideLoading();
                    // Ẩn cái form Đăng nhập/Đăng ký đi và hỏi có muốn đăng nhập bằng tài khoản đó không
                    document.querySelector('.auth').display = 'none';

                });
        });
    }


    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            if (username === '') {
                toast({
                    title: 'Thông báo',
                    message: 'Tài khoản không được để trống !',
                    type: 'warning',
                    duration: 3000
                });
                document.getElementById("login-username").focus();
                return;
            }
            if (password === '') {
                toast({
                    title: 'Thông báo',
                    message: 'Mật khẩu không được để trống !',
                    type: 'warning',
                    duration: 3000
                });
                document.getElementById("login-password").focus();
                return;
            }

            showLoading();

            const formData = new URLSearchParams();
            formData.append("username", document.getElementById("login-username").value);
            formData.append("password", document.getElementById("login-password").value);

            fetch("../../../api/users/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            })
                .then(response => response.json())
                .then(data => {
                    toast({
                        title: "Thông báo",
                        message: data['message'],
                        type: data['success'] === true ? 'success' : 'warning',
                        duration: 3000
                    });
                })
                .catch(error => {
                    console.log('Lỗi đăng nhập');
                })
                .finally(() => {
                    hideLoading();
                });
        });
    }

}

function close_auth_form() {
    let authElement = document.querySelector('.auth');
    if (authElement) {
        authElement.style.display = 'none';
    }
    clearURL();
}

function changeForm(HTMLObject) {
    const textHTML = HTMLObject.innerHTML;
    if (textHTML === 'Đăng nhập ngay') {
        showFormUser('login');
    } else if (textHTML === 'Đăng ký ngay') {
        showFormUser('register');
    }
}

window.updateURLAuth = updateURLAuth;
window.clearURL = clearURL;
window.showFormUser = showFormUser;
window.close_auth_form = close_auth_form;
window.changeForm = changeForm;


