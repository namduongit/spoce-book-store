import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderDiscountTable } from "./renderDiscountTable.js";

//
export async function lockDiscountData(idDiscountSelected) {
  // Gọi api để lấy được thông tin phiếu giảm giá được nhấn
  let discount = await fetchData(
    `api/discounts/detail.php?id=${idDiscountSelected}`
  );

  // // Biến chứa đối tượng là nút "Khoá"
  // const lockButton = document.getElementById("lock-button-discount");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một phiếu giảm giá
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("discount");
  lockDialog.style.width = "30%";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
     <h1 class="dialog__title">${
       discount.data.status === "Hoạt động"
         ? "Khoá phiếu giảm giá"
         : "Mở khoá phiếu giảm giá"
     }</h1>
     <button id="close-discount-button" class="dialog__close">
       <i class="fa-solid fa-xmark"></i>
     </button>
     <div class="dialog__line"></div>
     <form class="dialog__form">
     <div class="dialog__icons" style="display: flex; flex-direction: ${
       discount.data.status === "Hoạt động" ? "row-reverse" : "row"
     };">
       <input type="hidden" id="lock-discount-id" name="lock-discount-id" value="${
         discount.data.id
       }">
       <input type="hidden" id="lock-discount-status" name="lock-discount-status" value="${
         discount.data.status
       }">    
         <i class="fa-solid fa-lock"></i>
         <i class="fa-solid fa-arrow-right"></i>
         <i class="fa-solid fa-unlock"></i>
       </div>
       <div class="dialog__buttons">
         <button class="yes">Đồng ý</button>
         <button class="no">Từ chối</button>
       </div>
     </form>
   `;

  // Thêm vào body
  document.body.appendChild(lockDialog);

  // Hiển thị lockDialog
  lockDialog.showModal();

  // Thêm sự kiện khi nhấn nút đồng ý
  document.querySelector(".yes").addEventListener("click", async (e) => {
    // Ngăn ...
    e.preventDefault();

    //
    let yes = await showNotification(
      "Bạn có đồng ý thay đổi trạng thái không."
    );
    if (yes) {
      const id = document.getElementById("lock-discount-id").value;
      const status = document.getElementById("lock-discount-status").value;

      try {
        const response = await fetch("api/discounts/lock.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            id: id,
            status: status,
          }),
        });

        const result = await response.json();
        if (result.success) {
          toast({
            title: "Thành công",
            message: `Lưu chỉnh sửa thành công`,
            type: "success",
            duration: 3000,
          });
        } else {
          toast({
            title: "Cảnh báo",
            message: `${result.message}`,
            type: "warning",
            duration: 3000,
          });
        }
      } catch (error) {
        toast({
          title: "Lỗi",
          message: `Lỗi fetch API:${error}`,
          type: "error",
          duration: 3000,
        });
      }
      lockDialog.remove();
      renderDiscountTable(1);
    }
  });

  // Gán sự kiện cho nút "Đóng" dialog
  document.querySelector(".no").addEventListener("click", () => {
    // Xoá dialog
    lockDialog.remove();

    // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
    // lockButton.classList.remove("active");
  });

  document
    .getElementById("close-discount-button")
    .addEventListener("click", () => {
      // Xoá dialog
      lockDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // lockButton.classList.remove("active");
    });
}
