const Course = require('../Models/CourseModel');
// const User = require('../Models/userModel');


// Create a new course (Only Tutors)
exports.createCourse = async (req, res) => {
    try {
        const { title, duration, topics, price } = req.body;

        // Ensure only tutors can create courses
        if (req.user.role !== "tutor") {
            return res.status(403).json({ message: "Only tutors can create courses" });
        }

        const newCourse = new Course({
            title,
            duration,
            topics,
            price,
            tutor: req.user._id, // Assign logged-in tutor as course creator
        });

        await newCourse.save();
        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all courses (Both Students & Tutors)
exports.getAllCourses = async (req, res) => {
  try {
      const courses = await Course.find().populate("tutor", "name email"); // Populate tutor details
      res.status(200).json(courses);
  } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get a single course by ID (Both Students & Tutors)
exports.getCourseById = async (req, res) => {
  try {
      const course = await Course.findById(req.params.id).populate("tutor", "name email");
      if (!course) {
          return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
  } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a course (Only Tutors who created the course)
exports.updateCourse = async (req, res) => {
  try {
      const { title, duration, topics, price } = req.body;
      const course = await Course.findById(req.params.id);

      if (!course) {
          return res.status(404).json({ message: "Course not found" });
      }

      // Ensure only the tutor who created the course can update it
      if (req.user.role !== "tutor" || course.tutor.toString() !== req.user._id) {
          return res.status(403).json({ message: "Only the course creator can update this course" });
      }

      // Update course fields
      course.title = title || course.title;
      course.duration = duration || course.duration;
      course.topics = topics || course.topics;
      course.price = price || course.price;
      course.updatedAt = Date.now();

      await course.save();
      res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Delete a course (Only Tutors who created the course)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Ensure only the tutor who created the course can delete it
        if (req.user.role !== "tutor" || course.tutor.toString() !== req.user._id) {
            return res.status(403).json({ message: "Only the course creator can delete this course" });
        }

        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




