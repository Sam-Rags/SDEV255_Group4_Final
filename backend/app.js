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
const { requireRole } = require("./scripts/auth")
const mongoose = require("mongoose")
require("dotenv").config()

app.use(cors())
app.use(bodyParser.json())

// Gets all of the students from the DB
router.get("/students", async (req, res) => {
    try {
        const students = await Student.find({})
        res.send(students)
        console.log("Student list: " + students)
    }
    catch (err) {
        console.log(err)
    }   
})

/**
 * REGISTER
 * Requires: username, password, role ("student" or "teacher")
 */
router.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body

        if (!username || !password || !role) {
            return res.status(400).json({ message: "username, password, and role are required" })
        }

        if (!["student", "teacher"].includes(role)) {
            return res.status(400).json({ message: "role must be 'student' or 'teacher'" })
        }

        const existing = await User.findOne({ username })
        if (existing) {
            return res.status(400).json({ message: "Username already taken" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            password: hashedPassword,
            role
        })

        await user.save()
        res.status(201).json({ message: "User registered successfully" })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ error: err.message })
    }
})

/**
 * LOGIN
 * Returns: token + role + username
 * JWT payload: { userId, role }
 */
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ message: "Invalid username" })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.json({
            token,
            role: user.role,
            username: user.username
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})

// Gets all of the courses from the DB
router.get("/courses", async (req, res) => {
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
router.get("/courses/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.json(course)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

/**
 * TEACHER-ONLY: Add a course to the catalog
 */
router.post("/courses", auth, requireRole("teacher"), async (req, res) => {
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

/**
 * TEACHER-ONLY: Edit a selected course
 */
router.put("/courses/:id", auth, requireRole("teacher"), async (req, res) => {
    try {
        const course = req.body
        await Course.updateOne({ _id: req.params.id }, course)
        console.log(course)
        res.sendStatus(204)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

/**
 * TEACHER-ONLY: Delete a course by ID
 */
router.delete("/courses/:id", auth, requireRole("teacher"), async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" })
        }

        const result = await Course.deleteOne({ _id: req.params.id })
        if (result.deletedCount === 0) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }
    catch (err) {
        console.log("Delete error:", err.message)
        res.status(400).send(err.message)
    }
})

/**
 * STUDENT: Get my schedule
 */
router.get("/schedule", auth, requireRole("student"), async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate("schedule")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user.schedule)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})

/**
 * STUDENT: Add a course to my schedule
 */
router.post("/schedule/add/:courseId", auth, requireRole("student"), async (req, res) => {
    try {
        const { courseId } = req.params

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid course ID" })
        }

        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        const user = await User.findById(req.user.userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Avoid duplicates
        if (user.schedule.some(id => id.toString() === courseId)) {
            return res.status(400).json({ message: "Course already in schedule" })
        }

        user.schedule.push(courseId)
        await user.save()

        res.status(200).json({ message: "Course added to schedule" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})

/**
 * STUDENT: Drop a course from my schedule
 */
router.delete("/schedule/drop/:courseId", auth, requireRole("student"), async (req, res) => {
    try {
        const { courseId } = req.params

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid course ID" })
        }

        const user = await User.findById(req.user.userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const before = user.schedule.length
        user.schedule = user.schedule.filter(id => id.toString() !== courseId)

        if (user.schedule.length === before) {
            return res.status(404).json({ message: "Course not in schedule" })
        }

        await user.save()
        res.status(200).json({ message: "Course dropped from schedule" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})

// Get the instructor list from the DB
router.get("/instructors", async (req, res) => {
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
