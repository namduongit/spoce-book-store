/**
HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes:

+ Informational responses (100 – 199): Phản hồi thông tin
+ Successful responses (200 – 299): Phản hồi thành công
+ Redirection messages (300 – 399): Chuyển hướng tin nhắn
+ Client error responses (400 – 499): Lỗi phản hồi phía client
+ Server error responses (500 – 599): Lỗi phản hồi server

 */

function updatefilterBookURL(URLParams = {}) {
    const params = new URLSearchParams(window.location.search);

    // Duyệt qua object URLParams để cập nhật giá trị
    Object.keys(URLParams).forEach(key => {
        if (URLParams[key] != '') {
            params.set(key, URLParams[key]); // Cập nhật giá trị vào URL
        }
    });

    // Cập nhật URL & reload trang
    // window.location.search = params.toString();

    // Cập nhật URL mà không reload trang
    const newURL = `${window.location.pathname}?${params.toString()}`;
    history.pushState(null, '', newURL);
}


async function consoleGetBook() {
    const filterPrice = document.querySelectorAll('.filter-group__inputs .input-wraper');
    const minPrice = filterPrice[0].querySelector('input').value.replace(/[^\d]/g, "") || "0";
    const maxPrice = filterPrice[1].querySelector('input').value.replace(/[^\d]/g, "") || "1000000";

    const orderBy = document.getElementById('sort-combobox').value;
    const pageShowBy = document.getElementById('page-show-by').value;

    const URLParams = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        order: orderBy || '',
        nameAuthor: '',
        nameCategory: '',
        nameCover: '',
        namePublisher: '',
        publishYear: ''
    };

    updatefilterBookURL(URLParams);

    try {
        const queryString = new URLSearchParams(URLParams).toString();
        const response = await fetch(`public/handle/book.php?${queryString}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        console.log("Response Text:", text);

        try {
            const datas = JSON.parse(text);
            console.log(datas);
        } catch (jsonError) {
            console.error("Lỗi khi parse JSON:", jsonError);
        }

    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
    }
}

