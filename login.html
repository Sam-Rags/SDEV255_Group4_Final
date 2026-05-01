document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    try {
        const res = await fetch("https://sdev255-group4-final.onrender.com/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })

        const data = await res.json()

        if (!res.ok) {
            alert(data.message || "Login failed")
            return
        }

        // Save token + role + username
        localStorage.setItem("token", data.token)
        localStorage.setItem("role", data.role)
        localStorage.setItem("username", data.username)

        alert("Login successful!")

        // Redirect to homepage (or wherever your main UI is)
        window.location.href = "index.html"
    }
    catch (err) {
        console.error(err)
        alert("Error logging in")
    }
})
