const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  sessionId: {
    type: Number,
    required: true,
    unique: true, // Primary Key  
  },
  mentorId: {
    type: Number,
    required: true, // Foreign Key linking to User
  },
  menteeId: {
    type: Number,
    required: true, // Foreign Key linking to User
  },
  skillId: {
    type: Number,
    required: true, // Foreign Key linking to Skill
  },
  sessionDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, // Example: "14:00" for 2 PM
    required: true,
  },
  endTime: {
    type: String, // Example: "15:30" for 3:30 PM
    required: true,
  },
  sessionStatus: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
