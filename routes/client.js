const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Update client information with partial updates
router.patch('/update', verifyToken, authorizeRoles('client'), async (req, res) => {
  const userId = req.userId;
  // Construct an update object dynamically based on provided fields
  const updateData = {};
  const { email, phoneNumber, photo } = req.body;

  if (email !== undefined) updateData.email = email;
  if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
  if (photo !== undefined) updateData.photo = photo;

  try {
    // Only apply fields that were actually provided for update
    await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.json({ message: 'Client information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;