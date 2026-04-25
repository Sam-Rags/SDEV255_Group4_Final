const db = require("../db");

const Course = db.model("Course", {
    // TODO finalize Course model
    courseName:     {type:String, required:true},
    credits:        {type:Number, min:1, max:4},
    instructor:     {type:String},
});

module.exports = Course;