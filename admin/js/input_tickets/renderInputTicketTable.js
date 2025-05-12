import { fetchData } from "../../../public/js/book/getDataBook.js";
import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from "../../../public/js/toast.js";
import { vietnamMoneyFormat, onlyInputNumberChar } from "../others.js";
import { showNotification } from "../dialogMessage.js";
import { updateInputTicketData } from "./updateInputTicketData.js";
import { printInputTicket } from "./printInputTicket.js";
import { filterInputTicket } from "./filterInputTicket.js";

const data = JSON.parse(sessionStorage.getItem("dataRole"));

var infoInputTicket = data[10] && data[10].includes(2) ? "" : "none__item";
var editInputTicket = data[10] && data[10].includes(4) ? "" : "none__item";
var lockInputTicket = data[10] && data[10].includes(5) ? "" : "none__item";

// Hàm cập nhật tổng tiền nhập của phiếu
export function updateCurrentTotal(data) {
  let total = 0;
  data.forEach((item) => {
    total += item.price * item.quantity;
  });
  document.getElementById("input_ticket-total").value = `${vietnamMoneyFormat(
    total
  )}`;
}

// Hàm thiết lập sự kiện thêm sách cho chi tiết phiếu
export function updateInputTicketDetailTable(
  inputTicketId,
  inputTicketStatus,
  inputTicketDetails
) {
  // - Nút hiển thị dialog cho phép thêm một sách cho chi tiết phiếu
  const createDetailButton = document.getElementById(
    "create-input-ticket-detail"
  );
  if (createDetailButton) {
    createDetailButton.addEventListener("click", async (e) => {
      // - Loại bỏ giá trị mặc định
      e.preventDefault();

      // Tạo một dialog để thêm một sách cho chi tiết phiếu
      const createDetailDialog = document.createElement("dialog");
      // - Định dạng dialog
      createDetailDialog.classList.add("dialog");
      createDetailDialog.classList.add("input_ticket-detail");
      createDetailDialog.style.width = "60%";
      // - Ghi nội dung dialog
      createDetailDialog.innerHTML = `
        <h1 class="dialog__title">Thêm sách</h1>
        <button id="close-input_ticket-detail-button" class="dialog__close">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="dialog__line"></div>
        <form class="dialog__form" autocomplete="off">
          <div class="dialog__row">
            <div class="dialog__form-group full">
              <label>Sách (Mã sách - Tiêu đề - Giá trần (VNĐ))</label>
              <select id="create-input_ticket-detail-book"></select>
            </div>
          </div>
          <div class="dialog__row">
            <div class="dialog__form-group half">
              <label>Giá nhập (VNĐ)</label>
              <input type="text" id="create-input_ticket-detail-price" placeholder="Nhập Giá nhập (VNĐ)" />
            </div>
            <div class="dialog__form-group half">
              <label>Số lượng</label>
              <input type="text" id="create-input_ticket-detail-quantity" placeholder="Nhập Số lượng" />
            </div>
            <div class="dialog__form-group full">
              <label>Thành tiền (VNĐ)</label>
              <input type="text" id="create-input_ticket-detail-total" value="" readonly />
            </div>
          </div>
          <div class="dialog__buttons">
            <button type="button" id="create-input_ticket-detail-button" class="yes">Đồng ý</button>
          </div>
        </form>
      `;

      // Thêm vào body
      document.body.appendChild(createDetailDialog);

      // Hiển thị createDetailDialog
      createDetailDialog.showModal();

      // Cập nhật danh sách các sách và gán sự kiện
      const bookSelect = document.getElementById(
        "create-input_ticket-detail-book"
      );
      if (bookSelect) {
        bookSelect.innerHTML = `<option value="" selected>Chọn Sách </option>`;
        let books = await fetchData(`api/books/list.php?status=Đang%20bán`);
        books.data.forEach((book) => {
          bookSelect.innerHTML += `<option value="${book.id}|${book.name}|${
            book.basePrice
          }">#${book.id} - ${book.name} - ${vietnamMoneyFormat(
            book.basePrice
          )}<u>đ</u></option>`;
        });

        isNotFirstItemSelected(bookSelect);
      }

      //
      const priceInput = document.getElementById(
        "create-input_ticket-detail-price"
      );
      const quantityInput = document.getElementById(
        "create-input_ticket-detail-quantity"
      );
      const totalInput = document.getElementById(
        "create-input_ticket-detail-total"
      );
      if (priceInput && totalInput) {
        onlyInputNumberChar(priceInput);

        priceInput.addEventListener("input", (e) => {
          totalInput.value = `${vietnamMoneyFormat(
            Number(e.target.value) * Number(quantityInput.value)
          )}`;
        });
      }
      if (quantityInput && totalInput) {
        onlyInputNumberChar(quantityInput);

        quantityInput.addEventListener("input", (e) => {
          totalInput.value = `${vietnamMoneyFormat(
            Number(e.target.value) * Number(priceInput.value)
          )}`;
        });
      }

      // Gán sự kiện cho nút "Đóng" dialog
      document
        .getElementById("create-input_ticket-detail-button")
        .addEventListener("click", async (e) => {
          //
          e.preventDefault();

          // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
          const bookSelectInfo = document
            .getElementById("create-input_ticket-detail-book")
            .value.split("|");
          const id =
            bookSelectInfo.length > 1
              ? bookSelectInfo[0].replace("#", "")
              : null;
          const name = bookSelectInfo.length > 1 ? bookSelectInfo[1] : null;
          const base =
            bookSelectInfo.length > 1
              ? bookSelectInfo[2].replace(/[^0-9]/g, "")
              : null;
          const price = document.getElementById(
            "create-input_ticket-detail-price"
          ).value
            ? document.getElementById("create-input_ticket-detail-price").value
            : null;
          const quantity = document.getElementById(
            "create-input_ticket-detail-quantity"
          ).value
            ? document.getElementById("create-input_ticket-detail-quantity")
                .value
            : null;

          // ... xử lý (chưa kiểm tra tính hợp lệ)
          let isExists = false;
          if (inputTicketDetails) {
            for (let i = 0; i < inputTicketDetails.length; i++) {
              if (inputTicketDetails[i].bookId == id) {
                isExists = true;
                break;
              }
            }
          }
          if (isExists) {
            toast({
              title: "Cảnh báo",
              message: `Sách này đã được thêm.`,
              type: "warning",
              duration: 3000,
            });
          } else {
            let checkBook = true,
              checkPrice = true,
              checkQuantity = true;
            if (!id) {
              toast({
                title: "Cảnh báo",
                message: `Vui lòng chọn sách.`,
                type: "warning",
                duration: 3000,
              });
              checkBook = false;
            }
            if (!price) {
              toast({
                title: "Cảnh báo",
                message: `Vui lòng nhập giá nhập.`,
                type: "warning",
                duration: 3000,
              });
              checkPrice = false;
            } else if (Number(base) < Number(price)) {
              toast({
                title: "Cảnh báo",
                message: `Giá nhập không được lớn hơn giá bán.`,
                type: "warning",
                duration: 3000,
              });
              checkPrice = false;
            }
            if (!quantity) {
              toast({
                title: "Cảnh báo",
                message: "Vui lòng nhập số lượng.",
                type: "warning",
                duration: 3000,
              });
              checkQuantity = false;
            }

            if (checkBook && checkPrice && checkQuantity) {
              let yes = await showNotification(
                "Bạn có đồng ý thêm sách này không?"
              );
              if (yes) {
                inputTicketDetails.push({
                  inputTicketId: inputTicketId,
                  bookId: id,
                  bookName: name,
                  base: Number(base),
                  price: Number(price),
                  quantity: Number(quantity),
                });
                inputTicketDetails.sort((a, b) => a.bookId - b.bookId);

                updateCurrentTotal(inputTicketDetails);
                renderInputTicketDetailTableForCrud(
                  inputTicketDetails,
                  inputTicketStatus
                );

                // Xoá dialog
                createDetailDialog.remove();
                // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
                createDetailDialog.classList.remove("active");
              }
            }
          }
        });

      // Gán sự kiện cho nút "Đóng" dialog
      document
        .getElementById("close-input_ticket-detail-button")
        .addEventListener("click", () => {
          // Xoá dialog
          createDetailDialog.remove();

          // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
          // createDetailDialog.classList.remove("active");
        });
    });
  }
}

// Hàm cập nhật dữ liệu chi tiết phiếu nhập cho thêm và sửa
export async function renderInputTicketDetailTableForCrud(
  inputTicketDetails,
  inputTicketStatus
) {
  //
  const bodyInInputTicketDetailTable = document.querySelector(
    "table.input_ticket_details > tbody"
  );

  //
  let html = ``;
  if (inputTicketDetails) {
    for (let i = 0; i < inputTicketDetails.length; i++) {
      html += `
      <tr>
          <td>${inputTicketDetails[i].bookId}</td>
          <td class="left">${inputTicketDetails[i].bookName}</td>
          <td>${vietnamMoneyFormat(inputTicketDetails[i].base)}</td>
          <td>${vietnamMoneyFormat(inputTicketDetails[i].price)}</td>
          <td>${inputTicketDetails[i].quantity}</td>
          <td class="right">${vietnamMoneyFormat(
            inputTicketDetails[i].quantity * inputTicketDetails[i].price
          )}</td>
          ${
            inputTicketStatus === "Đang chờ xác nhận"
              ? `<td><i class="fa-solid fa-trash remove-icon" data-index="${i}" style="color: red; text-align: center; cursor: pointer;"></i></td>`
              : ""
          }
      </tr>
    `;
    }
  }

  // Cập nhật lại giao diện
  bodyInInputTicketDetailTable.innerHTML = html;

  // Sự kiện xoá 1 sách ở phiếu nhập
  if (inputTicketStatus === "Đang chờ xác nhận") {
    let removeList = document.querySelectorAll(".remove-icon");
    removeList.forEach((removeIcon) => {
      removeIcon.addEventListener("click", async () => {
        let yes = await showNotification(
          "Bạn có đồng ý xoá sản phẩm này không?"
        );
        if (yes) {
          let index = removeIcon.getAttribute("data-index");
          inputTicketDetails.splice(index, 1);
          updateCurrentTotal(inputTicketDetails);
          renderInputTicketDetailTableForCrud(
            inputTicketDetails,
            inputTicketStatus
          );
        }
      });
    });
  }
}

// Hàm cập nhật lại dữ liệu cho bảng phiếu nhập hàng
export async function renderInputTicketTable(currentPage) {
  //
  const data = (await filterInputTicket(currentPage)) || [];
  // Biến chứa đối tượng bảng phiếu nhập hàng
  const bodyInputTicketTable = document.querySelector(
    ".main__data > .main__table.input_ticket > tbody"
  );
  console.log(data);

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].supplierId}</td>
            <td>${data[i].createAt}</td>
            <td>${vietnamMoneyFormat(data[i].totalPrice)}</td>
            <td><span ${
              data[i].status === "Đã thanh toán"
                ? 'class="orange"'
                : data[i].status === "Đã xác nhận"
                ? 'class="green"'
                : data[i].status === "Đã hủy phiếu"
                ? 'class="red"'
                : 'class="gray"'
            }>${data[i].status}</span></td>
            <td>
                <i class="fa-solid fa-pen-to-square ${editInputTicket}"></i>
                <i class="fa-solid fa-print"></i>
            </td>
        </tr>
    `;
  }

  if (data.length == 0) {
    html = `
          <tr>
              <td></td>
              <td>Danh sách trống</td>             
              <td></td>
          </tr>
      `;
    bodyInputTicketTable.innerHTML = html;
  } else {
    // Cập nhật lại giao diện
    bodyInputTicketTable.innerHTML = html;

    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.input_ticket > tbody > tr > td:first-of-type"
    );
    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.input_ticket > tbody > tr > td:last-of-type"
    );
    listButtonInTable.forEach((buttons, row) => {
      // Các nút cần gán sự kiện trên mỗi dòng
      const updateButton = buttons.children[0];
      const printButton = buttons.children[1];
      // Id của đối tượng đã được chọn để thao tác
      const idInputTicketSelected = idColumnInTable.item(row).textContent;

      // Gán sự kiện hiện dialog sửa phiếu nhập hàng
      updateButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        console.log(idInputTicketSelected);
        updateInputTicketData(idInputTicketSelected);
      });

      // Gán sự kiện hiện dialog in phiếu nhập hàng
      printButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Gọi hàm sự kiện
        printInputTicket(idInputTicketSelected);
      });
    });
  }
}
