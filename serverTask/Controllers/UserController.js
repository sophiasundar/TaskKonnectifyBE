const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
       // Create new user
       const newUser = new User({
          name,
          email,
          password: hashedPassword,
          role
        });
    
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
};

exports.loginUser = async (req, res) => {
 
   try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).send("Invalid Credentials!");
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).send("Invalid Credentials!");
        }
    
        const token = jwt.sign(
          { id: user._id },
          process.env.SECRET_KEY
        );
        res.json({  message: "Successfully Logged In", token : token} );
      } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: error.message });
      }
  
};
