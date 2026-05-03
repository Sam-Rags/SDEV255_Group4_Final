document.addEventListener("DOMContentLoaded", () => {
    applyRoleUI()
    loadSchedule()
})

function applyRoleUI() {
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token")

    // Only students can view this page
    if (!token || role !== "student") {
        alert("Students only. Please log in as a student.")
        window.location.href = "login.html"
        return
    }

    // Hide Add Course link for students
    const addCourseLink = document.getElementById("addCourseLink")
    if (role !== "teacher") addCourseLink.style.display = "none"

    // Replace Login with Logout
    const loginLink = document.getElementById("loginLink")
    loginLink.textContent = "Logout"
    loginLink.href = "#"
    loginLink.onclick = logout
}

function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("username")
    window.location.href = "login.html"
}

async function loadSchedule() {
    const token = localStorage.getItem("token")
    const list = document.getElementById("scheduleList")

    try {
        const res = await fetch(`${API_URL}/api/schedule`, {
            headers: { "Authorization": "Bearer " + token }
        })

        const schedule = await res.json()

        if (!Array.isArray(schedule) || schedule.length === 0) {
            list.innerHTML = "<p>You are not enrolled in any courses.</p>"
            return
        }

        list.innerHTML = ""

        schedule.forEach(course => {
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

            // Drop button
            const dropBtn = document.createElement("button")
            dropBtn.textContent = "Drop Course"
            dropBtn.onclick = () => dropCourse(course._id)
            div.appendChild(dropBtn)

            list.appendChild(div)
        })
    }
    catch (err) {
        console.error(err)
        list.innerHTML = "<p>Error loading schedule.</p>"
    }
}

async function dropCourse(courseId) {
    const token = localStorage.getItem("token")

    if (!confirm("Are you sure you want to drop this course?")) return

    try {
        const res = await fetch(`${API_URL}/api/schedule/drop/${courseId}`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + token }
        })

        const data = await res.json()
        alert(data.message)

        loadSchedule()
    }
    catch (err) {
        console.error(err)
        alert("Error dropping course")
    }
}