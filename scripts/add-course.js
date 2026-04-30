addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addCourse").addEventListener("click", addCourse)
})

async function addCourse() {
    event.preventDefault()
    // create a course object based on the form submitted by the user in add-course.html
    const course = {
        courseNumber:   document.querySelector("#courseNum").value,
        courseName:     document.querySelector("#courseName").value,
        credits:        document.querySelector("#credits").value,
        description:    document.querySelector("#description").value
    }
    // response template from server using POST method
    const response  = await fetch("https://sdev255-group4-final.onrender.com/api/courses/", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body : JSON.stringify(course)
})

// if the song is added, return ok & alert to the new course ID
if (response.ok) {
    const results = await response.json()
    alert("Added course with ID of: " + results._id)

    // Clear the form after the course is added
    document.querySelector("form").reset()
}
else {
    document.querySelector("#error").innerHTML = "Error, cannot add course."
}

}