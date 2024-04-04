/**
 * @authors 
 * Rahul Hambarde
 */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Mongoose schema for user details
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: String,
  last_name: String,
  description: String,
  mobile: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
  password: String,
  profilePictureUrl: String,
  linkedInLink: String,
  instagramLink: String,
  facebookLink: String,
  isFreelancer: {
    type: Boolean,
    default: false,
  },
  occupation: String,
  skills: {
    type: Array,
    default: []
  },
  description: String,
  experience: String,
  education: {
    type: Array,
    default: []
  },
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
