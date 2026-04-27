async function deleteCourse(id, courseName) {
    console.log("Deleting ID:", id);
    if (!confirm(`Delete "${courseName}"?`)) return;

    try {
        const response = await fetch(`https://module6-project.onrender.com/api/courses/${id}`,  {
            method: "DELETE"
        });

        if (!response.ok) {
            alert("Failed to delete course. Please try again.");
            return;
        }

        document.getElementById(`course-${id}`)?.remove();

    } catch (err) {
        console.error("Delete error:", err);
        alert("Server error. Please check your connection.");
    }
}