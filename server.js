const express = require("express");
const mongoose = require("mongoose");

const reportRoute = require("./routes/reportRoute");
require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

// Routes -->
app.use("/api/reports", reportRoute);

// <--- Routes

// middlewares (error custom error handler);
app.use(notFound);
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
