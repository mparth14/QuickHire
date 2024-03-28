import User from '../models/user.model.js';
import Token from '../models/token.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js'
import { FRONTEND_PORT, BACKEND_PORT } from '../config/constants.js';

/**
 * Signup a new user and store the data in database
 * @param {*} req 
 * @param {*} res 
 */
export const register = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hash,
        address: req.body.address,
        profilePictureUrl: req.body.profilePictureUrl
    });
    const username = req.body.username;
    const email = req.body.email;
    try {
      const usernameExists = await User.find({username});
      const emailExists = await User.find({email});

      if(emailExists.length > 0){
        res.status(409).json({error:"Email already registered"});
      }
      else if(usernameExists.length > 0){
        res.status(409).json({error:"Username already exists"});
      }
      else{
        const newUser = await user.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
          expiresIn: '1 hour'
        });

        res.status(201).json({user: newUser, token: token});
      }
      
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

/**
 * Login existing user
 * @param {*} req 
 * @param {*} res 
 */
export const login = async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const passwordMatches = await user.comparePassword(password);
      if (!passwordMatches) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1 hour'
      });
      res.json({ userId: user._id, token });
    } catch (error) {
      next(error);
    }
};

export const forgotPassword = async (req, res, next) => {
    const email = req.body.email;

    try{
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      let token = await Token.findOne({ user_id: user._id });
      if (!token) {
          token = await new Token({
              user_id: user._id,
              token: crypto.randomBytes(32).toString("hex"),
          }).save();
      }

      const host = (req.protocol + '://' + req.get('host')).replace(BACKEND_PORT, "") ;
      const link = `${host}${FRONTEND_PORT}/change-password/${user._id}/${token.token}`;
      await sendEmail(user.email, "Password reset", link);

      res.send("Password reset link sent to your email.");

    } catch(err){
        res.status(400).json({ message: err.message });
    }
}

export const changePassword = async (req, res) => {
  try{
    const user = await User.findById(req.params.user_id);
    const hash = await bcrypt.hash(req.body.password, 10);
    if (!user) return res.status(400).send("Link is expired");

    const token = await Token.findOne({
        user_id: user._id,
        token: req.params.token,
    });
    if (!token) return res.status(400).send("Link is expired");

    user.password = hash;
    await user.save();
    await token.deleteOne();

    res.send("password reset sucessfully.");
  } catch(err){
    res.status(400).json({ message: err.message });
  }
}