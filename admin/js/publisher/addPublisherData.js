import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderPublisherTable } from "./renderPublisherTable.js";
// Hàm thiết lập sự kiện Thêm một nhà xuất bản cho bảng
export function addPublisherData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-publisher");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một nhà xuất bản
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("publisher");
    addDialog.style.width = "398px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
              <h1 class="dialog__title">Thêm nhà xuất bản</h1>
              <button id="close-publisher-button" class="dialog__close">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <div class="dialog__line"></div>
              <form method="post" class="dialog__form">
                <div class="dialog__row">
                  <div class="dialog__form-group full">
                    <label>Mã nhà xuất bản</label>
                    <input type="text" id="add-publisher-id" readonly />
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group full">
                    <label>Tên nhà xuất bản</label>
                    <input type="text" id="add-publisher-name" placeholder="Nhập Tên nhà xuất bản" autofocus/>
                  </div>
                </div>
                <div class="dialog__row">
                  <div class="dialog__form-group full">
                    <label>Trạng thái</label>
                    <select id="add-publisher-status">
                      <option selected value="">Chọn trạng thái</option>
                      <option  value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="SUSPENDED">SUSPENDED</option>
                    </select>
                  </div>
                </div>
                <div class="dialog__buttons">
                  <button id="add-publisher-button" class="add">Thêm</button>
                </div>
              </form>
            `;

    // Thêm vào body
    document.body.appendChild(addDialog);

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

    // Gán sự kiện cho nút "thêm" dialog
    document
      .getElementById("add-publisher-button")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const publisherName = document.getElementById("add-publisher-name").value;
        const publisherStatus = document.getElementById("add-publisher-status").value;
          console.log(publisherName, publisherStatus);
          let checkName = true;
        if(publisherName === ''){
          // alert("Hãy nhập tên đầy đủ");
          toast({title :"Cảnh báo", message :`Vui lòng nhập tên nhà xuất bản.`, type : "warning" , duration : 3000});
          checkName = false;
        }
        let checkStatus = true;
        if(publisherStatus === ''){
          // alert("Hãy nhập tên đầy đủ");
          toast({title :"Cảnh báo", message :`Vui lòng chọn trạng thái.`, type : "warning" , duration : 3000});
          checkStatus = false;
        }
        if(checkName && checkStatus){
          let yes = await showNotification("Bạn có đồng ý thêm nhà xuất bản này không?");
          if(yes){
            try {
              const response = await fetch("api/publishers/create.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  publisherName: publisherName,
                  publisherStatus: publisherStatus,
                }),
              });
      
              const result = await response.json();
              console.log("Server Response:", result);
      
              if (result.success) {
                // alert("thêm tác giả thành công!");
              toast({title :"Thành công", message :`Thêm nhà xuất bản thành công.`, type : "success" , duration : 3000});

              } else {
                // alert("Lỗi khi cập nhật trạng thái: " + (result.message || "Không rõ nguyên nhân"));
              toast({title :"Cảnh báo", message :`${result.message}`, type : "warning" , duration : 3000});
                
              }
            } catch (error) {
              console.error("Lỗi fetch API:", error);
              // alert("Không thể kết nối đến server!");
            toast({title :"Lỗi", message :`Lỗi fetch API:${error}`, type : "error" , duration : 3000});
            }
            addDialog.remove();
          renderPublisherTable();

          }
        }
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-publisher-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
