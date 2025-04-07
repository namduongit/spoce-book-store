import { isNotFirstItemSelected } from "../selectEvents.js";
import { fetchData } from "../../../public/js/book/getDataBook.js";

// Hàm thiết lập sự kiện Sửa một nhà xuất bản cho bảng
export async function updatePublisherData(idPublisherSelected) {
  // Phải truy vấn từ CSDL thông qua idpublisherSelected để lấy được dữ liệu của đối tượng hiện tại
  // ...
   let publisher =  await fetchData(`api/publishers/get.php?publisherId=${idPublisherSelected}`);
  // Biến chứa đối tượng là nút "Sửa"
  const updateButton = document.getElementById("update-button-publisher");

  // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
  updateButton.classList.add("active");

  // Tạo một dialog để sửa một nhà xuất bản
  const updateDialog = document.createElement("dialog");
  // - Định dạng dialog
  updateDialog.classList.add("dialog");
  updateDialog.classList.add("publisher");
  updateDialog.style.width = "398px";
  // - Ghi nội dung dialog  
  updateDialog.innerHTML = `
  <h1 class="dialog__title">Sửa nhà xuất bản</h1>
  <button id="close-publisher-button" class="dialog__close">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <div class="dialog__line"></div>
  <form method="post" class="dialog__form">
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Mã nhà xuất bản</label>
        <input type="text" id="update-publisher-id"  value="${publisher[0].id}" readonly />
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Tên nhà xuất bản</label>
        <input type="text" id="update-publisher-name" placeholder="Nhập Tên nhà xuất bản"  value="${publisher[0].name}" autofocus/>
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Trạng thái</label>
        <select id="update-publisher-status" disabled>
          <option selected value="${publisher[0].status}">${publisher[0].status}</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="SUSPENDED">SUSPENDED</option>
        </select>
      </div>
    </div>
    <div class="dialog__buttons">
      <button id="update-publisher-button" class="update">Sửa</button>
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
    .getElementById("update-publisher-button")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
      const publisherId = document.getElementById("update-publisher-id").value.trim();
      const publisherName = document.getElementById("update-publisher-name").value.trim();
      const publisherStatus = document.getElementById("update-publisher-status").value.trim();
      console.log(publisherId, publisherName, publisherStatus);
      if(publisherName === ''){
        alert("Hãy nhập tên đầy đủ");
      }else{

        try {
          const response = await fetch("api/publishers/update.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              publisherId: publisherId,
              publisherName: publisherName,
              publisherStatus: publisherStatus,
            }),
          });
  
          const result = await response.json();
          console.log("Server Response:", result);
  
          if (result.success) {
            alert("Cập nhật nhà xuất thành công!");
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
    .getElementById("close-publisher-button")
    .addEventListener("click", () => {
      // Xoá dialog
      updateDialog.remove();

      // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
      updateButton.classList.remove("active");
    });
}
