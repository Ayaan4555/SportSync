const express = require('express');
const router = express.Router();

const {
  createCity,
  getAllCities,
  updateCity,
  deleteCity,
} = require('../contollers/cityController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// All routes under /api/admin/cities
router.post('/', protect, isAdmin, createCity);       // Create
router.get('/', protect, isAdmin, getAllCities);      // Read all
router.put('/:id', protect, isAdmin, updateCity);     // Update
router.delete('/:id', protect, isAdmin, deleteCity);  // Delete

module.exports = router;