const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Define Routes
app.use("/api", require("./routes/index"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
