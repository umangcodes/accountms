const express = require('express');
const admin = require('./admin.js');
const client = require('./client.js');
const serviceProvider = require('./serviceprovider.js');

const router = express.Router();

router.use('/admin', admin);
router.use('/client', client);
router.use('/service-provider', serviceProvider);

module.exports = router;