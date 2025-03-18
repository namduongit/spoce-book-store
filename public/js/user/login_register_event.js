import { addInformationToProfileForm } from "./showUserInformation.js";

// lấy danh sahcs người dùng
// async function getAllUser() {
//     try {
//         let response = await fetch("./api/user/get.php");
//         if (!response.ok) {
//             throw new Error(`Lỗi khi lấy dữ liệu! HTTP Status: ${response.status}`);
//         }
//         let data = await response.json();
    
//         if (data.error) {
//             console.error("Lỗi API:", data.error);
//             return [];
//         }
//         return data;
//         } catch (error) {
//             console.error("Lỗi lấy dữ liệu:", error.message);
//             return [];
//         }
//   }
  
// đăng nhập
$(document).ready(function () {
    $(document).on("submit", "#loginForm", async function (event) {
        event.preventDefault(); 
        let formData = new FormData(this); // Lấy dữ liệu từ form

        fetch("api/user/login.php", {
            method: "POST",
            body: formData // Gửi dữ liệu form lên server
        })
        .then(response => response.json()) // Nhận phản hồi dạng JSON
        .then(data => {
            if (data.success) {
                // alert("Đăng nhập thành công!");
                document.querySelector(".auth").style.display = "none";
                addInformationToProfileForm(data);
                document.querySelector(".userInformation_icon_container .user_name").innerText = data.user.name;
                document.querySelector(".topbar__auth-btn.topbar__auth-btn--login.margin-right-medium").classList.add("hide-item");
                document.querySelector(".topbar__auth-btn.topbar__auth-btn--register.margin-right-medium").classList.add("hide-item");
                document.querySelector(".userInformation_icon_container").classList.remove("hide-item");

                document.querySelector(".topbar__auth-btn.topbar__auth-btn--logout").addEventListener("click", ()=>{
                    // alert("bạn đã đã đăng xuất!");
                    let profile_elm =  document.querySelector(".profile");
                    if(profile_elm){
                        profile_elm.remove();
                    }
                    document.querySelector(".topbar__auth-btn.topbar__auth-btn--login.margin-right-medium").classList.remove("hide-item");
                    document.querySelector(".topbar__auth-btn.topbar__auth-btn--register.margin-right-medium").classList.remove("hide-item");
                    document.querySelector(".userInformation_icon_container").classList.add("hide-item");
                    document.querySelector(".main").classList.remove("hide-item");
                    document.querySelector(".body").classList.remove("hide-item");
        
                    document.querySelector(".auth").style.display = "none";
                })
            } else {
                alert("Sai tài khoản hoặc mật khẩu!");
            }
        });
        
    });
});



//  gửi thong tin đăng kí
async function postUser(userData) {
    try {
        let response = await fetch("api/user/create.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        let data = await response.json(); // Nhận phản hồi từ server

        if (response.ok) {
            document.querySelector(".auth").style.display = "none";
            alert("Đăng ký thành công! Chào mừng " + userData.hoVaTen);
        } else {
            alert("Lỗi đăng ký: " + (data.error || "Không xác định"));
        }
    } catch (error) {
        alert("Lỗi kết nối đến server! Vui lòng thử lại.");
        console.error("Lỗi kết nối:", error);
    }
}






// đăng kí
$(document).ready(function () {
    $(document).on("submit", "#registerForm", async function (event) {
        event.preventDefault(); 
   
        let name = $("#register-name").val();
        let userName = $("#register-username").val();
        let password = $("#confirm-password").val();

        // Lấy ngày hôm nay YYYY-MM-DD
        let today = new Date().toISOString().split("T")[0];

        let newUser = {
            // maNguoiDung:1,
            hoVaTen: name,
            soDT: "",
            email: "",
            diaChi: "",
            tenTaiKhoan: userName,
            matKhau: password,
            maQuyen: 4,
            trangThai: "Hoạt động",
            ngayCapNhat: today
        };

        postUser(newUser);
    });
});























