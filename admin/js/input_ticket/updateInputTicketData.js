import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";


import {
  vietnamMoneyFormat,
  clickToShowDatePicker,
  defaultDateSelected,
} from "../others.js";

let data = [] ;

export async function getAllInputTicketDetailById(inputTicketId){
  let url = `api/input_ticket_detail/get.php?inputTicketId=${inputTicketId}`;
  console.log("Request URL:", url);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
      }
      let data = await response.json();
      console.log("Dữ liệu nhận được:", data);
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      alert("Lỗi khi lấy dữ liệu: " + error.message);
      return [];
    }
}
function renderInputTicketDetailTable() {
  const bodyInInputTicketDetailTable = document.querySelector(".dialog__form-group > table > tbody");

  let html = ``;
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += Number(data[i].inputPrice) * Number(data[i].quantity);

    html += `
          <tr>
              <td>${data[i].bookId}</td>
              <td class="name">${data[i].bookName}</td>
              <td>${vietnamMoneyFormat(data[i].basePrice)}</td>
              <td>${vietnamMoneyFormat(data[i].inputPrice)}</td>
              <td>${data[i].quantity}</td>
              <td class="total">${vietnamMoneyFormat(data[i].quantity * data[i].inputPrice)}</td>
              <td>
                <i class="fa-solid fa-trash remove-icon" data-index="${i}"
                  style="color: red; text-align: center;">
                </i>
              </td>
          </tr>
      `;
  }

  // Cập nhật bảng
  bodyInInputTicketDetailTable.innerHTML = html;


  let totalElement = document.querySelector("#update-input_ticket-cost");
  if(totalElement){
    totalElement.value = total;
  }

  // Sau khi cập nhật bảng, mới thêm sự kiện
  let removeList = document.querySelectorAll(".remove-icon");
  removeList.forEach((removeIcon) => {
    removeIcon.addEventListener("click", () => {
      let index = removeIcon.getAttribute("data-index"); // Lấy index từ thuộc tính data
      data.splice(index, 1); // Xóa phần tử khỏi mảng
      renderInputTicketDetailTable(); // Cập nhật lại bảng sau khi xóa
    });
  });
}


// Hàm thiết lập sự kiện thêm sách cho chi tiết phiếu
async function updateInputTicketDetailTable() {
  // Tạo một dialog để thêm một sách cho chi tiết phiếu
  const updateDetailDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDetailDialog.classList.add("dialog");
  updateDetailDialog.classList.add("input_ticket-detail");
  updateDetailDialog.style.width = "464px";
  // - Ghi nội dung dialog
  updateDetailDialog.innerHTML = `
    <button id="close-input_ticket-detail-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__row">
      <div class="dialog__form-group">
          <label>Mã sách</label>
          <select id="update-input_ticket-detail-id">
            <option value="" selected>Chọn Mã sách</option>
            <option value="SA00001">SA00001</option>
            <option value="SA00002">SA00002</option>
          </select>
      </div>
      <div class="dialog__form-group">
          <label>Giá gốc (VNĐ)</label>
          <input type="text" id="update-input_ticket-detail-price-base" value="" readonly />
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Tên sách</label>
        <input type="text" id="update-input_ticket-detail-name" value="" readonly />
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group">
        <label>Giá nhập (VNĐ)</label>
        <input type="text" id="update-input_ticket-detail-price-input" placeholder="Nhập Giá nhập (VNĐ)" />
      </div>
      <div class="dialog__form-group">
        <label>Số lượng</label>
        <input type="text" id="update-input_ticket-detail-quantity-input" placeholder="Nhập Số lượng" />
      </div>
    </div>
    <div class="dialog__buttons">
      <button id="update-input_ticket-detail-button" class="yes">Đồng ý</button>
    </div>
  `;

  // Thêm vào body
  document.body.appendChild(updateDetailDialog);

  // Hiển thị updateDetailDialog
  updateDetailDialog.showModal();

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-input_ticket-detail-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDetailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateDetailDialog.classList.remove("active");
    });


      // get sachs
      const bookList = await fetchData(`api/books/getbook.php`);

      let html = ``;
      bookList.bookList.forEach(book => {
        html += `<option value="${book.id}">${book.id} - ${book.name} </option>`;
      });
    
      const selectElement = document.querySelector("#update-input_ticket-detail-id");
      selectElement.innerHTML = html;
    
      selectElement.addEventListener("change", async function () {
        const bookId = this.value;
        const book = await fetchData(`api/books/get.php?bookID=${bookId}`);
        document.querySelector("#update-input_ticket-detail-name").value = book.books[0].name;
        document.querySelector("#update-input_ticket-detail-price-base").value = book.books[0].originalPrice;
    
      });
      
      

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("update-input_ticket-detail-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const id = document.getElementById("update-input_ticket-detail-id");
      const name = document.getElementById("update-input_ticket-detail-name");
      const priceBase = document.getElementById(
        "update-input_ticket-detail-price-base"
      );
      const priceInput = document.getElementById(
        "update-input_ticket-detail-price-input"
      );
      const quantityInput = document.getElementById(
        "update-input_ticket-detail-quantity-input"
      );

      // ... xử lý (chưa kiểm tra tính hợp lệ)
      let isExists = false;
      for (let i = 0; i < data.length; i++) {
          isExists = false;
          if (data[i].id == id.value) {
            isExists = true;
            break;
          }
        }
        if (isExists) {
          alert("Sách này đã được thêm");
        } else {
          if(id.value == '' || name.value == '' || priceInput.value =='' || quantityInput.value ==''){
            alert("hãy điền đủ thong tin");
          }else{
            data.push({
              bookId: id.value,
              bookName: name.value,
              basePrice: Number(priceBase.value),
              inputPrice: Number(priceInput.value),
              quantity: Number(quantityInput.value),
            });
          }
        }


      // Cập nhật lại giao diện hiển thị
      renderInputTicketDetailTable();

      // Xoá dialog
      updateDetailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateDetailDialog.classList.remove("active");
    });
}

// Hàm thiết lập sự kiện hiện thêm một phiếu nhập
export async function updateInputTicketData(idInputTicketSelected) {
  // Phải truy vấn từ CSDL thông qua idInputTicketSelected để lấy được dữ liệu của đối tượng hiện tại
  let detailList = await getAllInputTicketDetailById(idInputTicketSelected);
  data = detailList.allDetail;
  // Biến chứa đối tượng là nút "thêm"
  const updateButton = document.getElementById("update-button-input_ticket");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để thêm một phiếu nhập
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("input_ticket");
  updateDialog.style.width = "1146px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <h1 class="dialog__title">Sửa phiếu nhập</h1>
          <button id="close-input_ticket-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form method="post" class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket half">
                <label>Mã phiếu nhập</label>
                <input type="text" id="update-input_ticket-id" value="${detailList.inputTicketId}" readonly />
              </div>
              <div class="dialog__form-group input_ticket half">
                <label>Mã nhân viên</label>
                <input type="text" id="update-input_ticket-customer" value="${detailList.employeeUserName}" readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Tổng thanh toán (VNĐ)</label>
                <input type="text" id="update-input_ticket-cost" value="${detailList.total}" readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Trạng thái</label>
                <input type="text" id="update-input_ticket-status" value="${detailList.status}" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket half">
                <label>Ngày tạo phiếu</label>
                <input type="date" id="update-input_ticket-date-create" value="${detailList.dateCreate}" class="hasValidDate" />
              </div>
              <div class="dialog__form-group input_ticket half">
                <label>Ngày hợp đồng</label>
                <input type="date" id="update-input_ticket-date-contract"  value="${detailList.dateCreate}"  class="hasValidDate"/>
              </div>
              <div class="dialog__form-group input_ticket full">
                <label>Nhà cung cấp</label>
                <select id="update-input_ticket-suplier" class="changed">
                  <option value="${detailList.suplierId}" selected> ${detailList.suplierName}</option>
                  
                </select>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label style="color: #000;">Chi tiết phiếu nhập</label>
                <button id="update-button-add-input_ticket-detail"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Sách</button>
                <table>
                  <thead>
                    <tr>  
                      <th width="8%">Mã sách</th>
                      <th width="28%">Tên sách</th>
                      <th width="14%">Giá gốc (VNĐ)</th>
                      <th width="14%">Giá nhập (VNĐ)</th>
                      <th width="10%">Số lượng</th>
                      <th width="22%">Thành tiền (VNĐ)</th>
                      <th width="4%"></th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="dialog__buttons input_ticket">
              <button class="confirm-status">Hoàn thành</button>
              <button class="cancel-status">Huỷ phiếu</button>
            </div>
          </form>
    `;

  // Thêm vào body
  document.body.appendChild(updateDialog);

  // Hiển thị updateDialog
  updateDialog.showModal();


  let suplierList =  await fetchData(`api/supplies/get.php`);
  let htmlSuplier = ``;
  suplierList.forEach(suplier =>{
    htmlSuplier +=`<option value="${suplier.id}">${suplier.name}</option>`;
  });

  document.querySelector("#update-input_ticket-suplier").innerHTML +=htmlSuplier;



  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });
  // -
  clickToShowDatePicker("update-input_ticket-date-create");
  clickToShowDatePicker("update-input_ticket-date-contract");
  defaultDateSelected("update-input_ticket-date-create");
  defaultDateSelected("update-input_ticket-date-contract");
  // - Nút hiển thị dialog cho phép thêm một sách cho chi tiết phiếu
  const addDetailButton = document.getElementById(
    "update-button-add-input_ticket-detail"
  );
  addDetailButton.addEventListener("click", (e) => {
    // - Loại bỏ giá trị mặc định
    e.preventDefault();

    // -
    updateInputTicketDetailTable();
  });
  // -
  renderInputTicketDetailTable();

  
  
  // Gán sự kiện cho nút hoàn thành

    document
    .querySelector(".confirm-status")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      //  update PNhapja
      try {
        const dateCreate = document.querySelector("#update-input_ticket-date-create").value;
        const suplierId = document.querySelector("#update-input_ticket-suplier").value;
        const totalPrice = document.querySelector("#update-input_ticket-cost").value;
        const status = document.querySelector("#update-input_ticket-status").value;
        const response = await fetch("api/input_ticket/update.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            inputTicketId: idInputTicketSelected,
            dateCreate: dateCreate,
            suplierId: suplierId,
            totalPrice: totalPrice,
            status: status,

          }),
        });
        
        const result = await response.json();
        console.log("Server Response:", result);
        
        if (result.success) {
          alert("update phiếu nhập thành công!");
        } else {
          alert("Lỗi cập nhật phiếu nhập: " + (result.message || "Không rõ nguyên nhân"));
        }
      } catch (error) {
        console.error("Lỗi fetch API:", error);
        // alert("Không thể kết nối đến server!");
      }


      // Xoá CTPN
      try {
        const response = await fetch("api/input_ticket_detail/delete.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            inputTicketId: idInputTicketSelected,
          }),
        });
        
        const result = await response.json();
        console.log("Server Response:", result);
        
        if (result.success) {
          // alert("xoá tất cả chi tiết phiếu nhập thành công!");
        } else {
          alert("Lỗi khi xoá các chi tiết phiếu nhập: " + (result.message || "Không rõ nguyên nhân"));
        }
      } catch (error) {
        console.error("Lỗi fetch API:", error);
        // alert("Không thể kết nối đến server!");
      }
      console.log("id pn", idInputTicketSelected);
      // Thêm CTPN
      let check = true;
      data.forEach(async detail =>{
        try {
          const response = await fetch("api/input_ticket_detail/create.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              inputTicketId: idInputTicketSelected,
              bookId: detail.bookId,
              inputPrice: detail.inputPrice,
              quantity : detail.quantity,
            }),
          });
          
          const result = await response.json();
          console.log("Server Response:", result);
          
          if (result.success) {
            check = true;
          } else {
            check = false;
          }
        } catch (error) {
          console.error("Lỗi fetch API:", error);
          alert("Không thể kết nối đến server!");
        }
      });
      if(check){
        alert("thêm các chi tiết thành công");
      }else{
        alert("Lỗithêm các chi tiết phiếu nhập: " + (result.message || "Không rõ nguyên nhân"));
      }
       // Xoá dialog
       updateDialog.remove();
       updateButton.classList.remove("active");
    
    });
  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-input_ticket-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });

    document
    .querySelector(".cancel-status")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });


}
