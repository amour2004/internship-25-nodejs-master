const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  feedbackId: {
    type: Number,
    required: true,
    unique: true, // Primary Key
  },
  sessionId: {
    type: Number,
    required: true, // Foreign Key linking to Session
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Ratings from 1 to 5
  },
  comments: {
    type: String,
  },
  reviewerId: {
    type: Number,
    required: true, // User who gave feedback
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
