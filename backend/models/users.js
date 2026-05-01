const db = require("../db")
const mongoose = require("mongoose")

const User = db.model("User", {
    username: { type: String, required: true },
    password: { type: String, required: true },

    // NEW: student or teacher
    role: { 
        type: String, 
        enum: ["student", "teacher"], 
        required: true 
    },

    // NEW: schedule for students
    schedule: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
    ]
})

module.exports = User
