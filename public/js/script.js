// Dựa trên URL dường dẫn để hiển thị nội dung (DEMO)
window.onload = () => {
    const URL = window.location.href;
    const regexSplit = URL.split('/');
    const lastPart = regexSplit.pop();
    const result = lastPart.replace(/[^a-zA-Z]/g, "");



    // main source
    const main_source = document.querySelector('#main_source');

    // Lấy toàn bộ main Menu trong HTML
    const main = document.querySelector('.main');
    const body = document.querySelector('.body');
}