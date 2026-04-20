addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("http://localhost:3000/api/courses")
    const courses = await response.json()

    let html = ""
    for (let course of courses ) {
        html+= `<option value=${course.courseNum}>${course.courseNum}</option>`
    }

    document.querySelector("#courseList").innerHTML += html;
})

