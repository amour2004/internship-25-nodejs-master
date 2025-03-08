const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  skillId: {
    type: Number,
    unique: true,
    required: true, // Primary Key
  },
  skillName: {
    type: String,
    required: true,
  },
  category: {
    type: String, // Technology, Art, Language, etc.
  },
});

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
