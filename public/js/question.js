export function showConfirmationDialog(title = '') {
    return new Promise((resolve) => {
        const confirmationDialog = document.querySelector('.confirmation-dialog');
        confirmationDialog.innerHTML = `
            <div class="confirmation-dialog__container">
                <div class="confirmation-dialog__title">${title}</div>
                <div class="confirmation-dialog__desc">Câu trả lời của bạn là?</div>
                <div class="confirmation-dialog__content">
                    <div class="confirmation-dialog__button confirmation-dialog__button--yes">Yes</div>
                    <div class="confirmation-dialog__button confirmation-dialog__button--no">No</div>
                </div>
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;

        confirmationDialog.classList.add('show');

        function closeDialog(result) {
            confirmationDialog.classList.remove('show');
            setTimeout(() => {
                confirmationDialog.style.visibility = 'hidden';
                resolve(result);
            }, 300);
        }

        confirmationDialog.querySelector('i').addEventListener('click', () => closeDialog(null));

        confirmationDialog.querySelectorAll('.confirmation-dialog__button').forEach(button => {
            button.addEventListener('click', function () {
                if (button.classList.contains('confirmation-dialog__button--yes')) {
                    closeDialog(true);
                } else {
                    closeDialog(false);
                }
            });
        });
    });
}
