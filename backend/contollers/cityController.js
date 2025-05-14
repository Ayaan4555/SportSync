const City = require('../models/cityModel');

// @desc    Create a new city
// @route   POST /api/admin/cities
// @access  Private/Admin
const createCity = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'City name is required' });
    }

    const existing = await City.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: 'City already exists' });
    }

    const city = await City.create({ name });

    res.status(201).json({ message: 'City created', city });
  } catch (error) {
    console.error('Error creating city:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all cities
// @route   GET /api/admin/cities
// @access  Private/Admin
const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 });
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a city
// @route   PUT /api/admin/cities/:id
// @access  Private/Admin
const updateCity = async (req, res) => {
  try {
    const { name } = req.body;
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    city.name = name || city.name;
    const updatedCity = await city.save();

    res.json({ message: 'City updated', city: updatedCity });
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a city
// @route   DELETE /api/admin/cities/:id
// @access  Private/Admin
const deleteCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    await city.deleteOne();
    res.json({ message: 'City deleted' });
  } catch (error) {
    console.error('Error deleting city:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCity,
  getAllCities,
  updateCity,
  deleteCity,
};