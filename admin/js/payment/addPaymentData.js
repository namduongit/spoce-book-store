import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderPaymentTable } from "./renderPaymentTable.js";

export function addPaymentData() {
    const addButton = document.getElementById("add-button-payment");
    if (!addButton) return;

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
        <select id="add-payment-icon">
            <option value='' selected>Chọn tên icon</option>
            ${optionIconBanking}
        </select>
    `;

    addButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
        addButton.classList.add("active");

        // Tạo một dialog để thêm một nhà xuất bản
        const addDialog = document.createElement("dialog");
        // - Định dạng dialog
        addDialog.classList.add("dialog");
        addDialog.classList.add("payment");
        addDialog.style.width = "772px";
        // - Ghi nội dung dialog
        addDialog.innerHTML = `
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
                        <input type="text" id="add-payment-id" readonly />
                    </div>
                    <div class="dialog__form-group">
                        <label>Tên phương thức</label>
                        <input type="text" id="add-payment-name" placeholder="Nhập tên phương thức" autofocus/>
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
                <select id="add-payment-status">
                  <option selected value="">Chọn trạng thái</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Tạm dừng">Tạm dừng</option>
                </select>
              </div>

            </div>

            <div class="dialog__row">
                <div class="dialog__form-group full">
                    <label>Hình thức<span>*</span></label>
                    <select id="add-payment-option">
                        <option selected value="">Chọn hình thức</option>
                        <option value="1">Thanh toán qua mạng</option>
                        <option value="0">Tự thanh toán</option>
                    </select>
                </div>

                <div class="dialog__form-group full">
                    <label>Danh mục con<span>*</span></label>
                    <select id="add-payment-more">
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
                        <input type="text" id="add-payment-address" placeholder="Nhập chi nhánh" />
                    </div>
                </div>

                <div class="dialog__row">
                    <div class="dialog__form-group full">
                        <label>Thông tin chuyển khoản</label>
                        <input type="text" id="add-payment-data" placeholder="Nhập số tài khoản" />
                    </div>
                </div>

                <div class="dialog__row">
                    <div class="dialog__form-group full">
                        <label>Mô tả/Nội dung</label>
                        <input type="text" id="add-payment-note" placeholder="Nhập nội dung" />
                    </div>
                </div>
            
            </div>

            <div class="dialog__buttons">
              <button id="add-payment-button" class="add">Thêm</button>
            </div>
          </form>
        `;

        // Thêm vào body
        document.body.appendChild(addDialog);

        // Hiển thị addDialog
        addDialog.showModal();

        document.getElementById('add-payment-more').addEventListener('change', function () {
            if (this.value == '1') {
                document.getElementById('menu-payment-more').classList.remove('none__item');
            } else {
                document.getElementById('menu-payment-more').classList.add('none__item');
            }
        })

        // Sự kiện cho các thành phần trong dialog
        // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
        const selectElement = document.querySelectorAll(
            ".dialog__form-group > select"
        );
        selectElement.forEach((select) => {
            isNotFirstItemSelected(select);
        });

        // Gán sự kiện cho nút "thêm" dialog
        document
            .getElementById("add-payment-button")
            .addEventListener("click", async (e) => {
                e.preventDefault();

                const name = document.getElementById('add-payment-name').value.trim();
                const icon = document.getElementById('add-payment-icon').value.trim();
                const status = document.getElementById('add-payment-status').value.trim();
                const option = document.getElementById('add-payment-option').value.trim();
                const more = document.getElementById('add-payment-more').value.trim();
                // Chi nhánh
                let address = document.getElementById('add-payment-address').value.trim();
                // Số tài khoản
                let bankaccount = document.getElementById('add-payment-data').value.trim();
                // Nội dung
                let note = document.getElementById('add-payment-note').value.trim();

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
                    "Bạn có đồng ý thêm người dùng này không?"
                );
                if (!yes) return;

                const formData = new URLSearchParams();
                formData.append('name', name);
                formData.append('icon', icon);
                formData.append('status', status);
                formData.append('option', option);
                formData.append('address', address);
                formData.append('bankaccount', bankaccount);
                formData.append('note', note);

                const paymentRef = await fetch('api/payments/add.php', {
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

                addDialog.remove();
                addButton.classList.remove("active");
                renderPaymentTable();
            });

        // Gán sự kiện cho nút "Đóng" dialog
        document
            .getElementById("close-payment-button")
            .addEventListener("click", () => {
                // Xoá dialog
                addDialog.remove();

                // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
                addButton.classList.remove("active");
            });
    });
}