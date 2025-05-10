import { fetchData } from "../../../public/js/book/getDataBook.js";

export async function renderItemsForFilter() {
  // Cập nhật các tác giả
  const authorUl = document.querySelector(".main__author-slt ul");
  const authors = await fetchData(`api/authors/list.php?status=Hoạt%20động`);
  for (let i = 0; i < authors.data.length; i++) {
    authorUl.innerHTML += `
        <li>${authors.data[i].name}</li>
    `;
  }

  // Cập nhật các thể loại
  const categoryUl = document.querySelector(".main__category-slt ul");
  const categories = await fetchData(
    `api/categories/list.php?status=Hoạt%20động`
  );
  for (let i = 0; i < categories.data.length; i++) {
    categoryUl.innerHTML += `
        <li>${categories.data[i].name}</li>
    `;
  }

  // Cập nhật các loại bìa
  const coverUl = document.querySelector(".main__cover-slt ul");
  const covers = await fetchData(`api/covers/list.php?status=Hoạt%20động`);
  for (let i = 0; i < covers.data.length; i++) {
    coverUl.innerHTML += `
        <li>${covers.data[i].name}</li>
    `;
  }

  // Cập nhật các nhà xuất bản
  const publisherUl = document.querySelector(".main__publisher-slt ul");
  const publishers = await fetchData(
    `api/publishers/list.php?status=Hoạt%20động`
  );
  for (let i = 0; i < publishers.data.length; i++) {
    publisherUl.innerHTML += `
        <li>${publishers.data[i].name}</li>
    `;
  }
}
