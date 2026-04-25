const express = require("express")

// Required imports
var cors = require('cors')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const Student = require('./models/students')
const Course = require('./models/courses')
const Instructor = require('./models/instructors')
app.use(cors())
app.use(bodyParser.json())

// Gets all of the students from the DB
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

// Gets all of the courses from the DB
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

// Get a single course from the DB
router.get("/courses/:id", async(req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.json(course)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

// Add a course to the DB
router.post("/courses", async(req, res) => {
    try {
        const course = await new Course(req.body)
        await course.save()
        res.status(201).json(course)
        console.log("Successfully added course.")
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// Edit a selected course
router.put("/courses/:id", async(req, res) => {
    try {
        const course = req.body
        await Course.updateOne({_id: req.params.id}, course)
        console.log(course)
        res.sendStatus(204)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// Get the instructor list from the DB
router.get("/instructors", async(req, res) => {
    try {
        const instrcutors = await Instructor.find({})
        res.send(instrcutors)
        console.log("Instructor list: " + instrcutors)
    }
    catch (er) {
        console.log(err)
    }
})

app.use("/api", router)
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})