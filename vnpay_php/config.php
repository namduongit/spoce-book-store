<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');

// Lấy cấu hình cổng
$port = $_SERVER['SERVER_PORT'];


$vnp_TmnCode = "W54SL72A"; //Website ID in VNPAY System
$vnp_HashSecret = "2PPUAYF32GE14W0T5OD8L7B6LDY7VYZY"; //Secret key
$vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
$vnp_Returnurl = "http://localhost:$port/vnpay_php/vnpay_return.php";
$vnp_apiUrl = "http://sandbox.vnpayment.vn/merchant_webapi/merchant.html";
//Config input format
//Expire
$startTime = date("YmdHis");
$expire = date('YmdHis',strtotime('+15 minutes',strtotime($startTime)));
