/**
 * @authors 
 * Rahul Hambarde
 */
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

/**
 * Get all the users stored in database
 * @param {*} req 
 * @param {*} res 
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

/**
 * Get a single user stored in database using id
 * @param {*} req 
 * @param {*} res 
 */
export const getLoggedInUser = async (req, res) => {
    res.json(req.user);
}


/**
 * Get a single user stored in database using id
 * @param {*} req 
 * @param {*} res 
 */
export const getOneUser = async (req, res) => {
    res.json(res.user);
}

/**
 * Update a user's details in database
 * @param {*} req 
 * @param {*} res 
 */
export const updateUser = async (req, res) => {
    //const hash = await bcrypt.hash(password, 10);
    res.user.username = req.body.username == null ? res.user.username :  req.body.username;
    res.user.first_name = req.body.first_name == null ? res.user.first_name :  req.body.first_name;
    res.user.last_name = req.body.last_name == null ? res.user.last_name :  req.body.last_name;
    res.user.email = req.body.email == null ? res.user.email :  req.body.email;
    res.user.mobile = req.body.mobile == null ? res.user.mobile :  req.body.mobile;
    res.user.address = req.body.address == null ? res.user.address :  req.body.address;
    res.user.isFreelancer = req.body.isFreelancer == null ? res.user.isFreelancer :  req.body.isFreelancer;
    res.user.password = req.body.password == null ? res.user.password :  await bcrypt.hash(req.body.password, 10);
    res.user.profilePictureUrl = req.body.profilePictureUrl == null ? res.user.profilePictureUrl : req.body.profilePictureUrl;
    res.user.linkedInLink = req.body.linkedInLink == null ? res.user.linkedInLink :  req.body.linkedInLink;
    res.user.instagramLink = req.body.instagramLink == null ? res.user.instagramLink :  req.body.instagramLink;
    res.user.facebookLink = req.body.facebookLink == null ? res.user.facebookLink :  req.body.facebookLink;
    res.user.occupation = req.body.occupation == null ? res.user.occupation :  req.body.occupation;
    res.user.description = req.body.description == null ? res.user.description :  req.body.description;
    res.user.experience = req.body.experience == null ? res.user.experience :  req.body.experience;
    res.user.skills = req.body.skills == null ? res.user.skills :  req.body.skills;
    res.user.education = req.body.education == null ? res.user.education :  req.body.education;
    
    
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

/**
 * Delete a user from database
 * @param {*} req 
 * @param {*} res 
 */
export const deleteUser = async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "User deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
