function toggleInfoMenuFilter(classList, classContent) {
    document.addEventListener("DOMContentLoaded", function() {
        const showListAuthor = document.querySelector(`.${classList}`);
        let lastHTML = showListAuthor.innerHTML;

        showListAuthor.addEventListener('click', function(event) {
            event.preventDefault();
            if (showListAuthor.classList.contains('show-more')) {
                showListAuthor.innerHTML =`
                    <a href="#">Ẩn bớt</a>
                    <i class="fa-solid fa-chevron-up"></i>
                `;
                showListAuthor.classList.remove('show-more');
                document.querySelectorAll(`.${classContent} .hide-item`).forEach(
                    element => {
                        element.classList.remove('hide-item');
                        element.classList.add('temp-item');
                    }
                );
            } else {
                showListAuthor.innerHTML = lastHTML;
                showListAuthor.classList.add('show-more');
                document.querySelectorAll(`.${classContent} .temp-item`).forEach(
                    element => {
                        element.classList.remove('temp-item');
                        element.classList.add('hide-item');
                    }
                )
            }
        });
    });
}

toggleInfoMenuFilter('show-list-author', 'list-author-content');
toggleInfoMenuFilter('show-list-publisher', 'list-publisher-content');
toggleInfoMenuFilter('show-list-cover', 'list-cover-content');


