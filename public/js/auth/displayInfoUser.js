import { toast } from "../toast.js";
import { resetToOriginParam } from "../common.js";
import { getCookie } from "../common.js";
import { deleteCookie } from "../common.js";
import { showConfirmationDialog } from "../question.js";
import { Validation } from '../validation.js';
import { updateAddressSelect } from '../../../api/address/updateAddressSelect.js';

export async function fetchData(URL) {
    try {
        showLoading();
        let response = await fetch(URL);
        let dataResponse = await response.json();
        hideLoading();
        return dataResponse;
    } catch (error) {
        return null;
    }
}

export async function getUserByID(userId) {
    const URL = `api/users/get.php?userId=${userId}`;
    showLoading();
    let response = await fetchData(URL);
    hideLoading();
    let result = response[0];
    return result;
}

export async function isLogined() {
    // const token = localStorage.getItem('token');
    const token = getCookie('token');

    if (!token) {
        console.log('Không có token, chưa đăng nhập');
        return false;
    }

    try {
        showLoading();
        const response = await fetch('/api/users/checkLogin.php', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.log('Token không hợp lệ hoặc hết hạn');
                return false;
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        hideLoading();
        return data;
    } catch (error) {
        console.error('Lỗi khi kiểm tra đăng nhập:', error.message);
        return false;
    }
}


export async function updateInfoTopBar(promiseResponse) {
    showLoading();
    const currentUser = await getUserByID(promiseResponse.user['id']);
    hideLoading();
    console.log(currentUser);

    // Cập nhật thanh công cụ của người dùng
    const authTopBarContent = document.querySelector('.topbar .topbar__auth');
    authTopBarContent.innerHTML = `
                <div class="topbar__auth-btn topbar__auth-btn--logined">
                    <i class="fa-solid fa-user-gear"></i>
                    <span>${currentUser['full_name']}</span>
                    <i class="fa-solid fa-caret-down"></i>
                </div>

                <ul class="topbar__auth-list">
                    <li class="topbar__info-btn">
                        <i class="fa-solid fa-user-gear"></i>
                        Thông tin
                    </li>
                    <li  onclick="showContentProfile('purchase-order')">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Đơn hàng
                    </li>
                    <li class="logout-current-account">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        Đăng xuất
                    </li>
            </ul>
    `;

    // Thêm sự kiện khi ấn nút
    const authLoginedButton = authTopBarContent.querySelector('.topbar__auth-btn--logined');
    const logoutBtn = authTopBarContent.querySelector('.logout-current-account');
    authLoginedButton.addEventListener('click', function () {
        const caretIcon = this.querySelectorAll('.fa-solid')[1];
        this.classList.toggle('active');
        caretIcon.classList.toggle('fa-caret-up');
        caretIcon.classList.toggle('fa-caret-down');
    });

    document.querySelector('.topbar__info-btn').addEventListener('click', async () => {
        await showContentProfile('information');
    });

    logoutBtn.addEventListener('click', async function () {
        // const token = localStorage.getItem('token');
        const token = getCookie('token');
        if (!token) {
            toast({
                title: 'Thông báo',
                message: 'Có lỗi hệ thống khi đăng xuất !',
                type: 'warning',
                duration: 3000
            });
            setTimeout(() => {
                resetToOriginParam();
                window.location.href = '/';
            }, 1000);
            return;
        }

        try {
            showLoading();
            const response = await fetch('/api/users/logout.php', {
                method: 'POST', // Hoặc GET, tùy cấu hình backend
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            hideLoading();
            if (data['success']) {
                // localStorage.removeItem('token');
                deleteCookie('token');
                toast({
                    title: 'Thông báo',
                    message: 'Đăng xuất thành công !',
                    type: 'success',
                    duration: 3000
                });
                authTopBarContent.innerHTML = `
                    <div class="topbar__auth-btn topbar__auth-btn--login margin-right-medium" onclick="showFormUser('login')">
                        <i class="fa-solid fa-street-view"></i>
                        <span id="login-form">Đăng&nbsp;nhập</span>
                    </div>
                    <div class="topbar__auth-btn topbar__auth-btn--register margin-right-medium " onclick="showFormUser('register')">
                        <i class="fa-solid fa-user-pen"></i>
                        <span id="register-form">Đăng&nbsp;ký</span>
                    </div>
                `;

                setTimeout(() => {
                    resetToOriginParam();
                    window.location.href = '/';
                }, 1000);
            }
        } catch {
            console.log('Có lỗi khi đăng xuất');
        }
    });
}

function hideMainPage() {
    const main = document.querySelector('.main');
    const body = document.querySelector('.body');
    const checkout = document.querySelector('.checkout');
    const menu = document.querySelector('.topbar__auth-list');

    if (!main.classList.contains('hide-item')) {
        main.classList.add('hide-item');
    }

    if (!body.classList.contains('hide-item')) {
        body.classList.add('hide-item');
    }

    if (!checkout.classList.contains('hide-item')) {
        checkout.classList.add('hide-item');
    }

    if (menu !== null) {
        if (!menu.classList.contains('hide-item')) {
            menu.classList.add('hide-item');
        }
    }
}

async function showContentProfile(info) {
    showLoading();
    let url = new URLSearchParams();
    let currentParams = new URLSearchParams(window.location.search);
    const infoPage = document.querySelector('.self-infomation');
    const responseAPI = await isLogined();
    let user = null;

    if (responseAPI === false) {
        if (currentParams.has('account')) {
            if (!infoPage.classList.contains('hide-item')) {
                infoPage.classList.add('hide-item');
            }
            currentParams.delete('account');
            window.history.replaceState(null, '', window.location.pathname + currentParams.toString());
            return;
        }
    }

    if (responseAPI !== false) {
        user = await getUserByID(responseAPI.user['id']);
        
        console.log(user);
    }

    hideMainPage();
    if (infoPage.classList.contains('hide-item')) {
        infoPage.classList.remove('hide-item');
    }

    if (info === 'information') {
        url.set("account", "information");
        updateInfoAccountSection(user);
    } else if (info === 'address') {
        url.set("account", "address");
        updateAddressAccountSection(user);
    } else if (info === 'payment') {
        url.set("account", "payment");
        updatePaymentAccountSection(user);
    }
    hideLoading();
    history.pushState(null, '', window.location.pathname + '?' + url.toString());
}

function updateInfoAccountSection(user) {
    const container = document.querySelector('.right-container');
    let userid = user['id'];
    let fullName = user['full_name'] != null ? user['full_name'] : '';
    let username = user['username']  != null ? user['username'] : '';
    let phone = user['phone']  != null ? user['phone'] : '';
    let email = user['email']  != null ? user['email'] : '';
    container.innerHTML = `
    <div class="left-content">
        <div class="checkout__input-field">
            <input type="text" id="info-username" name="info-username" value="${username}" disabled>
            <label for="info-username">Tên tài khoản</label>
        </div>

        <div class="checkout__input-field">
            <input type="text" id="info-password" name="info-password" value="*************" disabled>
            <label for="info-password">Mật khẩu</label>
        </div>
        <span class="change-password-btn">Đổi mật khẩu</span>
        <div class="change-password-container">
            <div class="checkout__input-field">
                <input type="password" id="info-newpassword" name="info-newpassword" placeholder=" ">
                <label for="info-newpassword">Mật khẩu mới</label>
            </div>
            <div class="checkout__input-field">
                <input type="password" id="info-repeatpassword" name="info-repeatpassword" placeholder=" ">
                <label for="info-repeatpassword">Nhập lại mật khẩu mới</label>
            </div>
        </div>
        <div class="checkout__input-field">
            <input type="text" id="info-fullname" name="info-fullname" placeholder=" " value="${fullName}">
            <label for="fullname">Họ và tên</label>
        </div>

        <div class="checkout__input-field">
            <input type="text" id="info-numberphone" name="info-numberphone" placeholder=" " value="${phone}">
            <label for="info-numberphone">Số điện thoại</label>
        </div>

        <div class="checkout__input-field">
            <input type="text" id="info-email" name="info-email" placeholder=" " value="${email}">
            <label for="info-email">Email</label>
        </div>

        <button class="account-info-btn account-info-btn--blue">Lưu</button>
        <button class="account-info-btn account-info-btn--black">Đặt lại</button>
    </div>

    <div class="right-content">
        <p>Để giữ cho tài khoản của bạn bảo mật an toàn chúng tôi khuyên bạn nên tránh việc tạo mật khẩu sử dụng có chứa:</p>
        <br>
        <ul>
            <li>Từ đánh vần ngược, lỗi chính tả phổ biến và chữ viết tắt.</li><br>
            <li>Các ký tự dễ đoán hoặc lặp đi lặp lại. Ví dụ: 12345678, 222222, abcdefg, hoặc các chữ cái liền kề trên bàn phím (qwerty).</li><br>
            <li>Các thông tin cá nhân: Tên của bạn, ngày sinh, số giấy phép lái xe, số hộ chiếu, hoặc thông tin tương tự.</li>
        </ul>
    </div>
    `;

    document.querySelector('.change-password-btn').addEventListener('click', function () {
        const changePassContainer = document.querySelector('.change-password-container');
        if (!changePassContainer.classList.contains('show')) {
            changePassContainer.classList.add('show');
        }
    });

    document.querySelector('.account-info-btn--blue').addEventListener('click', async () => {
        const result = await showConfirmationDialog('Bạn chắc chắn muốn đổi thông tin?');
        if (result == true) {
            showLoading();
            const formData = new URLSearchParams();
            const validation = new Validation();
            const fullname = document.querySelector('#info-fullname').value;
            const numberphone = document.querySelector('#info-numberphone').value;
            const email = document.querySelector('#info-email').value;
            const password = document.querySelector('#info-newpassword').value;
            const repeatpassword = document.querySelector('#info-repeatpassword').value;

            if (fullname === '') {
                toast({
                    title: 'Thông báo',
                    message: 'Họ và tên không được trống!',
                    type: 'warning',
                    duration: 3000
                });
                hideLoading();
                return;
            }

            if (!validation.kiemtraSDT(numberphone)) {
                toast({
                    title: 'Thông báo',
                    message: 'Số điện thoại không đúng định dạng!',
                    type: 'warning',
                    duration: 3000
                });
                hideLoading();
                return;
            }

            if (!validation.kiemtraEmail(email)) {
                toast({
                    title: 'Thông báo',
                    message: 'Email không đúng định dạng!',
                    type: 'warning',
                    duration: 3000
                });
                hideLoading();
                return;
            }

            if (password !== '' && repeatpassword !== '') {
                if (password !== repeatpassword) {
                    toast({
                        title: 'Thông báo',
                        message: 'Mật khẩu và mật khẩu xác nhận phải giống nhau!',
                        type: 'warning',
                        duration: 3000
                    });
                    hideLoading();
                    return;
                }
                if (!validation.isTruePassword(password)) {
                    toast({
                        title: 'Thông báo',
                        message: 'Mật khẩu có ít nhất 8 kí tự bao gồm ít nhất 1 số!',
                        type: 'warning',
                        duration: 3000
                    });
                    hideLoading();
                    return;
                }
                if (!validation.isTruePassword(repeatpassword)) {
                    toast({
                        title: 'Thông báo',
                        message: 'Mật khẩu xác nhận có ít nhất 8 kí tự bao gồm ít nhất 1 số!',
                        type: 'warning',
                        duration: 3000
                    });
                    hideLoading();
                    return;
                }
            } else if ((password !== '' && repeatpassword === '') || (password === '' && repeatpassword !== '')) {
                toast({
                    title: 'Thông báo',
                    message: 'Vui lòng nhập đủ cả 2 ô mật khẩu!',
                    type: 'warning',
                    duration: 3000
                });
                hideLoading();
                return;
            }

            formData.append("id", userid);
            formData.append("name", fullname);
            formData.append("phone", numberphone);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("confirm_password", repeatpassword);
            console.log(formData.toString());
            fetch("api/users/update.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            })
            .then(response => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then(data => {
                hideLoading();
                toast({
                    title: "Thông báo",
                    message: data.message,
                    type: data.success === true ? 'success' : 'warning',
                    duration: 3000
                });
            })
            .catch(error => {
                hideLoading();
                console.error("Fetch error:", error);
            })
        } else {
            console.log("no");
        }
    });

    document.querySelector('.account-info-btn--black').addEventListener('click', function () {
        document.querySelector('#info-fullname').value = fullName;
        document.querySelector('#info-numberphone').value = phone;
        document.querySelector('#info-email').value = email;
    });
}

function updateAddressAccountSection(user) {
    const container = document.querySelector('.right-container');
    container.innerHTML = `
    <div class="left-content">
        <div class="checkout__input-field">
            <input type="text" id="address-number" name="address-number" placeholder=" ">
            <label for="address-number">Số nhà, tên đường</label>
        </div>
        <div class="checkout__input-field checkout__address-select">
            <label>Tỉnh / thành</label>
            <select name="city" id="city">
                <option value="default" selected>Chọn tỉnh / thành</option>
            </select>
            <p class="checkout__empty-field-warning-two hide-item">Vui lòng chọn tỉnh thành</p>
        </div>
        <div class="checkout__input-field checkout__address-select">
            <label>Quận / huyện</label>
            <select name="district" id="district">
                <option value="default" selected>Chọn quận / huyện</option>
            </select>
            <p class="checkout__empty-field-warning-two hide-item">Vui lòng chọn quận huyện</p>
        </div>
        <div class="checkout__input-field checkout__address-select">
            <label>Phường / xã</label>
            <select name="ward" id="ward">
                <option value="default" selected>Chọn phường / xã</option>
            </select>
            <p class="checkout__empty-field-warning-two hide-item">Vui lòng chọn phường xã</p>
        </div>

        <button class="account-info-btn account-info-btn--blue">Lưu</button>
        <button class="account-info-btn account-info-btn--black">Đặt lại</button>
    </div>

    <div class="right-content">
        <p>Để cho quá trình giao hàng được hoàn thành một cách tiện lợi và nhanh chóng đến khách hàng vui lòng:</p>
        <br>
        <ul>
            <li>Cung cấp đầy đủ và chính xác thông tin địa chỉ giao hàng và số điện thoại liên lạc.</li><br>
            <li>Vui lòng đảm bảo có người nhận hàng tại địa chỉ giao hàng trong thời gian dự kiến.</li><br>
            <li>Vui lòng kiểm tra kỹ hàng hóa trước khi ký nhận.</li>
        </ul>
    </div>
    `;
}

function updatePaymentAccountSection(user) {
    const container = document.querySelector('.right-container');
    container.innerHTML = `
    <div class="left-content">
        <div class="checkout__input-field">
            <input type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" maxlength="19" id="account-card-number-field" name="card-number" placeholder="Số thẻ">
            <label>Số thẻ (16 số)</label>
        </div>

        <div class="checkout__input-field">
            <input type="tel" inputmode="numeric" maxlength="5" id="account-card-expiration-field" name="card-expiration" placeholder="Ngày hết hạn">
            <label>Ngày hết hạn (MM/YY)</label>
        </div>

        <div class="checkout__input-field">
            <input type="tel" inputmode="numeric" pattern="[0-9]{3}" maxlength="3" id="account-card-cvv-field" name="card-cvv" placeholder="Mã bảo mật">
            <label>Mã bảo mật (3 số)</label>
        </div>

        <button class="account-info-btn account-info-btn--blue">Lưu</button>
        <button class="account-info-btn account-info-btn--black">Đặt lại</button>
    </div>

    <div class="right-content">
        <p>Chúng tôi chấp nhận các loại thẻ Visa, Mastercard, và American Express.</p>
        <p>Để quá trình thanh toán bằng thẻ tín dụng được thực hiện thành công, Quý khách vui lòng:</p>
        <br>
        <ul>
            <li>Cung cấp thông tin thẻ tín dụng chính xác và đầy đủ.</li><br>
            <li>Đảm bảo số dư trong tài khoản thẻ đủ để thanh toán.</li><br>
            <li>Xác nhận giao dịch theo yêu cầu của ngân hàng (nếu có).</li>
        </ul>
    </div>
    `;

    document.querySelector('#account-card-number-field').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, "");
        let newValue = value.replace(/(\d{4})/g, "$1 ").trim();
        e.target.value = newValue;
    });

    document.querySelector('#account-card-cvv-field').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, "");
        e.target.value = value;
    });

    document.querySelector('#account-card-expiration-field').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 0 && !/^0|1/g.test(value)) {
            value = value.substring(1);
        }

        if (/^1[3-9]/g.test(value)) {
            value = value.substring(0,1);
        }

        if (value.length > 2) {
            value = value.substring(0,2) + "/" + value.substring(2);
        }

        e.target.value = value;
    });
}

document.querySelector('.information').addEventListener('click', function () {
    showContentProfile('information');
});

document.querySelector('.address').addEventListener('click', function () {
    showContentProfile('address');
});

document.querySelector('.payment').addEventListener('click', function () {
    showContentProfile('payment');
});

document.addEventListener("DOMContentLoaded", function () {
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has('account')) {
        showContentProfile(currentParams.get('account'));
    } else {
        const infoPage = document.querySelector('.self-infomation');
        if (!infoPage.classList.contains('hide-item')) {
            infoPage.classList.add('hide-item');
        }
    }
});


