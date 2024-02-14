const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();


// Block/Unblock user
router.post('/block', verifyToken, authorizeRoles('admin'), async (req, res) => {
  const { userId, block } = req.body; // Simplified destructuring
  try{
    if(parseInt(block) == 0 || parseInt(block) == 1){
      try {
        await User.findByIdAndUpdate(userId, { blocked: block });
        res.json({ message: `User has been ${Boolean(parseInt(block)) ? 'blocked' : 'unblocked'}` });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }else{
      res.status(500).json({message: "block value must be boolean"})
    }
  }catch(err){
    res.status(500).json({error: err})
  }
});

// Update user details
router.patch('/update/:userId', verifyToken, authorizeRoles('admin'), async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body; // Contains fields like address, services, etc.

  try {
    await User.findByIdAndUpdate(userId, updateData);
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;