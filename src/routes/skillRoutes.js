const express = require("express");
const Skill = require("../models/skillModel");
const User = require("../models/UserModel"); // Ensure correct casing
const router = express.Router(); 

// ✅ Add a New Skill
router.post("/add", async (req, res) => {
  const { skillId, skillName, category } = req.body;

  try {
    const skillExists = await Skill.findOne({ skillId });
    if (skillExists) {
      return res.status(400).json({ message: "Skill ID already exists" });
    }

    const skill = new Skill({ skillId, skillName, category });
    await skill.save();
    res.status(201).json({ message: "Skill added successfully", skill });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get All Skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get a Single Skill by ID
router.get("/:skillId", async (req, res) => {
  try {
    const skill = await Skill.findOne({ skillId: req.params.skillId });
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete a Skill
router.delete("/:skillId", async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({ skillId: req.params.skillId });
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Matching Algorithm - Find Skill Exchange Partners
router.get("/match/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId); // Ensure it's a number

    // Find the user
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🔍 Searching for matches for:", user.firstName);
    console.log("🛠 Skills Wanted:", user.skillsWanted);
    console.log("🛠 Skills Offered:", user.skillsOffered);

    // Find users who have the desired skills and want to learn the offered skills
    const matches = await User.find({
      skillsOffered: { $in: user.skillsWanted }, // They offer what this user wants
      skillsWanted: { $in: user.skillsOffered }, // They want what this user offers
      userId: { $ne: userId } // Exclude the current user
    });

    console.log("✅ Matches Found:", matches.length);
    
    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;