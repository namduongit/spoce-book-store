document.addEventListener("DOMContentLoaded", () => {
    function showCart() {
        console.log("showCart called");
        let cartDetail = document.querySelector(".topbar__cart-detail-holder");
        cartDetail.classList.toggle("show");
    }

    function checkClickOutsideOfForm() {
        console.log("checkclick called");
        let cartDetail = document.querySelector(".topbar__cart-detail-holder");

        if (cartDetail.classList.contains("show")) {
            cartDetail.classList.remove("show");
        }
    }

    function showMainCart() {
        console.log("show main cart is called");
        let mainCart = document.querySelector(".show-cart");
        let mainInterface = document.querySelector(".main");
        let mainBody = document.querySelector(".body");
        let cartDetail = document.querySelector(".topbar__cart-detail-holder");

        mainInterface.classList.add("hide-item");
        mainBody.classList.add("hide-item");
        mainCart.classList.remove("hide-item");
        cartDetail.classList.remove("show");
    }

    function backToMain() {
        console.log("back to main is called");
        let mainCart = document.querySelector(".show-cart");
        let mainInterface = document.querySelector(".main");
        let mainBody = document.querySelector(".body");

        mainCart.classList.add("hide-item");
        mainInterface.classList.remove("hide-item");
        mainBody.classList.remove("hide-item");
    }

    document.addEventListener("click", (event) => {
        if (event.target.closest(".topbar__cart-holder") === document.querySelector(".topbar__cart-holder")) {
            showCart();
        } else if (event.target.closest(".topbar__cart") === document.querySelector(".topbar__cart")) {
            showMainCart();
        } else if (event.target.closest(".show-cart__continue-buy-btn") === document.querySelector(".show-cart__continue-buy-btn")) {
            backToMain();
        } else {
            checkClickOutsideOfForm();
        }
    });
});