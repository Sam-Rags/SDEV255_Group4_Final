addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("http://localhost:3000/api/courses")
    const courses = await response.json()

    let html = ""
    for (let course of courses) {
        let courseID = course._id
        html +=`<li>${course.courseNumber} - ${course.courseName} - <a href="course-details.html?id=${courseID}">Details</a> - <a href="edit-course.html?id=${courseID}">Edit</a> </li>`
    }

    document.querySelector("#courseList").innerHTML = html;
})