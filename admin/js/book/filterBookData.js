
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { renderBookTable } from "./renderBookTable.js";


let curentpage = 1;

//  lọc
export async function filterbook(pageIsSelected = 1){
    let id = document.querySelector("#find-inp-book").value.toLowerCase().trim();
    let sort = document.querySelector("#sort-slt-book").value.toLowerCase().trim();
    let categoryBook = document.querySelector("#type-slt-book").value.trim();
    let bookStatus = document.querySelector("#status-slt-book").value.trim();
    let show = document.querySelector("#show-slt-book").value.toLowerCase().trim();

    let bookId = id !== '' ? id : '';
    let orderBy = 'maSach', orderType = 'ASC';

    switch (sort.toLowerCase()) {
        case 'id giảm dần': orderType = 'DESC'; break;
        case 'tiêu đề tăng dần': orderBy = 'tenSach'; break;
        case 'tiêu đề giảm dần': orderBy = 'tenSach'; orderType = 'DESC'; break;
        case 'số lượng tăng dần': orderBy = 'soLuong'; break;
        case 'số lượng giảm dần': orderBy = 'soLuong'; orderType = 'DESC'; break;
        case 'thể loại tăng dần': orderBy = 'tenTheLoai'; break;
        case 'thể loại giảm dần': orderBy = 'tenTheLoai'; orderType = 'DESC'; break;
    }


    let status = bookStatus !== 'Tất cả' ? bookStatus : '';
    let category = categoryBook !== 'Tất cả' ? categoryBook : '';

    let limit = (show !== '' && show !== 'mặc định') ? Number(show) : 5;
    let page = Number(pageIsSelected) || 1;
    let offset = (page - 1) * limit;

    let params = new URLSearchParams();
    if (bookId) params.append("id_or_bookName", bookId);
    if (orderBy) params.append("orderByColumn", orderBy);
    if (orderType) params.append("orderType", orderType);
    if (category) params.append("category", category);
    if (status) params.append("status", status);
    params.append("limit", limit);
    params.append("offset", offset);

    
    let url = `api/books/getbook.php?${params.toString()}`;
    console.log("Request URL:", url);
    
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
        }
        
        let data = await response.json();
        console.log("Dữ liệu nhận được:", data);
        await paginationBook(data.pageCount);
        return data.bookList;

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        alert("Lỗi khi lấy dữ liệu: " + error.message);
        return [];
    }

}


//  themee sự kiện btn lọc
export function filterBookData() {
    const filterButton = document.querySelector("#filter-button-book");
    
    if (filterButton) {
        filterButton. addEventListener("click", async (e)=> {
            e.preventDefault();
            curentpage = 1;     
            await renderBookTable(1);   
        });
    }

}


async function paginationBook(pageCount) {
    if(pageCount > 1){

        let pagination_container = document.querySelector("#main__pagination_book");
    
        pagination_container.innerHTML = ''; 
    
        let prevButton = document.createElement("button");
        prevButton.classList.add("main-pagination__button", "previous");
        prevButton.innerHTML = '<i class="icon fa-solid fa-chevron-left"></i>';
        prevButton.addEventListener("click", function(){
          if(curentpage > 1){
            renderBookTable(curentpage - 1);
              curentpage -= 1;
          }
  
        });
        pagination_container.appendChild(prevButton);
    
      //   console.log(pageCount);
  
        for (let i = 1; i <= pageCount; i++) {
          let pageButton = document.createElement("button");
          pageButton.classList.add("main-pagination__button");
          pageButton.textContent = i;
    
          pageButton.addEventListener("click", function () {
            console.log(`Page ${i} clicked`);
            curentpage = i;
            renderBookTable(i);
          });
    
          pagination_container.appendChild(pageButton);
        }
    
        let nextButton = document.createElement("button");
        nextButton.classList.add("main-pagination__button", "next");
        nextButton.innerHTML = '<i class="icon fa-solid fa-chevron-right"></i>';
        nextButton.addEventListener("click", function(){
          if(curentpage < pageCount){
            renderBookTable(curentpage + 1);
              curentpage += 1;
          }
  
        });
        pagination_container.appendChild(nextButton);
  
      const curentpageButton = document.querySelector(`.main__pagination button:nth-child(${curentpage + 1})`);
      curentpageButton.classList.add("active");
  
      let allButtons = document.querySelectorAll('.main__pagination .main-pagination__button');
      let buttonsContainer = document.querySelector('.main__pagination');
      if(curentpage >= 4){
          for(let i = 2; i < curentpage -1; i++){
              allButtons[i].style.display = "none";
          }
  
          const newButton = document.createElement("button");
          newButton.classList.add("main-pagination__button");
          newButton.textContent = ".....";
          // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
          buttonsContainer.insertBefore(newButton, allButtons[2]);
  
      }
      if(curentpage < pageCount - 2){
          for(let i = pageCount - 1; i > curentpage +1; i--){
              allButtons[i].style.display = "none";
          }
          const newButton = document.createElement("button");
          newButton.classList.add("main-pagination__button");
          newButton.textContent = ".....";
          // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
          buttonsContainer.insertBefore(newButton, allButtons[pageCount - 1]);
  
      }
    }else{
        let pagination_container = document.querySelector("#main__pagination_book");
        pagination_container.innerHTML = '';
    }
}
  
