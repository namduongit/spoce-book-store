export var Validation = function () {

    this.kiemtraRong = function (value, selector) {
        if (value.trim() === '') {
            document.querySelector(selector).innerHTML = "Không được để trống";
            document.querySelector(selector).style.display = "block";
            return false;
        }
        document.querySelector(selector).style.display = "none";
        return true;

    }

    this.kiemtraSo = function (value, selector) {
        var regexnumber = /^[0-9]+$/;
        if (regexnumber.test(value)) {
            document.querySelector(selector).innerHTML = "";
            document.querySelector(selector).style.display = "none";
            return true;
        }
        document.querySelector(selector).innerHTML = "Tat ca ki tu phai la so";
        document.querySelector(selector).style.display = "block";
        return false;
    }

    this.kiemtraDodai = function (value, selector, lengthStr) {
        if (value.trim().length < lengthStr) {
            document.querySelector(selector).innerHTML = "Tối thiểu "+ lengthStr+" kí tự";
            document.querySelector(selector).style.display = "block";
            return false;
        }
        document.querySelector(selector).style.display = "none";
        return true;
    }

    this.kiemtraGiaTri = function (value, selector, min, max) {
        if (Number(value) < min || Number(value) > max || value.trim() === '') {
            document.querySelector(selector).innerHTML = "Vui long nhap gia tri tu " + min + " den " + max;
            document.querySelector(selector).style.display = "block";
            return false;
        }
        document.querySelector(selector).style.display = "none";
        return true;
    }

    this.kiemtraChuoi = function (value, selector) {
        var regexletter = /^[A-Za-z]+$/;
        if (regexletter.test(value)) {
            document.querySelector(selector).style.display = "none";
            return true;
        }
        document.querySelector(selector).innerHTML = "Tat ca gia tri la chu";
        document.querySelector(selector).style.display = "block";
        return false;
    }

    this.kiemtraEmail= function(value, selector){
        var regexemail=/[^@]+@[^@]+\.[a-zA-Z]{2,6}/;
        var  pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
        if(regexemail.test(value) || pattern.test(value)){
            // document.querySelector(selector).style.display = "none";
            return true;
        }
        // document.querySelector(selector).innerHTML = "Email không hợp lệ!";
        // document.querySelector(selector).style.display = "block";
        return false;
    }

    this.kiemtraSDT=function(value, selector){
        let patternVN = /^(09|03|07|08|05)\d{8}$/;
        if(patternVN.test(value)){
            // document.querySelector(selector).style.display = "none";
            return true;
        }
        // document.querySelector(selector).innerHTML = "Số điện thọai không hợp lệ";
        // document.querySelector(selector).style.display = "block";
        return false;
    }

    this.kiemtraDateCard=function(value, selector){
        let expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if(expiryDatePattern.test(value)){
            document.querySelector(selector).style.display = "none";
            return true;
        }
        document.querySelector(selector).innerHTML = "Ngày hết hạn không hợp lệ";
        document.querySelector(selector).style.display = "block";
        return false;
    }

    this.isTrueUsername = function(value) {
        return value.length >= 6;
    }

    this.isTruePassword = function(value) {
        if (value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value)) {
            return true;
        }
        return false;
    };

    this.isTrueNumberPhone = function(value) {
        let regex = /^(032|033|034|035|036|037|038|039|081|082|083|084|085|070|076|077|078|079|056|058|059|024|028|020|021|022|023|025|026|027|029)\d{7}$/;

        return regex.test(value);
    };

}