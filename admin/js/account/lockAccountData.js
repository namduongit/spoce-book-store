import { toast } from "../../../public/js/toast.js";
import { renderAccountTable } from "./renderAccountTable.js";
export function lockAccountData(idAccountSelected) {
  // Phải truy vấn từ CSDL thông qua idAccountSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
  const id = idAccountSelected.textContent; // id của người dùng được khoá
  console.log(id);
  fetch(`http://localhost:3000/api/account/detail_account.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Kiểm tra xem người dùng có tồn tại không
      if (data.status === "success") {
        // Biến chứa đối tượng là nút "Khoá"
        const lockButton = document.getElementById("lock-button-account");

        // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
        lockButton.classList.add("active");

        // Tạo một dialog để khoá - mở khoá một người dùng
        const lockDialog = document.createElement("dialog");
        // - Định dạng dialog
        lockDialog.classList.add("dialog");
        lockDialog.classList.add("account");
        lockDialog.style.width = "400px";
        const isActive = data.data.trangThai === "Hoạt động";
        const actionText = isActive ? "Khoá" : "Mở khoá";

        const dialogTitle = isActive ? "Khoá người dùng" : "Mở khoá người dùng";
        const iconHTML = isActive
          ? `<i class="fa-solid fa-lock"></i><i class="fa-solid fa-arrow-right"></i><i class="fa-solid fa-unlock"></i>`
          : `<i class="fa-solid fa-unlock"></i><i class="fa-solid fa-arrow-right"></i><i class="fa-solid fa-lock"></i>`;
        // - Ghi nội dung dialog
        lockDialog.innerHTML = `
  <h1 class="dialog__title">${dialogTitle}</h1>
  <button id="close-account-button" class="dialog__close">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <div class="dialog__line"></div>
  <form method="post" class="dialog__form">
    <div class="dialog__icons">
      ${iconHTML}
    </div>
    <div class="dialog__buttons">
      <button class="yes" id="yes">Đồng ý</button>
      <button class="no">Từ chối</button>
    </div>
  </form>
`;

        // Thêm vào body
        document.body.appendChild(lockDialog);

        // Hiển thị lockDialog
        lockDialog.showModal();
        // Gán sự kiện cho nút "Đồng ý" trong dialog
        const yesButton = lockDialog.querySelector("#yes");
        yesButton.addEventListener("click", (event) => {
          event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
          let account = new URLSearchParams();
          account.append("maNguoiDung", id); // Thêm ID người dùng vào dữ liệu gửi đi
          const userStatus = data.data.trangThai; // ví dụ: "Hoạt động" hoặc "Tạm dừng"
          console.log(userStatus);
          const nextStatus =
            userStatus === "Hoạt động" ? "Tạm dừng" : "Hoạt động";
          account.append("accountStatus", nextStatus); // Thêm trạng thái tài khoản vào dữ liệu gửi đi
          // Gửi yêu cầu khoá tài khoản đến server
          fetch(
            `http://localhost:3000/api/account/lock_account.php?maNguoiDung=${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: account.toString(),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.status === "success") {
                toast({
                  title: `${actionText} tài khoản thành công`,
                  message: `Tài khoản ${id} đã được ${actionText.toLowerCase()}.`,
                  type: "success",
                });
                // Đóng dialog
                lockDialog.close();
                lockDialog.remove();
                lockButton.classList.remove("active");
              } else {
                toast({
                  title: `${actionText} tài khoản thất bại`,
                  message: `Có lỗi xảy ra khi ${actionText.toLowerCase()} tài khoản ${id}.`,
                  type: "error",
                });
              }
            });
          // Đóng dialog
          lockDialog.close();
          renderAccountTable(); // Cập nhật lại bảng tài khoản sau khi khoá
        });
        // Gán sự kiện cho nút "Đóng" dialog
        document
          .getElementById("close-account-button")
          .addEventListener("click", () => {
            // Xoá dialog
            lockDialog.remove();

            // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
            lockButton.classList.remove("active");
          });
      }
    });
}
