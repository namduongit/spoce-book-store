import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderPaymentTable } from "./renderPaymentTable.js";

export async function lockPaymentData(idPaymentSelected) {
    let payment = await fetchData(
        `api/payments/detail.php?id=${idPaymentSelected}`
    );

    const lockDialog = document.createElement("dialog");
    lockDialog.classList.add("dialog");
    lockDialog.classList.add("payment");
    lockDialog.style.width = "30%";

    lockDialog.innerHTML = `
    <h1 class="dialog__title">${payment.data.status === "Hoạt động"
            ? "Khoá phương thức thanh toán"
            : "Mở khoá phương thức thanh toán"
        }</h1>
    <button id="close-payment-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__line"></div>
    <form class="dialog__form">
    <div class="dialog__icons" style="display: flex; flex-direction: ${payment.data.status === "Hoạt động" ? "row-reverse" : "row"
        };">
      <input type="hidden" id="lock-payment-id" name="lock-payment-id" value="${payment.data.id
        }">
      <input type="hidden" id="lock-payment-status" name="lock-payment-status" value="${payment.data.status
        }">    
        <i class="fa-solid fa-lock"></i>
        <i class="fa-solid fa-arrow-right"></i>
        <i class="fa-solid fa-unlock"></i>
      </div>
      <div class="dialog__buttons">
        <button class="yes">Đồng ý</button>
        <button class="no">Từ chối</button>
      </div>
    </form>
  `;

    document.body.appendChild(lockDialog);
    lockDialog.showModal();


    // Thêm sự kiện khi nhấn nút đồng ý
    document.querySelector(".yes").addEventListener("click", async (e) => {
        // Ngăn ...
        e.preventDefault();

        //
        let yes = await showNotification(
            "Bạn có đồng ý thay đổi trạng thái không."
        );
        if (yes) {
            const id = document.getElementById("lock-payment-id").value;
            const status = document.getElementById("lock-payment-status").value;

            try {
                const response = await fetch("api/payments/lock.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        id: id,
                        status: status,
                    }),
                });

                const result = await response.json();
                if (result.success) {
                    toast({
                        title: "Thành công",
                        message: `Lưu chỉnh sửa thành công`,
                        type: "success",
                        duration: 3000,
                    });
                } else {
                    toast({
                        title: "Cảnh báo",
                        message: `${result.message}`,
                        type: "warning",
                        duration: 3000,
                    });
                }
            } catch (error) {
                toast({
                    title: "Lỗi",
                    message: `Lỗi fetch API:${error}`,
                    type: "error",
                    duration: 3000,
                });
            }
            lockDialog.remove();
            renderPaymentTable(1);
        }
    });

    // Gán sự kiện cho nút "Đóng" dialog

    document.querySelector(".no").addEventListener("click", () => {
        // Xoá dialog
        lockDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        // lockButton.classList.remove("active");
    });

    document
        .getElementById("close-payment-button")
        .addEventListener("click", () => {
            // Xoá dialog
            lockDialog.remove();

            // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
            // lockButton.classList.remove("active");
        });
}