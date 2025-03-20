import { toast } from "../toast.js";
import { resetToOriginParam } from "../common.js";


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
    const token = localStorage.getItem('token');

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
                    <li>
                        <i class="fa-solid fa-user-gear"></i>
                        Thông tin
                    </li>
                    <li>
                        <i class="fa-solid fa-cart-shopping"></i>
                        Giỏ hàng
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

    logoutBtn.addEventListener('click', async function () {
        const token = localStorage.getItem('token');
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
                localStorage.removeItem('token');
                console.log('Đăng xuất thành công');
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


