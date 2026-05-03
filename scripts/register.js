document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    const role = document.getElementById("role").value

    try {
        const res = await fetch("https://sdev255-group4-final.onrender.com/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role })
        })

        let data = {}
        try {
            data = await res.json()
        } catch {}

        if (!res.ok) {
            alert(data.message || "Registration failed")
            return
        }

        alert("Registration successful! You can now log in.")
        window.location.href = "login.html"
    } catch (err) {
        console.error(err)
        alert("Error registering user")
    }
})