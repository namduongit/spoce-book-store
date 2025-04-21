// Hàm sự kiện thay đổi "Chọn Tỉnh thành" và "Chọn Quận huyện"
export function updateAddressSelect() {
  let provincesInput = document.querySelector(
    ".main__select input#province-slt-order"
  );
  let provincesUl = document.querySelector(
    ".main__select input#province-slt-order ~ ul"
  );
  let districtsInput = document.querySelector(
    ".main__select input#district-slt-order"
  );
  let districtsUl = document.querySelector(
    ".main__select input#district-slt-order ~ ul"
  );

  // Hàm cập nhật danh sách các quận huyện
  function renderDistrictLis(provinceIdSelected) {
    districtsInput.value = "";
    districtsUl.innerHTML = ``;
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
          districtsUl.innerHTML += `
              <li data-district="${json.data[i].id}">${json.data[i].full_name}</li>
            `;
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Xem chi tiết thất bại!");
      });
  }

  // Nếu tồn tại các biến thì tiến hàng gán sự kiện
  if (provincesInput && provincesUl && districtsInput && districtsUl) {
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
          provincesUl.innerHTML += `
            <li data-province="${json.data[i].id}">${json.data[i].full_name}</li>
          `;
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Xem chi tiết thất bại!");
      });

    // Nếu nhập tên 1 tỉnh thành
    provincesInput.addEventListener("input", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Giá trị nhập hiện tại
      let currentValue = e.target.value;

      // Tuỳ theo chuỗi nhập vào mà có cách xử lý khác
      if (currentValue === "") {
        districtsInput.value = "";
        districtsUl.innerHTML = ``;
      } else {
        for (let i = 0; i < provincesUl.children.length; i++) {
          const currentLi = provincesUl.children.item(i);
          if (currentLi.textContent === currentValue) {
            renderDistrictLis(currentLi.getAttribute("data-province"));
          } else {
            districtsInput.value = "";
            districtsUl.innerHTML = ``;
          }
        }
      }
    });

    // Nếu chọn 1 mục tỉnh thành
    provincesUl.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Tuỳ theo tỉnh thành đã chọn mà cập nhật danh sách quận huyện tương ứng
      renderDistrictLis(e.target.getAttribute("data-province"));
    });
  }
}
