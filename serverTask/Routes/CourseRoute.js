const express = require('express');
const {createCourse, getCourses, updateCourse, deleteCourse } = require('../Controllers/CourseController');
const roleMiddleware = require('../Middleware/Role');
const { authenticate } = require('../Middleware/Authentication')


const router = express.Router();
console.log(createCourse)
  //create course
router.post('/createcourse', authenticate, roleMiddleware(['tutor', 'student']), createCourse);

  //get course
router.get('/getallcourses', authenticate, roleMiddleware(['tutor', 'student']), getCourses);

// // //edit course
router.put('/editcourse/:id', authenticate, roleMiddleware(['tutor']), updateCourse);

// // //delete course
router.delete('/deletecourse/:id', authenticate, roleMiddleware(['tutor']), deleteCourse);




module.exports = router;