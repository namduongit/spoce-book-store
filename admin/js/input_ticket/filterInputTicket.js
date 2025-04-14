import { fetchData } from "../../../public/js/book/getDataBook.js";
import { renderInputTicketTable } from "./renderInputTicketTable.js";


let curentpage = 1;

//  lọc
export async function filterInputTicket(){
    let id = document.querySelector("#find-inp-input_ticket").value.toLowerCase().trim();
    let sort = document.querySelector("#sort-slt-input_ticket").value;
    let beforeDate = document.querySelector("#find-date-create-before-inp-input_ticket").value.toLowerCase().trim();
    let afterDate = document.querySelector("#find-date-create-after-inp-input_ticket").value.toLowerCase().trim();
    let statusInputticket = document.querySelector("#status-slt-input_ticket").value.trim();
    let show = document.querySelector("#show-slt-input_ticket").value.toLowerCase().trim();

    let inputTicketId = id !== '' ? id : '';
    let orderBy = 'maPhieuNhap', orderType = 'ASC';

    switch (sort.toLowerCase()) {
        case 'id giảm dần': orderType = 'DESC'; break;
        case 'nhà cung cấp tăng dần': orderBy = 'tenNCC'; break;
        case 'nhà cung cấp giảm dần': orderBy = 'tenNCC'; orderType = 'DESC'; break;
        case 'ngày lập phiếu tăng dần': orderBy = 'ngayTaoPhieu'; break;
        case 'ngày lập phiếu giảm dần': orderBy = 'ngayTaoPhieu'; orderType = 'DESC'; break;
        case 'tổng tiền nhập tăng dần': orderBy = 'tongTienNhap'; break;
        case 'tổng tiền nhập giảm dần': orderBy = 'tongTienNhap'; orderType = 'DESC'; break;
    }

    let status = statusInputticket !== 'Tất cả' ? statusInputticket : '';

    let startDate = beforeDate !== '' ? beforeDate : '';
    let endDate = afterDate !== '' ? afterDate : '';
  
    let limit = (show !== '' && show !== 'mặc định') ? Number(show) : 5;
    let page = Number(curentpage) || 1;
    let offset = (page - 1) * limit;

    let params = new URLSearchParams();
    if (inputTicketId) params.append("inputTicketId", inputTicketId);
    if (orderBy) params.append("orderByColumn", orderBy);
    if (orderType) params.append("orderType", orderType);
    if (status) params.append("inputTicketStatus", status);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    params.append("limit", limit);
    params.append("offset", offset);

    
    let url = `api/input_ticket/getInputTicket.php?${params.toString()}`;
    console.log("Request URL:", url);
    
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
        }
        
        let data = await response.json();
        console.log("Dữ liệu nhận được:", data);
        await paginationInputTicket(data.pageCount);
        return data.inputTicketList;

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        alert("Lỗi khi lấy dữ liệu: " + error.message);
        return [];
    }

}


//  themee sự kiện btn lọc
export function filterInputTicketData() {
    const filterButton = document.querySelector("#filter-button-input_ticket");
    
    if (filterButton) {
        filterButton. addEventListener("click", async (e)=> {
            e.preventDefault();
            curentpage = 1;     
            await renderInputTicketTable(1);   
        });
    }

}


async function paginationInputTicket(pageCount) {
    if(pageCount > 1){

        let pagination_container = document.querySelector("#main__pagination_input-ticket");
    
        pagination_container.innerHTML = ''; 
    
        let prevButton = document.createElement("button");
        prevButton.classList.add("main-pagination__button", "previous");
        prevButton.innerHTML = '<i class="icon fa-solid fa-chevron-left"></i>';
        prevButton.addEventListener("click", function(){
          if(curentpage > 1){
              curentpage -= 1;
              renderInputTicketTable();
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
            renderInputTicketTable(i);
          });
    
          pagination_container.appendChild(pageButton);
        }
    
        let nextButton = document.createElement("button");
        nextButton.classList.add("main-pagination__button", "next");
        nextButton.innerHTML = '<i class="icon fa-solid fa-chevron-right"></i>';
        nextButton.addEventListener("click", function(){
          if(curentpage < pageCount){
              curentpage += 1;
              renderInputTicketTable();
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
          newButton.textContent = "...";
          // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
          buttonsContainer.insertBefore(newButton, allButtons[2]);
  
      }
      if(curentpage < pageCount - 2){
          for(let i = pageCount - 1; i > curentpage +1; i--){
              allButtons[i].style.display = "none";
          }
          const newButton = document.createElement("button");
          newButton.classList.add("main-pagination__button");
          newButton.textContent = "...";
          // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
          buttonsContainer.insertBefore(newButton, allButtons[pageCount - 1]);
  
      }
    }else{
        let pagination_container = document.querySelector("#main__pagination_input-ticket");
        pagination_container.innerHTML = '';
    }
}
  
