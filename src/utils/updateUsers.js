const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/UserModel"); // Ensure correct import path

// Update dotenv configuration with explicit path
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Debug to see if environment variables are loaded
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("Current directory:", __dirname);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Failed:", err));

const updateUsers = async () => {
  try {
    await User.updateOne(
      { userId: 101 }, // Change to an actual user ID in your DB
      { $set: { skillsOffered: ["JavaScript", "React"], skillsWanted: ["Python", "Node.js"] } }
    );

    await User.updateOne(
      { userId: 102 }, // Change to another user ID in your DB
      { $set: { skillsOffered: ["Python", "Node.js"], skillsWanted: ["JavaScript", "React"] } }
    );

    console.log("✅ Users Updated with Skills");
    process.exit();
  } catch (error) {
    console.error("❌ Error Updating Users:", error);
    process.exit(1);
  }
};

updateUsers();