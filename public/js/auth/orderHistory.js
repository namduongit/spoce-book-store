import { formatMoney } from "../book/getDataBook.js";
import { fetchData, getUserByID } from "./displayInfoUser.js";
import { showConfirmationDialog } from "../question.js";
import { toast } from "../toast.js";

// Đọc trang hiện tại từ local storage, nếu không có thì mặc định là trang 1
let page = parseInt(localStorage.getItem("currentOrderPage")) || 1;
localStorage.setItem("currentOrderPage", page);

// Trạng thái đơn hàng được chọn khởi tạo là chờ xác nhận
let selectedStatus = "Đang chờ xác nhận";

export async function showOrderHistory() {
    showLoading();

    // Kiểm tra trạng thái đăng nhập
    const responseAPI = JSON.parse(sessionStorage.getItem("user")) || false;
    let currentParams = new URLSearchParams(window.location.search);
    const orderPage = document.querySelector('.order-history');
    let user = null;

    // Nếu không đăng nhập mà query string có query paramerter order thì xóa query parameter đi và kết thúc hàm
    if (responseAPI == false) {
        if (currentParams.has("order")) {
            currentParams.delete("order");
            window.history.replaceState(null, '', window.location.pathname + currentParams.toString());
            return;
        }
    }

    // Lấy ra dữ liệu của user hiện tại nếu đang ở trạng thái đăng nhập
    if (responseAPI !== false) {
        user = await getUserByID(responseAPI.user['id']);
    }

    // Ẩn đi các trang khác nếu có
    hideMainPage();

    // Hiển thị trang đơn hàng 
    if (orderPage.classList.contains('hide-item')) {
        orderPage.classList.remove('hide-item');
    }

    // Fetch dữ liệu đơn hàng từ backend thông qua ID của user, trang hiện tại và trạng thái đơn hàng
    let response = await fetch(`api/orders/get_orders.php?maKhachHang=${user['id']}&page=${page}&status=${selectedStatus}`);
    let data = await response.json();
    console.log(data);

    const orderList = data.data.list;
    let numberOfPages = data.data.total_pages;
    // console.log(numberOfPages);

    let statusString = "";
    if (selectedStatus == "Đang chờ xác nhận") {
        statusString += '<div class="order-history__status-selection status-selection-active">Chờ xác nhận</div>';
    } else {
        statusString += '<div class="order-history__status-selection" data-status="Đang chờ xác nhận">Chờ xác nhận</div>';
    }

    if (selectedStatus == "Đã xác nhận") {
        statusString += '<div class="order-history__status-selection status-selection-active">Đã xác nhận</div>';
    } else {
        statusString += '<div class="order-history__status-selection" data-status="Đã xác nhận">Đã xác nhận</div>';
    }

    if (selectedStatus == "Đã giao hàng") {
        statusString += '<div class="order-history__status-selection status-selection-active">Đã giao hàng</div>';
    } else {
        statusString += '<div class="order-history__status-selection" data-status="Đã giao hàng">Đã giao hàng</div>';
    }

    if (selectedStatus == "Đã hủy đơn") {
        statusString += '<div class="order-history__status-selection status-selection-active">Đã hủy đơn</div>';
    } else {
        statusString += '<div class="order-history__status-selection" data-status="Đã hủy đơn">Đã hủy đơn</div>';
    }
    statusString = '<div class="order-history__status-select-container">' + statusString + '</div>';

    if (!orderList || orderList.length == 0) {
        console.log(user['phone']);
        orderPage.innerHTML = `
        <div class="order-history__container">
            <div class="info__title">ĐƠN HÀNG CỦA BẠN</div>
            <div class="order-history__content">
                <p class="order-history__account-info">Thông tin tài khoản</p>
                <p class="order-history__account-name">${user['full_name']}</p>
                <p class="order-history__account-phone">${user['phone'] == null ? 'Chưa cập nhật số điện thoại' : user['phone']}</p>
                ${statusString}
                <table class="order-history__table">
                    <thead>
                        <td>Mã đơn hàng</td>
                        <td>Ngày đặt hàng</td>
                        <td>Thành tiền</td>
                        <td>Trạng thái thanh toán</td>
                        <td>Trạng thái đơn hàng</td>
                        <td>Thao tác</td>
                    </thead>
                    <tbody>
                        <tr class="order-history__order-unknown">
                            <td colspan="6">Không tìm thấy đơn đặt hàng nào</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `;

        // Thêm sự kiện cho các nút của nhóm trạng thái đơn hàng
        const statusSelectionBtns = document.querySelectorAll(".order-history__status-selection");
        statusSelectionBtns.forEach(btn => {
            if (!btn.classList.contains("status-selection-active")) {
                btn.addEventListener("click", () => {
                    // Cập nhật lại trạng thái đơn hàng mà người dùng chọn
                    selectedStatus = btn.dataset.status;

                    // Cập nhật lại về trang đầu tiên nếu chuyển sang nhóm đơn hàng có trạng thái khác
                    page = 1;
                    localStorage.setItem("currentOrderPage", page);

                    // Gọi hàm để hiển thị đơn hàng
                    showOrderHistory();
                });
            }
        });
    } else {
        let orderString = '';

        for (let i = 0; i < orderList.length; i++) {
            let cancelButtonString;

            // Trạng thái là chờ xác nhận sẽ có nút hủy đơn hàng
            if (orderList[i].trangThai === 'Đang chờ xác nhận' && orderList[i].trangThaiThanhToan === 'Chưa thanh toán') {
               cancelButtonString = `<button class="order-history__cancel-btn" data-id="${orderList[i].maDonHang}">Hủy đơn</button>`;
            } else {
                cancelButtonString = '';
            }


            orderString += `
            <tr class="order-history__order">
                <td>${orderList[i].maDonHang}</td>
                <td>${formatDate(orderList[i].ngayTaoDon)}</td>
                <td>${formatMoney(orderList[i].tongTienThu)}</td>
                <td>${orderList[i].trangThaiThanhToan}</td>
                <td>${orderList[i].trangThai}</td>
                <td>
                    <button class="order-history__detail-btn" data-id="${orderList[i].maDonHang}">Chi tiết</button>
                    ${cancelButtonString}
                </td>
            </tr>
            `;

        }

        let orderPageString = `
        <div class="order-history__container">
            <div class="info__title">ĐƠN HÀNG CỦA BẠN</div>
            <div class="order-history__content">
                <p class="order-history__account-info">Thông tin tài khoản</p>
                <p class="order-history__account-name">${user['full_name']}</p>
                <p class="order-history__account-phone">${user['phone'] == '' ? 'Chưa cập nhật số điện thoại' : user['phone']}</p>
                ${statusString}
                <table class="order-history__table">
                    <thead>
                        <td>Mã đơn hàng</td>
                        <td>Ngày đặt hàng</td>
                        <td>Thành tiền</td>
                        <td>Trạng thái thanh toán</td>
                        <td>Trạng thái đơn hàng</td>
                        <td>Thao tác</td>
                    </thead>
                    <tbody>
                        ${orderString}
                    </tbody>
                </table>
            </div>
            <div class="order-pagination"></div>
        </div>
        `;

        // Hiển thị các đơn hàng
        orderPage.innerHTML = orderPageString;

        // Gọi hàm tạo nút phân trang
        makePagination(numberOfPages);

        // Tạo sự kiện onclick cho các nút chi tiết để hiện chi tiết đơn hàng
        const detailBtns = document.querySelectorAll('.order-history__detail-btn');
        detailBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                await showOrderDetail(btn.dataset.id);
            });
        });

        // Thêm sự kiện cho các nút của nhóm trạng thái đơn hàng
        const statusSelectionBtns = document.querySelectorAll(".order-history__status-selection");
        statusSelectionBtns.forEach(btn => {
            if (!btn.classList.contains("status-selection-active")) {
                btn.addEventListener("click", () => {
                    // Cập nhật lại trạng thái đơn hàng mà người dùng chọn
                    selectedStatus = btn.dataset.status;

                    // Cập nhật lại về trang đầu tiên nếu chuyển sang nhóm đơn hàng có trạng thái khác
                    page = 1;
                    localStorage.setItem("currentOrderPage", page);

                    // Gọi hàm để hiển thị đơn hàng
                    showOrderHistory();
                });
            }
        });

        // Cập nhật param
        let pageSearchParam = new URLSearchParams();
        pageSearchParam.set("order", "main")
        history.pushState(null, '', window.location.pathname + '?' + pageSearchParam.toString());

        // Thêm sự kiện cho các nút hủy đơn hàng, đồng thời cập nhật lại database nếu người dùng xác nhận hủy
        let cancelBtns = document.querySelectorAll('.order-history__cancel-btn');
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                // Hiển thị dialog xác nhận hủy khi người dùng ấn nút hủy
                const result = await showConfirmationDialog('Bạn chắc chắn muốn hủy đơn hàng?');

                // Nếu người dùng xác nhận hủy thì tiến hành cập nhật trạng thái đơn hàng trên database
                if (result == true) {
                    showLoading();

                    // Lấy ra ID đơn hàng mà người dùng muốn hủy thông qua data-id của nút hủy
                    let orderId = btn.dataset.id;

                    // Tạo query string với dữ liệu thay đổi
                    let data = new URLSearchParams();
                    data.append("id", orderId);
                    data.append("status", "Đã hủy đơn");

                    // Tạo request đến file update.php để cập nhật dữ liệu
                    fetch("api/orders/update.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: data.toString(),
                    })
                        .then(response => {
                            if (!response.ok) {
                                console.log("Error");
                            }
                            return response.json();
                        })
                        .then(data => {
                            hideLoading();

                            // Hiển thị toast thông báo thành công
                            toast({
                                title: "Thông báo",
                                message: data.message,
                                type: data.success === true ? 'success' : 'warning',
                                duration: 3000
                            });

                            // Hiển thị trang đơn hàng lại
                            showOrderHistory();
                        })
                        .catch(error => {
                            hideLoading();
                        })
                }
            });
        });
    }
}

function makePagination(numberOfPages) {
    let paginationContainer = document.querySelector(".order-pagination");
    paginationContainer.innerHTML = "";

    // Nếu chỉ có một trang thì không tạo phân trang
    if (numberOfPages <= 1) {
        return;
    }

    // Nút để quay về trang trước
    let previousButton = document.createElement("button");
    previousButton.textContent = "←";
    previousButton.classList.add("pagination-btn");

    if (page == 1) {
        previousButton.disabled = true;
    }

    previousButton.addEventListener("click", () => {
        page--;
        localStorage.setItem("currentOrderPage", page);
        showOrderHistory();
    });

    paginationContainer.appendChild(previousButton);

    console.log("page");

    if (page > 2) {
        let firstPageButton = document.createElement("button");
        firstPageButton.textContent = "1";
        firstPageButton.classList.add("pagination-btn");
        firstPageButton.addEventListener("click", () => {
            page = 1;
            localStorage.setItem("currentOrderPage", page);
            showOrderHistory();
        });

        paginationContainer.appendChild(firstPageButton);
    }


    if (page > 3) {
        let dotText = document.createElement("span");
        dotText.textContent = " ... ";
        dotText.classList.add("pagination-dots");
        paginationContainer.appendChild(dotText);
    }


    for (let i = Math.max(1, page - 1); i <= Math.min(numberOfPages, page + 1); i++) {
        let button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-btn");
        if (i == page) {
            button.classList.add("active");
        }
        if (i != page) {
            button.addEventListener("click", () => {
                page = i;
                localStorage.setItem("currentOrderPage", page);
                showOrderHistory();
            });
        }

        paginationContainer.appendChild(button);
    }


    if (page < numberOfPages - 2) {
        let dotText = document.createElement("span");
        dotText.textContent = " ... ";
        dotText.classList.add("pagination-dots");
        paginationContainer.appendChild(dotText);
    }


    if (page < numberOfPages - 1) {
        let lastPageButton = document.createElement("button");
        lastPageButton.textContent = numberOfPages;
        lastPageButton.classList.add("pagination-btn");
        lastPageButton.addEventListener("click", () => {
            page = numberOfPages;
            localStorage.setItem("currentOrderPage", page);
            showOrderHistory();
        });

        paginationContainer.appendChild(lastPageButton);

    }


    let nextButton = document.createElement("button");
    nextButton.textContent = "→";
    nextButton.classList.add("pagination-btn");
    if (page == numberOfPages) {
        nextButton.disabled = true;
    }
    nextButton.addEventListener("click", () => {
        page++;
        localStorage.setItem("currentOrderPage", page);
        showOrderHistory();
    });

    paginationContainer.appendChild(nextButton);

}

async function showOrderDetail(orderId) {
    showLoading();

    // Kiểm tra trạng thái đăng nhập
    const responseAPI = JSON.parse(sessionStorage.getItem("user")) || false;

    // Lấy ra query string hiện tại
    let currentParams = new URLSearchParams(window.location.search);
    let url = new URLSearchParams();
    let orderPage = document.querySelector('.order-history');
    let user = null;

    // Nếu không đăng nhập mà query string có query paramerter order thì xóa query parameter đi và kết thúc hàm
    if (responseAPI === false) {
        if (currentParams.has('orderId')) {
            currentParams.delete('orderId');
            window.history.replaceState(null, '', window.location.pathname + currentParams.toString());
            return;
        }
    } else {
        user = await getUserByID(responseAPI.user['id']);
    }

    // Fetch dữ liệu đơn hàng cần hiển thị chi tiết thông qua ID đơn hàng
    let orderResponse = await fetch(`api/orders/get_orders.php?maDonHang=${orderId}`);
    let orderResult = await orderResponse.json();
    let order = orderResult.data.list[0];

    // Fetch dữ liệu chi tiết đơn hàng thông qua ID đơn hàng
    let orderDetailResponse = await fetch(`api/order_details/get.php?orderId=${orderId}`);
    let orderDetailResult = await orderDetailResponse.json();

    // Ẩn đi các trang khác nếu có
    hideMainPage();

    // Hiển thị trang đơn hàng 
    if (orderPage.classList.contains('hide-item')) {
        orderPage.classList.remove('hide-item');
    }

    // Nếu đơn hàng có dữ liệu chi tiết đơn hàng thì hiển thị lên cho người dùng
    if (orderDetailResult && orderDetailResult.length != 0) {
        let productString = '';
        let totalPrice = 0;

        // Với mỗi chi tiết đơn hàng, tiến hành fetch dữ liệu sách của chi tiết đó để hiện thị lên chi tiết đơn hàng
        for (let i = 0; i < orderDetailResult.length; i++) {
            let bookResponse = await fetch(`api/books/getBookDetail.php?find=${orderDetailResult[i].bookId}`);
            let bookResult = await bookResponse.json();
            let book = bookResult.data[0];

            productString += `
            <tr>
                <td>
                    <img src="public/uploads/books/${book.image}" alt="book">
                </td>
                <td class="order-detail__product-name">
                    <p class="order-detail__product-title">${book.name}</p>
                    <span class="order-detail__product-description">${book.id} / ${book.categoryName} / ${book.pages}</span>
                </td>
                <td>${orderDetailResult[i].bookId}</td>
                <td>${formatMoney(book.sellPrice)}</td>
                <td>${orderDetailResult[i].amount}</td>
                <td class="right-align">${formatMoney(orderDetailResult[i].price)}</td>
            </tr>
            `;

            // Cộng tiền của chi tiết đơn hàng đó vào tổng giá trị đơn hàng
            totalPrice += orderDetailResult[i].price;
        }


        orderPage.innerHTML = `
        <div class="order-history__container">
            <div class="info__title">CHI TIẾT ĐƠN HÀNG</div>
            <div class="order-history__content">
                <span class="order-detail__back-to-order-history"><i class="fa fa-reply"></i> Quay lại lịch sử đơn hàng</span>
                <div class="order-detail__order-info-container">
                    <p class="order-detail__title">ĐƠN HÀNG: #${orderId}, <span class="order-detail__date">Đặt lúc — ${formatDate(order['ngayTaoDon'])}</span></p>
                    <p class="order-detail__status"><span>Tình trạng thanh toán: </span>${order['trangThaiThanhToan']}</p>
                    <p class="order-detail__status"><span>Trạng thái đơn hàng: </span>${order['trangThai']}</p>
                    <p class="order-detail__status"><span>Tên người nhận: </span>${order['hvtNguoiNhan']}</p>
                    <p class="order-detail__status"><span>Địa chỉ giao hàng: </span>${formatAddress(order['dcNguoiNhan'])}</p>
                </div>
                <div class="order-detail__product-detail-container">
                    <div class="order-detail__product-content">
                        <p>Chi tiết đơn hàng</p>
                        <div class="order-detail__table-container">
                            <table class="order-detail__table">
                                <tr>
                                    <th></th>
                                    <th class="order-detail__table-product-header table-header-padding">Sản phẩm</th>
                                    <th class="table-header-padding">Mã sản phẩm</th>
                                    <th class="table-header-padding">Đơn giá</th>
                                    <th class="table-header-padding">Số lượng</th>
                                    <th class="order-detail__table-total-header">Thành tiền</th>
                                </tr>
                                ${productString}
                                <tr class="order-detail__total-section">
                                    <td colspan="5" class="right-align">Tổng tiền sản phẩm</td>
                                    <td class="right-align">${formatMoney(totalPrice)}</td>
                                </tr>
                                <tr class="">
                                    <td colspan="5" class="right-align font-weight-500">Tổng tiền đơn hàng (bao gồm phí ship và trừ giảm giá nếu có)</td>
                                    <td class="right-align font-weight-600">${formatMoney(order['tongTienThu'])}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        // Thêm sự kiện onclick cho nút quay về trang đơn hàng
        document.querySelector('.order-detail__back-to-order-history').addEventListener('click', async () => {
            await showOrderHistory();
        });

    }

    // Cập nhật lại URL với ID của đơn hàng đang hiển thị chi tiết đơn hàng
    url.set("orderId", orderId)
    history.pushState(null, '', window.location.pathname + '?' + url.toString());
    hideLoading();
}

document.addEventListener('DOMContentLoaded', async () => {
    let currentParams = new URLSearchParams(window.location.search);
    let orderPage = document.querySelector('.order-history');
    if (currentParams.has('order')) {
        showOrderHistory(currentParams.get('order'));
    } else if (currentParams.has('orderId')) {
        showOrderDetail(currentParams.get('orderId'));
    } else {
        if (!orderPage.classList.contains("hide-item")) {
            orderPage.classList.add("hide-item");
        }
    }
});



function hideMainPage() {
    const main = document.querySelector('.main');
    const body = document.querySelector('.body');
    const checkout = document.querySelector('.checkout');
    const footer = document.querySelector('.footer-info');
    const showCart = document.querySelector('.show-cart');
    const infoPage = document.querySelector('.self-infomation');
    const menu = document.querySelector('.menu-container');

    // Ẩn các thành phần khác trong trang
    if (!main.classList.contains('hide-item')) {
        main.classList.add('hide-item');
    }

    if (!body.classList.contains('hide-item')) {
        body.classList.add('hide-item');
    }

    if (!checkout.classList.contains('hide-item')) {
        checkout.classList.add('hide-item');
    }

    if (!footer.classList.contains('hide-item')) {
        footer.classList.add('hide-item');
    }

    if (!showCart.classList.contains('hide-item')) {
        showCart.classList.add('hide-item');
    }

    if (!infoPage.classList.contains('hide-item')) {
        infoPage.classList.add('hide-item');
    }

    if (!menu.classList.contains('hide-item')) {
        menu.classList.add('hide-item');
    }
}

// Hàm để định dạng lại ngày
function formatDate(str) {
    try {
        let date = new Date(str);

        let day = String(date.getDate()).padStart(2, '0');
        let month = String((date.getMonth() + 1)).padStart(2, '0');
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } catch (error) {
        console.log("Format Date error");
        return null;
    }
}

// Hàm để định dạng lại trạng thái đơn hàng
function formatStatus(str) {
    let result;
    switch (str) {
        case "CHO_XAC_NHAN":
            result = "Chờ xác nhận";
            break;

        case "DANG_GIAO":
            result = "Đang giao";
            break;

        case "DA_GIAO":
            result = "Đã giao";
            break;

        case "DA_HUY":
            result = "Đã hủy";
            break;
    }

    return result;
}

function formatAddress(address) {
    let arr = address.split(" / ");
    if (arr.length == 4) {
        return `${arr[3]}, ${arr[2]}, ${arr[1]}, ${arr[0]}`;
    }

    return address;
}