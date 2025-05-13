document.addEventListener("DOMContentLoaded", () => {
    const slideContainer = document.querySelector('.slide-container');
    const slides = document.querySelectorAll('.slide');
    const positionBtns = document.querySelectorAll('.position-btn');
    
    let size = slides.length;
    let currentSlideIndex = 0;


    positionBtns[currentSlideIndex].classList.add('active');

    // Hàm tính vị trí và cập nhật lại
    function updatePosition() {
        let position = -currentSlideIndex * 100;
        slideContainer.style.transform = `translateX(${position}%)`;
        positionBtns.forEach(btn => btn.classList.remove('active'));
        positionBtns[currentSlideIndex].classList.toggle('active');
    }

    // Hàm dùng để di chuyển đến slide kế tiếp
    function moveToNextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % size;
        updatePosition();
    }

    // Hàm dùng để di chuyển về slide trước đó
    function moveToPreviousSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + size) % size;
        updatePosition();
    }

    // Nếu không ấn nút chuyển slide thì mặc định chuyển sang slide kế tiếp sau mỗi 5s
    let interval = setInterval(() => {
        moveToNextSlide();
    }, 5000);

    function createNewInterval() {
        interval = setInterval(() => {
        moveToNextSlide();
        }, 5000);
    }

    function resetInterval() {
        clearInterval(interval);
        createNewInterval();
    }
    
    document.querySelector('.slider__btn--left').addEventListener("click", function () {
        moveToPreviousSlide();
        resetInterval();
    });
    document.querySelector('.slider__btn--right').addEventListener("click", function () {
        moveToNextSlide();
        resetInterval();
    });

    // Nếu nút nào được ấn thì sẽ chuyển đến slide đó
    positionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentSlideIndex = parseInt(btn.dataset.id);
            updatePosition();
            resetInterval();
        });
    });
});