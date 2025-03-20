import { formatMoney, getNameAuthorByID } from "../book/getDataBook.js";
import { showConfirmationDialog } from "../question.js";


function toggleInfoMenuFilter(classList, classContent) {
    document.addEventListener("DOMContentLoaded", function() {
        const showListAuthor = document.querySelector(`.${classList}`);
        let lastHTML = showListAuthor.innerHTML;

        showListAuthor.addEventListener('click', function(event) {
            event.preventDefault();
            if (showListAuthor.classList.contains('show-more')) {
                showListAuthor.innerHTML =`
                    <a href="#">Ẩn bớt</a>
                    <i class="fa-solid fa-chevron-up"></i>
                `;
                showListAuthor.classList.remove('show-more');
                document.querySelectorAll(`.${classContent} .hide-item`).forEach(
                    element => {
                        element.classList.remove('hide-item');
                        element.classList.add('temp-item');
                    }
                );
            } else {
                showListAuthor.innerHTML = lastHTML;
                showListAuthor.classList.add('show-more');
                document.querySelectorAll(`.${classContent} .temp-item`).forEach(
                    element => {
                        element.classList.remove('temp-item');
                        element.classList.add('hide-item');
                    }
                )
            }
        });
    });
}

toggleInfoMenuFilter('show-list-author', 'list-author-content');
toggleInfoMenuFilter('show-list-publisher', 'list-publisher-content');
toggleInfoMenuFilter('show-list-cover', 'list-cover-content');

// Hiển thị sản phẩm trong khi nhập. Tạo Popup hiển thị sản phẩm phí dưới chỗ nhập tìm kiếm
let searchTimeOut;

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.header__search-input').addEventListener("input", function() {
        clearTimeout(searchTimeOut);

        searchTimeOut = setTimeout(() => {
            let query = this.value.trim();
            if (query.length > 0) {
                searchProduct(query);
            }
            else {
                document.querySelector('.result-search .result-search__wrapper').innerHTML = '';
            }
        }, 300);
    });

    // Ấn ẩn hiển thị thông tin
    document.querySelector("#close-result-search").addEventListener("click", function() {
        document.querySelector(".result-search").style.display = "none";
    });

});


function searchProduct(query) {
    fetch(`api/books/get.php?bookName=${query}`)
    .then(response => response.json())
    .then(data => {
        displayProduct(data);
    })
    .catch(error => console.log("Lỗi tìm kiếm: "+ error));
}
async function displayProduct(data) {
    const searchResult = document.querySelector('.result-search .result-search__wrapper');

    if (!data || !Array.isArray(data) || data.length === 0) {
        searchResult.querySelector('.result-search__wrapper-title').innerHTML =
            `Kết quả tìm kiếm: <strong>0 sản phẩm</strong>`;
        searchResult.querySelector('.result-search__list').innerHTML = '';
        document.querySelector('.result-search').style.height = 'fit-content';
        return;
    }

    searchResult.querySelector('.result-search__wrapper-title').innerHTML =
        `Kết quả tìm kiếm: <strong>${data.length} sản phẩm</strong>`;

    // Tạo danh sách Promise để gọi API song song
    let authorPromises = data.map(item =>
        fetch(`api/authors/get.php?authorId=${item['authorId']}`)
            .then(response => response.json())
            .then(authorData => authorData[0] || { name: "Không xác định" })
            .catch(() => ({ name: "Không xác định" })) // Trả về giá trị mặc định nếu lỗi
    );

    let authors = await Promise.all(authorPromises); // Đợi tất cả API hoàn thành cùng lúc

    let HTMLBookList = data.map((element, index) => {
        let author = authors[index]; // Lấy dữ liệu tác giả tương ứng

        let statusProduct = element['status'];
        let className = (statusProduct === 'Còn hàng')
            ? 'book-category__item-status--true'
            : 'book-category__item-status--false';

        return `
            <div class="result-search__item" onclick="showDetailProduct(${element['id']})">
                <img class="result-search__item-image" src="public/uploads/${element['image']}" alt="Sản phẩm">

                <div class="result-search__item-info">
                    <h3 class="result-search__item-name"><strong>${element.name}</strong></h3>
                    <h3 class="result-search__item-author">Tác giả: <strong>${author.name}</strong></h3>
                    <p class="result-search__item-desc">Mô tả: ${element['description']}</p>
                    <p class="result-search__item-price">Giá: ${formatMoney(element['sellingPrice'])}</p>
                    <span class="result-search__item-status ${className}">Trạng thái: ${statusProduct}</span>
                </div>
            </div>
        `;
    }).join("");

    searchResult.querySelector('.result-search__list').innerHTML = HTMLBookList;
    document.querySelector('.result-search').style.height = '45rem';
    document.querySelector('.result-search').style.display = 'block';
}



// async function handleConfirmation() {
//     const result = await showConfirmationDialog('Bạn có chắc không?');
//     console.log('Người dùng chọn:', result);
// }
// handleConfirmation();

