const Business = require("../models/business");

const addBusiness = async (req, res) => {
  const { name, category, address, phone, website } = req.body;

  const newBusiness = new Business({ name, category, address, phone, website });

  try {
    await newBusiness.save();
    res.status(201).json({ message: "Business added", business: newBusiness });
  } catch (error) {
    console.error("Error adding business:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const searchBusinesses = async (req, res) => {
  console.log("Incoming query:", req.query);
  const { query, filter } = req.query;

  // Validate the input parameters
  if (!query || !filter) {
    return res.status(400).json({ message: "Query and filter are required." });
  }

  try {
    let filterCriteria = {};

    // Handle the filter based on address, name, or category
    switch (filter) {
      case "address":
        filterCriteria.address = new RegExp(query, "i");
        break;
      case "name":
        filterCriteria.name = new RegExp(query, "i");
        break;
      case "category":
        filterCriteria.category = new RegExp(query, "i");
        break;
      default:
        return res
          .status(400)
          .json({
            message: "Invalid filter. Use 'address', 'name', or 'category'.",
          });
    }

    console.log("Primary filterCriteria:", filterCriteria);

    // Add optional sub-filters for name and category, but only if they are not part of the main filter
    if (req.query.name && filter !== "name") {
      filterCriteria.name = new RegExp(req.query.name, "i");
    }
    if (req.query.category && filter !== "category") {
      filterCriteria.category = new RegExp(req.query.category, "i");
    }

    console.log("Final filterCriteria:", filterCriteria);

    // Fetch businesses matching the filter criteria
    const businesses = await Business.find(filterCriteria);
    res.json(businesses);
  } catch (err) {
    console.error("Error searching businesses:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBusiness, getBusinesses, searchBusinesses };
