import { formatMoney } from "../book/getDataBook.js";
import { getNameCategoryByID } from "../book/getDataBook.js";
import { toast } from "../toast.js";
import { getBookByID } from "../book/getDataBook.js";
import { showAddressInCurrentUser } from "../auth/displayInfoUser.js";
import { getCurrentUser } from "../auth/displayInfoUser.js";
import { updateAddressSelect } from "../../../api/address/updateAddressSelect.js";
import { showConfirmationDialog } from "../question.js";


window.onload = async function() {
    const currentParams = new URLSearchParams(window.location.search);
    await updateQuantityCardHolder();
    if (currentParams.has('page-action')) {
        showLoading();
        if (currentParams.get('page-action') === 'check-out') {
            await checkOutBill();
        }
        else if (currentParams.get('page-action') === 'show-all-cart') {
            await showAllCart('Recursive');
        }
        hideLoading();
        return;
    }

    if (currentParams.has('cart-holder') && currentParams.get('cart-holder') == 'true') {
        showLoading();
        await viewCart('Recursive');
        hideLoading();
        return;
    }
}


async function viewCart(type) {
    let cartDetail = document.querySelector(".topbar__cart-detail-holder");

    const currentUser = await getCurrentUser();
    console.log('Người dùng hiện tại: ', currentUser);
    let currentCartUser = null;

    if (currentUser == null) {
        currentCartUser = JSON.parse(localStorage.getItem("cart")) || [];
    } else {
        async function getAllProductFromCart() {
            let formData = new URLSearchParams();
            formData.append('maNguoiDung', currentUser['user'].id);
            try {
                let response = await fetch('api/carts/get.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                });
        
                let data = await response.json();
                return data;
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                return null; 
            }
        }        
        currentCartUser = await getAllProductFromCart();
        currentCartUser = currentCartUser['data'] || [];
    }


    const url = new URL(window.location.href)
    const currentParams = new URLSearchParams(url.search);
    currentParams.set('cart-holder', 'true');
    let newUrl = url.pathname + (currentParams.toString() ? '?' + currentParams.toString() : '');
    window.history.replaceState(null, document.title, newUrl);

    if (currentCartUser.length > 0) {
        showLoading();
    }

    if (cartDetail.classList.contains("show") && type !== 'Recursive') {
        hideLoading();
        cartDetail.classList.remove("show");
        currentParams.delete('cart-holder');
        newUrl = url.pathname + (currentParams.toString() ? '?' + currentParams.toString() : '');
        window.history.replaceState(null, document.title, newUrl);
        return;
    }

    if (currentCartUser.length === 0) {
        cartDetail.innerHTML = `
            <div class="topbar__cart-detail">
                <div class="topbar__cart-view">
                    <div class="topbar__cart-title">Giỏ hàng trống</div>
                    <div  class="topbar__cart-content">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p>Uy tín vượt niềm tin</p>
                        <p>Hãy mua Sách tại SPOCE BOOK STORE</p>
                    </div>
                </div>
                <div class="topbar__cart-price">
                    <table>
                        <tr class="topbar__price-total">
                            <td>TỔNG TIỀN:</td>
                            <td>${0} VNĐ</td>
                        </tr>
                        <tr class="topbar__cart-btn">
                            <td class="topbar__cart">
                                <button onclick="showAllCart(null)">Xem giỏ hàng</button>
                            </td>
                            <td>
                                <button onclick="checkOutBill()" class="topbar__checkout-btn">Thanh toán</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
        cartDetail.classList.add("show");
        return;
    }

    let cartHTML = '';
    let totalPrice = 0;

    for (const productItem of currentCartUser) {
        let product = await getBookByID(currentUser != null ? productItem['bookId'] : productItem['id']);
        product = product['books'][0];
        let nameGenre = await getNameCategoryByID(product.genreId);
        cartHTML += `
            <tr>
                <td><img src="../public/uploads/books/${product.image}" alt="${product.name}"></td>
                <td>
                    <p class="topbar__product-info">
                        <a href="#">${product.name}</a>
                        <br>
                        <span>${product.id} / ${nameGenre} / ${formatMoney(product.sellingPrice)}</span>
                    </p>
                    <div class="topbar__cart-view-amountprice-holder">
                        <span>${productItem.quantity}</span>
                        <div>${formatMoney(product.sellingPrice * productItem.quantity)}</div>
                    </div>
                    <div class="topbar__product-cancel" onclick="removeFromCart(${product.id})">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </td>
            </tr>
        `;
        totalPrice += productItem.quantity * product.sellingPrice;
    }

    let HTML = `
        <div class="topbar__cart-detail">
            <div class="topbar__cart-view">
                <table>
                    ${cartHTML}
                </table>
            </div>
            <div class="topbar__cart-price">
                <table>
                    <tr class="topbar__price-total">
                        <td>TỔNG TIỀN:</td>
                        <td>${formatMoney(totalPrice)}</td>
                    </tr>
                    <tr class="topbar__cart-btn">
                        <td class="topbar__cart">
                            <button onclick="showAllCart()">Xem giỏ hàng</button>
                        </td>
                        <td>
                            <button class="topbar__checkout-btn" onclick="checkOutBill()">Thanh toán</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `;

    cartDetail.innerHTML = HTML;
    hideLoading();
    cartDetail.classList.add("show");
}




async function removeFromCart(bookId) {
    const currentUser = await getCurrentUser();
    if (currentUser == null) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => item.id != bookId);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    else {
        let formData = new URLSearchParams();
        formData.append('maNguoiDung', currentUser['user'].id);
        formData.append('maSach', bookId);
        fetch('api/carts/remove.php', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString()
        })
        .then(response => response.json())
        .then(data => {
            toast({
                title: 'Thông báo',
                message: data.message,
                type: data.success ? 'success' : 'warning',
                duration: 3000
            });
        })
        .catch(error => {
            console.error('Lỗi khi xóa sản phẩm: ', error);
        })
    }
    viewCart('Recursive');
    updateQuantityCardHolder();
}

async function showAllCart(type) {
    let baseUrl = window.location.origin + window.location.pathname;
    let queryParams = new URLSearchParams(window.location.search);
    queryParams.delete('cart-holder');
    let newUrl = baseUrl + (queryParams.toString() ? "?" + queryParams.toString() : "");
    history.replaceState(null, document.title, newUrl);


    const cartMain = document.querySelector('.show-cart');
    const mainMain = document.querySelector('.main');
    const bodyMain = document.querySelector('.body');
    const checkoutMain = document.querySelector('.checkout');
    const productDetailMain = document.querySelector('.show-detail-product');
    const footerInfo = document.querySelector('.footer-info');
    const accountInfo = document.querySelector('.self-infomation');
    const orderInfo = document.querySelector('.order-history');

    let currentCartUser = null;
    let currentUser = await getCurrentUser();
    if (currentUser == null) {
        currentCartUser = JSON.parse(localStorage.getItem("cart")) || [];
    } else {
        async function getAllProductFromCart() {
            let formData = new URLSearchParams();
            formData.append('maNguoiDung', currentUser['user'].id);
            try {
                let response = await fetch('api/carts/get.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                });
        
                let data = await response.json();
                return data;
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                return null; 
            }
        }        
        currentCartUser = await getAllProductFromCart();
        currentCartUser = currentCartUser['data'] || [];
    }



    if (currentCartUser.length === 0) {
        document.querySelector(".topbar__cart-detail-holder").classList.remove('show');
        // Này dùng để khi xóa sản phẩm thì nó không bị ẩn và thông báo giỏ hàng trống
        if (type !== 'Recursive') {
            toast({
                title: 'Thông báo',
                message: `Giỏ hàng đang trống !`,
                type: 'info',
                duration: 3000
            });
            return;
        }
    }

    let cartMainHTML = ``;
    let totalPrice = 0;

    const url = new URL(window.location.href);
    url.search = "?page-action=show-all-cart";
    window.history.replaceState(null, document.title, url);

    showLoading();

    for (const item of currentCartUser) {
        let productItem = await getBookByID(currentUser != null ? item['bookId'] : item['id']);
        productItem = productItem['books'][0];
        let nameGenre = await getNameCategoryByID(productItem.genreId);

        cartMainHTML += `
            <div class="show-cart__item d-flex">
                <img class="show-cart__img" src="../public/uploads/books/${productItem.image}" alt="product">
                <div class="show-cart__detail d-flex">
                    <div class="show-cart__bookname">${productItem.name}</div>
                    <div class="show-cart__price">${productItem.id} / ${nameGenre} / ${formatMoney(productItem.sellingPrice)}</div>
                </div>
                <div class="show-cart__amountbox">
                    <button class="show-cart__btn show-cart__btn--left" onclick="minsQuantity(${item.bookId})">-</button>
                    <input type="text" name="product-amount" value="${item.quantity}" disabled>
                    <button class="show-cart__btn show-cart__btn--right" onclick="plusQuantity(${item.bookId})">+</button>
                </div>
                <div class="show-cart__priceamount">${formatMoney(item.quantity * productItem.sellingPrice)}</div>
                <a href="#" class="show-cart__remove" onclick="deleteFromCart(${productItem.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </a>
            </div>
        `;
        totalPrice += item.quantity * productItem.sellingPrice;
    }

    hideLoading();

    cartMain.innerHTML = `
        <div class="show-cart__container">
            <p>
                <div class="show-cart__continue-buy-btn">
                    <i class="fa fa-reply"></i> Tiếp tục mua hàng
                </div>
            </p>
            <div class="show-cart__title">GIỎ HÀNG</div>
            <div class="show-cart__cart">${cartMainHTML}</div>
            <div class="show-cart__checkout">
                <div class="show-cart__checkout-info">
                    <div class="show-cart__checkout-title">Thông tin đơn hàng</div>
                    <div class="show-cart__totalprice">Tổng số tiền: <span>${formatMoney(totalPrice)}</span></div>
                    <span>Bạn có thể nhập mã giảm giá ở trang thanh toán.</span>
                </div>
                <div class="show-cart__checkoutbox">
                    <button onclick="checkOutBill()" class="show-cart__to-checkout-btn">
                        <i class="fa-regular fa-circle-check"></i> Thanh toán
                    </button>
                    <button onclick="deleteAllCart()"><i class="fa-solid fa-circle-xmark"></i> Xóa tất cả</button>
                </div>
            </div>
        </div>
    `;

    cartMain.classList.remove('hide-item');
    mainMain.classList.add('hide-item');
    bodyMain.classList.add('hide-item');
    checkoutMain.classList.add('hide-item');
    productDetailMain.classList.add('hide-item');
    footerInfo.classList.add('hide-item');
    accountInfo.classList.add('hide-item');
    orderInfo.classList.add('hide-item');
    document.querySelector(".topbar__cart-detail-holder").classList.remove('show');

    document.querySelector('.show-cart__continue-buy-btn').addEventListener('click', function() {
        window.location.href = '/';
    });
}

function minsQuantity(bookId) {

}

function plusQuantity(bookId) {

}

async function checkOutBill() {
    const currentUser = await getCurrentUser();

    if (currentUser == null) {
        toast({
            title: 'Thông báo',
            message: 'Vui lòng đăng nhập để thực hiện tính năng mua hàng',
            type: 'warning',
            duration: 3000
        });
        return;
    }
    async function getAllProductFromCart() {
        let formData = new URLSearchParams();
        formData.append('maNguoiDung', currentUser['user'].id);
        try {
            let response = await fetch('api/carts/get.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });
    
            let data = await response.json();
            return data;
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
            return null; 
        }
    }

    let currentCart = await getAllProductFromCart();
    currentCart = currentCart['data'];

    let cartDetail = document.querySelector(".topbar__cart-detail-holder");

    cartDetail.classList.remove('show');
    if (currentCart.length === 0) {
        toast({
            title: 'Thông báo',
            message: `Giỏ hàng đang trống !`,
            type: 'info',
            duration: 3000
        });
        let baseUrl = window.location.origin + window.location.pathname;
        let queryParams = new URLSearchParams(window.location.search);
        queryParams.delete('cart-holder');
        let newUrl = baseUrl + (queryParams.toString() ? "?" + queryParams.toString() : "");
        history.replaceState(null, document.title, newUrl);
        return;
    }

    const url = new URL(window.location.href);
    url.search = "?page-action=check-out";
    window.history.replaceState(null, document.title, url);

    let currentAddress = null;
    if (currentUser) {
        currentAddress = await showAddressInCurrentUser(currentUser['user'].id);
    }

    const checkoutMain = document.querySelector('.checkout');
    const cartMain = document.querySelector('.show-cart');
    const mainMain = document.querySelector('.main');
    const bodyMain = document.querySelector('.body');
    const productDetailMain = document.querySelector('.show-detail-product');
    const orderPage = document.querySelector('.order-history');
    const infoPage = document.querySelector('.self-infomation');

    let HTMLCheckOut = ``;
    let totalPrice = 0;
    showLoading();
    for (const item of currentCart) {
        let productItem = await getBookByID(item.bookId);
        productItem = productItem['books'][0];
        let nameGenre = await getNameCategoryByID(productItem.genreId);

        HTMLCheckOut += `
            <tr>
                <td class="checkout__product-thumbnail">
                    <div class="checkout__product-image">
                        <div class="checkout__product-image-holder">
                            <img src="../public/uploads/books/${productItem.image}" alt="product-image">
                        </div>
                        <span class="checkout__product-quantity">${item.quantity}</span>
                    </div>

                </td>
                <td class="checkout__product-name">
                    <div class="checkout__product-name-holder">
                        <span>${productItem.name}</span>
                        <span>${productItem.id} / ${nameGenre} / ${formatMoney(productItem.sellingPrice)}</span>
                    </div>
                </td>
                <td class="checkout__product-price">
                    <span>${formatMoney(item.quantity * productItem.sellingPrice)}</span>
                </td>
            </tr>
        `;
        totalPrice += item.quantity * productItem.sellingPrice;
    }

    async function getDataPayment() {
        try {
            const response = await fetch('api/payments/get.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }    

    let dataPayment = await getDataPayment();
    console.log(dataPayment);
    let HTMLPayment = ``;

    if (Array.isArray(dataPayment) && dataPayment) {
        dataPayment.forEach(data => {
            let holderPayment = '';
            if (data.info != null && data.desc != null && data.qrCode != null && data.auth != null) {
                holderPayment = `
                    <div class="checkout__payment-method-child">
                        <div class="checkout__qrcode-method-child-wrapper">
                            <div class="checkout__qrcode-text">
                                • ${data.info}
                                • ${data.desc}
                                • ${data.auth}
                            </div>
                            <div class="checkout__qrcode-img">
                                <img src="../public/images/banking/uploads/${data.qrCode}" alt="payment_qr">
                            </div>
                        </div>
                    </div>
                `;
            }

            HTMLPayment += `
                    <label class="checkout__payment-method-option" for="${data.id}">
                        <div class="checkout__payment-method-radiobtn">
                            <label class="checkout__payment-radiobtn-holder">
                                <input type="radio" id="${data.id}" name="payment" value="${data.id}">
                                <span></span>
                            </label>
                        </div>
                        <div class="checkout__payment-method-content">
                            <img src="../public/images/banking/logo/${data.icon}" alt="payment_icon">
                            <span>${data.name}</span>
                        </div>
                        ${holderPayment}
                    </label>
            `;
        });
    }

    // Cái cuối cùng dùng để ứng dụng thanh toán cho thầy coi
    HTMLPayment += `
    <label class="checkout__payment-method-option" for="-1">
        <div class="checkout__payment-method-radiobtn">
            <label class="checkout__payment-radiobtn-holder">
                <input type="radio" id="-1" name="payment" value="-1">
                <span></span>
            </label>
        </div>
        <div class="checkout__payment-method-content">
            <img src="../public/images/banking/logo/type_atm.svg" alt="payment_icon">
            <span>Chuyển khoản trực tiếp VNPAY - Dùng làm Demo</span>
        </div>
    </label>
    `;

    

    let rightHTMLCheckOut = `
            <div class="checkout__cart-info-holder">
                <div class="checkout__cart-products-holder">
                    <table class="checkout__cart-table">
                        <tbody>
                            ${HTMLCheckOut}
                        </tbody>
                    </table>
                </div>

                <div class="checkout__cart-promotion-holder">
                    <form>
                        <div class="checkout__promotion-input-holder">
                            <div class="checkout__input-field">
                                <input type="text" id="promotion-code" name="promotion-code" placeholder=" ">
                                <label for="promotion-code">Mã giảm giá</label>
                            </div>
                        </div>
                        <div class="checkout__promotion-btn-holder">
                            <button class="checkout__promotion-btn">Sử dụng</button>
                        </div>
                    </form>
                </div>

                <div class="checkout__cart-submit-holder">
                    <table>
                        <tbody>
                            <tr class="checkout__temp-total-holder">
                                <td>Tạm tính</td>
                                <td>
                                    <span>${formatMoney(totalPrice)}</span>
                                </td>
                            </tr>
                            <tr class="checkout__shipping-fee-holder">
                                <td>Phí vận chuyển</td>
                                <td>
                                    <span>—</span>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr class="checkout__final-total-holder">
                                <td>Tổng cộng</td>
                                <td>
                                    <span>VND</span>
                                    <span>${formatMoney(totalPrice)}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="checkout__submit-btn-container">
                        <span class="checkout__back-to-cart-btn">Giỏ hàng</span>
                        <div class="checkout__submit-btn-holder">
                            <button class="checkout__submit-btn-final">Hoàn tất đơn hàng</button>
                        </div>
                    </div>
                </div>
            </div>
    `;

    let leftHTMLCheckOut = `
        <div class="checkout__customer-info-holder">
            <div class="checkout__customer-address-container">
                <p>Thông tin giao hàng</p>
                <div class="checkout__customer-address-field">
                    <div class="checkout__address-field-one">

                        <div class="checkout__input-field checkout__address-btn">
                            <div class="checkout__address-btn-child checkout__address-btn-child-select active">Chọn địa chỉ đã lưu</div>
                            <div class="checkout__address-btn-child checkout__address-btn-child-inoput">Chọn địa chỉ mới</div>
                        </div>

                        <div class="checkout__input-field checkout__address-select">
                            <select name="address-holder" id="address-holder">
                                <option value="default" selected disabled>Địa chỉ đã lưu trữ</option>
                            </select>
                            <label for="address-holder">Địa chỉ của bạn</label>
                        </div>

                        <div class="checkout__input-field">
                            <input type="text" id="fullname" name="fullname" placeholder=" ">
                            <label for="fullname">Họ và tên</label>
                        </div>
                        <p class="checkout__empty-field-warning hide-item">Vui lòng nhập họ tên</p>
                        <div class="checkout__input-field">

                            <input type="text" id="numberphone" name="numberphone" placeholder=" ">
                            <label for="numberphone">Số điện thoại</label>
                        </div>
                        <p class="checkout__empty-field-warning hide-item">Vui lòng nhập số điện thoại</p>
                        
                        <p class="checkout__empty-field-warning hide-item">Số điện thoại không hợp lệ (độ dài 10 kí tự, không chứa ký tự đặc biệt và khoảng trắng)</p>
                        <div class="checkout__input-field checkout__input-field-input-address">

                            <input type="text" id="address" name="address" placeholder=" ">
                            <label for="address">Địa chỉ</label>
                        </div>
                        <p class="checkout__empty-field-warning hide-item">Vui lòng nhập địa chỉ</p>
                    </div>
                    <div class="checkout__address-field-two">
                        <div class="checkout__input-field checkout__address-select">
                            <label>Tỉnh / thành</label>
                            <select name="city" id="city">
                                <option value="default" selected>Chọn tỉnh / thành</option>
                            </select>
                            <p class="checkout__empty-field-warning-two hide-item">Vui lòng chọn tỉnh thành</p>
                        </div>
                        <div class="checkout__input-field checkout__address-select">
                            <label>Quận / huyện</label>
                            <select name="district" id="district">
                                <option value="default" selected>Chọn quận / huyện</option>
                            </select>
                            <p class="checkout__empty-field-warning-two hide-item">Vui lòng chọn quận huyện</p>
                        </div>
                        <div class="checkout__input-field checkout__address-select">
                            <label>Phường / xã</label>
                            <select name="ward" id="ward">
                                <option value="default" selected>Chọn phường / xã</option>
                            </select>
                            <p class="checkout__empty-field-warning-two hide-item">Vui lòng chọn phường xã</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="checkout__ship-container">
                <p>Phương thức vận chuyển</p>
                <div class="checkout__ship-method-holder">
                    <div class="checkout__ship-method-choose">

                        <label class="checkout__ship-method" for="tietkiem">
                            <div class="checkout__ship-method-radiobtn-holder">

                                <label class="checkout__ship-method-radiobtn">
                                    <input type="radio" id="tietkiem" name="shipping-method" value="tietkiem">
                                    <span></span>
                                </label>
                                <span>Giao hàng tiết kiệm</span>

                            </div>
                            <span>20.000đ</span>
                        </label>

                        <label class="checkout__ship-method" for="nhanh">
                            <div class="checkout__ship-method-radiobtn-holder">
                                <label class="checkout__ship-method-radiobtn">
                                    <input type="radio" id="nhanh" name="shipping-method" value="nhanh">
                                    <span></span>
                                </label>

                                <span>Giao hàng nhanh</span>
                            </div>

                            <span>30.000đ</span>
                        </label>

                        <label class="checkout__ship-method" for="hoatoc">
                            <div class="checkout__ship-method-radiobtn-holder">

                                <label class="checkout__ship-method-radiobtn">
                                    <input type="radio" id="hoatoc" name="shipping-method" value="hoatoc">
                                    <span></span>
                                </label>
                                <span>Giao hàng hỏa tốc</span>
                            </div>

                            <span>50.000đ</span>
                        </label>

                    </div>
                </div>
            </div>

            <div class="checkout__payment-container">
                <p>Phương thức thanh toán</p>
                <div class="checkout__payment-method-holder">
                    ${HTMLPayment}
                </div>
            </div>
        </div>
    `;


    checkoutMain.innerHTML = `
        <div class="checkout__container">
            ${leftHTMLCheckOut}
            ${rightHTMLCheckOut}
        </div>
    `;
    hideLoading();

    const paymentMethodOptions = document.querySelectorAll('.checkout__payment-method-option');
    paymentMethodOptions.forEach(option => {
        const buttonRadio = option.querySelector('.checkout__payment-radiobtn-holder input');
        buttonRadio.addEventListener('click', function() {
            paymentMethodOptions.forEach(opt => {
                const childElement = opt.querySelector('.checkout__payment-method-child');
                if (childElement) {
                    childElement.style.display = 'none';
                }
            });
    
            const childElement = option.querySelector('.checkout__payment-method-child');
            if (childElement) {
                childElement.style.display = 'block';
            }
        });
    });
    


    cartMain.classList.add('hide-item');
    mainMain.classList.add('hide-item');
    bodyMain.classList.add('hide-item');
    orderPage.classList.add('hide-item');
    infoPage.classList.add('hide-item');
    productDetailMain.classList.add('hide-item');
    checkoutMain.classList.remove('hide-item');
    document.querySelector(".topbar__cart-detail-holder").classList.remove('show');


    // Render dữ liệu vào select đầu tiên do nút địa chỉ được lưu có trước
    function renderBaseAddress() {
        if (currentAddress != null) {
            const selectOption = document.getElementById('address-holder');
            let index = 0;
            currentAddress.data.forEach(element => {
                const valueAddress = element.province + ' / ' + element.district + ' / ' + element.ward + ' / ' + element.street;
                if (index == 0) {
                    selectOption.innerHTML += `
                    <option value="${element.id}" selected>${valueAddress}</option>
                    `;
                }
                else {
                    selectOption.innerHTML += `
                    <option value="${element.id}">${valueAddress}</option>
                    `;
                }
                index += 1;
            });
        }
        document.querySelector('.checkout__input-field-input-address').classList.add('hide-item');
        document.querySelector('.checkout__address-field-two').classList.add('hide-item');
    }

    renderBaseAddress();
    updateAddressSelect('city', 'district', 'ward');

    if (currentAddress ==  null) {
        document.querySelector('.checkout__input-field .checkout__address-btn-child-select').classList.remove('active');
        document.querySelector('.checkout__input-field .checkout__address-btn-child-inoput').classList.add('active');
        document.querySelector('.checkout__input-field-input-address').classList.remove('hide-item');
        document.querySelector('.checkout__address-field-two').classList.remove('hide-item');
        document.querySelector('.checkout__address-select').classList.add('hide-item');
    }

    // Xử lí render dữ liệu ở đây
    document.querySelectorAll('.checkout__address-btn-child').forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentAddress != null) {
                let isSelectSaved = this.classList.contains('checkout__address-btn-child-select');

                document.querySelector('.checkout__address-select').classList.toggle('hide-item', !isSelectSaved);
                document.querySelector('.checkout__input-field-input-address').classList.toggle('hide-item', isSelectSaved);
                document.querySelector('.checkout__address-field-two').classList.toggle('hide-item', isSelectSaved);

                document.querySelectorAll('.checkout__address-btn-child').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
            else {
                let isSelectSaved = this.classList.contains('checkout__address-btn-child-select');
                if (isSelectSaved) {
                    document.querySelector('.checkout__input-field-input-address').classList.remove('hide-item');
                    document.querySelector('.checkout__address-field-two').classList.remove('hide-item');
                    document.querySelector('.checkout__address-select').classList.add('hide-item');
                    toast({
                        title: 'Thông báo',
                        message: 'Bạn chưa lưu bất kì địa chỉ nào',
                        type: 'warning',
                        duration: 3000
                    });
                }
            }

        });
    });

    

    // Submit gửi đơn hàng lên Server
    document.querySelector('.checkout__submit-btn-final').addEventListener('click', async function() {
        let pickUpAddress = null;
        let customerName = null;
        let customerNumberphone = null;
        let shipMethod = null;
        let paymentMethod = null;
        let couponsCode = null;

        //  Xử lí địa chỉ
        document.querySelectorAll('.checkout__address-field-one .checkout__address-btn .checkout__address-btn-child').forEach(element => {
            if (element.classList.contains('active') && element.classList.contains('checkout__address-btn-child-select')) {
                pickUpAddress = document.getElementById('address-holder').options[document.getElementById('address-holder').selectedIndex].text;
            } else if (element.classList.contains('active') && element.classList.contains('checkout__address-btn-child-inoput')) {
                const provinceSelect = document.querySelector('.checkout__address-field-two #city');
                const citySelect = document.querySelector('.checkout__address-field-two #district');
                const wardSelect = document.querySelector('.checkout__address-field-two #ward');
                const addressInput = document.querySelector('.checkout__input-field-input-address #address');

                const selectedProvince = provinceSelect.options[provinceSelect.selectedIndex]?.dataset.name || "";
                const selectedCity = citySelect.options[citySelect.selectedIndex]?.dataset.name || "";
                const selectedWard = wardSelect.options[wardSelect.selectedIndex]?.dataset.name || "";
                const address = addressInput.value.trim();

                pickUpAddress = `${selectedProvince} / ${selectedCity} / ${selectedWard} / ${address}`;
            }
        });
        // Xử lí họ tên và số điện thoại
        customerName = document.getElementById('fullname').value.trim();
        customerNumberphone = document.getElementById('numberphone').value.trim();

        // Xử lí phương thức vận chuyển
        const selectedShipping = document.querySelector('input[name="shipping-method"]:checked');
        if (selectedShipping) {
            shipMethod = selectedShipping.value; 
        }

        // Xử lí phương thức thanh toán
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (selectedPayment) {
            paymentMethod = selectedPayment.value;
        }

        if (pickUpAddress == null || pickUpAddress.replace(/\s|\/+/g, '').length === 0) {
            toast({
                type: 'warning',
                message: 'Bạn chưa điền địa chỉ',
                title: 'Thông báo',
                duration: 3000
            });
            return;
        }

        if (customerName == null || customerName.length == 0) {
            toast({
                type: 'warning',
                message: 'Bạn chưa điền tên người nhận hàng',
                title: 'Thông báo',
                duration: 3000
            });
            return;
        }

        if (customerNumberphone == null || customerNumberphone.length == 0) {
            toast({
                type: 'warning',
                message: 'Bạn chưa nhập số điện thoại người nhận hàng',
                title: 'Thông báo',
                duration: 3000
            });
            return;
        }

        if (customerNumberphone.length != 10) {
            toast({
                type: 'warning',
                message: 'Vui lòng nhập đúng định dạng số điện thoại đầu số Việt Nam',
                title: 'Thông báo',
                duration: 3000
            });
            return;
        }

        if (shipMethod == null || shipMethod.length == 0) {
            toast({
                type: 'warning',
                message: 'Bạn chưa chọn phương thức vận chuyển',
                title: 'Thông báo',
                duration: 3000
            });
            return;
        }

        if (paymentMethod == null || paymentMethod.length == 0) {
            toast({
                type: 'warning',
                message: 'Bạn chưa chọn phương thức thanh toán',
                title: 'Thông báo',
                duration: 3000
            });
            return;
        }



        const resultOrder = await showConfirmationDialog('Xác nhận đặt hàng ?');
        if (resultOrder == true) {
            console.log('Đồng ý thanh toán');
            
            if (paymentMethod != -1) {
                console.log('Không phải thanh toán VNPAY');

            } else {
                showLoading();


                const response = await fetch('../../../vnpay_php/vnpay_create_payment.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        order_id: "Thời gian hiện tại",        
                        order_type: 'billpayment',    
                        amount: 'Số tiền',        
                        order_desc: "SpoceBookStore + Thời gian hiện tại",            
                        bank_code: '',           
                        language: 'vn', 
                        txtexpire: 'Thời gian hiện tại + 15p',
                        txt_billing_fullname: "Tên người dùng hiện tại trong hệ thống",
                        txt_billing_email: "email người dùng hiện tại trong hệ thống nếu không có để spocesupport@gmail.com",
                        txt_billing_mobile: "Tương tự 0388853835",
                        txt_billing_addr1: "Địa chỉ đang chọn",
                        txt_postalcode: "Này để fetch api lấy",
                        txt_bill_city: "Địa chỉ đang chọn",
                        txt_bill_country: "VN",
                        txt_ship_fullname: "Tập đoàn Spoce Tech",
                        txt_ship_email: "nguyennamduong205@gmail.com",
                        txt_ship_mobile: "0388853835",
                        txt_ship_addr1: "Tổ 12 KP Phú Mỹ, Phường Xuân Lập, Thành phố Long Khánh, tỉnh Đồng Nai",
                        txt_ship_postalcode: "76468",
                        txt_ship_city: "Đồng Nai",
                        txt_ship_country: "VN",
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                hideLoading();
            }
        } else {
            console.log('Không đồng ý');

        }





        

        console.log('Địa chỉ nhận hàng: ', pickUpAddress);
        console.log('Người nhận hàng: ', customerName);
        console.log('Điện thoại nhận hàng: ', customerNumberphone);
        console.log('Phương thức thanh toán: ', paymentMethod);
        console.log('Phương thức vận chuyển: ', shipMethod);
        console.log('Mã giảm giá: ', couponsCode);
    });
}


function deleteFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id != bookId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateQuantityCardHolder();
    showAllCart('Recursive');
}


async function updateQuantityCardHolder() {
    showLoading();
    const currentUser = await getCurrentUser();
    let cartButton = document.querySelector(".topbar__cart-holder");
    let totalQuantity = 0;

    if (currentUser == null) {
        let allProductInCart = JSON.parse(localStorage.getItem('cart')) || [];
        allProductInCart.forEach(item => {
            totalQuantity += item.quantity;
        });
    } else {
        try {
            const response = await fetch(`api/carts/quantity.php?maNguoiDung=${currentUser['user'].id}`, {
                method: 'GET'
            });
            const data = await response.json();
            totalQuantity = data.totalQuantity || 0;
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }

    cartButton.innerHTML = `
        <i class="fa-solid fa-cart-shopping topbar__cart-icon"></i>
        <span class="topbar__count-holder">
            <span class="topbar__count">${totalQuantity}</span>
        </span>
    `;
    hideLoading();
}



function deleteAllCart() {
    if (localStorage.getItem('cart')) {
        localStorage.removeItem('cart');
        toast({
            title: 'Thông báo',
            message: `Đã xóa toàn bộ sản phẩm trong cửa hàng !`,
            type: 'succes',
            duration: 3000
        });
        updateQuantityCardHolder();
        showAllCart('Recursive');
    }
}



window.checkOutBill = checkOutBill;
window.deleteAllCart = deleteAllCart;
window.deleteFromCart = deleteFromCart;
window.showAllCart = showAllCart;
window.viewCart = viewCart;
window.removeFromCart = removeFromCart;
window.updateQuantityCardHolder = updateQuantityCardHolder;
window.minsQuantity = minsQuantity;
window.plusQuantity = plusQuantity;
