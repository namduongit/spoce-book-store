import { updateAccountData } from "./updateAccountData.js";
import { detailAccountData } from "./detailAccountData.js";
import { lockAccountData } from "./lockAccountData.js";
import { filterAccount } from "./filterAccountData.js";

// // Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
// // let data = [
// //   {
// //     id: "1",
// //     username: "admin",
// //     password: "123456",
// //     privilege: "Quản lý",
// //     phone: "0123456789",
// //     email: "admin@gmail.com",
// //     status: "Hoạt động",
// //     dateUpdate: "",
// //   },
// //   {
// //     id: "2",
// //     username: "thanhquy",
// //     password: "1",
// //     privilege: "Nhân viên bán hàng",
// //     phone: "0123456789",
// //     email: "customer@gmail.com",
// //     status: "Tạm dừng",
// //     dateUpdate: "",
// //   },
// //   {
// //     id: "99",
// //     username: "thanhquy",
// //     password: "1",
// //     privilege: "Khách hàng",
// //     phone: "0123456789",
// //     email: "customer@gmail.com",
// //     status: "Tạm dừng",
// //     dateUpdate: "",
// //   },
// // ];

// // Hàm cập nhật lại dữ liệu cho bảng Người dùng
// export async function renderAccountTable(pageIsSelected = 1) {
//   // Lấy dữ liệu từ API
//   let account = await filterAccount(pageIsSelected);
//   console.log(account);
//   let data = account.accountList;
//   console.log(data);
//   // Biến chứa đối tượng bảng Người dùng
//   const bodyInAccountTable = document.querySelector(
//     ".main__data > .main__table.account > tbody"
//   );

//   // Chuyển đổi dữ liệu thành các thẻ html
//   let html = ``;
//   for (let i = 0; i < data.length; i++) {
//     if (data[i].maQuyen == "") {
//       html += `
//         <tr>
//             <td>${data[i].maNguoiDung}</td>
//             <td>${data[i].hoVaTen}</td>
//             <td>Chưa có quyền</td>
//             <td>${data[i].soDT}</td>
//             <td><span ${
//               data[i].trangThai === "Hoạt động"
//                 ? 'class="green"'
//                 : 'class="red"'
//             }>${data[i].trangThai}</span></td>
//             <td>
//                 <i id="detail-button-account" class="fa-solid fa-circle-info"></i>
//                 <i id="update-button-account" class="fa-solid fa-pen-to-square"></i>
//                 <i id="lock-button-account" class="fa-solid fa-${
//                   data[i].trangThai === "Hoạt động" ? "" : "un"
//                 }lock"></i>
//             </td>
//         </tr>
//     `;
//     } else {
//       try {
//         const role = fetch(`api/roles/get.php?roleId=${data[i].maQuyen}`);
//         const quyen = await role.text();
//         console.log(quyen);

//         html += `
//           <tr>
//               <td>${data[i].maNguoiDung}</td>
//               <td>${data[i].hoVaTen}</td>
//               <td>${quyen.tenQuyen}</td>
//               <td>${data[i].soDT}</td>
//               <td><span ${
//                 data[i].trangThai === "Hoạt động"
//                   ? 'class="green"'
//                   : 'class="red"'
//               }>${data[i].trangThai}</span></td>
//               <td>
//                   <i id="detail-button-account" class="fa-solid fa-circle-info"></i>
//                   <i id="update-button-account" class="fa-solid fa-pen-to-square"></i>
//                   <i id="lock-button-account" class="fa-solid fa-${
//                     data[i].trangThai === "Hoạt động" ? "" : "un"
//                   }lock"></i>
//               </td>
//           </tr>
//       `;
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       }
//     }
//   }

//   // Cập nhật lại giao diện
//   bodyInAccountTable.innerHTML = html;

//   // Gán sự kiện cho các nút sau khi thay đổi giao diện
//   const idColumnInTable = document.querySelectorAll(
//     ".main__data > .main__table.account > tbody > tr > td:first-of-type"
//   );
//   const listButtonInTable = document.querySelectorAll(
//     ".main__data > .main__table.account > tbody > tr > td:last-of-type"
//   );
//   listButtonInTable.forEach((buttons, row) => {
//     // Các nút cần gán sự kiện trên mỗi dòng
//     const detailButton = buttons.children[0];
//     const updateButton = buttons.children[1];
//     const lockButton = buttons.children[2];
//     // Id của đối tượng đã được chọn để thao tác
//     const idAccountSelected = idColumnInTable.item(row);

//     // Gán sự kiện hiện dialog chi tiết người dùng
//     detailButton.addEventListener("click", (e) => {
//       // Loại bỏ giá trị mặc định
//       e.preventDefault();

//       // Gọi hàm sự kiện
//       detailAccountData(idAccountSelected);
//     });

//     // Gán sự kiện hiện dialog sửa người dùng
//     updateButton.addEventListener("click", (e) => {
//       // Loại bỏ giá trị mặc định
//       e.preventDefault();

//       // Gọi hàm sự kiện
//       updateAccountData(idAccountSelected);
//     });

//     // Gán sự kiện hiện dialog khoá / mở khoá người dùng
//     lockButton.addEventListener("click", (e) => {
//       // Loại bỏ giá trị mặc định
//       e.preventDefault();

//       // Gọi hàm sự kiện
//       lockAccountData(idAccountSelected);
//     });
//   });
// }

// Hàm cập nhật lại dữ liệu cho bảng Người dùng
export async function renderAccountTable(pageIsSelected = 1) {
  // Lấy dữ liệu từ API
  let account = await filterAccount(pageIsSelected);
  console.log(account);
  let data = account.accountList;
  console.log(data);
  // Biến chứa đối tượng bảng Người dùng
  const bodyInAccountTable = document.querySelector(
    ".main__data > .main__table.account > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    if (data[i].maQuyen == "") {
      html += `
        <tr>
            <td>${data[i].maNguoiDung}</td>
            <td>${data[i].hoVaTen}</td>
            <td>Chưa có quyền</td>
            <td>${data[i].soDT}</td>
            <td><span ${
              data[i].trangThai === "Hoạt động"
                ? 'class="green"'
                : 'class="red"'
            }>${data[i].trangThai}</span></td>
            <td>
                <i id="detail-button-account" class="fa-solid fa-circle-info"></i>
                <i id="update-button-account" class="fa-solid fa-pen-to-square"></i>
                <i id="lock-button-account" class="fa-solid fa-${
                  data[i].trangThai === "Hoạt động" ? "" : "un"
                }lock"></i>
            </td>
        </tr>
    `;
    } else {
      try {
        const roleResponse = await fetch(
          `api/roles/get.php?roleId=${data[i].maQuyen}`
        );
        const roleData = await roleResponse.json();

        console.log(roleData);

        html += `
          <tr>
              <td>${data[i].maNguoiDung}</td>
              <td>${data[i].hoVaTen}</td>
              <td>${roleData.data.name}</td>
              <td>${data[i].soDT ? data[i].soDT : "Chưa cập nhật"}</td>
              <td><span ${
                data[i].trangThai === "Hoạt động"
                  ? 'class="green"'
                  : 'class="red"'
              }>${data[i].trangThai}</span></td>
              <td>
                  <i id="detail-button-account" class="fa-solid fa-circle-info"></i>
                  <i id="update-button-account" class="fa-solid fa-pen-to-square"></i>
                  <i id="lock-button-account" class="fa-solid fa-${
                    data[i].trangThai === "Hoạt động" ? "" : "un"
                  }lock"></i>
              </td>
          </tr>
      `;
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    }
  }

  // Cập nhật lại giao diện
  bodyInAccountTable.innerHTML = html;

  // Gán sự kiện cho các nút sau khi thay đổi giao diện
  const idColumnInTable = document.querySelectorAll(
    ".main__data > .main__table.account > tbody > tr > td:first-of-type"
  );
  const listButtonInTable = document.querySelectorAll(
    ".main__data > .main__table.account > tbody > tr > td:last-of-type"
  );
  listButtonInTable.forEach((buttons, row) => {
    // Các nút cần gán sự kiện trên mỗi dòng
    const detailButton = buttons.children[0];
    const updateButton = buttons.children[1];
    const lockButton = buttons.children[2];
    // Id của đối tượng đã được chọn để thao tác
    const idAccountSelected = idColumnInTable.item(row);

    // Gán sự kiện hiện dialog chi tiết người dùng
    detailButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      detailAccountData(idAccountSelected);
    });

    // Gán sự kiện hiện dialog sửa người dùng
    updateButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      updateAccountData(idAccountSelected);
    });

    // Gán sự kiện hiện dialog khoá / mở khoá người dùng
    lockButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      lockAccountData(idAccountSelected);
    });
  });
}
