document.addEventListener("DOMContentLoaded", async function () {
    let allproduct = await getAllBookProduct();
    if (Array.isArray(allproduct)) {
        updateBookToMain(allproduct);
    } else {
        console.error("Dữ liệu allproduct không hợp lệ:", allproduct);
    }
});

// Hàm lấy dữ liệu từ API
async function getAllBookProduct() {
    try {
        let response = await fetch('api/books/get.php');

        if (!response.ok) {
            throw new Error('Lỗi khi lấy dữ liệu! HTTP Status: ' + response.status);
        }

        let data = await response.json();
        return data;
    } catch (error) {
        console.log('Lỗi lấy dữ liệu');
        return [];
    }
}

// Cập nhật giao diện với danh sách sách
function updateBookToMain(allproduct = []) {
    if (!Array.isArray(allproduct)) {
        console.log('Lỗi allProduct không phải là mảng')
        return;
    }

    const bookList = document.getElementById('book-list');
    bookList.innerHTML = "";

    allproduct.forEach(product => {
        let statusProduct = product['status'];
        let className = '';
        if (statusProduct === 'Còn hàng') {
            className = 'book-category__item-status--true';
        }
        else {
            className = 'book-category__item-status--false';
        }
        bookList.innerHTML += `
                <div class="book-category__item" onclick="showDetailProduct(${product['id']})">
                    <img src="public/uploads/${product['image']}" class="book-category__item-image"></img>
                    <div class="book-category__item-name">${product['name']}</div>
                    <div class="book-category-rate d-flex margin-top-small">
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div class="book-category__item-status ${className} margin-top-small">${statusProduct}</div>
                    <div class="book-category__item-price">${product['sellingPrice']}</div>
                    <div class="book-category__item-add-to-cart margin-top-small">
                        <i class="fa-solid fa-cart-plus book-category__item-button-icon"></i>
                        <span class="book-category__item-button-text">Thêm vào giỏ hàng</span>
                    </div>
                </div>
            `;
    });
}
