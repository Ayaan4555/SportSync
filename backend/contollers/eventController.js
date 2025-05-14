const Event = require('../models/eventModel');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (requires authentication)
const createEvent = async (req, res) => {
  try {

    

    const { name, description, date, location , category,city,area,} = req.body;

    // Validate required fields
    if (!name || !description || !date || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const event = new Event({
      name,
      description,
      date,
      location,
      category,
      city,
      area,
      createdBy: req.user.id,  // Provided by auth middleware
     

      
    });

    const savedEvent = await event.save();

    res.status(201).json({
      message: 'Event created successfully',
      event: savedEvent,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find()
        .populate('category', 'name')
        .populate('city', 'name')
        .populate('area', 'name')
        .populate('createdBy', 'name email');
  
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getMyEvents = async (req, res) => {
    try {
      const events = await Event.find({ createdBy: req.user.id })
        .populate('category', 'name')
        .populate('city', 'name')
        .populate('area', 'name');
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user events' });
    }
  };

  const deleteEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await event.deleteOne();
      res.json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id)
        .populate('category', 'name')
        .populate('city', 'name')
        .populate('area', 'name');
  
      if (!event) return res.status(404).json({ message: 'Event not found' });
      if (event.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const updateEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      if (event.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      const { name, description, date, location, category, city, area } = req.body;
      event.name = name;
      event.description = description;
      event.date = date;
      event.location = location;
      event.category = category;
      event.city = city;
      event.area = area;
  
      const updated = await event.save();
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


module.exports = {
  createEvent,
  getAllEvents,
  getMyEvents,
  deleteEvent,
  getEventById,
  updateEvent,
};
