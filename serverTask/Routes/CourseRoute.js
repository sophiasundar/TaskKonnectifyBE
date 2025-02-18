const express = require('express');
const {createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../Controllers/CourseController');
const roleMiddleware = require('../Middleware/Role');
const { authenticate } = require('../Middleware/Authentication')


const router = express.Router();

  //create course
router.post('/createcourse', authenticate,  roleMiddleware("tutor"), createCourse);

 //get all course
router.get('/getallcourses', authenticate, getAllCourses);

 //get course by id
 router.get('/getcourse/:id', authenticate,  getCourseById );

 // edit course
router.put('/editcourse/:id', authenticate, roleMiddleware('tutor'), updateCourse);

 // delete course
router.delete('/deletecourse/:id', authenticate, roleMiddleware('tutor'), deleteCourse);




module.exports = router;