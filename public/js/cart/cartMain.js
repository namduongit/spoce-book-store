import { formatMoney } from "../book/getDataBook.js";
import { getNameCategoryByID } from "../book/getDataBook.js";
import { toast } from "../toast.js";
import { getBookByID } from "../book/getDataBook.js";


window.onload = async function() {
    const currentParams = new URLSearchParams(window.location.search);
    updateQuantityCardHolder();
    showLoading();
    if (currentParams.has('page-action')) {
        if (currentParams.get('page-action') === 'check-out') {
            checkOutBill();
        }
        else if (currentParams.get('page-action') === 'show-all-cart') {
            await showAllCart('Recursive');
        }

    }
    hideLoading();

    if (currentParams.has('cart-holder') && currentParams.get('cart-holder') === 'true') {
        showLoading();
        await viewCart('Recursive');
        hideLoading();
    }
}


async function viewCart(type) {
    let cartDetail = document.querySelector(".topbar__cart-detail-holder");
    let localStorageProduct = JSON.parse(localStorage.getItem("cart")) || [];

    const url = new URL(window.location.href)
    const currentParams = new URLSearchParams(url.search);
    currentParams.set('cart-holder', 'true');
    let newUrl = url.pathname + (currentParams.toString() ? '?' + currentParams.toString() : '');
    window.history.replaceState(null, document.title, newUrl);

    if (localStorageProduct.length > 0) {
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

    if (localStorageProduct.length === 0) {
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

    for (const item of localStorageProduct) {
        let productItem = await getBookByID(item.id);
        productItem = productItem['books'][0];
        let nameGenre = await getNameCategoryByID(productItem.genreId);

        cartHTML += `
            <tr>
                <td><img src="../public/uploads/books/${productItem.image}" alt="${productItem.name}"></td>
                <td>
                    <p class="topbar__product-info">
                        <a href="#">${productItem.name}</a>
                        <br>
                        <span>${productItem.id} / ${nameGenre} / ${formatMoney(productItem.sellingPrice)}</span>
                    </p>
                    <div class="topbar__cart-view-amountprice-holder">
                        <span>${item.quantity}</span>
                        <div>${formatMoney(productItem.sellingPrice * item.quantity)}</div>
                    </div>
                    <div class="topbar__product-cancel" onclick="removeFromCart(${productItem.id})">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </td>
            </tr>
        `;
        totalPrice += item.quantity * productItem.sellingPrice;
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

function removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id != bookId);
    localStorage.setItem("cart", JSON.stringify(cart));
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

    let localStorageProduct = JSON.parse(localStorage.getItem("cart")) || [];

    if (localStorageProduct.length === 0) {
        document.querySelector(".topbar__cart-detail-holder").classList.remove('show');
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

    for (const item of localStorageProduct) {
        let productItem = await getBookByID(item.id);
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
                    <button class="show-cart__btn show-cart__btn--left">-</button>
                    <input type="text" name="product-amount" value="${item.quantity}" disabled>
                    <button class="show-cart__btn show-cart__btn--right">+</button>
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

async function checkOutBill() {
    let cartDetail = document.querySelector(".topbar__cart-detail-holder");
    let localStorageProduct = JSON.parse(localStorage.getItem("cart")) || [];

    cartDetail.classList.remove('show');
    if (localStorageProduct.length === 0) {
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

    const checkoutMain = document.querySelector('.checkout');
    const cartMain = document.querySelector('.show-cart');
    const mainMain = document.querySelector('.main');
    const bodyMain = document.querySelector('.body');
    const productDetailMain = document.querySelector('.show-detail-product');
    const orderPage = document.querySelector('.order-history');

    let HTMLCheckOut = ``;
    let totalPrice = 0;
    showLoading();
    for (const item of localStorageProduct) {
        let productItem = await getBookByID(item.id);
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
                        <div class="checkout__input-field checkout__address-select">

                            <select name="address-holder" id="address-holder">
                                <option value="default" selected>Địa chỉ đã lưu trữ</option>
                            </select>
                            <label for="address-holder">Thêm địa chỉ mới</label>
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
                        <div class="checkout__input-field">

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
                    <div class="checkout__ship-method-unchoose" style="display: none;">
                        <img src="public/images/download.svg" alt="package">
                        <p>Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.</p>
                    </div>

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
                    <label class="checkout__payment-method-option" for="cash">
                        <div class="checkout__payment-method-radiobtn">
                            <label class="checkout__payment-radiobtn-holder">
                                <input type="radio" id="cash" name="payment" value="cash">
                                <span></span>
                            </label>
                        </div>
                        <div class="checkout__payment-method-content">
                            <img src="../public/images/cod.svg" alt="payment_image">
                            <span>Thanh toán khi giao hàng (COD)</span>
                        </div>
                    </label>

                    <label class="checkout__payment-method-option" for="qrcode">
                        <div class="checkout__payment-method-radiobtn">

                            <label class="checkout__payment-radiobtn-holder">
                                <input type="radio" id="qrcode" name="payment" value="qrcode">
                                <span></span>
                            </label>
                        </div>
                        <div class="checkout__payment-method-content">
                            <img src="../public/images/type_atm.svg" alt="payment_image">
                            <span>Chuyển khoản qua ngân hàng</span>
                        </div>
                    </label>

                    <div class="checkout__qrcode-method-holder">
                        <div class="checkout__qrcode-text">• NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN NGOẠI THƯƠNG VIỆT NAM (VIETCOMBANK) - CHI NHÁNH SÀI GÒN
                            • SỐ TÀI KHOẢN: 1013999802
                            • TÊN TÀI KHOẢN: CTY CP TMDV SPOCE BOOK STORE
                        </div>
                    </div>

                    <label class="checkout__payment-method-option" for="credit">
                        <div class="checkout__payment-method-radiobtn">

                            <label class="checkout__payment-radiobtn-holder">
                                <input type="radio" id="credit" name="payment" value="credit">
                                <span></span>
                            </label>
                        </div>
                        <div class="checkout__payment-method-content">
                            <img src="../public/images/credit-card-removebg-preview.png" alt="payment_image">
                            <div class="checkout__credit-content-holder">
                                <p>Thẻ Visa/Master/JCB/Amex/CUP</p>
                                <img src="../public/images/visa_master_jcb_amex_cup.svg" alt="credit-cards">
                            </div>
                        </div>
                    </label>

                    <div class="checkout__credit-method-holder">
                        <div class="checkout__input-field">
                            <input type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" maxlength="19" id="card-number-field" name="card-number" placeholder="Số thẻ">
                            <label>Số thẻ (16 số)</label>
                        </div>

                        <div class="checkout__input-field">
                            <input type="tel" inputmode="numeric" maxlength="5" id="card-expiration-field" name="card-expiration" placeholder="Ngày hết hạn">
                            <label>Ngày hết hạn (MM/YY)</label>
                        </div>

                        <div class="checkout__input-field">
                            <input type="tel" inputmode="numeric" pattern="[0-9]{3}" maxlength="3" id="card-cvv-field" name="card-cvv" placeholder="Mã bảo mật">
                            <label>Mã bảo mật (3 số)</label>
                        </div>
                    </div>
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

    document.getElementById('cash').addEventListener('click', function() {
        document.querySelector('.checkout__qrcode-method-holder').style.display = 'none';
        document.querySelector('.checkout__credit-method-holder').style.display = 'none';
    });

    document.getElementById('credit').addEventListener('click', function() {
        document.querySelector('.checkout__qrcode-method-holder').style.display = 'none';
        document.querySelector('.checkout__credit-method-holder').style.display = 'block';
    });

    document.getElementById('qrcode').addEventListener('click', function() {
        document.querySelector('.checkout__qrcode-method-holder').style.display = 'block';
        document.querySelector('.checkout__credit-method-holder').style.display = 'none';
    });

    cartMain.classList.add('hide-item');
    mainMain.classList.add('hide-item');
    bodyMain.classList.add('hide-item');
    orderPage.classList.add('hide-item')
    productDetailMain.classList.add('hide-item');
    checkoutMain.classList.remove('hide-item');
    document.querySelector(".topbar__cart-detail-holder").classList.remove('show');
}



function deleteFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id != bookId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateQuantityCardHolder();
    showAllCart('Recursive');
}

function updateQuantityCardHolder() {
    let cartButton = document.querySelector(".topbar__cart-holder");
    let allProductInCart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = 0;
    allProductInCart.forEach(item => {
        totalQuantity += item.quantity;
    });
    cartButton.innerHTML = `
        <i class="fa-solid fa-cart-shopping topbar__cart-icon"></i>
        <span class="topbar__count-holder">
            <span class="topbar__count">${totalQuantity}</span>
        </span>
    `;
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

