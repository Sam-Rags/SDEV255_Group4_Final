let courses = JSON.parse(localStorage.getItem("courses")) || [];

/* 🔹 ADD COURSE PAGE */
const form = document.getElementById("courseForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const course = {
            num: document.getElementById("courseNum").value,
            name: document.getElementById("courseName").value,
            credits: document.getElementById("credits").value,
            desc: document.getElementById("description").value
        };

        courses.push(course);

        localStorage.setItem("courses", JSON.stringify(courses));

        alert("Course added!");

        window.location.href = "index.html";
    });
}

/* 🔹 COURSE LIST PAGE */
const courseList = document.getElementById("courseList");

if (courseList) {
    displayCourses();
}

function displayCourses() {
    courseList.innerHTML = "";

    courses.forEach((course, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${course.num}</strong> - ${course.name} (${course.credits})
            <br>${course.desc}
            <br>
            <button onclick="deleteCourse(${index})">Delete</button>
        `;

        courseList.appendChild(li);
    });
}

function deleteCourse(index) {
    courses.splice(index, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses();
}