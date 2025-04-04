import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";
import { getAllSupplierData } from "../../js/supplies/renderSuppliesTable.js";


import {
  vietnamMoneyFormat,
  clickToShowDatePicker,
  defaultDateSelected,
} from "../others.js";

const data = [
  // {
  //   bookId: "SP00001",
  //   bookName: "Tên sách 1", // Thực tế phải truy vấn để lấy ra tiêu đề sách
  //   priceBase: 200000,
  //   priceInput: 350000,
  //   quantityInput: 2,
  // },
  // {
  //   bookId: "SP00005",
  //   bookName: "Tên sách 5",
  //   priceBase: 228000,
  //   priceInput: 400000,
  //   quantityInput: 10,
  // },
];

// Hàm cập nhật lại dữ liệu cho bảng Chi tiết phiếu nhập
function renderInputTicketDetailTable() {
  // Biến chứa đối tượng bảng Chi tiết phiếu nhập
  const bodyIninput_ticketDetailTable = document.querySelector(
    ".dialog__form-group > table > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
    total += Number(data[i].priceInput) * Number(data[i].quantityInput);
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += Number(data[i].priceInput) * Number(data[i].quantityInput);
    html += `
          <tr>
              <td>${data[i].bookId}</td>
              <td class="name">${data[i].bookName}</td>
              <td>${vietnamMoneyFormat(data[i].priceBase)}</td>
              <td>${vietnamMoneyFormat(data[i].priceInput)}</td>
              <td>${data[i].quantityInput}</td>
              <td class="total">${vietnamMoneyFormat(
                data[i].quantityInput * data[i].priceInput
              )}</td>
              <td>
                <i id="update-remove-trash-input_ticket" class="fa-solid fa-trash remove-icon" data-index="${i}"
                  style="color: red; text-align: center;">
                </i>
              </td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyIninput_ticketDetailTable.innerHTML = html;

  let totalElement = document.querySelector("#add-input_ticket-cost");
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
async function addInputTicketDetailTable() {
  // Tạo một dialog để thêm một sách cho chi tiết phiếu
  const addDetailDialog = document.createElement("dialog");
  // - Định dạng dialog
  addDetailDialog.classList.add("dialog");
  addDetailDialog.classList.add("input_ticket-detail");
  addDetailDialog.style.width = "464px";
  // - Ghi nội dung dialog
  addDetailDialog.innerHTML = `
    <button id="close-input_ticket-detail-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__row">
      <div class="dialog__form-group">
          <label>Mã sách</label>
          <select id="add-input_ticket-detail-id">
            <option value="" selected>Chọn Mã sách</option>
          </select>
      </div>
      <div class="dialog__form-group">
          <label>Giá bìa (VNĐ)</label>
          <input type="text" id="add-input_ticket-detail-price-base" value="" readonly />
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Tên sách</label>
        <input type="text" id="add-input_ticket-detail-name" value="" readonly />
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group">
        <label>Giá nhập (VNĐ)</label>
        <input type="text" id="add-input_ticket-detail-price-input" placeholder="Nhập Giá nhập (VNĐ)" />
      </div>
      <div class="dialog__form-group">
        <label>Số lượng</label>
        <input type="text" id="add-input_ticket-detail-quantity-input" placeholder="Nhập Số lượng" />
      </div>
    </div>
    <div class="dialog__buttons">
      <button id="add-input_ticket-detail-button" class="yes">Đồng ý</button>
    </div>
  `;

  // Thêm vào body
  document.body.appendChild(addDetailDialog);

  // Hiển thị addDetailDialog
  addDetailDialog.showModal();


  // get sachs
  const bookList = await fetchData(`api/books/getbook.php`);

  let html = ``;
  bookList.forEach(book => {
    html += `<option value="${book.id}">${book.id} - ${book.name} </option>`;
  });
  const selectElementBokID = document.querySelector("#add-input_ticket-detail-id");
  selectElementBokID.innerHTML += html;

  selectElementBokID.addEventListener("change", async function () {
    const bookId = this.value;
    const book = await fetchData(`api/books/get.php?bookID=${bookId}`);
    const cover = await fetchData(`api/covers/get.php?coverId=${book.books[0].genreId}`);
    document.querySelector("#add-input_ticket-detail-name").value = book.books[0].name;
    document.querySelector("#add-input_ticket-detail-price-base").value = cover[0].price;

  });


  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-input_ticket-detail-button")
    .addEventListener("click", () => {
      // Xoá dialog
      addDetailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      addDetailDialog.classList.remove("active");
    });
  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("add-input_ticket-detail-button")
    .addEventListener("click", () => {
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const id = document.getElementById("add-input_ticket-detail-id");
      const name = document.getElementById("add-input_ticket-detail-name");
      const priceBase = document.getElementById( "add-input_ticket-detail-price-base" );
      const priceInput = document.getElementById( "add-input_ticket-detail-price-input" );
      const quantityInput = document.getElementById( "add-input_ticket-detail-quantity-input" );

      // ... xử lý (chưa kiểm tra tính hợp lệ)
        let isExists = false;
        for (let i = 0; i < data.length; i++) {
          isExists = false;
          if (data[i].bookId == id.value) {
            isExists = true;
            break;
          }
        }
       
        if(isExists){
          alert("Sách này đã được thêm");
        }else{
          if(id.value == '' || name.value == '' || priceInput.value =='' || quantityInput.value ==''){
            alert("hãy điền đủ thong tin");
          }else{
            data.push({
              bookId: id.value,
              bookName: name.value,
              priceBase: Number(priceBase.value),
              priceInput: Number(priceInput.value),
              quantityInput: Number(quantityInput.value),
            });
          }
        }
      

      // Cập nhật lại giao diện hiển thị
      renderInputTicketDetailTable();

      // Xoá dialog
      addDetailDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      addDetailDialog.classList.remove("active");
    });
}

// Hàm thiết lập sự kiện hiện thêm một phiếu nhập
export function addInputTicketData() {
  // Biến chứa đối tượng là nút "thêm"
  const addButton = document.getElementById("add-button-input_ticket");

  //
  addButton.addEventListener("click", async (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một phiếu nhập
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("input_ticket");
    addDialog.style.width = "1146px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
          <h1 class="dialog__title">Thêm phiếu nhập</h1>
          <button id="close-input_ticket-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form method="post" class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket half">
                <label>Mã phiếu nhập</label>
                <input type="text" id="update-input_ticket-id" readonly />
              </div>
              <div class="dialog__form-group input_ticket half">
                <label>Mã nhân viên</label>
                <input type="text" id="update-input_ticket-customer" value="namduongit" readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Tổng thanh toán (VNĐ)</label>
                <input type="text" id="add-input_ticket-cost" value="0" readonly />
              </div>
              <div class="dialog__form-group input_ticket">
                <label>Trạng thái</label>
                <input type="text" id="add-input_ticket-status" value="CHO_XAC_NHAN" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group input_ticket half">
                <label>Ngày tạo phiếu</label>
                <input type="date" id="add-input_ticket-date-create" />
              </div>
              <div class="dialog__form-group input_ticket half">
                <label>Ngày hợp đồng</label>
                <input type="date" id="add-input_ticket-date-contract" />
              </div>
              <div class="dialog__form-group input_ticket full">
                <label>Nhà cung cấp</label>
                <select id="add-input_ticket-suplier">
                  <option value="" selected>Chọn Nhà cung cấp</option>

                </select>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label style="color: #000;">Chi tiết phiếu nhập</label>
                <button id="add-button-input_ticket-detail"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Sách</button>
                <table>
                  <thead>
                    <tr>  
                      <th width="8%">Mã sách</th>
                      <th width="28%">Tên sách</th>
                      <th width="14%">Giá bìa (VNĐ)</th>
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
            <div class="dialog__buttons">
              <button id="add-input_ticket-button" class="add">Thêm</button>
            </div>
          </form >
    `;

    // Thêm vào body
    document.body.appendChild(addDialog);


    
      let suplierList = await getAllSupplierData();
      let htmlSuplier = ``;
      suplierList.forEach(suplier =>{
        htmlSuplier +=`<option value="${suplier.id}">${suplier.name}</option>`;
      });
    
      document.querySelector("#add-input_ticket-suplier").innerHTML +=htmlSuplier;
    
    

    // Hiển thị addDialog
    addDialog.showModal();

    // Sự kiện cho các thành phần trong dialog
    // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
    const selectElement = document.querySelectorAll(
      ".dialog__form-group > select"
    );
    selectElement.forEach((select) => {
      isNotFirstItemSelected(select);
    });
    // -
    clickToShowDatePicker("add-input_ticket-date-create");
    clickToShowDatePicker("add-input_ticket-date-contract");
    defaultDateSelected("add-input_ticket-date-create");
    defaultDateSelected("add-input_ticket-date-contract");
    // - Nút hiển thị dialog cho phép thêm một sách cho chi tiết phiếu
    const addDetailButton = document.getElementById(
      "add-button-input_ticket-detail"
    );
    addDetailButton.addEventListener("click", (e) => {
      // - Loại bỏ giá trị mặc định
      e.preventDefault();

      // -
      addInputTicketDetailTable();
    });
    // -
    renderInputTicketDetailTable();

    // sự kiện nhấn thêm pn
    document.querySelector("#add-input_ticket-button").
    addEventListener("click", async (e) => {
      e.preventDefault();
      let idInputTicket = -1;
      let checkAddInputTicket = false;
      try {
        const dateCreate = document.querySelector("#add-input_ticket-date-create").value;
        const employeeName = document.querySelector("#update-input_ticket-customer").value;
        const status = document.querySelector("#add-input_ticket-status").value;
        const suplierId = document.querySelector("#add-input_ticket-suplier").value;
        const totalPrice = document.querySelector("#add-input_ticket-cost").value;

        const response = await fetch("api/input_ticket/create.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            dateCreate:dateCreate,
            employeeName: employeeName,
            totalPrice: totalPrice,
            suplierId: suplierId,
            status:status,

          }),
        });
        
        const result = await response.json();
        console.log("Server Response:", result);
        
        if (result.success) {
          idInputTicket = result.inputTicketId;
          checkAddInputTicket = true;
          // alert("thêm phiếu nhập thành công!");
        } else {
          checkAddInputTicket = false;
          alert("Lỗi thêm phiếu nhập: " + (result.message || "Không rõ nguyên nhân"));
        }
      } catch (error) {
        console.error("Lỗi fetch API:", error);
        // alert("Không thể kết nối đến server!");
      }
console.log(idInputTicket);
      // nếu thêm thành công
      if(checkAddInputTicket && idInputTicket != -1){
        
        let check = false;
        data.forEach(async detail =>{
          try {
            const response = await fetch("api/input_ticket_detail/create.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                inputTicketId: idInputTicket,
                bookId: detail.bookId,
                inputPrice: detail.priceInput,
                quantity : detail.quantityInput,
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
          alert("thêm phiêu nhập thành công");
        }else{
          alert("thêm không thành công");
        }
      }


    });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-input_ticket-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
