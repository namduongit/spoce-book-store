//  hiểm thị [tài khoản] [đăng xuất] khi horer và tên người dùng
function show_hinden(){
    $(".userInformation_icon_container").hover(
        function () {
            $(".information_and_logout_container").removeClass("hide-item");
        },
        function () {
            $(".information_and_logout_container").addClass("hide-item");
        }
    );
}
show_hinden();


//  hàm thêm thông tin và form
 export function addInformationToProfileForm( data){

    let header = document.querySelector(".header"); 
    let profileForm = document.createElement("div"); 
  
    profileForm.innerHTML = `
        <div class="profile">
        <div class="profile_icon_exit">
            <i class="fa-solid fa-right-from-bracket"></i>
        </div>
        <div class="profile_container_title">
            <span> Hồ sơ của tôi </span>
            <hr>
            <div class="profile_body">
                <div class="profile_item">
                    <label for="name">Họ và tên</label>
                    <input type="text" class="profile_name" name="profile_name" value="${data.user.name}">
                </div>

                <div class="profile_item">
                    <label for="username">Tên tài khoản</label>
                    <input type="text" class="profile_username" name="profile_username" value="${data.user.username}">
                </div>

                <div class="profile_item">
                    <label for="phonenumber"> Số điện thoại</label>
                    <input type="text" class="profile_phonenumber" name="profile_phonenumber" value="${data.user.phone}">
                </div>

                <div class="profile_item">
                    <label for="address">Địa chỉ</label>
                    <input type="text" class="profile_address" name="profile_address" value="${data.user.address}">
                </div>

                <div class="profile_item">
                    <label for="email"> Email</label>
                    <input type="text" class="profile_email" name="profile_email" value="${data.user.email}">
                </div>

                <div class="profile_item">
                    <label for="password">Mật khẩu</label>
                    <input contenteditable="false" type="password" class="profile_password" name="profile_password" value="${data.user.password}">
                </div>
            </div>
        </div>
    </div> `
    header.insertAdjacentElement("afterend", profileForm);

    document.querySelector(".profile").classList.add("hide-item");
    
    document.querySelector(".fa-solid.fa-right-from-bracket").addEventListener("click", ()=>{
        document.querySelector(".main").classList.remove("hide-item");
        document.querySelector(".body").classList.remove("hide-item");
        document.querySelector(".profile").classList.add("hide-item");
    })
}


export function showUserInformation(){
    document.querySelector(".topbar__auth-btn.topbar__auth-btn--settings").addEventListener("click", ()=>{
        document.querySelector(".profile").classList.remove("hide-item");
        document.querySelector(".main").classList.add("hide-item");
        document.querySelector(".body").classList.add("hide-item");
    })
}
showUserInformation();

