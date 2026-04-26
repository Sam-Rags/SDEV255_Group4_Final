addEventListener("DOMContentLoaded", async function() {
    const urlparm = new URLSearchParams(window.location.search)
    const courseID = urlparm.get('id')
    console.log(courseID)

    const response = await fetch("http://localhost:3000/api/courses/" + courseID)
    const course = await response.json()
    console.log(course)

    let heading = ""
    heading += `${course.courseName}`
    document.querySelector("#courseName").innerHTML = heading

    let html = ""
    html += `
        <h3>Course Number - ${course.courseNumber} </h3>
        <p>Credits - ${course.credits} </p>
        <p>Description - ${course.description} </p>
    `
    document.querySelector("#details").innerHTML = html
})