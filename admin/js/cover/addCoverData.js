import { isNotFirstItemSelected } from "../selectEvents.js";
import { toast } from "../../../public/js/toast.js";
import { showNotification } from "../dialogMessage.js";
import { renderCoverTable } from "./renderCoverTable.js";
// Hàm thiết lập sự kiện Thêm một loại bìa cho bảng
export function addCoverData() {
  // Biến chứa đối tượng là nút "Thêm"
  const addButton = document.getElementById("add-button-cover");

  // Gán sự kiện khi nhấn nút "Thêm"
  addButton.addEventListener("click", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thêm class active thể hiện là nút được nhấn (vì dialog còn hiện)
    addButton.classList.add("active");

    // Tạo một dialog để thêm một loại bìa
    const addDialog = document.createElement("dialog");
    // - Định dạng dialog
    addDialog.classList.add("dialog");
    addDialog.classList.add("cover");
    addDialog.style.width = "398px";
    // - Ghi nội dung dialog
    addDialog.innerHTML = `
                <h1 class="dialog__title">Thêm loại bìa</h1>
                <button id="close-cover-button" class="dialog__close">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="dialog__line"></div>
                <form method="post" class="dialog__form">
                  <div class="dialog__row">
                    <div class="dialog__form-group full">
                      <label>Mã loại bìa</label>
                      <input type="text" id="add-cover-id" readonly />
                    </div>
                  </div>
                  <div class="dialog__row">
                    <div class="dialog__form-group full">
                      <label>Tên loại bìa</label>
                      <input type="text" id="add-cover-name" placeholder="Nhập Tên loại bìa" autofocus/>
                    </div>
                  </div>
                  <div class="dialog__row">
                    <div class="dialog__form-group full">
                      <label>Trạng thái</label>
                      <select id="add-cover-status">
                        <option value="" selected>Chọn Trạng thái</option>
                        <option  value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                      </select>
                    </div>
                  </div>
                  <div class="dialog__buttons">
                    <button id="add-cover-button" class="add">Thêm</button>
                  </div>
                </form >
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

    // Gán sự kiện cho nút "Thêm" dialog
    document
      .getElementById("add-cover-button")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        // Lấy ra giá trị của các biến để kiểm tra tính hợp lệ
        const coverName = document.getElementById("add-cover-name").value;
        const coverStatus = document.getElementById("add-cover-status").value;
          console.log(coverName, coverStatus);
        let checkName = true;
        if(coverName === '' ){
          // alert("Hãy nhập tên đầy đủ");
          toast({title :"Cảnh báo", message :`Vui lòng nhập tên loại Bia.`, type : "warning" , duration : 3000});
          checkName = false;
        }
        let checkStatus = true;
        if(coverStatus == ''){
          toast({title :"Cảnh báo", message :`Vui lòng chọn trạng thái.`, type : "warning" , duration : 3000});
          checkStatus = false;
        }
        if(checkName && checkStatus){
          let yes = await showNotification("Bạn có đồng ý thêm loại bìa này không?");
          if(yes){
            try {
              const response = await fetch("api/covers/create.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  coverName: coverName,
                  coverStatus: coverStatus,
                }),
              });
      
              const result = await response.json();
              console.log("Server Response:", result);
      
              if (result.success) {
                // alert("thêm bìa sách thành công!");
                toast({title :"Thành công", message :`Thêm Loại bìa thành công.`, type : "success" , duration : 3000});
    
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
            renderCoverTable();
          }
        }
        
  
      });

    // Gán sự kiện cho nút "Đóng" dialog
    document
      .getElementById("close-cover-button")
      .addEventListener("click", () => {
        // Xoá dialog
        addDialog.remove();

        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addButton.classList.remove("active");
      });
  });
}
