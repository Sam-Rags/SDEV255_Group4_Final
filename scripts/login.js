document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const res = await fetch("https://sdev255-group4-final.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (data.token) {
        localStorage.setItem("token", data.token)
        alert("Login successful")
        window.location.href = "index.html"
    } else {
        alert("Login failed")
    }
})
