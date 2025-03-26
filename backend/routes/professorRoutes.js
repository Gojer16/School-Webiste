const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');
const { protect: verifyToken, admin: isAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/professors')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// Get all active professors
router.get('/', async (req, res) => {
  try {
    const professors = await Professor.findAll({
      where: { active: true },
      attributes: ['id', 'name', 'specialty', 'email', 'photoUrl']
    });
    res.json(professors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new professor (admin only)
router.post('/', verifyToken, isAdmin, upload.single('photo'), async (req, res) => {
  try {
    const { name, specialty, email } = req.body;
    const photoUrl = req.file ? `/uploads/professors/${req.file.filename}` : null;

    const professor = await Professor.create({
      name,
      specialty,
      email,
      photoUrl
    });

    res.status(201).json(professor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a professor (admin only)
router.put('/:id', verifyToken, isAdmin, upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialty, email } = req.body;
    const updateData = { name, specialty, email };

    if (req.file) {
      updateData.photoUrl = `/uploads/professors/${req.file.filename}`;
    }

    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    await professor.update(updateData);
    res.json(professor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a professor (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Professor.findByPk(id);
    
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    await professor.update({ active: false });
    res.json({ message: 'Professor removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;