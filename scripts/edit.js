addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#updateCourse").addEventListener("click", updateCourse)
    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get('id')
    const response = await fetch("http://localhost:3000/api/courses/" + courseID)

    if (response.ok) {
        let course = await response.json()
        document.querySelector("#courseId").value = course._id
        document.querySelector("#courseNum").value = course.courseNumber
        document.querySelector("#courseName").value = course.courseName
        document.querySelector("#credits").value = course.credits
        document.querySelector("#description").value = course.description

    }

    async function updateCourse() {
        event.preventDefault()
        const courseId = document.querySelector("#courseId").value
        const course = {
            courseNumber:   document.querySelector("#courseNum").value,
            courseName:     document.querySelector("#courseName").value,
            credits:        document.querySelector("#credits").value,
            description:    document.querySelector("#description").value
        }
    const response = await fetch("http://localhost:3000/api/courses/" + courseID, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course)
    })

    if (response.ok) {
        alert("Course updated!")
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot update song"
    }

    }
})