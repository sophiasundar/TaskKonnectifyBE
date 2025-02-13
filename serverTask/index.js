const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');



require("dotenv").config();

const userRoutes = require('./Routes/UserRoute.js');
const courseRoutes = require('./Routes/CourseRoute.js');



const app = express();
app.use(cors());
app.use(express.json());
// Middleware
app.use(bodyParser.json());






app.get('/',(req,res)=>{
  res.send('Hey! Hi, 🙋‍♀️👋🙌🏽🙏🏽');
});

// Routes

//userRoute
app.use('/api/users', userRoutes);

//courseRoute
app.use('/api/course', courseRoutes);




mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(()=>{
    console.log("MongoDB Connected successfully!!");
    app.listen(8000, () => {
      console.log(`Server is running on port 8000`);
    });
})