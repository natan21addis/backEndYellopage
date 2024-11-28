const Business = require("../models/business");

const addBusiness = async (req, res) => {
  const { name, category, address, phone, website } = req.body;

  const newBusiness = new Business({ name, category, address, phone, website });
  await newBusiness.save();
  res.status(201).json({ message: "Business added", business: newBusiness });
};

const getBusinesses = async (req, res) => {
  const businesses = await Business.find();
  res.json(businesses);
};
const searchBusinesses = async (req, res) => {
  console.log('Incoming query:', req.query);
  const { query, filter } = req.query;

  if (!query || !filter) {
    return res.status(400).json({ message: 'Query and filter are required.' });
  }

  try {
    let filterCriteria = {};
    if (filter === 'name') {
      filterCriteria.name = new RegExp(query, 'i');
    } else if (filter === 'category') {
      filterCriteria.category = new RegExp(query, 'i');
    } else if (filter === 'address') {
      filterCriteria.address = new RegExp(query, 'i');
    } else {
      return res.status(400).json({ message: 'Invalid filter. Use name, category, or address.' });
    }

    const businesses = await Business.find(filterCriteria);
    res.json(businesses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addBusiness, getBusinesses, searchBusinesses };
