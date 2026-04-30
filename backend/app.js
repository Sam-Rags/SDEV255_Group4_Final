const express = require("express")

// Required imports
var cors = require('cors')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const Student = require('./models/students')
const Course = require('./models/courses')
const Instructor = require('./models/instructors')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("./models/users")
const auth = require("./scripts/auth")
require("dotenv").config()
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

//Register a new user to the DB with hashed password
router.post("/register", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            username: req.body.username,
            password: hashedPassword
        })

        await user.save()
        res.status(201).json({ message: "User registered successfully" })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Login a user and return a JWT token
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return res.status(401).json({ message: "Invalid username" })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.json({ token })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
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
router.post("/courses", auth, async(req, res) => {
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

// Delete a course by ID
router.delete("/courses/:id", async(req, res) => {
    try {
        const mongoose = require('mongoose');

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const result = await Course.deleteOne({_id: req.params.id})
        if (result.deletedCount === 0) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }
    catch (err) {
        console.log("Delete error:", err.message) // <-- посмотри что выводит сервер
        res.status(400).send(err.message)
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
    console.log("Server is running on https://sdev255-group4-final.onrender.com/")
})