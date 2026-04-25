const express = require("express")

var cors = require('cors')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const Student = require('./models/students')
const Course = require('./models/courses')
app.use(cors())

router.get("/students", async(req, res) => {
    try {
        const students = await Student.find({})
        res.send(students)
        console.log("Student list: " + students)
    }
    catch (err) {
        console.log(err)
    }   
})

router.get("/courses", async(req, res) => {
    try {
        const courses = await Course.find({})
        res.send(courses)
        console.log("Course list: " + courses)
    }
    catch (err) {
        console.log(err)
    }
})

app.use("/api", router)
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})