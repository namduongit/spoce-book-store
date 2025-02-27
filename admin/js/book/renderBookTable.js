import { detailBookData } from "./detailBookData.js";
import { updateBookData } from "./updateBookData.js";
import { lockBookData } from "./lockBookData.js";

// Dữ liệu tạm thời (sau phải xây dựng hàm truy xuất dữ liệu từ csdl)
let data = [
  {
    id: "1",
    image:
      "https://product.hstatic.net/200000845405/product/b_a_b_n_ngo_i_chi_c_h_p_5fd0bef02e244f7bab251e0e332bed98_master.jpg",
    title: "Thần đồng Đất Việt tập 1",
    author: "Lê Linh",
    category: "Trẻ em",
    cover: "Bìa cứng",
    publishName: "Nhà xuất bản 1",
    publishYear: "2",
    issuer: "Nhà phát hành 1",
    priceBase: "250000",
    priceOrder: "228000",
    description: "Truyện lịch sử trẻ em",
    quantity: "2",
    supplies: "",
    discount: "",
    status: "Đang bán",
    dateUpdate: "",
  },
  {
    id: "2",
    image:
      "https://product.hstatic.net/200000845405/product/kiem-tien-bang-video-ngan-bia-1_7d0f0dc57734485e871f79f609b2d423_master.jpg",
    title: "Thần đồng Đất Việt tập 2",
    author: "Lê Linh",
    category: "Trẻ em",
    cover: "Bìa cứng",
    publishName: "Nhà xuất bản 2",
    publishYear: "2",
    issuer: "Nhà phát hành 2",
    priceBase: "250000",
    priceOrder: "228000",
    description: "Truyện lịch sử trẻ em",
    quantity: "10",
    supplies: "",
    discount: "",
    status: "Dừng bán",
    dateUpdate: "",
  },
  {
    id: "3",
    image:
      "https://product.hstatic.net/200000845405/product/tien_lam_chu_cuoc_choi_53cfd8e182324ea5934fefd5176f7ecd_3f2259e983c340fc84c9b3e9fcc37418_master.jpg",
    title: "Thần đồng Đất Việt tập 3",
    author: "Lê Linh",
    category: "Trẻ em",
    cover: "Bìa cứng",
    publishName: "Nhà xuất bản 3",
    publishYear: "2",
    issuer: "Nhà phát hành 3",
    priceBase: "250000",
    priceOrder: "228000",
    description: "Truyện lịch sử trẻ em",
    quantity: "25",
    supplies: "",
    discount: "",
    status: "Đang bán",
    dateUpdate: "",
  },
  {
    id: "4",
    image:
      "https://product.hstatic.net/200000845405/product/b_a_tr_c_ng__n___d__09361a2f0dcc48a7803bc4a21ff2d211_master.png",
    title: "Thần đồng Đất Việt tập 4",
    author: "Lê Linh",
    category: "Trẻ em",
    cover: "Bìa cứng",
    publishName: "Nhà xuất bản 4",
    publishYear: "2",
    issuer: "Nhà phát hành 4",
    priceBase: "250000",
    priceOrder: "228000",
    description: "Truyện lịch sử trẻ em",
    quantity: "25",
    supplies: "",
    discount: "",
    status: "Đang bán",
    dateUpdate: "",
  },
];

// Hàm cập nhật lại dữ liệu cho bảng Thể loại
export function renderBookTable() {
  // Biến chứa đối tượng bảng Thể loại
  const bodyInBookTable = document.querySelector(
    ".main__data > .main__table.book > tbody"
  );

  // Chuyển đổi dữ liệu thành các thẻ html
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `
          <tr>
              <td>${data[i].id}</td>
              <td><img src="${
                data[i].image
              }" alt="" width="90%" height="80%"/></td>
              <td>${data[i].title}</td>
              <td>${data[i].category}</td>
              <td>${data[i].quantity}</td>
              <td><span ${
                data[i].status === "Đang bán" ? 'class="green"' : 'class="red"'
              }>${data[i].status}</span></td>
              <td>
                  <i id="detail-button-book" class="fa-solid fa-circle-info"></i>  
                  <i id="update-button-book" class="fa-solid fa-pen-to-square"></i>
                  <i id="lock-button-book" class="fa-solid fa-${
                    data[i].status === "Đang bán" ? "" : "un"
                  }lock"></i>
              </td>
          </tr>
      `;
  }

  // Cập nhật lại giao diện
  bodyInBookTable.innerHTML = html;

  // Gán sự kiện cho các nút sau khi thay đổi giao diện
  const idColumnInTable = document.querySelectorAll(
    ".main__data > .main__table.book > tbody > tr > td:first-of-type"
  );
  const listButtonInTable = document.querySelectorAll(
    ".main__data > .main__table.book > tbody > tr > td:last-of-type"
  );
  listButtonInTable.forEach((buttons, row) => {
    // Các nút cần gán sự kiện trên mỗi dòng
    const detailButton = buttons.children[0];
    const updateButton = buttons.children[1];
    const lockButton = buttons.children[2];
    // Id của đối tượng đã được chọn để thao tác
    const idBookSelected = idColumnInTable.item(row);

    // Gán sự kiện hiện dialog chi tiết người dùng
    detailButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      detailBookData(idBookSelected);
    });

    // Gán sự kiện hiện dialog sửa người dùng
    updateButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      updateBookData(idBookSelected);
    });

    // Gán sự kiện hiện dialog khoá / mở khoá người dùng
    lockButton.addEventListener("click", (e) => {
      // Loại bỏ giá trị mặc định
      e.preventDefault();

      // Gọi hàm sự kiện
      lockBookData(idBookSelected);
    });
  });
}
