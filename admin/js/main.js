import { getDetailRole } from "./getDetailRole.js";
import { deleteCookie } from "../../public/js/common.js";

const roleDetail = await getDetailRole();
sessionStorage.setItem('dataRole', JSON.stringify(roleDetail["result"]["data"]));

document.querySelector('.tab-home').addEventListener('click', function () {
    window.location.href = '/';
});

document.querySelector('.tab-logout').addEventListener('click', async function () {
    const response = await fetch('../api/users/logout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('dataRole');
    deleteCookie('isLogin');
    deleteCookie('cookieRole');
    deleteCookie('PHPSESSID');
    window.location.href = '/';
})