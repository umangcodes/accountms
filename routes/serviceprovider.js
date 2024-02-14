const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Update service provider services
router.patch('/services', verifyToken, authorizeRoles('service_provider'), async (req, res) => {
  const userId = req.userId;
  const { services } = req.body; // Assume services is an array or object

  try {
    await User.findByIdAndUpdate(userId, { services });
    res.json({ message: 'Services updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;