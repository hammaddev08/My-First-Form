const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// User Schema for MongoDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Prevents password from being returned in API queries by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware: Automatically hash the password before saving
// Middleware: Automatically hash the password before saving
userSchema.pre('save', async function () {
  // If password hasn't changed, stop execution early
  if (!this.isModified('password')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // No next() call is needed here anymore!
  } catch (error) {
    // Re-throw the error so Mongoose catches it
    throw error;
  }
});


// Instance Method: Compare entered password with the hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 
