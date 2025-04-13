
import { renderAuthorTable } from "./renderAuthorTable.js";


let curentpage = 1;

//  lọc
export async function filterAuthor(){
    let id = document.querySelector("#find-inp-author").value.toLowerCase().trim();
    let sort = document.querySelector("#sort-slt-author").value.toLowerCase().trim();
    let authorStatus = document.querySelector("#status-slt-author").value.trim();
    let show = document.querySelector("#show-slt-author").value.toLowerCase().trim();

    let authorId = id !== '' ? id : '';
    let orderBy = 'maTacGia', orderType = 'ASC';

    switch (sort.toLowerCase()) {
        case 'id giảm dần': orderType = 'DESC'; break;
        case 'tên tác giả tăng dần': orderBy = 'tenTacGia'; break;
        case 'tên tác giả giảm dần': orderBy = 'tenTacGia'; orderType = 'DESC'; break;
        
    }


    let status = authorStatus !== 'Tất cả' ? authorStatus : '';

    let limit = (show !== '' && show !== 'mặc định') ? Number(show) : 5;
    let page = Number(curentpage) || 1;
    let offset = (page - 1) * limit;

    let params = new URLSearchParams();
    if (authorId) params.append("id_or_Name", authorId);
    if (orderBy) params.append("orderByColumn", orderBy);
    if (orderType) params.append("orderType", orderType);
    if (status) params.append("status", status);
    params.append("limit", limit);
    params.append("offset", offset);

    
    let url = `api/authors/getAuthor.php?${params.toString()}`;
    console.log("Request URL:", url);
    
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
        }
        
        let data = await response.json();
        console.log("Dữ liệu nhận được:", data);
        await paginationAuthor(data.pageCount);
        return data.authorList;

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        alert("Lỗi khi lấy dữ liệu: " + error.message);
        return [];
    }

}


//  themee sự kiện btn lọc
export function filterAuthorData() {
    const filterButton = document.querySelector("#filter-button-author");
    
    if (filterButton) {
        filterButton. addEventListener("click", async (e)=> {
            e.preventDefault();
            curentpage = 1;     
            await renderAuthorTable(1);   
        });
    }

}


async function paginationAuthor(pageCount) {
    if(pageCount > 1){

        let pagination_container = document.querySelector("#main__pagination_author");
    
        pagination_container.innerHTML = ''; 
    
        let prevButton = document.createElement("button");
        prevButton.classList.add("main-pagination__button", "previous");
        prevButton.innerHTML = '<i class="icon fa-solid fa-chevron-left"></i>';
        prevButton.addEventListener("click", function(){
          if(curentpage > 1){
            curentpage -= 1;
            renderAuthorTable();
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
            renderAuthorTable(i);
          });
    
          pagination_container.appendChild(pageButton);
        }
    
        let nextButton = document.createElement("button");
        nextButton.classList.add("main-pagination__button", "next");
        nextButton.innerHTML = '<i class="icon fa-solid fa-chevron-right"></i>';
        nextButton.addEventListener("click", function(){
          if(curentpage < pageCount){
            curentpage += 1;
            renderAuthorTable();
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
          // Chèn vào vị trí thứ 3
          buttonsContainer.insertBefore(newButton, allButtons[2]);
  
      }
      if(curentpage < pageCount - 2){
          for(let i = pageCount - 1; i > curentpage +1; i--){
              allButtons[i].style.display = "none";
          }
          const newButton = document.createElement("button");
          newButton.classList.add("main-pagination__button");
          newButton.textContent = ".....";

          buttonsContainer.insertBefore(newButton, allButtons[pageCount - 1]);
  
      }
    }else{
        let pagination_container = document.querySelector("#main__pagination_author");
        pagination_container.innerHTML = '';
    }
}
  
