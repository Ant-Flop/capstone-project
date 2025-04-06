window.addEventListener("scroll", function () {
    const header = document.querySelector(".site-header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

fetch("./data/courses.json")
    .then((response) => response.json())
    .then((courses) => {
        const submenu = document.getElementById("courses-submenu");
        courses.forEach((course) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `course.html?id=${course.id}`;
            a.textContent = course.title;
            li.appendChild(a);
            submenu.appendChild(li);
        });
    })
    .catch((error) => {
        console.error("Error:", error);
    });
