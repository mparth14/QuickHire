/**
 * @authors 
 * Rahul Hambarde
 */
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
        res.status(409).json({message:"Email already registered"});
      }
      else if(usernameExists.length > 0){
        res.status(409).json({message:"Username already exists"});
      }
      else{
        const newUser = await user.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
          expiresIn: '7d'
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
        res.status(404).json({ message: 'User not found' });
      }
      else{
        const passwordMatches = await user.comparePassword(password);
        if (!passwordMatches) {
          res.status(401).json({ message: 'Incorrect password' });
        }
        else{
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '7d'
          });
          res.json({ userId: user._id, token: token });
        }
      }
      
    } catch (error) {
      next(error);
    }
};

/**
 * Send email to user on forgot password
 * @param {*} req 
 * @param {*} res 
 */
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

      const host = process.env.FRONTEND_URL;
      const link = `${host}/change-password/${user._id}/${token.token}`;
      await sendEmail(user.email, "Password reset", link);

      res.send("Password reset link sent to your email.");

    } catch(err){
        res.status(400).json({ message: err.message });
    }
}

/**
 * Change a user's password
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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

/**
 * Validate whether a password-change token is valid or not
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const validateToken = async (req, res) => {
  try{
    const user = await User.findById(req.params.user_id);
    if (!user) return res.status(400).send({valid: false});

    const token = await Token.findOne({
        user_id: user._id,
        token: req.params.token,
    });
    if (!token) return res.status(400).send({valid:false});
    res.send({valid:true});
  } catch(err){
    res.status(400).json({ message: err.message });
  }
}