import { toast } from '../toast.js';
import { resetToOriginParam } from '../common.js';
import { isLogined } from './displayInfoUser.js';
import { updateInfoTopBar } from './displayInfoUser.js';
import { Validation } from '../validation.js';
import { showConfirmationDialog } from "../question.js";
import { setCookie } from '../common.js';

/**
 * @URLSearchParams là dạng như Promise. Cung cấp các việc: tìm kiếm, lấy, đẩy, toString (lấy sau origin href), ...
 * @windowLocationHref cung cấp full URL
 * @windowLocationOrigin cung cấp base URL không có bất cứ thứ gì
 * @historyReplaceState thay thế trạng thái trang hiện tại. Không thể ấn back
 * @historyPushState Lưu lịch sử, cho phép ấn back
 *
 *
 * ! new URL(window.location.href)
 * + href: Lấy toàn bộ đường dẫn
 * + search: lấy toàn bộ phía sau ?
 * + origin: lấy Domain
 */

document.addEventListener("DOMContentLoaded", async () => {
    showLoading();
    const responseAPI = await isLogined();
    hideLoading();

    const currentParams = new URLSearchParams(window.location.search);
    const url = new URL(window.location.href);

    // Ngăn chặn đã đăng nhập nhưng vẫn vào Form đăng ký/Đăng nhập
    if (responseAPI === false) {
        if (currentParams.has('auth')) {
            showFormUser(currentParams.get('auth'));
        }
    }

    if (responseAPI !== false) {
        showLoading();
        updateInfoTopBar(responseAPI);
        hideLoading();

        if (currentParams.has('auth')) {
            currentParams.delete('auth');
            url.search = currentParams.toString();
            window.history.replaceState(null, document.title, url.toString());
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.scroll-to-top-btn').addEventListener('click', function () {
        window.scrollTo(
            {
                top: 0,
                behavior: 'smooth'
            }
        );
    });
});

function clearURL() {
    let currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has('auth')) {
        currentParams.delete('auth');
    }
    const newURL = `${window.location.pathname}${currentParams.toString() ? '?' + currentParams.toString() : ''}`;
    window.history.replaceState(null, document.title, newURL);
}

function updateURLAuth(type) {
    let currentParams = new URLSearchParams(window.location.search);
    if (!currentParams.has('auth')) {
        currentParams.set('auth', type);
    }
    const newURL = `${window.location.pathname}${currentParams.toString() ? '?' + currentParams.toString() : ''}`;
    window.history.replaceState(null, document.title, newURL);
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
                        <i class="fa-solid fa-eye-slash auth__icon"></i>
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
                        <i class="fa-solid fa-eye-slash auth__icon"></i>
                    </div>
                    <div class="auth__group">
                        <input type="password" id="confirm-password" name="confirm_password" class="auth__input">
                        <label for="confirm-password" class="auth__label">Xác nhận mật khẩu</label>
                        <i class="fa-solid fa-eye-slash auth__icon"></i>
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
            <div class="auth__container-close" onclick="closeAuthForm()">X</div>
        </div>
    `;

    // Lấy cái tag auth class ở dưới gần cuối, nếu không có thì tự tạo
    let authElement = document.querySelector('.auth');
    if (!authElement) {
        authElement = document.createElement('div');
        authElement.classList.add('auth');
        document.body.appendChild(authElement);
    }

    authElement.innerHTML = result_html;
    authElement.style.display = 'block';

    // Sự kiện mấy cái nút ẩn đế hiển thị mất khẩu
    document.querySelectorAll('.auth__icon').forEach(authIcon => {
        authIcon.addEventListener('click', function () {
            let lableText = this.previousElementSibling;
            let passwordInput = lableText.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            } else {
                passwordInput.type = 'password';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            }
        });
    });


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

            const validation = new Validation();
            const trueValidation = validation.isTrueUsername(username) == validation.isTruePassword(password) == validation.isTruePassword(password) == true;
            if (name === '' || username === '' || password === '' || confirmPassword === '' || !trueValidation) {
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
                if (!validation.isTrueUsername(username)) {
                    toast({
                        title: 'Thông báo',
                        message: 'Tài khoản phải có ít nhất 6 kí tự !',
                        type: 'warning',
                        duration: 3000
                    });
                    document.getElementById("register-username").focus();
                    return;
                }
                if (!validation.isTruePassword(password)) {
                    toast({
                        title: 'Thông báo',
                        message: 'Mật khẩu có ít nhất 8 kí tự bao gồm ít nhất 1 số !',
                        type: 'warning',
                        duration: 3000
                    });
                    document.getElementById("register-password").focus();
                    return;
                }
                if (!validation.isTruePassword(confirmPassword)) {
                    toast({
                        title: 'Thông báo',
                        message: 'Mật khẩu xác nhận có ít nhất 8 kí tự bao gồm ít nhất 1 số !',
                        type: 'warning',
                        duration: 3000
                    });
                    document.getElementById("confirm-password").focus();
                    return;
                }
            }
            showLoading();

            const formData = new URLSearchParams();
            formData.append("name", document.getElementById("register-name").value);
            formData.append("username", document.getElementById("register-username").value);
            formData.append("password", document.getElementById("register-password").value);
            formData.append("confirm_password", document.getElementById("confirm-password").value);

            fetch("api/users/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            })
                .then(response => response.json())
                .then(async data => {
                    hideLoading();
                    toast({
                        title: "Thông báo",
                        message: data.message,
                        type: data.success === true ? 'success' : 'warning',
                        duration: 3000
                    });

                    if (data.success === true) {
                        closeAuthForm();

                        async function processConfirmation() {
                            const result = await showConfirmationDialog(`Bạn có muốn đăng nhập tài khoản ${username} vừa tạo không?`);
                            return result;
                        }

                        const resultAnswer = await processConfirmation();
                        if (resultAnswer == true) {
                            loginAfterRegister(username, password);
                        } else {
                            resetToOriginParam();
                            window.location.href = '/';
                        }
                    }
                })
                .catch(error => {
                    console.log('Lỗi khi đăng ký tài khoản');
                })
                .finally(() => {
                    hideLoading();
                    document.querySelector('.auth').display = 'none';
                });
        });
    }


    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value.trim();
    
            // Kiểm tra dữ liệu đầu vào
            if (username === '') {
                toast({
                    title: 'Thông báo',
                    message: 'Tài khoản không được để trống!',
                    type: 'warning',
                    duration: 3000
                });
                document.getElementById("login-username").focus();
                return;
            }
            if (password === '') {
                toast({
                    title: 'Thông báo',
                    message: 'Mật khẩu không được để trống!',
                    type: 'warning',
                    duration: 3000
                });
                document.getElementById("login-password").focus();
                return;
            }
            showLoading();
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);
    
            fetch("api/users/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString()
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    toast({
                        title: "Thông báo",
                        message: data.message,
                        type: data.success ? 'success' : 'warning',
                        duration: 3000
                    });
    
                    if (data.success === true) {
                        setCookie('isLogin', data.session_id, 1);
                        sessionStorage.setItem('user', JSON.stringify(data));
                        setTimeout(() => {
                            resetToOriginParam();
                            window.location.href = '/';
                        }, 1000);
                    }
                })
                .catch(error => {
                    console.log('Lỗi đăng nhập');
                    toast({
                        title: "Lỗi",
                        message: "Đã có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!",
                        type: 'error',
                        duration: 3000
                    });
                })
                .finally(() => {
                    hideLoading();
                });
        });
    }
}

function closeAuthForm() {
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


function loginAfterRegister(username, password) {
    const loginData = new URLSearchParams({
        username: username,
        password: password
    });
    showLoading();
    fetch("api/users/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: loginData.toString(),
    })
        .then(response => response.json())
        .then(data => {
            hideLoading();
            if (data.success) {
                setCookie('isLogin', 'd48c6bc91a28e768df710085e917db05', 1);
                toast({
                    title: "Đăng nhập thành công",
                    message: `Chào mừng ${username} đến với SPOCE Book Store`,
                    type: "success",
                    duration: 3000
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                toast({
                    title: "Lỗi",
                    message: "Không thể đăng nhập tự động. Vui lòng thử lại.",
                    type: "warning",
                    duration: 3000
                });
                resetToOriginParam();
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.log('Lỗi đăng nhập tự động');
        });
    hideLoading();
}


window.updateURLAuth = updateURLAuth;
window.clearURL = clearURL;
window.showFormUser = showFormUser;
window.closeAuthForm = closeAuthForm;
window.changeForm = changeForm;
