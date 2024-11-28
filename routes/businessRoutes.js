const express = require('express');
const businessController = require('../controllers/businessController');
const router = express.Router();

router.post('/', businessController.addBusiness);
router.get('/', businessController.getBusinesses);
router.get('/search',businessController.searchBusinesses);

module.exports = router;
