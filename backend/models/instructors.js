const db = require("../db");

const Instructor = db.model("Instructor", {
    // TODO finalize Course model
    instructorName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = Instructor;