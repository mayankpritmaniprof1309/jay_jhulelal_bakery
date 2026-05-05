// ─────────────────────────────────────────
//  models/User.js  —  MongoDB User Schema
// ─────────────────────────────────────────
//
//  A "model" is a blueprint for a document
//  stored in MongoDB. Think of it like a
//  table definition in SQL.
//
//  mongoose.Schema defines the shape of the
//  document. mongoose.model turns it into a
//  class you can use to create/read/update/
//  delete documents in the "users" collection.
//

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,        // removes leading/trailing spaces
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,      // no two users can share an email
      lowercase: true,   // always stored as lowercase
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,    // regular user by default
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ── Password hashing BEFORE saving ──────────
//
// This is a Mongoose "pre-save hook".
// It runs automatically every time a user
// document is saved.
//
// bcrypt.hash() takes the plain password and
// scrambles it so we NEVER store passwords
// as plain text in the database.
//
userSchema.pre('save', async function () {
  // Only re-hash if the password field was modified
  if (!this.isModified('password')) return ;

  // 10 = "salt rounds" — higher = more secure but slower
  this.password = await bcrypt.hash(this.password, 10);

});

// ── Helper method to check password ─────────
//
// Called during login to compare what the user
// typed with the hashed password in the DB.
//
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
