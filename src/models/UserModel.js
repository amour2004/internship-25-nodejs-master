const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
      required: true, // Primary Key
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
    },
    password: {
      type: String,
      required: true,
    },
    roleId: {
      type: Number,
      required: true, // Foreign Key linking to Roles
      enum: [1, 2], // 1 = Admin, 2 = User
    },
    skillsOffered: {
      type: [String], // List of skills user can teach
      default: [],
    },
    skillsWanted: {
      type: [String], // List of skills user wants to learn
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
