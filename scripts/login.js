document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()

    try {
        const res = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })

        let data = {}
        try {
            data = await res.json()
        } catch {}

        if (!res.ok) {
            alert(data.message || "Login failed")
            return
        }

        localStorage.setItem("token", data.token)
        localStorage.setItem("role", data.role)
        localStorage.setItem("username", data.username)

        alert("Login successful!")
        window.location.href = "index.html"
    } catch (err) {
        console.error(err)
        alert("Error logging in")
    }
})