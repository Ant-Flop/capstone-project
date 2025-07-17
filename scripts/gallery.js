let currentPage = 1;
const itemsPerPage = 6;
let allCourses = [];
let filteredCourses = [];

function renderGallery(courses) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    courses.forEach((course) => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        card.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="course-image" loading="lazy">
            <div class="course-info">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <span><strong>⏱️ Duration:</strong> ${course.duration}</span>
                <span><strong>📈 Level:</strong> ${course.level}</span>
                <span><strong>💰 Price:</strong> ${course.price}</span>
                <span><strong>👨‍🏫 Instructor:</strong> ${course.instructor}</span>
                <span><strong>🎥 Format:</strong> ${course.format}</span>
                <span><strong>📅 Released:</strong> ${course.releaseDate}</span>
                <span><strong>📚 Lessons:</strong> ${course.lessons}</span>
				<div class="to-course"><a href="course.html?id=${course.id}"><button class="enroll-btn">More</button></a></div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function renderCurrentPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    renderGallery(filteredCourses.slice(start, end));
    updatePagination();
}

function sortCourses(criteria) {
    filteredCourses.sort((a, b) => {
        switch (criteria) {
            case "price":
                return parseFloat(a.price) - parseFloat(b.price);
            case "title":
                return a.title.localeCompare(b.title);
            case "duration":
                return parseFloat(a.duration) - parseFloat(b.duration);
            case "releaseDate":
                return new Date(a.releaseDate) - new Date(b.releaseDate);
            default:
                return 0;
        }
    });

    currentPage = 1;
    renderCurrentPage();
}

function searchCourses(query) {
    const lowerQuery = query.toLowerCase();

    filteredCourses = allCourses.filter((course) => {
        return (
            course.title.toLowerCase().includes(lowerQuery) ||
            course.duration.toString().includes(lowerQuery) ||
            course.instructor.toLowerCase().includes(lowerQuery) ||
            course.price.toString().includes(lowerQuery)
        );
    });

    currentPage = 1;
    renderCurrentPage();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const showMoreButton = document.querySelector(".show-more-btn");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    const pageButtonsContainer = document.querySelector(".page-buttons");
    pageButtonsContainer.innerHTML = "";

    showMoreButton.disabled =
        currentPage * itemsPerPage >= filteredCourses.length;
    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage * itemsPerPage >= filteredCourses.length;

    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(
        totalPages,
        currentPage + Math.floor(visiblePages / 2)
    );

    if (endPage - startPage < visiblePages - 1) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + visiblePages - 1);
        } else {
            startPage = Math.max(1, endPage - visiblePages + 1);
        }
    }

    if (startPage > 1) {
        pageButtonsContainer.innerHTML += `<span>...</span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement("button");
        pageButton.classList.add("page-btn");
        pageButton.textContent = i;
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderCurrentPage();
        });
        pageButtonsContainer.appendChild(pageButton);
    }

    if (endPage < totalPages) {
        pageButtonsContainer.innerHTML += `<span>...</span>`;
    }
}

function nextPage() {
    if (currentPage * itemsPerPage < filteredCourses.length) {
        currentPage++;
        renderCurrentPage();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderCurrentPage();
    }
}

function showMore() {
    currentPage++;
    renderGallery(filteredCourses.slice(0, currentPage * itemsPerPage));
    updatePagination();
}

fetch("./data/courses.json")
    .then((response) => response.json())
    .then((data) => {
        allCourses = data;
        filteredCourses = [...allCourses];
        renderCurrentPage();
        updatePagination();

        document
            .querySelector(".show-more-btn")
            .addEventListener("click", showMore);
        document.querySelector(".next-btn").addEventListener("click", nextPage);
        document.querySelector(".prev-btn").addEventListener("click", prevPage);

        document
            .getElementById("sort-by")
            .addEventListener("change", (event) => {
                sortCourses(event.target.value);
            });

        document.getElementById("search").addEventListener("input", (event) => {
            searchCourses(event.target.value);
        });
    })
    .catch((error) => {
        console.error("Error:", error);
    });
