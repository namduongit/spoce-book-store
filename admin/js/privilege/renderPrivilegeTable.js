// import { updatePrivilegeData } from "./updatePrivilegeData.js";
// import { detailPrivilegeData } from "./detailPrivilegeData.js";
// import { lockPrivilegeData } from "./lockPrivilegeData.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
let data = [
  {
    id: "NQ01",
    name: "Quản lý",
    status: "Hoạt động",
    dateUpdate: "",
  },
  {
    id: "NQ02",
    name: "Nhân viên bán hàng",
    status: "Tạm dừng",
    dateUpdate: "",
  },
  {
    id: "NQ03",
    name: "Nhân viên thủ kho",
    status: "Tạm dừng",
    dateUpdate: "",
  },
  {
    id: "NQ04",
    name: "Khách hàng",
    status: "Tạm dừng",
    dateUpdate: "",
  },
];

// Hàm cập nhật lại dữ liệu cho bảng Người dùng
export function renderPrivilegeTable() {
  // Biến chứa đối tượng bảng Người dùng
  const bodyInPrivilegeTable = document.querySelector(
    ".main__data > .main__table.privilege > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td><span ${
              data[i].status === "Hoạt động" ? 'class="green"' : 'class="red"'
            }>${data[i].status}</span></td>
            <td>
                <i id="detail-button-privilege" class="fa-solid fa-circle-info"></i>
                <i id="update-button-privilege" class="fa-solid fa-pen-to-square"></i>
                <i id="lock-button-privilege" class="fa-solid fa-${
                  data[i].status === "Hoạt động" ? "" : "un"
                }lock"></i>
            </td>
        </tr>
    `;
  }

  // Cập nhật lại giao diện
  bodyInPrivilegeTable.innerHTML = html;

  //   // Gán sự kiện cho các nút sau khi thay đổi giao diện
  //   const idColumnInTable = document.querySelectorAll(
  //     ".main__data > .main__table.privilege > tbody > tr > td:first-of-type"
  //   );
  //   const listButtonInTable = document.querySelectorAll(
  //     ".main__data > .main__table.privilege > tbody > tr > td:last-of-type"
  //   );
  //   listButtonInTable.forEach((buttons, row) => {
  //     // Các nút cần gán sự kiện trên mỗi dòng
  //     const detailButton = buttons.children[0];
  //     const updateButton = buttons.children[1];
  //     const lockButton = buttons.children[2];
  //     // Id của đối tượng đã được chọn để thao tác
  //     const idPrivilegeSelected = idColumnInTable.item(row);

  //     // Gán sự kiện hiện dialog chi tiết người dùng
  //     detailButton.addEventListener("click", (e) => {
  //       // Loại bỏ giá trị mặc định
  //       e.preventDefault();

  //       // Gọi hàm sự kiện
  //       detailPrivilegeData(idPrivilegeSelected);
  //     });

  //     // Gán sự kiện hiện dialog sửa người dùng
  //     updateButton.addEventListener("click", (e) => {
  //       // Loại bỏ giá trị mặc định
  //       e.preventDefault();

  //       // Gọi hàm sự kiện
  //       updatePrivilegeData(idPrivilegeSelected);
  //     });

  //     // Gán sự kiện hiện dialog khoá / mở khoá người dùng
  //     lockButton.addEventListener("click", (e) => {
  //       // Loại bỏ giá trị mặc định
  //       e.preventDefault();

  //       // Gọi hàm sự kiện
  //       lockPrivilegeData(idPrivilegeSelected);
  //     });
  //   });
}
