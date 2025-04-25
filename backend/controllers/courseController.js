const Course = require('../models/Course');
const { ValidationError, NotFoundError } = require('../errors');
const sanitizeHtml = require('sanitize-html');

const allowedCourseFields = ['title', 'description', 'duration', 'price', 'startDate'];

// Input sanitization function
const sanitizeCourseInput = (input) => {
  return Object.keys(input).reduce((acc, key) => {
    if (allowedCourseFields.includes(key)) {
      acc[key] = sanitizeHtml(input[key], {
        allowedTags: [],
        allowedAttributes: {}
      });
    }
    return acc;
  }, {});
};

exports.getAllCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { count, rows: courses } = await Course.findAndCountAll({
      attributes: ['id', 'title', 'description', 'startDate'],
      limit,
      offset
    });

    res.json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve courses',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!course) throw new NotFoundError('Course not found');
    res.json({ success: true, data: course });
  } catch (error) {
    const statusCode = error instanceof NotFoundError ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      throw new ValidationError('Title and description are required');
    }

    const sanitizedData = sanitizeCourseInput(req.body);
    const course = await Course.create(sanitizedData);
    
    res.status(201).json({
      success: true,
      data: {
        id: course.id,
        title: course.title,
        startDate: course.startDate
      }
    });
  } catch (error) {
    const statusCode = error instanceof ValidationError ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) throw new NotFoundError('Course not found');

    const sanitizedData = sanitizeCourseInput(req.body);
    const updatedCourse = await course.update(sanitizedData);
    
    res.json({
      success: true,
      data: {
        id: updatedCourse.id,
        title: updatedCourse.title,
        description: updatedCourse.description
      }
    });
  } catch (error) {
    const statusCode = error instanceof NotFoundError ? 404 : 400;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) throw new NotFoundError('Course not found');

    await course.destroy();
    res.json({
      success: true,
      message: 'Course scheduled for deletion'
    });
  } catch (error) {
    const statusCode = error instanceof NotFoundError ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};