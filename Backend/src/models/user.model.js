import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
  isFreelancer: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
