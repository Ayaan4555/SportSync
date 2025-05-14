const express = require('express');
const router = express.Router();
const { createEvent , getAllEvents , getMyEvents, deleteEvent , getEventById,updateEvent} = require("../contollers/eventController");
const { protect } = require('../middleware/authMiddleware');



// Route: POST /api/events
// Access: Private (only logged-in users can create events)
router.post('/', protect, createEvent);
router.get('/', getAllEvents);
router.get('/my-events', protect, getMyEvents);
router.delete('/:id', protect, deleteEvent);
router.get('/:id', protect, getEventById);
router.put('/:id', protect, updateEvent);



module.exports = router;
