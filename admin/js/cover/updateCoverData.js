import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";

// Hàm thiết lập sự kiện Sửa một loại bìa cho bảng
export async function updateCoverData(idCoverSelected) {
  // Phải truy vấn từ CSDL thông qua idCoverSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
    let cover = await fetchData(`api/covers/get.php?coverId=${idCoverSelected}`);

  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-cover");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một loại bìa
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("cover");
  updateDialog.style.width = "398px";
  // - Ghi nội dung dialog
  updateDialog.innerHTML = `
          <h1 class="dialog__title">Sửa loại bìa</h1>
          <button id="close-cover-button" class="dialog__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="dialog__line"></div>
          <form method="post" class="dialog__form">
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Mã loại bìa</label>
                <input type="text" id="update-cover-id"  value="${cover[0].id}" readonly />
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Tên loại bìa</label>
                <input type="text" id="update-cover-name" placeholder="Nhập Tên loại bìa"  value="${cover[0].name}" autofocus/>
              </div>
            </div>
            <div class="dialog__row">
              <div class="dialog__form-group full">
                <label>Trạng thái</label>
                <select id="update-cover-status" disabled>
                  <option value="" selected>Chọn Trạng thái</option>
                  <option selected value="${cover[0].status}">${cover[0].status}</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                </select>
              </div>
            </div>
            <div class="dialog__buttons">
              <button id="update-cover-button" class="update">Sửa</button>
            </div>
          </form >
        `;


  // Thêm vào body
  document.body.appendChild(updateDialog);

  // Hiển thị updateDialog
  updateDialog.showModal();

  // Sự kiện cho các thành phần trong dialog
  // - Nếu các select đã được chọn giá trị khác mặc định thì đổi định dạng
  const selectElement = document.querySelectorAll(
    ".dialog__form-group > select"
  );
  selectElement.forEach((select) => {
    isNotFirstItemSelected(select);
  });

  // Gán sự kiện cho nút "Sửa" dialog
  document
    .getElementById("update-cover-button")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const coverId = document.getElementById("update-cover-id").value.trim();
      const coverName = document.getElementById("update-cover-name").value.trim();
      const coverStatus = document.getElementById("update-cover-status").value.trim();
      console.log(coverId, coverName, coverStatus);
      if(coverName === ''){
        alert("Hãy nhập tên đầy đủ");
      }else{

        try {
          const response = await fetch("api/covers/update.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              coverId: coverId,
              coverName: coverName,
              coverStatus: coverStatus,
            }),
          });
  
          const result = await response.json();
          console.log("Server Response:", result);
  
          if (result.success) {
            alert("Cập nhật loại bìa thành công!");
          } else {
            alert("Lỗi khi cập nhật trạng thái: " + (result.message || "Không rõ nguyên nhân"));
          }
        } catch (error) {
          console.error("Lỗi fetch API:", error);
          alert("Không thể kết nối đến server!");
        }
        updateDialog.remove();
      }
    });

  // Gán sự kiện cho nút "Đóng" dialog
  document
    .getElementById("close-cover-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
