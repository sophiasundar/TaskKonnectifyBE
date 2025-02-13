const express = require('express');
const {registerUser, loginUser } = require('../Controllers/UserController');


const router = express.Router();

  //register user
router.post('/register', registerUser);

  //login user
router.post('/login', loginUser);




module.exports = router;