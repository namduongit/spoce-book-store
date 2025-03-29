import { updateCoverData } from "./updateCoverData.js";
import { lockCoverData } from "./lockCoverData.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)



export async function getAllCoverData(){
  let url = `api/covers/get.php`;
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

// Hàm cập nhật lại dữ liệu cho bảng Thể loại
export async function renderCoverTable(data = null) {

  if (!data) {
    data = await getAllCoverData();
  }

  // Biến chứa đối tượng bảng Thể loại
  const bodyInCoverTable = document.querySelector(
    ".main__data > .main__table.cover > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
          <tr>
              <td>${data[i].id}</td>
              <td>${data[i].name}</td>
              <td><span ${
                data[i].status === "ACTIVE" ? 'class="green"' : 'class="red"'
              }>${data[i].status}</span></td>
              <td>
                  <i id="update-button-cover" class="fa-solid fa-pen-to-square"></i>
                  <i id="lock-button-cover" class="fa-solid fa-${
                    data[i].status === "ACTIVE" ? "" : "un"
                  }lock"></i>
              </td>
          </tr>
      `;
  }
  if(data.length == 0){
    html = `
            <tr>
            <td></td>
            <td> DANH SÁCH TRỐNG</td>
          </tr>`;
  }

  // Cập nhật lại giao diện
  bodyInCoverTable.innerHTML = html;


  if(data.length !== 0){
    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.cover > tbody > tr > td:first-of-type"
    );
    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.cover > tbody > tr > td:last-of-type"
    );
    listButtonInTable.forEach((buttons, row) => {
      const cover = data[row];
      // Các nút cần gán sự kiện trên mỗi dòng
      const updateButton = buttons.children[0];
      const lockButton = buttons.children[1];
      // Id của đối tượng đã được chọn để thao tác
      const idCoverSelected = idColumnInTable.item(row);
  
      // Gán sự kiện hiện dialog sửa thể loại
      updateButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();
  
        // Gọi hàm sự kiện
        updateCoverData(cover);
      });
  
      // Gán sự kiện hiện dialog khoá / mở khoá thể loại
      lockButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();
  
        // Gọi hàm sự kiện
        lockCoverData(cover);
      });
    });

  }

}
