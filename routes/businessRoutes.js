const express = require('express');
const businessController = require('../controllers/businessController');
const router = express.Router();

router.post('/', businessController.addBusiness);
router.get('/', businessController.getBusinesses);

module.exports = router;
