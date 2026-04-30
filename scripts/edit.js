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

    async function deleteCourse() {
        event.preventDefault()
        if (confirm("Are you sure?")) {
            
            const courseId = document.querySelector("#courseId").value
            const course = {
            courseNumber:   document.querySelector("#courseNum").value,
            courseName:     document.querySelector("#courseName").value,
            credits:        document.querySelector("#credits").value,
            description:    document.querySelector("#description").value
        }

            const response = await fetch("https://sdev255-group4-final.onrender.com/api/courses/" + courseID, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
            }
                
            })
            alert("Course: " + courseID + " successfully deleted.")
            document.querySelector("form").reset()
        }
        else {
            alert("Delete cancelled")
        }
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
        document.querySelector("#error").innerHTML = "Cannot update course"
    }

    }
})