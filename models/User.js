const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: { type: String, unique: true },
  password_hash: String,
  roles: { type: [String], default: ['user'] },
  created_at: { type: Date, default: Date.now },
  login_timestamps: { type: [Date], default: [] }, // ✅ Add this line!
});

module.exports = mongoose.model('User', userSchema);