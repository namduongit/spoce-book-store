import { formatMoney } from "../book/getDataBook.js";
import { getNameCategoryByID } from "../book/getDataBook.js";
import { toast } from "../toast.js";
import { getBookByID } from "../book/getDataBook.js";

document.addEventListener("DOMContentLoaded", function () {
    updateQuantityCardHolder();
});


document.addEventListener("DOMContentLoaded", function () {
    updateQuantityCardHolder();
    let cartHolder = document.querySelector(".topbar__cart-holder");
    if (cartHolder) {
        cartHolder.addEventListener("click", function () {
            cartHolder.classList.toggle("show");
        });
    } else {
        console.error("Không tìm thấy phần tử .topbar__cart-holder");
    }
});

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




async function viewCart() {
    let cartDetail = document.querySelector(".topbar__cart-detail-holder");
    let localStorageProduct = JSON.parse(localStorage.getItem("cart")) || [];

    if (localStorageProduct.length > 0) {
        showLoading();
    }

    if (cartDetail.classList.contains("show")) {
        hideLoading();
        cartDetail.classList.remove("show");
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
                                <button onclick="showAllCart()">Xem giỏ hàng</button>
                            </td>
                            <td>
                                <button onclick="billPayment()" class="topbar__checkout-btn">Thanh toán</button>
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
                <td><img src="../public/uploads/${productItem.image}" alt="${productItem.name}"></td>
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
                            <button class="topbar__checkout-btn">Thanh toán</button>
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
    viewCart();
    updateQuantityCardHolder();
}

async function showAllCart() {
    const cartMain = document.querySelector('.show-cart');
    const mainMain = document.querySelector('.main');
    const bodyMain = document.querySelector('.body');

    let localStorageProduct = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(localStorageProduct);
    // if (localStorageProduct.length === 0) {
    //     toast({
    //         title: 'Thông báo',
    //         message: `Giỏ hàng đang trống !`,
    //         type: 'info',
    //         duration: 3000
    //     });
    //     return;
    // }

    let cartMainHTML = ``;
    let totalPrice = 0;
    showLoading();

    for (const item of localStorageProduct) {
        let productItem = await getBookByID(item.id);
        productItem = productItem['books'][0];
        let nameGenre = await getNameCategoryByID(productItem.genreId);

        cartMainHTML += `
            <div class="show-cart__item d-flex">
                <img class="show-cart__img" src="../public/uploads/${productItem.image}" alt="product">
                <div class="show-cart__detail d-flex">
                    <div class="show-cart__bookname">${productItem.name}</div>
                    <div class="show-cart__price">${productItem.id} / ${nameGenre} / ${formatMoney(productItem.sellingPrice)}</div>
                </div>
                <div class="show-cart__amountbox">
                    <button class="show-cart__btn show-cart__btn--left">-</button>
                    <input type="text" name="product-amount" value="${item.quantity}">
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
            <div class="show-cart__title">GIỎ HÀNG</div>
            <div class="show-cart__cart">${cartMainHTML}</div>
            <div class="show-cart__checkout">
                <div class="show-cart__checkout-info">
                    <div class="show-cart__checkout-title">Thông tin đơn hàng</div>
                    <div class="show-cart__totalprice">Tổng số tiền: <span>${formatMoney(totalPrice)}</span></div>
                    <span>Bạn có thể nhập mã giảm giá ở trang thanh toán.</span>
                    <p>
                        <div class="show-cart__continue-buy-btn">
                            <i class="fa fa-reply"></i> Tiếp tục mua hàng
                        </div>
                    </p>
                </div>
                <div class="show-cart__checkoutbox">
                    <button class="show-cart__to-checkout-btn"><i class="fa-regular fa-circle-check"></i> Thanh toán</button>
                    <button><i class="fa-solid fa-circle-xmark"></i> Xóa tất cả</button>
                </div>
            </div>
        </div>
    `;

    cartMain.classList.remove('hide-item');
    mainMain.classList.add('hide-item');
    bodyMain.classList.add('hide-item');
    document.querySelector(".topbar__cart-detail-holder").classList.remove('show');

    document.querySelector('.show-cart__continue-buy-btn').addEventListener('click', function() {
        window.location.href = '/';
    });
}

function deleteFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id != bookId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateQuantityCardHolder();
    showAllCart();
}

window.deleteFromCart = deleteFromCart;
window.showAllCart = showAllCart;
window.viewCart = viewCart;
window.removeFromCart = removeFromCart;
window.updateQuantityCardHolder = updateQuantityCardHolder;

