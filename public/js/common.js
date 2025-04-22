import { fetchData } from "./book/getDataBook.js";

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

export function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        let [key, value] = cookies[i].split('=');
        if (key === name) return value;
    } return null;
}

export function deleteCookie(name) {
    document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
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

export function resetToOriginParam() {
    history.replaceState(null, '', window.location.href.toString());
}

export async function getRoleById(roleId) {
    const URL = `api/roles/get.php?roleId=${roleId}`;
    let response = await fetchData(URL);
    return response;
}


export function generateTimeId() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hour}${minute}${second}`;
}


export function generateTimeIdPlusMinutes(minutesToAdd) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutesToAdd);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hour}${minute}${second}`;
}