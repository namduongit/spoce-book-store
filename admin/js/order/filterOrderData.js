// import { renderOrderTable } from "./renderOrderTable.js";
let curentpage = 1;
export async function filterOrder(pageIsSelected = 1) {
  let id = document.querySelector("#find-inp-order").value.trim();
  let sort = document
    .querySelector("#sort-slt-order")
    .value.toLowerCase()
    .trim();
  let status = document.querySelector("#status-slt-order").value.trim();
  let province = document.querySelector("#city-slt-order").value.trim();
  let district = document.querySelector("#district-slt-order").value.trim();

  let orderBy = "maDonHang",
    orderType = "ASC";

  switch (sort) {
    case "id giảm dần":
      orderType = "DESC";
      break;
    case "ngày tạo đơn tăng dần":
      orderBy = "ngayTao";
      break;
    case "ngày tạo đơn giảm dần":
      orderBy = "ngayTao";
      orderType = "DESC";
      break;
    case "tổng thanh toán tăng dần":
      orderBy = "tongTien";
      break;
    case "tổng thanh toán giảm dần":
      orderBy = "tongTien";
      orderType = "DESC";
      break;
  }

  let limit = 5;
  let page = Number(pageIsSelected) || 1;
  let offset = (page - 1) * limit;

  status = status !== "Tất cả" ? status : "";
  province = province !== "Tất cả" ? province : "";
  district = district !== "Tất cả" ? district : "";

  let params = new URLSearchParams();
  if (id) params.append("id", id);
  if (status) params.append("status", status);
  if (province) params.append("city", province);
  if (district) params.append("district", district);
  params.append("orderByColumn", orderBy);
  params.append("orderType", orderType);
  params.append("limit", limit);
  params.append("offset", offset);
  let url = `api/orders/filter_order.php?${params.toString()}`;
  console.log("Request URL:", url);

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP status: " + response.status);
    }

    let data = await response.text();
    // console.log("Dữ liệu nhận được:", data);
    // await paginationOrder(data.pageCount); // nếu có
    return data.orderList;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
    alert("Không thể tải dữ liệu đơn hàng. " + error.message);
    return [];
  }
}
export function filterOrderData() {
  const filterButton = document.querySelector("#filter-button-order");

  // if (filterButton) {
  //   filterButton.addEventListener("click", async (e) => {
  //     e.preventDefault();
  //     curentpage = 1;
  //     await renderOrderTable(1);
  //   });
  // }
}
