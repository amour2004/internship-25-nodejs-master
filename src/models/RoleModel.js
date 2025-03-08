const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  roleId: {
    type: Number,
    required: true,
    unique: true, // Primary Key
  },
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
  roleDescription: {
    type: String,
  },
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
