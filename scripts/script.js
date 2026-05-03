// Load courses on page load
document.addEventListener("DOMContentLoaded", () => {
    loadCourses()
    applyRoleUI()
})

function applyRoleUI() {
    const role = localStorage.getItem("role")

    // Hide Add Course button if not teacher
    const addCourseLinks = document.querySelectorAll('a[href="add-course.html"]')
    addCourseLinks.forEach(link => {
        if (role !== "teacher") link.style.display = "none"
    })

    // Add logout button if logged in
    const nav = document.querySelector(".nav-links")
    if (localStorage.getItem("token")) {
        const logoutBtn = document.createElement("a")
        logoutBtn.textContent = "Logout"
        logoutBtn.href = "#"
        logoutBtn.onclick = logout
        nav.appendChild(logoutBtn)
    }
}

function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("username")
    window.location.href = "login.html"
}

async function loadCourses() {
    try {
        const res = await fetch(`${API_URL}/api/courses`)
        const courses = await res.json()

        document.getElementById("totalCourses").textContent = courses.length

        const role = localStorage.getItem("role")
        const token = localStorage.getItem("token")

        const list = document.getElementById("courseList")
        list.innerHTML = ""

        courses.forEach(course => {
            const div = document.createElement("div")
            div.className = "course-card"

            // Build card using DOM methods instead of innerHTML to prevent XSS
            const h3 = document.createElement("h3")
            h3.textContent = course.courseName

            const p1 = document.createElement("p")
            const strong1 = document.createElement("strong")
            strong1.textContent = "Course #:"
            p1.appendChild(strong1)
            p1.append(" " + course.courseNumber)

            const p2 = document.createElement("p")
            const strong2 = document.createElement("strong")
            strong2.textContent = "Credits:"
            p2.appendChild(strong2)
            p2.append(" " + course.credits)

            const p3 = document.createElement("p")
            p3.textContent = course.description

            div.appendChild(h3)
            div.appendChild(p1)
            div.appendChild(p2)
            div.appendChild(p3)

            // STUDENT: Add to schedule button
            if (role === "student") {
                const addBtn = document.createElement("button")
                addBtn.textContent = "Add to Schedule"
                addBtn.onclick = () => addToSchedule(course._id)
                div.appendChild(addBtn)
            }

            // TEACHER: Edit + Delete buttons
            if (role === "teacher") {
                const editBtn = document.createElement("a")
                editBtn.href = `edit-course.html?id=${course._id}`
                editBtn.textContent = "Edit"
                editBtn.className = "edit-btn"
                div.appendChild(editBtn)

                const delBtn = document.createElement("button")
                delBtn.textContent = "Delete"
                delBtn.onclick = () => deleteCourse(course._id, course.courseName)
                div.appendChild(delBtn)
            }

            list.appendChild(div)
        })
    }
    catch (err) {
        console.error("Error loading courses:", err)
    }
}

// STUDENT: Add course to schedule
// Resolved merge conflict: kept the correct implementation that POSTs to /api/schedule/add/:id
async function addToSchedule(courseId) {
    const token = localStorage.getItem("token")
    if (!token) return alert("You must be logged in")

    try {
        const res = await fetch(`${API_URL}/api/schedule/add/${courseId}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        const data = await res.json()
        alert(data.message)
    }
    catch (err) {
        console.error(err)
        alert("Error adding course to schedule")
    }
}