// Resolved merge conflict: kept the version that sends the auth token, required by the backend
async function deleteCourse(id, courseName) {
    const token = localStorage.getItem("token")
    if (!token) return alert("You must be logged in")

    if (!confirm(`Delete "${courseName}"?`)) return

    try {
        const res = await fetch(`https://module6-project.onrender.com/api/courses/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        if (!res.ok) {
            alert("Failed to delete course")
            return
        }

        alert("Course deleted")
        location.reload()
    }
    catch (err) {
        console.error(err)
        alert("Server error")
    }
}