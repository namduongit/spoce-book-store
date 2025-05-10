function createDotsSpan() {
  const dots = document.createElement("button");
  dots.classList.add("main-pagination__button");
  dots.style.pointerEvents = "none";
  dots.textContent = "...";

  return dots;
}

export async function renderPagination(
  paginationId,
  pageCount,
  currentPage,
  event
) {
  if (!paginationId) return;
  const pagination = document.getElementById(paginationId);
  pagination.innerHTML = "";
  if (pageCount && currentPage && event) {
    if (pageCount > 1) {
      // Nút sang trái
      let prevButton = document.createElement("button");
      prevButton.classList.add("main-pagination__button", "previous");
      prevButton.innerHTML = '<i class="icon fa-solid fa-chevron-left"></i>';
      if (currentPage > 1) {
        prevButton.addEventListener("click", function () {
          currentPage -= 1;
          event(currentPage);
        });
      } else {
        prevButton.setAttribute("disabled", "");
        prevButton.style.color = "#ccc";
        prevButton.style.pointerEvents = "none";
      }
      pagination.appendChild(prevButton);

      // Các nút số trang
      for (let i = 1; i <= pageCount; i++) {
        let pageButton = document.createElement("button");
        pageButton.classList.add("main-pagination__button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", function () {
          currentPage = i;
          event(currentPage);
        });

        pagination.appendChild(pageButton);
      }

      // Nút sang phải
      let nextButton = document.createElement("button");
      nextButton.classList.add("main-pagination__button", "next");
      nextButton.innerHTML = '<i class="icon fa-solid fa-chevron-right"></i>';
      if (currentPage < pageCount) {
        nextButton.addEventListener("click", function () {
          currentPage += 1;
          event(currentPage);
        });
      } else {
        nextButton.setAttribute("disabled", "");
        nextButton.style.color = "#ccc";
        nextButton.style.pointerEvents = "none";
      }
      pagination.appendChild(nextButton);

      // Nút hiện tại đang được nhấn
      const currentPageButton = document.querySelector(
        `.main__pagination button:nth-child(${currentPage + 1})`
      );
      currentPageButton.classList.add("active");

      //
      let allButtons = document.querySelectorAll(
        ".main__pagination .main-pagination__button"
      );
      let buttonsContainer = document.querySelector(".main__pagination");
      if (currentPage >= 4) {
        //
        for (let i = 2; i < currentPage - 1; i++) {
          allButtons[i].style.display = "none";
        }

        // Tạo nút "..."
        const dotsButton = createDotsSpan();
        // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
        buttonsContainer.insertBefore(dotsButton, allButtons[2]);
      }
      if (currentPage < pageCount - 2) {
        //
        for (let i = pageCount - 1; i > currentPage + 1; i--) {
          allButtons[i].style.display = "none";
        }

        // Tạo nút "..."
        const dotsButton = createDotsSpan();
        // Chèn vào vị trí thứ 3 (index 2 vì index bắt đầu từ 0)
        buttonsContainer.insertBefore(dotsButton, allButtons[pageCount - 1]);
      }
    }
  }
}
