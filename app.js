const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const app = express();
const cors = require("cors");


app.use(cors());
app.use(
   cors({
     origin: "http://localhost:3000", // Replace with your frontend origin
     methods: "GET,POST,PUT,DELETE",
     allowedHeaders: "Content-Type,Authorization",
   })
 );

dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/reviews', reviewRoutes);

module.exports = app;
