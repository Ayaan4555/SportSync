const SportCategory = require('../models/sportCategoryModel');

// @desc    Create a new sport category
// @route   POST /api/admin/sport-categories
// @access  Private/Admin
const createSportCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const exists = await SportCategory.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const category = await SportCategory.create({ name });
    res.status(201).json({ message: 'Category created', category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all sport categories
// @route   GET /api/admin/sport-categories
const getAllSportCategories = async (req, res) => {
  try {
    const categories = await SportCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a sport category
// @route   PUT /api/admin/sport-categories/:id
const updateSportCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await SportCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;
    const updated = await category.save();

    res.json({ message: 'Category updated', category: updated });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a sport category
// @route   DELETE /api/admin/sport-categories/:id
const deleteSportCategory = async (req, res) => {
  try {
    const category = await SportCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.deleteOne();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createSportCategory,
  getAllSportCategories,
  updateSportCategory,
  deleteSportCategory,
};