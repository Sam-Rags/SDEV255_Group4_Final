addEventListener("DOMContentLoaded", async function() {
    const urlparm = new URLSearchParams(window.location.search)
    const courseID = urlparm.get('id')
    console.log(courseID)

    const response = await fetch("https://sdev255-group4-final.onrender.com/api/courses/" + courseID)
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