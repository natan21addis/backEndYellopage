const Review = require('../models/review');

const addReview = async (req, res) => {
  const { user, business, rating, comment } = req.body;

  const newReview = new Review({ user, business, rating, comment });
  await newReview.save();
  res.status(201).json({ message: 'Review added', review: newReview });
};

const getReviewsForBusiness = async (req, res) => {
  const { businessId } = req.params;

  const reviews = await Review.find({ business: businessId }).populate('user', 'name');
  res.json(reviews);
};

module.exports = { addReview, getReviewsForBusiness };
