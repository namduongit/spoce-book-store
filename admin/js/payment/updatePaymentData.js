import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderPaymentTable } from "./renderPaymentTable.js";

export async function updatePaymentData(idPaymentSelected) {
    // Này dùng để gọi hàm cập nhật diaLog hỗ trợ cập nhật thông tin
    let payment = await fetchData(
        `api/payments/detail.php?id=${idPaymentSelected}`
    );

    const updateDialog = document.createElement("dialog");
    updateDialog.classList.add("dialog");
    updateDialog.classList.add("payment");
    updateDialog.style.width = "772px";

    const IconBanking = ['ABBank.png', 'BacABank.png', 'Banking.png',
        'BaoViet.png', 'BIDV.png', 'CardBank.png',
        'COD.png', 'EximBank.png', 'KienLongBank.png',
        'LienVietBank.png', 'MBBank.png', 'MSBank.png',
        'NamABank.png', 'NCB.png', 'OCBank.png',
        'PVBank.png', 'SaiGonBank.png', 'SeaBank.png',
        'SHBank.png', 'Techcombank.png', 'TPBank.png',
        'VIB.png', 'VietComBank.png', 'VietinBank.png',
        'VPBank.png'];

    let optionIconBanking = '';
    IconBanking.forEach(icon => {
        optionIconBanking += `
           <option value=${icon}>${icon.replace('.png', '')}</option>
        `;
    });

    let selecIconOption = `
        <select id="update-payment-icon">
            <option value='' selected>Chọn tên icon</option>
            ${optionIconBanking}
        </select>
    `;

    updateDialog.innerHTML = `
        <h1 class="dialog__title">Thêm phương thức thanh toán</h1>
          <button id="close-payment-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form class="dialog__form" autocomplete="off">

            <div class="dialog__row">
                <div class="dialog__row">
                    <div class="dialog__form-group">
                        <label>Mã phương thức</label>
                        <input type="text" id="update-payment-id" readonly value="${payment.data.id}" />
                    </div>
                    <div class="dialog__form-group">
                        <label>Tên phương thức</label>
                        <input type="text" id="update-payment-name" placeholder="Nhập tên phương thức" autofocus value="${payment.data.name}"/>
                    </div>
                </div>
            </div>

            <div class="dialog__row">

              <div class="dialog__form-group full">
                <label>Icon phương thức<span>*<span></label>
                ${selecIconOption}
              </div>

              <div class="dialog__form-group full">
                <label>Trạng thái<span>*<span></label>
                <select id="update-payment-status">
                  <option selected value="">Chọn trạng thái</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Tạm dừng">Tạm dừng</option>
                </select>
              </div>

            </div>

            <div class="dialog__row">
                <div class="dialog__form-group full">
                    <label>Hình thức<span>*</span></label>
                    <select id="update-payment-option">
                        <option selected value="">Chọn hình thức</option>
                        <option value="1">Thanh toán qua mạng</option>
                        <option value="0">Tự thanh toán</option>
                    </select>
                </div>

                <div class="dialog__form-group full">
                    <label>Danh mục con<span>*</span></label>
                    <select id="update-payment-more">
                        <option selected value="">Chọn loại danh mục</option>
                        <option value="1">Có danh mục con</option>
                        <option value="0">Không có danh mục con</option>
                    </select>
                </div>
            </div>

            <div id="menu-payment-more" class="none__item">
                <div class="dialog__row">
                    <div class="dialog__form-group full">
                        <label>Chi nhánh</label>
                        <input type="text" id="update-payment-address" placeholder="Nhập chi nhánh" value="${payment.data.data}" />
                    </div>
                </div>

                <div class="dialog__row">
                    <div class="dialog__form-group full">
                        <label>Thông tin chuyển khoản</label>
                        <input type="text" id="update-payment-data" placeholder="Nhập số tài khoản" value="${payment.data.name_auth}" />
                    </div>
                </div>

                <div class="dialog__row">
                    <div class="dialog__form-group full">
                        <label>Mô tả/Nội dung</label>
                        <input type="text" id="update-payment-note" placeholder="Nhập nội dung" value="${payment.data.description}" />
                    </div>
                </div>
            
            </div>

            <div class="dialog__buttons">
              <button id="update-payment-button" class="update">Thêm</button>
            </div>
          </form>
    `;

    document.body.appendChild(updateDialog);
    updateDialog.showModal();

    document.getElementById('update-payment-icon').value = payment.data.icon;
    document.getElementById('update-payment-option').value = payment.data.online;
    document.getElementById('update-payment-status').value = payment.data.status;

    let moreChild = payment.data.data != null & payment.data.name_auth != null && payment.data.description != null;

    document.getElementById('update-payment-more').value = moreChild ? '1' : 0;

    if (moreChild) {
        document.getElementById('menu-payment-more').classList.remove('none__item');
    }

    document.getElementById('update-payment-more').addEventListener('change', function () {
        if (this.value == '1') {
            document.getElementById('menu-payment-more').classList.remove('none__item');
        } else {
            document.getElementById('menu-payment-more').classList.add('none__item');
        }
    })

    const selectElement = document.querySelectorAll(
        ".dialog__form-group > select"
    );
    selectElement.forEach((select) => {
        isNotFirstItemSelected(select);
    });

    document
        .getElementById("update-payment-button")
        .addEventListener("click", async (e) => {
            e.preventDefault();

            const name = document.getElementById('update-payment-name').value.trim();
            const icon = document.getElementById('update-payment-icon').value.trim();
            const status = document.getElementById('update-payment-status').value.trim();
            const option = document.getElementById('update-payment-option').value.trim();
            const more = document.getElementById('update-payment-more').value.trim();
            // Chi nhánh
            let address = document.getElementById('update-payment-address').value.trim();
            // Số tài khoản
            let bankaccount = document.getElementById('update-payment-data').value.trim();
            // Nội dung
            let note = document.getElementById('update-payment-note').value.trim();

            // Kiểm tra mấy nội dung đầu
            let truefirst = name && icon && status && option && more;

            if (!truefirst) {
                toast({
                    title: "Lỗi",
                    message: "Vui lòng chọn đầy đủ thông tin.",
                    type: "warning",
                    duration: 3000,
                });
                return;
            }

            if (more == '1') {
                truefirst = address && bankaccount && note;
            }

            if (!truefirst) {
                toast({
                    title: "Lỗi",
                    message: "Vui lòng chọn đầy đủ thông tin.",
                    type: "warning",
                    duration: 3000,
                });
                return;
            }

            let yes = await showNotification(
                "Bạn có đồng ý thay đổi phương thức này không?"
            );
            if (!yes) return;

            const formData = new URLSearchParams();
            formData.append('id', idPaymentSelected);
            formData.append('name', name);
            formData.append('icon', icon);
            formData.append('status', status);
            formData.append('option', option);
            formData.append('address', address);
            formData.append('bankaccount', bankaccount);
            formData.append('note', note);


            const paymentRef = await fetch('api/payments/update.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString()
            });

            const paymentResult = await paymentRef.json();

            toast({
                title: paymentResult['title'],
                message: paymentResult['message'],
                type: paymentResult['warning'],
                duration: 3000,
            });

            updateDialog.remove();
            updateDialog.classList.remove("active");
            renderPaymentTable();
        });



    document
        .getElementById("close-payment-button")
        .addEventListener("click", () => {
            // Xoá dialog
            updateDialog.remove();

            // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
            // updateButton.classList.remove("active");
        });

}