import { toast } from "../../public/js/toast.js";

// Mục mặc định của mỗi danh sách chọn địa chỉ
const wardDefault = "Chọn Phường / Xã";
const districtDefault = "Chọn Quận / Huyện";
const provinceDefault = "Chọn Tỉnh / Thành phố";

//
function updateAddressSelect(
  province,
  district,
  ward,
  provinceDefault,
  districtDefault,
  wardDefault
) {
  // Đổi về định dạng mặc định
  province.innerHTML = `
        <option value="0" selected>${provinceDefault}</option>
    `;
  province.classList.remove("changed");
  district.innerHTML = `
        <option value="0" selected>${districtDefault}</option>
    `;
  district.classList.remove("changed");
  ward.innerHTML = `
        <option value="0" selected>${wardDefault}</option>
    `;
  ward.classList.remove("changed");

  // Cập nhật Tỉnh / Thành phố (mặc định)
  fetch(`https://esgoo.net/api-tinhthanh/1/0.htm`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Xem chi tiết thất bại!");
      }
      return response.json();
    })
    .then((json) => {
      for (let i = 0; i < 63; i++) {
        province.innerHTML += `
            <option value="${json.data[i].id}">${json.data[i].full_name}</option>
        `;
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Xem chi tiết thất bại!");
    });

  // Gán sự kiện khi thay đổi Tỉnh / Thành phố
  province.addEventListener("change", (e) => {
    // Loại bỏ giá trị mặc định
    e.preventDefault();

    // Thay đổi định dạng nếu không chọn mục mặc định
    if (e.target.value != 0) {
      e.target.classList.add("changed");
    } else {
      e.target.classList.remove("changed");
    }

    // Lấy ra id của Tỉnh / Thành phố được chọn
    const provinceIdSelected = e.target.value;

    // Cập nhật Quận / Huyện tương ứng
    district.innerHTML = `
        <option value="0" selected>${districtDefault}</option>
    `;
    district.classList.remove("changed");
    ward.innerHTML = `
          <option value="0" selected>${wardDefault}</option>
      `;
    ward.classList.remove("changed");
    fetch(`https://esgoo.net/api-tinhthanh/2/${provinceIdSelected}.htm`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Xem chi tiết thất bại!");
        }
        return response.json();
      })
      .then((json) => {
        for (let i = 0; i < json.data.length; i++) {
          district.innerHTML += `
            <option value="${json.data[i].id}">${json.data[i].full_name}</option>
          `;
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Xem chi tiết thất bại!");
      });

    // Gán sự kiện thay đổi Quận / Huyện
    district.addEventListener("change", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Thay đổi định dạng nếu không chọn mục mặc định
      if (e.target.value != 0) {
        e.target.classList.add("changed");
      } else {
        e.target.classList.remove("changed");
      }

      // Lấy ra id của Quận / Huyện phố được chọn
      const districtIdSelected = e.target.value;

      // Cập nhật Quận / Huyện tương ứng
      ward.innerHTML = `
          <option value="0" selected>${wardDefault}</option>
      `;
      ward.classList.remove("changed");
      fetch(`https://esgoo.net/api-tinhthanh/3/${districtIdSelected}.htm`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Xem chi tiết thất bại!");
          }
          return response.json();
        })
        .then((json) => {
          for (let i = 0; i < json.data.length; i++) {
            ward.innerHTML += `
        <option value="${json.data[i].id}">${json.data[i].full_name}</option>
      `;
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Xem chi tiết thất bại!");
        });

      // Gán sự kiện khi thay đổi Tỉnh / Thành phố
      ward.addEventListener("change", (e) => {
        // Loại bỏ giá trị mặc định
        e.preventDefault();

        // Thay đổi định dạng nếu không chọn mục mặc định
        if (e.target.value != 0) {
          e.target.classList.add("changed");
        } else {
          e.target.classList.remove("changed");
        }
      });
    });
  });
}

// Hàm hiện dialog cho việc "chọn" địa chỉ
export function showAddressSelectDialog(idAddressInput, idAddressButton) {
  //
  const addressButton = document.getElementById(idAddressButton);

  //
  addressButton.addEventListener("click", (e) => {
    // - Loại bỏ giá trị mặc định
    e.preventDefault();

    // - Thể hiện là nút đang được nhấn
    addressButton.classList.add("active");

    // Tạo một dialog để thêm một người dùng
    const addAddressDialog = document.createElement("dialog");
    // - Định dạng dialog
    addAddressDialog.classList.add("dialog");
    addAddressDialog.classList.add("address-select");
    addAddressDialog.style.width = "34%";
    // - Ghi nội dung dialog
    addAddressDialog.innerHTML = `
    <h1 class="dialog__title">Tạo địa chỉ</h1>
    <button id="close-address-select-button" class="dialog__close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="dialog__line"></div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label for="number-street-input">Số nhà và tên đường</label>
        <input
          type="text" id="number-street-input"
          placeholder="Nhập Số nhà và tên đường"
          autocomplete="off"
          autofocus
        />
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Tỉnh / Thành phố</label>
        <select id="province-select"></select>
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Quận / Huyện</label>
        <select id="district-select"></select>
      </div>
    </div>
    <div class="dialog__row">
      <div class="dialog__form-group full">
        <label>Phường / Xã</label>
        <select id="ward-select"></select>
      </div>
    </div>
    <div class="dialog__buttons">
      <button id="address-select-button" class="btn yes">Xác nhận</button>
    </div>
  `;

    // Thêm vào body
    document.body.appendChild(addAddressDialog);

    // Hiển thị addAddressDialog
    addAddressDialog.showModal();

    // - Gọi hàm cập nhật địa chỉ
    const numberStreetInput = document.getElementById("number-street-input");
    const provinceSelect = document.getElementById("province-select");
    const districtSelect = document.getElementById("district-select");
    const wardSelect = document.getElementById("ward-select");
    updateAddressSelect(
      provinceSelect,
      districtSelect,
      wardSelect,
      provinceDefault,
      districtDefault,
      wardDefault
    );

    // Gán sự kiện cho nút "Xác nhận"
    document
      .getElementById("address-select-button")
      .addEventListener("click", (e) => {
        // Gán địa chỉ đã tạo cho input tương ứng
        const numberStreetValue = numberStreetInput.value || null;
        const wardValue =
          wardSelect.options[wardSelect.selectedIndex].text == wardDefault
            ? null
            : wardSelect.options[wardSelect.selectedIndex].text;
        const districtValue =
          districtSelect.options[districtSelect.selectedIndex].text ==
          districtDefault
            ? null
            : districtSelect.options[districtSelect.selectedIndex].text;
        const provinceValue =
          provinceSelect.options[provinceSelect.selectedIndex].text ==
          provinceDefault
            ? null
            : provinceSelect.options[provinceSelect.selectedIndex].text;

        if (numberStreetValue && wardValue && districtValue && provinceValue) {
          // Thông báo tạo thành công
          toast({
            title: "Thành công",
            message: "Tạo địa chỉ thành công !",
            type: "success",
            duration: 1200,
          });

          // Đợi thông báo thành công thì thực hiện việc thay đổi định dạng và gán
          setTimeout(() => {
            // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
            addressButton.classList.remove("active");

            document.getElementById(
              `${idAddressInput}`
            ).value = `${numberStreetValue}, ${wardValue}, ${districtValue}, ${provinceValue}`;

            // Xoá dialog
            addAddressDialog.remove();
          }, 1700);
        } else {
          let errors = [];
          if (!numberStreetValue) {
            errors.push({
              field: "number-street",
              defaultMessage: "Số nhà và tên đường không được để trống !",
            });
          }
          if (!wardValue) {
            errors.push({
              field: "ward",
              defaultMessage: `${wardDefault} không được để trống !`,
            });
          }
          if (!districtValue) {
            errors.push({
              field: "district",
              defaultMessage: `${districtDefault} không được để trống !`,
            });
          }
          if (!provinceValue) {
            errors.push({
              field: "province",
              message: `${provinceDefault} không được để trống !`,
            });
          }
          toast({
            title: "Thất bại",
            message: "Tạo địa chỉ bhất bại !",
            type: "error",
            duration: 1200,
          });
        }
      });

    // Gán sự kiện cho nút "Đóng"
    document
      .getElementById("close-address-select-button")
      .addEventListener("click", () => {
        // Xoá class active thể hiện là nút không được nhấn (vì dialog không còn hiện)
        addressButton.classList.remove("active");

        // Xoá dialog
        addAddressDialog.remove();
      });
  });
}
