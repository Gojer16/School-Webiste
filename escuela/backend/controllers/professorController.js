const Professor = require('../models/Professor');

const professorController = {
  // Get all active professors
  getAllActiveProfessors: async (req, res) => {
    try {
      const professors = await Professor.findAll({
        where: { active: true },
        order: [['name', 'ASC']]
      });
      res.json(professors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching professors', error: error.message });
    }
  },

  // Add a new professor
  addProfessor: async (req, res) => {
    try {
      const { name, specialty, email, photoUrl } = req.body;
      const professor = await Professor.create({
        name,
        specialty,
        email,
        photoUrl,
        active: true
      });
      res.status(201).json(professor);
    } catch (error) {
      res.status(400).json({ message: 'Error creating professor', error: error.message });
    }
  },

  // Update professor status
  updateProfessorStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { active } = req.body;
      const professor = await Professor.findByPk(id);
      if (!professor) {
        return res.status(404).json({ message: 'Professor not found' });
      }
      await professor.update({ active });
      res.json(professor);
    } catch (error) {
      res.status(400).json({ message: 'Error updating professor status', error: error.message });
    }
  }
};

module.exports = professorController;