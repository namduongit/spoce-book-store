import { formatMoney } from "../book/getDataBook.js";
import { fetchData, getUserByID, isLogined } from "./displayInfoUser.js";
import { showConfirmationDialog } from "../question.js";
import { toast } from "../toast.js";


export async function showOrderHistory() {
    showLoading();
    const responseAPI = await isLogined();
    let currentParams = new URLSearchParams(window.location.search);
    const orderPage = document.querySelector('.order-history');
    let user = null;

    if (responseAPI == false) {
        if (currentParams.has("order")) {
            currentParams.delete("order");
            window.history.replaceState(null, '', window.location.pathname + currentParams.toString());
            return;
        }
    }

    if (responseAPI !== false) {
        user = await getUserByID(responseAPI.user['id']);
    }

    hideMainPage();
    if (orderPage.classList.contains('hide-item')) {
        orderPage.classList.remove('hide-item');
    }

    let response = await fetch(`api/orders/get_orders.php?maKhachHang=${user['id']}`);
    let data = await response.json();
    console.log(data);
    const orderList = data.data.list;
    if (!orderList || orderList.length == 0) {
        orderPage.innerHTML = `
        <div class="order-history__container">
            <div class="info__title">ĐƠN HÀNG CỦA BẠN</div>
            <div class="order-history__content">
                <p class="order-history__account-info">Thông tin tài khoản</p>
                <p class="order-history__account-name">${user['full_name']}</p>
                <p class="order-history__account-phone">${user['phone'] == '' ? 'Chưa cập nhật số điện thoại' : user['phone']}</p>
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
    } else {
        let orderString = '';
        
        for (let i=0; i<orderList.length; i++) {
            let cancelButtonString;
            if (orderList[i].trangThai === 'CHO_XAC_NHAN') {
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
                <td>${formatStatus(orderList[i].trangThai)}</td>
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
        </div>
        `;

        orderPage.innerHTML = orderPageString;

        const detailBtns = document.querySelectorAll('.order-history__detail-btn');
        detailBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                await showOrderDetail(btn.dataset.id);
            });
        });

        let pageSearchParam = new URLSearchParams();
        pageSearchParam.set("order", "main")
        history.pushState(null, '', window.location.pathname + '?' + pageSearchParam.toString());

        let cancelBtns = document.querySelectorAll('.order-history__cancel-btn');
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const result = await showConfirmationDialog('Bạn chắc chắn muốn hủy đơn hàng?');
                if (result == true) {
                    showLoading();
                    let orderId = btn.dataset.id;
                    let data = new URLSearchParams();
            
                    data.append("orderId", orderId);
                    data.append("status", "DA_HUY");
            
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
                    .then (data => {
                        hideLoading();
                        toast({
                            title: "Thông báo",
                            message: data.message,
                            type: data.success === true ? 'success' : 'warning',
                            duration: 3000
                        });
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

async function showOrderDetail(orderId) {
    showLoading();
    const responseAPI = await isLogined();
    let currentParams = new URLSearchParams(window.location.search);
    let url = new URLSearchParams();
    let orderPage = document.querySelector('.order-history');
    let user = null;

    if (responseAPI === false) {
        if (currentParams.has('orderId')) {
            currentParams.delete('orderId');
            window.history.replaceState(null, '', window.location.pathname + currentParams.toString());
            return;
        }
    } else {
        user = await getUserByID(responseAPI.user['id']);
    }

    let orderResponse = await fetch(`api/orders/get_orders.php?maDonHang=${orderId}`);
    let orderResult = await orderResponse.json();
    let order = orderResult.data.list;

    let orderDetailResponse = await fetch(`api/orderDetail/get.php?orderId=${orderId}`);
    let orderDetailResult = await orderDetailResponse.json();

    hideMainPage();
    if (orderPage.classList.contains('hide-item')) {
        orderPage.classList.remove('hide-item');
    }
    if (orderDetailResult && orderDetailResult.length != 0) {
        let productString = '';
        let totalPrice = 0;
        for (let i=0; i<orderDetailResult.length; i++) {
            let bookResponse = await fetch(`api/books/getbook.php?bookId=${orderDetailResult[i].bookId}`);
            let book = await bookResponse.json();
            console.log(book);
            productString += `
            <tr>
                <td>
                    <img src="public/uploads/books/${book[0].image}" alt="book">
                </td>
                <td class="order-detail__product-name">
                    <p class="order-detail__product-title">${book[0].name}</p>
                    <span class="order-detail__product-description">${book[0].id} / ${book[0].genreName} / ${book[0].numberOfPages}</span>
                </td>
                <td>${orderDetailResult[i].bookId}</td>
                <td>${formatMoney(book[0].sellPrice)}</td>
                <td>${orderDetailResult[i].amount}</td>
                <td class="right-align">${formatMoney(orderDetailResult[i].price)}</td>
            </tr>
            `;

            totalPrice += orderDetailResult[i].price;
        }


        orderPage.innerHTML = `
        <div class="order-history__container">
            <div class="info__title">CHI TIẾT ĐƠN HÀNG</div>
            <div class="order-history__content">
                <p class="order-detail__title">ĐƠN HÀNG: #${orderId}, <span class="order-detail__date">Đặt lúc — ${formatDate(order['ngayTaoDon'])}</span></p>
                <p class="order-detail__status"><span>Tình trạng thanh toán: </span>${order['trangThaiThanhToan']}</p>
                <p class="order-detail__status"><span>Trạng thái đơn hàng: </span>${formatStatus(order['trangThai'])}</p>
                <span class="order-detail__back-to-order-history">Quay lại lịch sử đơn hàng</span>
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
                                    <td colspan="5" class="right-align">Tổng tiền</td>
                                    <td class="right-align">${formatMoney(totalPrice)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        document.querySelector('.order-detail__back-to-order-history').addEventListener('click', async () => {
            await showOrderHistory();
        });
        
    }
    

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
}

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

