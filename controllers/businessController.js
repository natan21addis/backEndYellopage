const Business = require('../models/business');

const addBusiness = async (req, res) => {
  const { name, category, address, phone, website } = req.body;

  const newBusiness = new Business({ name, category, address, phone, website });
  await newBusiness.save();
  res.status(201).json({ message: 'Business added', business: newBusiness });
};

const getBusinesses = async (req, res) => {
  const businesses = await Business.find();
  res.json(businesses);
};

module.exports = { addBusiness, getBusinesses };
