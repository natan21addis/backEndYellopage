const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

router.post('/', reviewController.addReview);
router.get('/business/:businessId', reviewController.getReviewsForBusiness);

module.exports = router;
