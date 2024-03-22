import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    }
    catch(error){
        res.status(401).json({ message: 'Token is invalid' });
    }
}

/**
 * Middleware to check if the user exists
 * @param {*} req 
 * @param {*} res 
 */
export const getUser = async(req, res, next) => {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}