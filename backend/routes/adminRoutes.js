const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // adjust path if needed

// TEMP route: Promote a user to admin using their email
router.put('/make-admin/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAdmin = true;
    await user.save();

    res.json({ message: `${user.name} is now an admin` });
  } catch (error) {
    console.error('Error promoting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
