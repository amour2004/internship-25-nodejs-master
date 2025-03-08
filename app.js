const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const skillRoutes = require("./src/routes/skillRoutes");


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Accept JSON data
app.use("/api/skills", skillRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Database connected successfully"))
.catch((err) => console.error("❌ Database connection error:", err));

// Import Routes
const userRoutes = require("./src/routes/userRoutes");

// Use Routes
app.use("/api/users", userRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Skill Exchange API is running...");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});
