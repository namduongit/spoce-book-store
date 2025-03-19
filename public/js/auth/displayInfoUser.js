

export async function checkLogin() {
    try {
        const response = await fetch('../../../api/users/checkLogin.php', {
            credentials: 'include'
        });

        // Kiểm tra trạng thái phản hồi
        if (!response.ok) {
            if (response.status === 401) {
                return false;
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data['success'] === true) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('Lỗi khi kiểm tra đăng nhập');
        return false;
    }
}

export async function getUserLogin() {
    try {
        const response = await fetch('../../../api/users/checkLogin.php', {
            credentials: 'include'
        });

        // Kiểm tra trạng thái phản hồi
        if (!response.ok) {
            if (response.status === 401) {
                return false;
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data['success'] === true) {
            return data['user'];
        } else {
            return null;
        }
    } catch (error) {
        console.log('Lỗi khi lấy tài khoản đang đăng nhập');
        return false;
    }
}


export function updateTopBar(currentUser) {
    const authContent = document.querySelector('.topbar .topbar__auth');
    if (!authContent) {
        console.log('Có lỗi xảy ra');
        return;
    }

    if (currentUser !== null) {
        authContent.innerHTML = `
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
    } else {
        authContent.innerHTML = `
            <div class="topbar__auth-btn topbar__auth-btn--login margin-right-medium" onclick="showFormUser(this, null)">
                <i class="fa-solid fa-street-view"></i>
                <span id="login-form">Đăng&nbsp;nhập</span>
            </div>
            <div class="topbar__auth-btn topbar__auth-btn--register margin-right-medium" onclick="showFormUser(this, null)">
                <i class="fa-solid fa-user-pen"></i>
                <span id="register-form">Đăng&nbsp;ký</span>
            </div>
        `;
        return;
    }

    const authBtn = authContent.querySelector('.topbar__auth-btn--logined');
    const logoutBtn = authContent.querySelector('.logout-current-account');

    if (authBtn) {
        authBtn.addEventListener('click', function () {
            const caretIcon = this.querySelectorAll('.fa-solid')[1];

            this.classList.toggle('active');
            caretIcon.classList.toggle('fa-caret-up');
            caretIcon.classList.toggle('fa-caret-down');
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function () {
            showLoading();
            try {
                const response = await fetch('../../../api/users/logout.php');
                const data = await response.json();

                toast({
                    title: 'Thông báo',
                    message: data.message,
                    type: data.success === true ? 'success' : 'warning',
                    duration: 3000
                });

                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } catch (error) {
                console.log('Lỗi khi đăng xuất', error);
            } finally {
                hideLoading();
            }
        });
    }
}


export function updateInfoSettings(currentUser) {

}


