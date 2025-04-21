import { fetchData } from "../../../public/js/book/getDataBook.js";

export async function renderCategoryList() {
  const ul = document.querySelector(".main__category-slt ul");
  const categories = await fetchData(`api/categories/list.php?`);
  for (let i = 0; i < categories.data.length; i++) {
    ul.innerHTML += `
        <li>${categories.data[i].name}</li>
    `;
  }
}
