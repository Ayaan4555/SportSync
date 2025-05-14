const express = require('express');
const router = express.Router();

const {
  createSportCategory,
  getAllSportCategories,
  updateSportCategory,
  deleteSportCategory,
} = require('../contollers/sportCategoryController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// All routes under /api/admin/sport-categories
router.post('/', protect, isAdmin, createSportCategory);       // Create
router.get('/', protect, isAdmin, getAllSportCategories);      // Read all
router.put('/:id', protect, isAdmin, updateSportCategory);     // Update
router.delete('/:id', protect, isAdmin, deleteSportCategory);  // Delete

module.exports = router;