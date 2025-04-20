const host = "https://provinces.open-api.vn/api/";

export function updateAddressSelect(province, district, ward) {
    var callAPI = (api, callback) => {
        axios.get(api)
            .then(response => callback(response.data))
            .catch(error => console.log("Lỗi API:", error));
    };

    // Load danh sách tỉnh/thành phố
    callAPI(host + "?depth=1", (data) => {
        renderData(data, province);
    });

    var callApiDistrict = (api) => {
        callAPI(api, (data) => {
            renderData(data.districts || [], district);
        });
    };

    var callApiWard = (api) => {
        callAPI(api, (data) => {
            renderData(data.wards || [], ward);
        });
    };

    var renderData = (array, select) => {
        let row = '<option disabled selected value="">Chọn</option>';
        array.forEach(element => {
            row += `<option value="${element.code}" data-name="${element.name}">${element.name}</option>`;
        });
        document.querySelector("#" + select).innerHTML = row;
    };

    // Xử lý khi chọn tỉnh/thành phố
    $("#" + province).change(() => {
        const selectedValue = $("#" + province).val();
        if (selectedValue) {
            callApiDistrict(host + "p/" + selectedValue + "?depth=2");
        }
        document.querySelector("#" + district).innerHTML = '<option disabled selected value="">Chọn</option>';
        document.querySelector("#" + ward).innerHTML = '<option disabled selected value="">Chọn</option>';
    });

    // Xử lý khi chọn quận/huyện
    $("#" + district).change(() => {
        const selectedValue = $("#" + district).val();
        if (selectedValue) {
            callApiWard(host + "d/" + selectedValue + "?depth=2");
        }
        document.querySelector("#" + ward).innerHTML = '<option disabled selected value="">Chọn</option>';
    });

    // Xử lý khi chọn phường/xã
    $("#" + ward).change(() => {
        // Nếu cần làm gì khi chọn phường/xã, viết code ở đây
    });
}




export function autoSelectAddressByCode(province, district, ward, provinceCode = null, districtCode = null, wardCode = null) {
    var callAPI = (api, callback) => {
        axios.get(api)
            .then(response => callback(response.data))
            .catch(error => console.error("Lỗi API:", error));
    };

    var renderData = (array, select, selectedValue = null) => {
        let row = '<option disabled value="">Chọn</option>';
        array.forEach(element => {
            row += `<option value="${element.code}" ${element.code == selectedValue ? "selected" : ""}>${element.name}</option>`;
        });
        document.querySelector("#" + select).innerHTML = row;
    };

    callAPI(host + "?depth=1", (data) => {
        renderData(data, province, provinceCode);
        if (provinceCode) {
            callAPI(host + "p/" + provinceCode + "?depth=2", (districtData) => {
                renderData(districtData.districts, district, districtCode);
                if (districtCode) {
                    callAPI(host + "d/" + districtCode + "?depth=2", (wardData) => {
                        renderData(wardData.wards, ward, wardCode);
                    });
                }
            });
        }
    });

    $("#" + province).change(() => {
        const selectedProvince = $("#" + province).val();
        if (selectedProvince) {
            callAPI(host + "p/" + selectedProvince + "?depth=2", (data) => {
                renderData(data.districts, district);
            });
        }
        document.querySelector("#" + district).innerHTML = '<option disabled selected value="">Chọn</option>';
        document.querySelector("#" + ward).innerHTML = '<option disabled selected value="">Chọn</option>';
    });

    // Xử lý khi chọn quận/huyện
    $("#" + district).change(() => {
        const selectedDistrict = $("#" + district).val();
        if (selectedDistrict) {
            callAPI(host + "d/" + selectedDistrict + "?depth=2", (data) => {
                renderData(data.wards, ward);
            });
        }
        document.querySelector("#" + ward).innerHTML = '<option disabled selected value="">Chọn</option>';
    });
}

export function autoSelectAddressByName(province, district, ward, provinceName = null, districtName = null, wardName = null) {
    var callAPI = (api, callback) => {
        axios.get(api)
            .then(response => callback(response.data))
            .catch(error => console.error("Lỗi API:", error));
    };

    var findCodeByName = (array, name) => {
        let item = array.find(element => element.name.toLowerCase() === name.toLowerCase());
        return item ? item.code : null;
    };

    var renderData = (array, select, selectedValue = null) => {
        let row = '<option disabled value="">Chọn</option>';
        array.forEach(element => {
            row += `<option value="${element.code}" ${element.code == selectedValue ? "selected" : ""}>${element.name}</option>`;
        });
        document.querySelector("#" + select).innerHTML = row;
    };

    callAPI(host + "?depth=1", (data) => {
        let provinceCode = provinceName ? findCodeByName(data, provinceName) : null;
        renderData(data, province, provinceCode);
        
        if (provinceCode) {
            callAPI(host + "p/" + provinceCode + "?depth=2", (districtData) => {
                let districtCode = districtName ? findCodeByName(districtData.districts, districtName) : null;
                renderData(districtData.districts, district, districtCode);
                
                if (districtCode) {
                    callAPI(host + "d/" + districtCode + "?depth=2", (wardData) => {
                        let wardCode = wardName ? findCodeByName(wardData.wards, wardName) : null;
                        renderData(wardData.wards, ward, wardCode);
                    });
                }
            });
        }
    });
}


export function loadProvinceAndDistrictUl(provinceUlId, districtUlId) {
    const provinceUl = document.getElementById(provinceUlId);
    const districtUl = document.getElementById(districtUlId);

    console.log('Bắt đầu render')

    if (provinceUl && districtUl) {
        console.log('Chạy vào đây và không NULL');
        return;
    }

    const callAPI = (url, callback) => {
        axios.get(url)
            .then(res => callback(res.data))
            .catch(err => console.error("Lỗi API:", err));
    };

    const renderUl = (array, ulElement, onClickItem) => {
        ulElement.innerHTML = "";
        array.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.name;
            li.dataset.code = item.code;
            li.addEventListener("click", () => {
                if (typeof onClickItem === "function") {
                    onClickItem(item);
                }
            });
            ulElement.appendChild(li);
        });
    };

    // Gọi API để lấy danh sách tỉnh/thành
    callAPI(`${host}?depth=1`, (provinces) => {
        renderUl(provinces, provinceUl, (province) => {
            // Khi chọn tỉnh, load quận/huyện tương ứng
            callAPI(`${host}p/${province.code}?depth=2`, (provinceData) => {
                renderUl(provinceData.districts, districtUl);
            });
        });
    });
}


export async function getProvinceUlHtml() {
    try {
        const res = await axios.get(`${host}?depth=1`);
        const provinces = res.data;

        return provinces.map(province =>
            `<li data-code="${province.code}">${province.name}</li>`
        ).join("");
    } catch (err) {
        console.error("Lỗi API khi load tỉnh/thành:", err);
        return "<li>Không thể tải dữ liệu</li>";
    }
}


export async function getDistrictUlHtml(provinceCode) {
    try {
        const res = await axios.get(`${host}p/${provinceCode}?depth=2`);
        const districts = res.data.districts;

        return districts.map(d =>
            `<li data-code="${d.code}">${d.name}</li>`
        ).join("");
    } catch (err) {
        console.error("Lỗi API khi load quận/huyện:", err);
        return "<li>Không thể tải dữ liệu</li>";
    }
}
