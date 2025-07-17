const urlParams = new URLSearchParams(window.location.search);
const courseId = parseInt(urlParams.get("id"), 10);

fetch("./data/courses.json")
    .then((response) => response.json())
    .then((courses) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) {
            document.querySelector("main").innerHTML = "<p>Not found.</p>";
            return;
        }

        const main = document.querySelector("main");
        main.innerHTML = `
			<article class="course-detail">
				<h3>${course.title}</h3>
				<img src="${course.image}" alt="${course.title}" />
				<p><strong>Instructor:</strong> ${course.instructor}</p>
				<p><strong>Duration:</strong> ${course.duration}</p>
				<p><strong>Level:</strong> ${course.level}</p>
				<p><strong>Language:</strong> ${course.language}</p>
				<p><strong>Lessons:</strong> ${course.lessons}</p>
				<p><strong>Format:</strong> ${course.format}</p>
				<p><strong>Price:</strong> ${course.price}</p>
				<p><strong>Description:</strong> ${course.description}</p>
			</article>
			`;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
