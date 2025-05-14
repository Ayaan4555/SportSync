const Area = require('../models/areaModel');
const City = require('../models/cityModel');

// @desc    Create a new area
// @route   POST /api/admin/areas
// @access  Private/Admin
const createArea = async (req, res) => {
  try {
    const { name, city } = req.body;

    if (!name || !city) {
      return res.status(400).json({ message: 'Name and City are required' });
    }

    // Ensure the city exists
    const existingCity = await City.findById(city);
    if (!existingCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    const area = await Area.create({ name, city });

    res.status(201).json({ message: 'Area created', area });
  } catch (error) {
    console.error('Error creating area:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all areas with city info
// @route   GET /api/admin/areas
// @access  Private/Admin
const getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find().populate('city', 'name').sort({ name: 1 });
    res.json(areas);
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update an area
// @route   PUT /api/admin/areas/:id
// @access  Private/Admin
const updateArea = async (req, res) => {
  try {
    const { name, city } = req.body;

    const area = await Area.findById(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    if (city) {
      const cityExists = await City.findById(city);
      if (!cityExists) {
        return res.status(404).json({ message: 'City not found' });
      }
      area.city = city;
    }

    area.name = name || area.name;

    const updatedArea = await area.save();

    res.json({ message: 'Area updated', area: updatedArea });
  } catch (error) {
    console.error('Error updating area:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an area
// @route   DELETE /api/admin/areas/:id
// @access  Private/Admin
const deleteArea = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);

    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    await area.deleteOne();
    res.json({ message: 'Area deleted' });
  } catch (error) {
    console.error('Error deleting area:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createArea,
  getAllAreas,
  updateArea,
  deleteArea,
};