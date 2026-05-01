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
        const res = await fetch("https://sdev255-group4-final.onrender.com/api/courses")
        const courses = await res.json()

        document.getElementById("totalCourses").textContent = courses.length

        const role = localStorage.getItem("role")
        const token = localStorage.getItem("token")

        const list = document.getElementById("courseList")
        list.innerHTML = ""

        courses.forEach(course => {
            const div = document.createElement("div")
            div.className = "course-card"

            div.innerHTML = `
                <h3>${course.courseName}</h3>
                <p><strong>Course #:</strong> ${course.courseNumber}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p>${course.description}</p>
            `

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
async function addToSchedule(courseId) {
    const token = localStorage.getItem("token")
    if (!token) return alert("You must be logged in")

    try {
        const res = await fetch(`https://sdev255-group4-final.onrender.com/api/schedule/add/${courseId}`, {
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
