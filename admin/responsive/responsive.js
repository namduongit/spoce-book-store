export function updateTableLabelRevenue_dashboard() {
    if (window.innerWidth < 750) {
        let TK_DoanhThu = document.querySelector(".main__table.dashboard.revenue_dashboard");
        let TK_LoiNhuan = document.querySelector(".main__table.dashboard.profit_dashboard");
        console.log("kahng");
        if (TK_DoanhThu || TK_LoiNhuan) {
            let labelRow1 = "Tháng";
            const inputTimeLineDoanhThu = document.querySelector("#status-slt-revenue_dashboard");
            const inputTimeLineLoiNhuan = document.querySelector("#status-slt-profit_dashboard");
            
            if ((inputTimeLineLoiNhuan && inputTimeLineLoiNhuan.value !== "Lọc theo năm") || 
                (inputTimeLineDoanhThu && inputTimeLineDoanhThu.value !== "Lọc theo năm")  ) 
            {
                labelRow1 = "Tuần";
            }
            const firstCells = document.querySelectorAll("tbody tr td:first-of-type");
            console.log(firstCells.length);
            firstCells.forEach(td => {
                td.setAttribute("data-label", labelRow1);
            });
        }
    }
}


export function showOrHideMainContent() {
    let main__content = document.querySelector(".main__content");
    let sideBar_hide = document.querySelector(".sidebar.hide");
    if (window.innerWidth < 600) {
        if(!sideBar_hide){
            main__content.style.display = "none";
        }else{
        main__content.style.display = "block";
        }
    } else {
        main__content.style.display = "block";
    }
}

window.addEventListener("resize", showOrHideMainContent);
document.addEventListener("DOMContentLoaded", showOrHideMainContent); 



