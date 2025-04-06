document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slides");
    const indicators = document.querySelectorAll(".indicator");
    const slides = slidesContainer?.querySelectorAll("img") || [];

    if (!slidesContainer || slides.length === 0 || indicators.length === 0)
        return;

    let currentIndex = 0;
    const slideCount = slides.length;

    function updateIndicators(index) {
        indicators.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    function goToSlide(index) {
        const slideWidth = slides[0].clientWidth;
        slidesContainer.scrollTo({
            left: slideWidth * index,
            behavior: "smooth",
        });
        updateIndicators(index);
        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slideCount;
        goToSlide(nextIndex);
    }

    slidesContainer.addEventListener("scroll", () => {
        const scrollLeft = slidesContainer.scrollLeft;
        const slideWidth = slidesContainer.clientWidth;
        const index = Math.round(scrollLeft / slideWidth);
        updateIndicators(index);
        currentIndex = index;
    });

    indicators.forEach((dot, i) => {
        dot.addEventListener("click", () => goToSlide(i));
    });

    setInterval(nextSlide, 4000);
});
