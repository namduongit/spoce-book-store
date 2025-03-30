import { updateSuppliesData } from "./updateSuppliesData.js";
import { detailSuppliesData } from "./detailSuppliesData.js";
import { lockSuppliesData } from "./lockSuppliesData.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)


export async function getAllSupplierData(){
  let url = `api/supplies/get.php`;
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

// Hàm cập nhật lại dữ liệu cho bảng Người dùng
export async function renderSuppliesTable( data = null) {

  if(!data){
    data = await getAllSupplierData();
  }

  // Biến chứa đối tượng bảng Người dùng
  const bodyInSuppliesTable = document.querySelector(
    ".main__data > .main__table.supplies > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].email}</td>
            <td><span ${
              data[i].status === "ACTIVE" ? 'class="green"' : 'class="red"'
            }>${data[i].status}</span></td>
            <td>
                <i id="detail-button-supplies" class="fa-solid fa-circle-info"></i>
                <i id="update-button-supplies" class="fa-solid fa-pen-to-square"></i>
                <i id="lock-button-supplies" class="fa-solid fa-${
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
  bodyInSuppliesTable.innerHTML = html;

  
  if(data.length > 0){
    // Gán sự kiện cho các nút sau khi thay đổi giao diện
    const idColumnInTable = document.querySelectorAll(
      ".main__data > .main__table.supplies > tbody > tr > td:first-of-type"
    );
    const listButtonInTable = document.querySelectorAll(
      ".main__data > .main__table.supplies > tbody > tr > td:last-of-type"
    );
    listButtonInTable.forEach((buttons, row) => {
      const supplier = data[row];
      // Các nút cần gán sự kiện trên mỗi dòng
      const detailButton = buttons.children[0];
      const updateButton = buttons.children[1];
      const lockButton = buttons.children[2];
      // Id của đối tượng đã được chọn để thao tác
      const idSuppliesSelected = idColumnInTable.item(row);
  
      // Gán sự kiện hiện dialog chi tiết người dùng
      detailButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();
  
        // Gọi hàm sự kiện
        detailSuppliesData(supplier);
      });
  
      // Gán sự kiện hiện dialog sửa người dùng
      updateButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();
  
        // Gọi hàm sự kiện
        updateSuppliesData(supplier);
      });
  
      // Gán sự kiện hiện dialog khoá / mở khoá người dùng
      lockButton.addEventListener("click", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();
  
        // Gọi hàm sự kiện
        lockSuppliesData(supplier);
      });
    });
  }
}
