addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("https://module6-project.onrender.com/api/courses");
        const courses = await response.json();
        // MOCK date
        // const courses = [
        //     { _id: "1", courseNumber: "SDEV255", courseName: "Web Development" },
        //     { _id: "2", courseNumber: "SDEV210", courseName: "Database Design" },
        //     { _id: "3", courseNumber: "SDEV150", courseName: "Intro to Programming" },
        // ];

        const list = document.querySelector("#courseList");

        if (courses.length === 0) {
            list.innerHTML = "<p>No courses found.</p>";
            return;
        }

        document.getElementById("totalCourses").textContent = courses.length;

        list.innerHTML = courses.map(course => `
            <li id="course-${course._id}">
                ${course.courseNumber} - ${course.courseName}
                - <a href="course-details.html?id=${course._id}">Details</a>
                - <a href="edit-course.html?id=${course._id}">Edit</a>
                - <button onclick="deleteCourse('${course._id}', '${course.courseNumber}')">Delete</button>
            </li>
        `).join("");

    } catch (err) {
        console.error("Failed to load courses:", err);
        document.querySelector("#courseList").innerHTML = "<p>Error loading courses.</p>";
    }
});