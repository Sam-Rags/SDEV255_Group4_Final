const express = require("express")

var cors = require('cors')
const app = express()
const router = express.Router()
app.use(cors())

router.get("/courses", function(req, res) {
    const courses = [
        {
            courseNum : "SDEV255",
            courseName : "Web Application Development",
            credits : 3,
            description : "Students will work together in teams to create a web app."
        },
        {
            courseNum : "SDEV260",
            courseName : "iOS Swift Application Development",
            credits : 3,
            description : "Students will build a foundation in programming fundamentals using Swift."
        },
        {
             courseNum : "SDEV265",
            courseName : "iOS Swift Application Development",
            credits : 3,
            description : "Students will build a foundation in programming fundamentals using Swift."
        }
    ]

    res.json(courses)
})

app.use("/api", router)
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})