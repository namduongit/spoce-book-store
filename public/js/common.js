export function createExpiresDate(numberOfDay) {
    const date = new Date();
    date.setTime(date.getTime() + (numberOfDay * 24 * 60 * 60 * 1000));
    return date.toUTCString();
}

export function formatVietNamMoney(currentMoney = "") {
    let realString = currentMoney.toString().replace(/[^0-9]/g, "");

    return new Intl.NumberFormat("vi-VN").format(Number(realString)) + " VND";
}

export function formatStringName(currentName = "") {
    let partString = currentName.trim().split(/\s+/);
    let result = "";

    for (let part = 0; part < partString.length; part++) {
        result += partString[part][0].toUpperCase();
        result += partString[part].slice(1).toLowerCase();
        result += " ";
    }

    return result.trim();
}

export function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/;`;
}

export async function isExitsUser(username) {
    async function getUserByUsername(username) {
        let response = await fetch(`../../api/users/get.php?username=${username}`);
        let data = await response.json();
        return data.length > 0 ? data[0] : null;
    }

    const findUser = await getUserByUsername(username);
    return findUser;
}

