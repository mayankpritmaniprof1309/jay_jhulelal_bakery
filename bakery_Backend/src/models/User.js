
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
    resetToken:        { type: String, default: null },
    resetTokenExpiry:  { type: Date,   default: null },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

//Password hashing

userSchema.pre('save', async function () {
  // Only re-hash if the password field was modified
  if (!this.isModified('password')) return ;

  // 10 = "salt rounds" — higher = more secure but slower
  this.password = await bcrypt.hash(this.password, 10);

});

// check password 

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
