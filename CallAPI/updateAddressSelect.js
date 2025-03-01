const host = "https://provinces.open-api.vn/api/";
export function updateAddressSelect (province, district, ward) {
    var callAPI = (api) => {
        return axios.get(api)
            .then((response) => {
                renderData(response.data, province);
            });
    }
    callAPI('https://provinces.open-api.vn/api/?depth=1');
    var callApiDistrict = (api) => {
        return axios.get(api)
            .then((response) => {
                renderData(response.data.districts, district);
            });
    }
    var callApiWard = (api) => {
        return axios.get(api)
            .then((response) => {
                renderData(response.data.wards, ward);
            });
    }

    var renderData = (array, select) => {
        let row = ' <option disable value="">Chọn</option>';
        array.forEach(element => {
            row += `<option value="${element.code}">${element.name}</option>`;
            // row += `<option value="${element.name}">${element.name}</option>`;
        });
        document.querySelector("#" + select).innerHTML = row;
    }

    $("#"+ province).change(() => {
        callApiDistrict(host + "p/" + $("#"+ province).val() + "?depth=2");
        document.querySelector("#"+ district).innerHTML = "";
        document.querySelector("#"+ ward).innerHTML = "";
    });
    $("#"+ district).change(() => {
        callApiWard(host + "d/" + $("#"+ district).val() + "?depth=2");
    });
    $("#"+ ward).change(function() {
    });
}
