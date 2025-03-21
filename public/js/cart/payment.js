// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("card-number-field").addEventListener("input", function (e) {
//         console.log("add space called");
//         let value = e.target.value.replace(/\D/g, "");
//         // Tự động thêm khoảng trắng sau mỗi 4 số
//         let newValue = value.replace(/(\d{4})/g, "$1 ").trim();
//         e.target.value = newValue;
//     });

//     document.getElementById("card-cvv-field").addEventListener("input", function (e) {
//         // Kiểm tra để xóa các kí tự không phải là số và cập nhật lại vào input field
//         let value = e.target.value.replace(/\D/g, "");
//         e.target.value = value;
//     });

//     document.getElementById("card-expiration-field").addEventListener("input", function (e) {

//         let value = e.target.value;

//         // Xóa các kí tự không phải là số nếu có
//         value = value.replace(/\D/g, "");

//         // Kiểm tra đầu chuỗi phải là 0 hoặc 1
//         if (value.length > 0 && !/^0|1/g.test(value)) {
//             value = value.substring(1);
//         }

//         // Kiểm tra nếu đầu chuỗi là 1 thì kí tự thứ 2 không được là 3-9
//         if (/^1[3-9]/g.test(value)) {
//             value = value.substring(0,1);
//         }

//         // Kiểm tra nếu có hơn 3 số thì tự động thêm dấu / vào giữa tháng và năm
//         if (value.length > 2) {
//             value = value.substring(0,2) + "/" + value.substring(2,4);
//         }

//         e.target.value = value;
//     });

//     document.querySelectorAll('input[name="payment"]').forEach(radio => {
//         radio.addEventListener("change", () => {
//             if (radio.value === "qrcode") {
//                 document.querySelector(".checkout__qrcode-method-holder").classList.toggle("show");
//                 if (document.querySelector(".checkout__credit-method-holder").classList.contains("show")) {
//                     document.querySelector(".checkout__credit-method-holder").classList.toggle("show");
//                 }
//             } else if (radio.value === "credit") {
//                 document.querySelector(".checkout__credit-method-holder").classList.toggle("show");
//                 if (document.querySelector(".checkout__qrcode-method-holder").classList.contains("show")) {
//                     document.querySelector(".checkout__qrcode-method-holder").classList.toggle("show");
//                 }

//             } else {
//                 if (document.querySelector(".checkout__qrcode-method-holder").classList.contains("show")) {
//                     document.querySelector(".checkout__qrcode-method-holder").classList.toggle("show");
//                 }
//                 if (document.querySelector(".checkout__credit-method-holder").classList.contains("show")) {
//                     document.querySelector(".checkout__credit-method-holder").classList.toggle("show");
//                 }
//             }
//         });
//     });

//     document.getElementById("promotion-code").addEventListener("input", function (e) {
//         let button = document.querySelector(".checkout__promotion-btn");

//         if (e.target.value === "") {
//             if (button.classList.contains("active")) {
//                 button.classList.toggle("active");
//             }
//         } else if (e.target.value !== "") {
//             if (!button.classList.contains("active")) {
//                 button.classList.toggle("active");
//             }
//         }
//     });

//     document.querySelector(".topbar__checkout-btn").addEventListener("click", function (e) {
//         let main = document.querySelector(".main");
//         let body = document.querySelector(".body");
//         let mainCart = document.querySelector(".show-cart");
//         let checkout = document.querySelector(".checkout");

//         if (!main.classList.contains("hide-item")) {
//             main.classList.add("hide-item");
//         }

//         if (!body.classList.contains("hide-item")) {
//             body.classList.add("hide-item");
//         }

//         if (!mainCart.classList.contains("hide-item")) {
//             mainCart.classList.add("hide-item");
//         }

//         if (checkout.classList.contains("hide-item")) {
//             checkout.classList.remove("hide-item");
//         }
//     });

//     document.querySelector(".checkout__back-to-cart-btn").addEventListener("click", function () {
//         let main = document.querySelector(".main");
//         let body = document.querySelector(".body");
//         let mainCart = document.querySelector(".show-cart");
//         let checkout = document.querySelector(".checkout");

//         if (!main.classList.contains("hide-item")) {
//             main.classList.add("hide-item");
//         }

//         if (!body.classList.contains("hide-item")) {
//             body.classList.add("hide-item");
//         }

//         if (mainCart.classList.contains("hide-item")) {
//             mainCart.classList.remove("hide-item");
//         }

//         if (!checkout.classList.contains("hide-item")) {
//             checkout.classList.add("hide-item");
//         }
//     });

//     document.querySelector(".show-cart__to-checkout-btn").addEventListener("click", function () {
//         let main = document.querySelector(".main");
//         let body = document.querySelector(".body");
//         let mainCart = document.querySelector(".show-cart");
//         let checkout = document.querySelector(".checkout");

//         if (!main.classList.contains("hide-item")) {
//             main.classList.add("hide-item");
//         }

//         if (!body.classList.contains("hide-item")) {
//             body.classList.add("hide-item");
//         }

//         if (!mainCart.classList.contains("hide-item")) {
//             mainCart.classList.add("hide-item");
//         }

//         if (checkout.classList.contains("hide-item")) {
//             checkout.classList.remove("hide-item");
//         }
//     });

//     document.querySelector(".checkout__submit-btn-final").addEventListener("click", function () {
//         let fullName = document.querySelector("#fullname");
//         let numberPhone = document.querySelector("#numberphone");
//         let address = document.querySelector("#address");
//         let city = document.querySelector("#city");
//         let district = document.querySelector("#district");
//         let ward = document.querySelector("#ward");
//         let warning = document.querySelectorAll(".checkout__empty-field-warning");
//         let warningTwo = document.querySelectorAll(".checkout__empty-field-warning-two");

//         if (fullName.value === "") {
//             warning[0].classList.remove("hide-item");
//         }

//         if (numberPhone.value === "") {
//             warning[1].classList.remove("hide-item");
//         }

//         if (address.value === "") {
//             warning[3].classList.remove("hide-item");
//         }

//         if (city.value === "default") {
//             warningTwo[0].classList.remove("hide-item");
//         }

//         if (district.value === "default") {
//             warningTwo[1].classList.remove("hide-item");
//         }

//         if (ward.value === "default") {
//             warningTwo[2].classList.remove("hide-item");
//         }
//     });
// });