const express = require('express');
const router = express.Router();
const SportCategory = require('../models/sportCategoryModel');
const City = require('../models/cityModel');
const Area = require('../models/areaModel');

// Public GET for categories
router.get('/sport-categories', async (req, res) => {
  const categories = await SportCategory.find();
  res.json(categories);
});

// Public GET for cities
router.get('/cities', async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

// Public GET for areas
router.get('/areas', async (req, res) => {
  const areas = await Area.find();
  res.json(areas);
});

module.exports = router;