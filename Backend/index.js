const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require("cors");
const morgan = require("morgan")
const cloudinary = require("cloudinary");
const acceptMultimedia = require("connect-multiparty");
const colors = require('colors');

// Making express app
const app = express();
app.use(morgan("dev"))

// dotenv config
dotenv.config();

// cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(acceptMultimedia());

// cors config to accept request from frontend
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// mongodb connection
connectDB();

// Accepting json data
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// creating test route
app.get("/test", (req, res) => {
  res.status(200).json("Hello from server");
});

// user routes
app.use("/api/user", require("./routes/userRoutes"));

//product routes
app.use("/api/product", require("./routes/adminRoutes"))


// defining port
const PORT = process.env.PORT;
// run the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan.underline.bold);
});

module.exports = app;