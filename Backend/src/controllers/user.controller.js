import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export const getOneUser = async (req, res) => {
    res.json(res.user);
}

export const createUser = async (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        address: req.body.address
    });
    try {
      const newUser = await user.save();
      res.status(201).json({ newUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

export const updateUser = async (req, res) => {
    if(req.body.first_name){
        res.user.first_name = req.body.first_name;
    }
    if(req.body.last_name){
        res.user.last_name = req.body.last_name;
    }
    if(req.body.email){
        res.user.email = req.body.email;
    }
    if(req.body.mobile){
        res.user.mobile = req.body.mobile;
    }
    if(req.body.password){
        res.user.password = req.body.password;
    }
    if(req.body.address){
        res.user.address = req.body.address;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "User deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

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