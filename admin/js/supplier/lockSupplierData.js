import { fetchData } from "../../../public/js/book/getDataBook.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderSupplierTable } from "./renderSupplierTable.js";

//
export async function lockSupplierData(idSupplierSelected) {
  // Gọi api để lấy được thông tin nhà cung cấp được nhấn
  let supplier = await fetchData(`api/suppliers/detail.php?id=${idSupplierSelected}`);

  // // Biến chứa đối tượng là nút "Khoá"
  // const lockButton = document.getElementById("lock-button-supplier");

  // // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  // lockButton.classList.add("active");

  // Tạo một dialog để khoá - mở khoá một nhà cung cấp
  const lockDialog = document.createElement("dialog");
  // - Định dạng dialog
  lockDialog.classList.add("dialog");
  lockDialog.classList.add("supplier");
  // lockDialog.style.width = "30%";
  // - Ghi nội dung dialog
  lockDialog.innerHTML = `
     <h1 class="dialog__title">${
       supplier.data.status === "Hoạt động" ? "Khoá nhà cung cấp" : "Mở khoá nhà cung cấp"
     }</h1>
     <button id="close-supplier-button" class="dialog__close">
       <i class="fa-solid fa-xmark"></i>
     </button>
     <div class="dialog__line"></div>
     <form class="dialog__form">
     <div class="dialog__icons" style="display: flex; flex-direction: ${
       supplier.data.status === "Hoạt động" ? "row-reverse" : "row"
     };">
       <input type="hidden" id="lock-supplier-id" name="lock-supplier-id" value="${
         supplier.data.id
       }">
       <input type="hidden" id="lock-supplier-status" name="lock-supplier-status" value="${
         supplier.data.status
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
      const id = document.getElementById("lock-supplier-id").value;
      const status = document.getElementById("lock-supplier-status").value;

      try {
        const response = await fetch("api/suppliers/lock.php", {
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
      renderSupplierTable(1);
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
    .getElementById("close-supplier-button")
    .addEventListener("click", () => {
      // Xoá dialog
      lockDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      // lockButton.classList.remove("active");
    });
}
