// import { isNotFirstItemSelected } from "../selectEvents.js";

// // Hàm phân tách địa chỉ (Nếu có, tách thành các phần như Tỉnh/Thành phố, Quận/Huyện)
// function splitAddressToShip(address) {
//   if (!address) return "Không có địa chỉ";
//   const info = address.split(",");
//   return info.length === 4 ? info[2].trim() + ", " + info[3].trim() : address;
// }
// function getRoleName(maQuyen) {
//   switch (parseInt(maQuyen)) {
//     case 1:
//       return "Nhân viên bán hàng";
//     case 2:
//       return "Quản lí";
//     case 3:
//       return "Nhân viên thủ kho";
//     case 4:
//       return "Khách hàng";
//     default:
//       return "Không xác định";
//   }
// }
// export async function detailAccountData(idAccountSelected) {
//   const id = idAccountSelected.textContent.trim(); // Lấy ID người dùng
//   console.log("ID người dùng:", id);

//   // Gọi song song hai API: một để lấy thông tin người dùng, một để lấy địa chỉ
//   Promise.all([
//     fetch(
//       `api/address/getAddress.php?maNguoiDung=${id}`
//     ).then((response) => response.json()),
//     fetch(`http://localhost:3000/api/account/detail_account.php?id=${id}`).then(
//       (response) => response.json()
//     ),
//   ])
//     .then(([addressData, userData]) => {
//       if (userData.status === "success") {
//         // Lấy thông tin người dùng và địa chỉ
//         const user = userData.data;
//         const address = addressData.data;
//         console.log(address);

//         // Tạo dialog và điền dữ liệu vào các trường
//         const detailDialog = document.createElement("dialog");
//         detailDialog.classList.add("dialog", "account");
//         detailDialog.style.width = "772px";
//         try {
//           let role = await fetch(`api/roles/get.php?roleId=${user.maQuyen}`);
//           let roleData = await role.json();
//           console.log(roleData);

//           detailDialog.innerHTML = `
//           <h1 class="dialog__title">Chi tiết người dùng</h1>
//           <button id="close-account-button" class="dialog__close">
//             <i class="fa-solid fa-xmark"></i>
//           </button>
//           <div class="dialog__line"></div>
//           <form method="get" class="dialog__form">
//             <div class="dialog__row">
//               <div class="dialog__form-group">
//                 <label>Mã người dùng</label>
//                 <input type="text" id="detail-account-id" readonly value="${
//                   user.maNguoiDung
//                 }" />
//               </div>
//               <div class="dialog__form-group">
//                 <label>Họ và tên</label>
//                 <input type="text" id="detail-account-fullname" readonly value="${
//                   user.hoVaTen
//                 }" />
//               </div>
//             </div>
//             <div class="dialog__row">
//               <div class="dialog__form-group">
//                 <label>Số điện thoại</label>
//                 <input type="text" id="detail-account-phone" readonly value="${
//                   user.soDT == "" ? "Chưa có số điện thoại" : user.soDT
//                 }" />
//               </div>
//               <div class="dialog__form-group">
//                 <label>Email</label>
//                 <input type="text" id="detail-account-email" readonly value="${
//                   user.email == "" ? "Chưa có email" : user.email
//                 }" />
//               </div>
//             </div>
//             <div class="dialog__row">
//               <div class="dialog__form-group full">
//                 <label>Địa chỉ</label>
//                 <input type="text" id="detail-account-address" readonly value="${
//                   address && address.length > 0
//                     ? `${address[0].street}, ${address[0].ward}, ${address[0].district}, ${address[0].province}`
//                     : "Chưa có địa chỉ"
//                 }" />
//               </div>
//             </div>
//             <div class="dialog__row">
//               <div class="dialog__form-group">
//                 <label>Tên tài khoản</label>
//                 <input type="text" id="detail-account-username" readonly value="${
//                   user.tenTaiKhoan
//                 }" />
//               </div>
//               <div class="dialog__form-group">
//                 <label>Mật khẩu</label>
//                 <input type="text" id="detail-account-password" readonly value="${
//                   user.matKhau
//                 }" />
//               </div>
//             </div>
//             <div class="dialog__row">
//               <div class="dialog__form-group">
//   <label>Nhóm quyền</label>
//   <select id="detail-account-privilege" disabled>
//     <option value="${user.maQuyen}" selected>${roleData.data.tenQuyen}</option>
//     <option value="1">Quản lý</option>
//     <option value="2">Nhân viên thủ kho</option>
//     <option value="3">Nhân viên bán hàng</option>
//     <option value="4">Khách hàng</option>
//   </select>
// </div>
//               <div class="dialog__form-group">
//                 <label>Trạng thái</label>
//                 <select id="detail-account-status" disabled>
//                   <option value="${user.trangThai}" selected>${
//             user.trangThai === "1" ? "Hoạt động" : "Tạm dừng"
//           }</option>
//                   <option value="1">Hoạt động</option>
//                   <option value="0">Tạm dừng</option>
//                 </select>
//               </div>
//             </div>
//           </form>
//         `;
//         } catch (error) {
//           console.log(error);
//         }
//         // Định dạng dialog

//         // Thêm vào body
//         document.body.appendChild(detailDialog);

//         // Hiển thị dialog
//         detailDialog.showModal();

//         // Sự kiện cho nút "Đóng" dialog
//         document
//           .getElementById("close-account-button")
//           .addEventListener("click", () => {
//             // Xoá dialog
//             detailDialog.remove();
//           });
//       } else {
//         // alert("Không tìm thấy thông tin người dùng hoặc địa chỉ");
//       }
//     })
//     .catch((error) => {
//       console.error("Lỗi khi gọi API:", error);
//       // alert("Có lỗi xảy ra khi tải dữ liệu");
//     });
// }

import { isNotFirstItemSelected } from "../selectEvents.js";

function splitAddressToShip(address) {
  if (!address) return "Không có địa chỉ";
  const info = address.split(",");
  return info.length === 4 ? info[2].trim() + ", " + info[3].trim() : address;
}

function getRoleName(maQuyen) {
  switch (parseInt(maQuyen)) {
    case 1:
      return "Nhân viên bán hàng";
    case 2:
      return "Quản lí";
    case 3:
      return "Nhân viên thủ kho";
    case 4:
      return "Khách hàng";
    default:
      return "Không xác định";
  }
}

export async function detailAccountData(idAccountSelected) {
  const id = idAccountSelected.textContent.trim();
  console.log("ID người dùng:", id);

  try {
    let param = new URLSearchParams();
    param.append("maNguoiDung", id);
    const [addressResponse, userResponse] = await Promise.all([
      fetch(`api/address/getAddress.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: param.toString()
      }),
      fetch(`api/account/detail_account.php?id=${id}`),
    ]);

    const addressData = await addressResponse.json();
    const userData = await userResponse.json();

    if (userData.status !== "success") {
      console.error("Không tìm thấy người dùng");
      return;
    }

    const user = userData.data;
    const address = addressData.data || [];

    let roleName = "";

    if (!user.maQuyen) {
      roleName = "Chưa có quyền";
    } else {
      try {
        let role = await fetch(`api/roles/get.php?roleId=${user.maQuyen}`);
        let roleData = await role.json();
        console.log("RoleData:", roleData);
        if (roleData && roleData.data) {
          roleName = roleData.data.name;
        }
      } catch (error) {
        console.error("Lỗi khi lấy quyền:", error);
      }
    }

    const detailDialog = document.createElement("dialog");
    detailDialog.classList.add("dialog", "account");
    detailDialog.style.width = "772px";

    detailDialog.innerHTML = `
      <h1 class="dialog__title">Chi tiết người dùng</h1>
      <button id="close-account-button" class="dialog__close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="dialog__line"></div>
      <form method="get" class="dialog__form">
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Mã người dùng</label>
            <input type="text" readonly value="${user.maNguoiDung}" />
          </div>
          <div class="dialog__form-group">
            <label>Họ và tên</label>
            <input type="text" readonly value="${user.hoVaTen}" />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Số điện thoại</label>
            <input type="text" readonly value="${
              user.soDT || "Chưa có số điện thoại"
            }" />
          </div>
          <div class="dialog__form-group">
            <label>Email</label>
            <input type="text" readonly value="${
              user.email || "Chưa có email"
            }" />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group full">
            <label>Địa chỉ</label>
            <input type="text" readonly value="${
              address.length > 0
                ? `${address[0].street}, ${address[0].ward}, ${address[0].district}, ${address[0].province}`
                : "Chưa có địa chỉ"
            }" />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Tên tài khoản</label>
            <input type="text" readonly value="${user.tenTaiKhoan}" />
          </div>
          <div class="dialog__form-group">
            <label>Mật khẩu</label>
            <input type="password" readonly value="${user.matKhau}" />
          </div>
        </div>
        <div class="dialog__row">
          <div class="dialog__form-group">
            <label>Nhóm quyền</label>
            <select disabled>
              <option selected value="${user.maQuyen}">${roleName}</option>
              
            </select>
          </div>
          <div class="dialog__form-group">
            <label>Trạng thái</label>
            <select disabled>
              <option selected value="${user.trangThai}">
                ${user.trangThai}
              </option>
              <option value="1">Hoạt động</option>
              <option value="0">Tạm dừng</option>
            </select>
          </div>
        </div>
      </form>
    `;

    document.body.appendChild(detailDialog);
    detailDialog.showModal();

    document
      .getElementById("close-account-button")
      .addEventListener("click", () => {
        detailDialog.remove();
      });
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết tài khoản:", error);
  }
}
