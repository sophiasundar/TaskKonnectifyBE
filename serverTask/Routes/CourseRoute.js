const express = require('express');
const { createCourse, getCourses, updateCourse, deleteCourse } = require('../Controllers/UserController');
const roleMiddleware = require('../Middleware/Role');
const authenticate = require('../Middleware/Authentication')


const router = express.Router();

  //create course
router.post('/createcourse', authenticate, roleMiddleware(['tutor']),  createCourse);

  //get course
router.get('/getallcourses', authenticate, roleMiddleware(['tutor', 'student']), getCourses);

//edit course
router.put('/editcourse', authenticate, roleMiddleware(['tutor']), updateCourse);

//delete course
router.delete('/deletecourse', authenticate, roleMiddleware(['tutor']), deleteCourse);




module.exports = router;