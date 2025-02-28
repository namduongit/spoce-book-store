document.addEventListener("DOMContentLoaded", () => {
    function showCart() {
        console.log("showCart called");
        let cartDetail = document.querySelector(".topbar__cart-detail-holder");
        cartDetail.classList.toggle("show");
    }

    function checkClickOutsideOfForm(event) {
        console.log("checkclick called");
        let cartDetail = document.querySelector(".topbar__cart-detail-holder");

        if (cartDetail.classList.contains("show")) {
            cartDetail.classList.remove("show");
        }
    }

    document.addEventListener("click", (event) => {
        if (event.target.closest(".topbar__cart-holder") === document.querySelector(".topbar__cart-holder")) {
            showCart();
        } else {
            checkClickOutsideOfForm(event);
        }
    });
});