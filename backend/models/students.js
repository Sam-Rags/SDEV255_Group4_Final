const db = require("../db");

const Student = db.model("Student", {
    // TODO finalize model for Student
    firstName:      {type:String, required:true},
    lastName:       {type:String, required:true},

});

module.exports = Student;