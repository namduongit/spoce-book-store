export function showConfirmationDialog(title = '') {
    return new Promise((resolve) => {
        const confirmationDialog = document.querySelector('.confirmation-dialog');
        
        // Clear nội dung cũ
        confirmationDialog.innerHTML = '';

        // Tạo nội dung mới
        const dialogContent = document.createElement('div');
        dialogContent.className = 'confirmation-dialog__container';
        dialogContent.innerHTML = `
            <div class="confirmation-dialog__title">${title}</div>
            <div class="confirmation-dialog__desc">Câu trả lời của bạn là?</div>
            <div class="confirmation-dialog__content">
                <div class="confirmation-dialog__button confirmation-dialog__button--yes">Yes</div>
                <div class="confirmation-dialog__button confirmation-dialog__button--no">No</div>
            </div>
            <i class="fa-solid fa-xmark"></i>
        `;

        confirmationDialog.appendChild(dialogContent);
        confirmationDialog.classList.add('show');
        confirmationDialog.style.visibility = 'visible';

        function closeDialog(result) {
            confirmationDialog.classList.remove('show');
            setTimeout(() => {
                confirmationDialog.style.visibility = 'hidden';
                resolve(result);
            }, 300);
        }

        // Lưu các phần tử cần bắt sự kiện
        const btnYes = dialogContent.querySelector('.confirmation-dialog__button--yes');
        const btnNo = dialogContent.querySelector('.confirmation-dialog__button--no');
        const btnClose = dialogContent.querySelector('i');

        // Gắn sự kiện một lần duy nhất mỗi khi gọi
        btnYes.addEventListener('click', () => closeDialog(true));
        btnNo.addEventListener('click', () => closeDialog(false));
        btnClose.addEventListener('click', () => closeDialog(null));
    });
}
