addEventListener("DOMContentLoaded", function() {
    // Listen on form submit instead of button click so the event is always passed correctly
    document.querySelector("form").addEventListener("submit", addCourse)
})

async function addCourse(e) {
    e.preventDefault()
    // Fixed: was using the deprecated global 'event' object; now receives 'e' as a parameter
    const course = {
        courseNumber:   document.querySelector("#courseNum").value,
        courseName:     document.querySelector("#courseName").value,
        credits:        document.querySelector("#credits").value,
        description:    document.querySelector("#description").value
    }

    const response = await fetch("https://module6-project.onrender.com/api/courses/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(course)
    })

    if (response.ok) {
        const results = await response.json()
        alert("Added course with ID of: " + results._id)
        document.querySelector("form").reset()
    }
    else {
        document.querySelector("#error").textContent = "Error, cannot add course."
        // Fixed: was using innerHTML for static text; textContent is sufficient and safer
    }
}