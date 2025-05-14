const express = require('express');
const router = express.Router();

const {
  createArea,
  getAllAreas,
  updateArea,
  deleteArea,
} = require('../contollers/areaController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// All routes under /api/admin/areas
router.post('/', protect, isAdmin, createArea);       // Create
router.get('/', protect, isAdmin, getAllAreas);       // Read all
router.put('/:id', protect, isAdmin, updateArea);     // Update
router.delete('/:id', protect, isAdmin, deleteArea);  // Delete

module.exports = router;