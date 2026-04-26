const db = require("../db");

const Course = db.model("Course", {
    // TODO finalize Course model
    courseNumber:   {type:String},
    courseName:     {type:String, required:true},
    credits:        {type:Number, min:1, max:4},
    description:    {type:String}
    
});

module.exports = Course;