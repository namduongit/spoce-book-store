import { getCookie } from "../../public/js/common.js";

export async function getDetailRole() {
    const roleId = getCookie('cookieRole');
    if (roleId != null) {
        const response = await fetch('api/istrue/is_role.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `idPrivilege=${encodeURIComponent(roleId)}`
        });

        const data = await response.json();
        return data;
    } else {
        return null;
    }
}