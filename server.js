const app = require('./app');
const dotenv = require('dotenv');
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
