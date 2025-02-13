const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  topics: [
    {
    type: String,
    required: true,
    }
],
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;