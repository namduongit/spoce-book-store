// import {renderOrderTable} from "./renderOrderTable";

let curentpage = 1;
// hàm lọc
// const filterOrder = document.querySelector("#filter-button-order");
// if (filterOrder) {
//   filterOrder.addEventListener("click", async (e) => {
//     e.preventDefault();
//     curentpage = 1;
//     await renderOrderTable(1);
//   });
// }
export async function filterOrder(pageIsSelected = 1) {
  let id = document.querySelector("#find-inp-order").value.trim();
  let sort = document
    .querySelector("#sort-slt-order")
    .value.toLowerCase()
    .trim();
  let status = document.querySelector("#status-slt-order").value.trim();
  let province = document.querySelector("#city-slt-order").value.trim();
  let district = document.querySelector("#district-slt-order").value.trim();

  let orderBy = "donHang.maDonHang",
    orderType = "ASC";

  switch (sort) {
    case "id giảm dần":
      orderType = "DESC";
      break;
    case "ngày tạo đơn tăng dần":
      orderBy = "donHang.ngayTao";
      break;
    case "ngày tạo đơn giảm dần":
      orderBy = "donHang.ngayTao";
      orderType = "DESC";
      break;
    case "tổng thanh toán tăng dần":
      orderBy = "donHang.tongTien";
      break;
    case "tổng thanh toán giảm dần":
      orderBy = "donHang.tongTien";
      orderType = "DESC";
      break;
  }

  let limit = 10;
  let page = Number(pageIsSelected) || 1;
  let offset = (page - 1) * limit;

  let params = new URLSearchParams();
  if (id) params.append("id", id);
  if (status && status !== "Tất cả") params.append("status", status);
  if (province) params.append("tinh", province);
  if (district) params.append("district", district); //
  params.append("orderBy", orderBy);
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

    let data = await response.json();
    console.log("Dữ liệu nhận được:", data);

    if (data.pageCount !== undefined) {
      await paginationOrder(data.pageCount); //
    }

    return data.orderList;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
    alert("Không thể tải dữ liệu đơn hàng. " + error.message);
    return [];
  }
}
export function filterOrderData() {
  const filterButton = document.querySelector("#filter-button-order");

  if (filterButton) {
    filterButton.addEventListener("click", async (e) => {
      e.preventDefault();
      curentpage = 1;
      await renderOrderTable(1);
    });
  }
}
