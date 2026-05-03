addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#updateCourse").addEventListener("click", updateCourse)
    document.querySelector("#deleteCourse").addEventListener("click", deleteCourse)
    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get('id')
    const response = await fetch("https://sdev255-group4-final.onrender.com/api/courses/" + courseID)

    if (response.ok) {
        let course = await response.json()
        document.querySelector("#courseId").value = course._id
        document.querySelector("#courseNum").value = course.courseNumber
        document.querySelector("#courseName").value = course.courseName
        document.querySelector("#credits").value = course.credits
        document.querySelector("#description").value = course.description
    }

    async function deleteCourse(e) {
        e.preventDefault()
        // Fixed: was using deprecated global 'event'; now receives 'e' as a parameter
        if (confirm("Are you sure?")) {
            const response = await fetch("https://sdev255-group4-final.onrender.com/api/courses/" + courseID, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.ok) {
                alert("Course successfully deleted.")
                window.location.href = "index.html"
                // Fixed: redirects to home instead of resetting the form — the course no longer exists
            } else {
                alert("Failed to delete course.")
            }
        }
        else {
            alert("Delete cancelled")
        }
    }

    async function updateCourse(e) {
        e.preventDefault()
        // Fixed: was using deprecated global 'event'; now receives 'e' as a parameter
        const course = {
            courseNumber:   document.querySelector("#courseNum").value,
            courseName:     document.querySelector("#courseName").value,
            credits:        document.querySelector("#credits").value,
            description:    document.querySelector("#description").value
        }

        const response = await fetch("https://sdev255-group4-final.onrender.com/api/courses/" + courseID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(course)
        })

        if (response.ok) {
            alert("Course updated!")
        }
        else {
            document.querySelector("#error").textContent = "Cannot update course"
            // Fixed: was using innerHTML for static text; textContent is sufficient and safer
        }
    }
})