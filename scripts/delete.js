async function deleteCourse(id, courseName) {
    console.log("Deleting ID:", id);
    if (!confirm(`Delete "${courseName}"?`)) return;

    try {
        const response = await fetch(`https://sdev255-group4-final.onrender.com/api/courses/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        if (!response.ok) {
            alert("Failed to delete course. Please try again.");
            console.log(`"Response status: " + ${response.status}`)
            return;
        }

        document.getElementById(`course-${id}`)?.remove();

    } catch (err) {
        console.error("Delete error:", err);
        alert("Server error. Please check your connection.");
    }
}