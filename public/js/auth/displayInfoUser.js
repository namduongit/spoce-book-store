import { toast } from "../toast.js";
import { showConfirmationDialog } from "../question.js";
import { Validation } from '../validation.js';
import { updateAddressSelect } from '../../../api/address/updateAddressSelect.js';
import { autoSelectAddressByName } from "../../../api/address/updateAddressSelect.js";
import { deleteCookie, getRoleById, setCookie } from "../common.js";
import { getCookie } from "../common.js";
import { showOrderHistory } from "./orderHistory.js";

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

export async function getUserByID(userID) {
    const URL = `api/users/get.php?userId=${userID}`;
    showLoading();
    let response = await fetchData(URL);
    hideLoading();
    let result = response[0];
    return result;
}

export async function isLogined() {
    if (!getCookie('isLogin')) return false;
    if (getCookie('isLogined') != null) return false;
    try {
        showLoading();
        const response = await fetch('/api/users/checkLogin.php', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            if (response.status === 401) {
                console.log('Chưa đăng nhập hoặc phiên đã hết hạn');
                return false;
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        sessionStorage.setItem('user', JSON.stringify(data));
        hideLoading();
        return data;
    } catch (error) {
        console.log('Lỗi khi kiểm tra đăng nhập:');
        return false;
    }
}

export async function getCurrentUser() {
    const dataPromise = await isLogined();
    if (dataPromise !== false) {
        return dataPromise;
    } return null;
}


export async function getAddressByID(addressID) {
    const URL = `api/address/getOnly.php`;
    let formData = new URLSearchParams();
    formData.append('idAddress', addressID);
    showLoading();
    let response = fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {
        return data;
    });
    hideLoading();
    return response;
}

export async function updateInfoTopBar(promiseResponse) {
    showLoading();
    // Đưa lên Cookie
    setCookie('cookieRole', promiseResponse['role']['data'].length > 0 ? promiseResponse['role']['data'][0]['roleId'] : 'none');

    const currentUser = await getUserByID(promiseResponse.user['id']);
    let responseRole = await getRoleById(currentUser['role_id']);
    let nameRole = responseRole['response'] ? responseRole['data'].name : 'Khách hàng';

    let adminPage = nameRole != 'Khách hàng' ? `
    <li class="topbar__history-order-btn">
       <a href='/admin'>
            <i class="fa-solid fa-toolbox"></i>
            Trang quản lý
       </a>
    </li>
    ` : '';
    hideLoading();
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
                    <li class="topbar__history-order-btn">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Đơn hàng
                    </li>
                    ${adminPage}
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

    document.querySelector(".topbar__history-order-btn").addEventListener('click', async () => {
        await showOrderHistory();
    });

    logoutBtn.addEventListener('click', async function () {
        try {
            showLoading();
            const response = await fetch('/api/users/logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            hideLoading();
            if (data['success']) {
                // Xóa Session cũ và login cũ
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('dataRole');
                // Xóa cookie
                deleteCookie('isLogin');
                deleteCookie('cookieRole');
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
                    window.location.href = '/';
                }, 1000);
            }
        } catch {
            console.log('Có lỗi khi đăng xuất');
        }
    });
}

export function hideMainPage() {
    const main = document.querySelector('.main');
    const body = document.querySelector('.body');
    const checkout = document.querySelector('.checkout');
    const menu = document.querySelector('.topbar__auth-list');
    const footer = document.querySelector('.footer-info');
    const showCart = document.querySelector('.show-cart');
    const orderPage = document.querySelector('.order-history');
    const categoryMenu = document.querySelector('.menu-container');

    if (!main.classList.contains('hide-item')) {
        main.classList.add('hide-item');
    }

    if (!body.classList.contains('hide-item')) {
        body.classList.add('hide-item');
    }

    if (!checkout.classList.contains('hide-item')) {
        checkout.classList.add('hide-item');
    }

    if (!footer.classList.contains('hide-item')) {
        footer.classList.add('hide-item');
    }

    if (!showCart.classList.contains('hide-item')) {
        showCart.classList.add('hide-item');
    }

    if (!orderPage.classList.contains('hide-item')) {
        orderPage.classList.add('hide-item');
    }

    if (!categoryMenu.classList.contains('hide-item')) {
        categoryMenu.classList.add('hide-item');
    }
}

async function showContentProfile(info) {
    showLoading();
    let url = new URLSearchParams();
    let currentParams = new URLSearchParams(window.location.search);
    const infoPage = document.querySelector('.self-infomation');
    const responseAPI = JSON.parse(sessionStorage.getItem("user")) || false;
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
    }
    hideLoading();
    history.pushState(null, '', window.location.pathname + '?' + url.toString());
}

async function updateInfoAccountSection(user) {
    const container = document.querySelector('.right-container');
    let userid = user['id'];
    let fullName = user['full_name'] != null ? user['full_name'] : '';
    let username = user['username'] != null ? user['username'] : '';
    let phone = user['phone'] != null ? user['phone'] : '';
    let email = user['email'] != null ? user['email'] : '';
    let responseRole = await getRoleById(user['role_id']);
    let nameRole = responseRole['response'] ? responseRole['data'].name : 'Khách hàng';

    container.innerHTML = `
    <div class="left-container__warpper">
        <div class="checkout__input-field">
            <input type="text" id="info-username" name="info-username" value="${username}" disabled>
            <label for="info-username">Tên tài khoản</label>
        </div>

        <div class="checkout__input-field">
            <input type="text" id="info-role" name="info-username" value="${nameRole}" disabled>
            <label for="info-role">Quyền hạn</label>
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

    <div class="right-content__warpper">
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
                    console.log("Fetch error:");
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

export async function showAddressInCurrentUser(userId) {
    try {
        let response = await fetch('../../../api/address/getAddress.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `maNguoiDung=${userId}`
        });
        let data = await response.json();
        if (data.success) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.log('Lỗi khi gọi API');
        return null;
    }
}


async function goBackShowAddress(user) {
    const container = document.querySelector('.right-container');
    showLoading();
    const currentAddress = await showAddressInCurrentUser(user.id);
    hideLoading();

    let addressContent = ``;
    if (currentAddress) {
        const datas = currentAddress.data;
        datas.forEach(element => {
            addressContent += `
                <div class="left-container__content-item">
                    <div class="left-container__info">
                        <div class="left-container__content-province">
                            Tỉnh thành: <strong>${element.province}</strong>
                        </div>
                        <div class="left-container__content-district">
                            ${element.district} / ${element.ward} / ${element.street}
                        </div>
                    </div>
                    <div class="left-container__action">
                        <div class="left-container__button left-container__button-update" data-id=${element.id} onclick="updateAddressById(this, ${user.id})">Cập nhật địa chỉ</div>
                        <div class="left-container__button left-container__button-delete" data-id=${element.id} onclick="deleteAddressById(this, ${user.id})">Xóa địa chỉ</div>
                    </div>
                </div>`;
        });
    }

    container.innerHTML = `
    <div class="left-container__warpper">
        <div class="left-container__header">
            <div class="left-container__title">Địa chỉ của tôi</div>
            <div class="left-container__button left-container__button-addaddress">
                <i class="fa-solid fa-plus"></i> Thêm địa chỉ mới
            </div>
        </div>

        <div class="left-container__content">
            ${addressContent}     
        </div>
    </div>

    <div class="right-content__warpper">
        <p>Để cho quá trình giao hàng được hoàn thành một cách tiện lợi và nhanh chóng đến khách hàng vui lòng:</p>
        <br>
        <ul>
            <li>Cung cấp đầy đủ và chính xác thông tin địa chỉ giao hàng và số điện thoại liên lạc.</li><br>
            <li>Vui lòng đảm bảo có người nhận hàng tại địa chỉ giao hàng trong thời gian dự kiến.</li><br>
            <li>Vui lòng kiểm tra kỹ hàng hóa trước khi ký nhận.</li>
        </ul>
    </div>
    `;

    document.querySelector('.left-container__button-addaddress').addEventListener('click', () => {
        container.innerHTML = `
            <div class="left-container__warpper">
                <div class="left-container__button-backaddress" onclick='goBackShowAddress(${JSON.stringify(user)})'>
                    <i class="fa-solid fa-people-pulling"></i>
                    Quay trở lại
                </div>
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

                <button class="account-info-btn account-info-btn--blue account-info-btn__confirm-address">Lưu</button>
            </div>

            <div class="right-content__warpper">
                <p>Để cho quá trình giao hàng được hoàn thành một cách tiện lợi và nhanh chóng đến khách hàng vui lòng:</p>
                <br>
                <ul>
                    <li>Cung cấp đầy đủ và chính xác thông tin địa chỉ giao hàng và số điện thoại liên lạc.</li><br>
                    <li>Vui lòng đảm bảo có người nhận hàng tại địa chỉ giao hàng trong thời gian dự kiến.</li><br>
                    <li>Vui lòng kiểm tra kỹ hàng hóa trước khi ký nhận.</li>
                </ul>
            </div>`;


        updateAddressSelect("city", "district", "ward");
        const confirmButton = document.querySelector('.account-info-btn__confirm-address');
        confirmButton.addEventListener("click", function () {
            const addressNumberValue = document.getElementById('address-number').value.trim();

            const citySelect = document.getElementById('city');
            const districtSelect = document.getElementById('district');
            const wardSelect = document.getElementById('ward');

            const cityValue = citySelect.options[citySelect.selectedIndex].text.trim();
            const districtValue = districtSelect.options[districtSelect.selectedIndex].text.trim();
            const wardValue = wardSelect.options[wardSelect.selectedIndex].text.trim();

            const invalid = (
                addressNumberValue === '' ||
                cityValue.includes('Chọn') ||
                districtValue.includes('Chọn') ||
                wardValue.includes('Chọn')
            );

            if (invalid) {
                toast({
                    title: 'Thông báo',
                    message: 'Vui lòng nhập đầy đủ thông tin!',
                    type: 'warning',
                    duration: 3000
                });
                return;
            }

            const formData = new FormData();
            formData.append('idUser', user['id']);
            formData.append('province', cityValue);
            formData.append('city', districtValue);
            formData.append('ward', wardValue);
            formData.append('numberHouse', addressNumberValue);

            fetch('../../../api/address/insertAddress.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        toast({
                            title: 'Thành công',
                            message: 'Tạo địa chỉ mới thành công!',
                            type: 'success',
                            duration: 3000
                        });
                        goBackShowAddress(user);
                    } else {
                        toast({
                            title: 'Lỗi',
                            message: data.message,
                            type: 'error',
                            duration: 3000
                        });
                    }
                })
                .catch(error => {
                    toast({
                        title: 'Lỗi',
                        message: 'Lỗi kết nối đến server!',
                        type: 'error',
                        duration: 3000
                    });
                });
        });
    });


}

async function deleteAddressById(object, userID) {
    async function processConfirmation() {
        const result = await showConfirmationDialog(`Bạn có chắc chắn muốn xóa địa chỉ này không ?`);
        return result;
    }
    const resultAnswer = await processConfirmation()
    if (resultAnswer == true) {
        let formData = new URLSearchParams();
        formData.append('idAddress', object.dataset.id);
        formData.append('idUser', userID);
        fetch('api/address/deleteAddress.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        })
            .then(response => response.json())
            .then(async data => {
                toast({
                    title: 'Thông báo',
                    type: data.success ? 'success' : warrning,
                    message: data.message,
                    duration: 3000
                });
                let currentUser = await getUserByID(userId);
                goBackShowAddress(currentUser);
            })
            .catch(() => {
                console.log('Có lỗi trong khi xóa địa chỉ');
            })
    } else {
        return;
    }
}


async function updateAddressById(object, userID) {
    const currentAddress = await getAddressByID(object.dataset.id);
    const currentUser = await getUserByID(userID);
    const leftContainer = document.querySelector('.right-container').querySelector('.left-container__warpper');
    leftContainer.innerHTML = `
        <div class="left-container__button-backaddress" onclick='goBackShowAddress(${JSON.stringify(currentUser)})'>
            <i class="fa-solid fa-people-pulling"></i>
            Quay trở lại
        </div>
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

        <button class="account-info-btn account-info-btn--blue account-info-btn__confirm-address">Lưu</button>
        <button class="account-info-btn account-info-btn--black account-info-btn__replace-address">Đặt lại</button>
    `;

    autoSelectAddressByName("city", "district", "ward", currentAddress['address'].province, currentAddress['address'].city, currentAddress['address'].ward);
    document.getElementById('address-number').value = currentAddress['address'].house;

    document.querySelector('.account-info-btn__replace-address').addEventListener('click', function() {
        updateAddressById(object, userID);
    });

    document.querySelector('.account-info-btn__confirm-address').addEventListener('click', function() {
        const addressNumberValue = document.getElementById('address-number').value.trim();

        const citySelect = document.getElementById('city');
        const districtSelect = document.getElementById('district');
        const wardSelect = document.getElementById('ward');

        const cityValue = citySelect.options[citySelect.selectedIndex].text.trim();
        const districtValue = districtSelect.options[districtSelect.selectedIndex].text.trim();
        const wardValue = wardSelect.options[wardSelect.selectedIndex].text.trim();

        const invalid = (
            addressNumberValue === '' ||
            cityValue.includes('Chọn') ||
            districtValue.includes('Chọn') ||
            wardValue.includes('Chọn')
        );

        if (invalid) {
            toast({
                title: 'Thông báo',
                message: 'Vui lòng nhập đầy đủ thông tin!',
                type: 'warning',
                duration: 3000
            });
            return;
        }

        let formData = new URLSearchParams();
        formData.append('idAddress', object.dataset.id);
        formData.append('houseAddress', addressNumberValue);
        formData.append('provinceAddress', cityValue);
        formData.append('cityAddress', districtValue);
        formData.append('wardAddress', wardValue);

        fetch('api/address/updateAddress.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {
            toast({
                title: 'Thông báo',
                message: data.message,
                type: data.success ? 'success' : 'warning',
                duration: 3000
            });
            goBackShowAddress(currentUser);
            return;
        })
        .catch(() => {
            console.log('Có lỗi trong khi cập nhật lại địa chỉ');
        })
    });
}

function updateAddressAccountSection(user) {
    console.log(user);
    if (typeof user === "string") {
        user = JSON.parse(user);
    }
    goBackShowAddress(user);
}


document.querySelector('.information').addEventListener('click', function () {
    showContentProfile('information');
});

document.querySelector('.address').addEventListener('click', function () {
    showContentProfile('address');
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


window.goBackShowAddress = goBackShowAddress
window.deleteAddressById = deleteAddressById;
window.updateAddressById = updateAddressById;