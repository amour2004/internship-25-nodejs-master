const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/UserModel");
const Role = require("./src/models/RoleModel");
const Skill = require("./src/models/SkillModel");
const Session = require("./src/models/SessionModel");
const Feedback = require("./src/models/FeedbackModel");

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB for Seeding"))
.catch(err => console.log("❌ MongoDB Connection Failed:", err));


const seedDatabase = async () => {
    try {
      console.log("🌱 Seeding Data...");
  
      // Clear existing data (optional)
      await User.deleteMany();
      await Role.deleteMany();
      await Skill.deleteMany();
      await Session.deleteMany();
      await Feedback.deleteMany();
  
      // Insert Roles
      const roles = await Role.insertMany([
        { roleId: 1, roleName: "Admin", roleDescription: "Platform Administrator" },
        { roleId: 2, roleName: "User", roleDescription: "Regular User" },
      ]);
  
      console.log("✅ Roles Seeded");
  
      // Insert Users
      const users = await User.insertMany([
        {
          userId: 101,
          firstName: "Alice",
          lastName: "Johnson",
          email: "alice@example.com",
          password: "hashedpassword", // We'll handle hashing later
          roleId: 2,
          skillsOffered: ["JavaScript", "React"],
          skillsWanted: ["Node.js", "MongoDB"],
        },
        {
          userId: 102,
          firstName: "Bob",
          lastName: "Smith",
          email: "bob@example.com",
          password: "hashedpassword",
          roleId: 2,
          skillsOffered: ["Python", "Django"],
          skillsWanted: ["React", "JavaScript"],
        },
      ]);
  
      console.log("✅ Users Seeded");
  
      // Insert Skills
      const skills = await Skill.insertMany([
        { skillId: 1, skillName: "JavaScript", category: "Programming" },
        { skillId: 2, skillName: "React", category: "Frontend Development" },
        { skillId: 3, skillName: "Node.js", category: "Backend Development" },
        { skillId: 4, skillName: "MongoDB", category: "Database" },
      ]);
  
      console.log("✅ Skills Seeded");
  
      // Insert Sessions
      const sessions = await Session.insertMany([
        {
          sessionId: 201,
          mentorId: 101,
          menteeId: 102,
          skillId: 2,
          sessionDate: new Date(),
          sessionStatus: "Scheduled",
        },
      ]);
  
      console.log("✅ Sessions Seeded");
  
      // Insert Feedback
      const feedbacks = await Feedback.insertMany([
        {
          feedbackId: 301,
          sessionId: 201,
          rating: 5,
          comments: "Great session!",
          reviewerId: 102,
        },
      ]);
  
      console.log("✅ Feedbacks Seeded");
  
      console.log("🎉 Database Seeding Completed!");
      process.exit();
    } catch (error) {
      console.error("❌ Error Seeding Database:", error);
      process.exit(1);
    }
  };
  
  // Run the function
  seedDatabase();
  