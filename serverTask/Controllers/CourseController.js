const Course = require('../Models/CourseModel');


// get course (tutor, student)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    // .populate('title', 'duration')
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
    
   

  // create course  tutor
  exports.createCourse = async (req, res) => {
    const { title, duration, topics, price } = req.body;
  
    try {

        const course = new Course({ title, duration, topics, price  });
        await course.save();
        res.status(201).send("Course Added Succesfully");

      
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

// Update the course
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, duration, topics, price } = req.body;

  try {
    const updatedCourse= await Course.findByIdAndUpdate(
      id,
      { title, duration, topics, price , updatedAt: Date.now() },
      { new: true }
    )

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an Course (tutor only)
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



