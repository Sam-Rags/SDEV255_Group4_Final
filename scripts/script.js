addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("https://sdev255-group4-final.onrender.com/api/courses")
    const courses = await response.json()

    let html = ""
    for (let course of courses) {
        let courseID = course._id
        html +=`<li>${course.courseNumber} - ${course.courseName} - <a href="course-details.html?id=${courseID}">Details</a> - <a href="edit-course.html?id=${courseID}">Edit</a> </li>`
    }

    document.querySelector("#courseList").innerHTML = html;
<<<<<<< HEAD
})
=======
})
>>>>>>> 95fb4a1fd6423d6858135cf1ccdc214c6b5c5b14
