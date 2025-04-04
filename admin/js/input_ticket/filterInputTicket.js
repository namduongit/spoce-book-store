import { fetchData } from "../../../public/js/book/getDataBook.js";
import { renderInputTicketTable } from "./renderInputTicketTable.js";


let curentpage = 1;

//  lọc
export async function filterInputTicket(pageIsSelected = 1){
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
  
    let limit = (show !== '' && show !== 'mặc định') ? Number(show) : 2;
    let page = Number(pageIsSelected) || 1;
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
            await renderInputTicketTable(1);        
        });
    }

}


async function paginationInputTicket(limit) {
    // console.log("khangg");
    //   let allInputTicket = await fetchData(`api/input_ticket/get.php`);
    //   let inputTicketCount = allInputTicket.length;
    //   let pageCount = Math.ceil(inputTicketCount / limit);
      let pagination_container = document.querySelector("#main__pagination_input-ticket");
  
      pagination_container.innerHTML = ''; 
  
      let prevButton = document.createElement("button");
      prevButton.classList.add("main-pagination__button", "previous");
      prevButton.innerHTML = '<i class="icon fa-solid fa-chevron-left"></i>';
      pagination_container.appendChild(prevButton);
  
    //   console.log(pageCount);

      for (let i = 1; i <= limit; i++) {
        let pageButton = document.createElement("button");
        pageButton.classList.add("main-pagination__button");
        pageButton.textContent = i;
  
        pageButton.addEventListener("click", function () {
          console.log(`Page ${i} clicked`);
          renderInputTicketTable(i);
        });
  
        pagination_container.appendChild(pageButton);
      }
  
      let nextButton = document.createElement("button");
      nextButton.classList.add("main-pagination__button", "next");
      nextButton.innerHTML = '<i class="icon fa-solid fa-chevron-right"></i>';
      pagination_container.appendChild(nextButton);
  }
  
