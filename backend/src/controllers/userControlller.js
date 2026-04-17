const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        if (!user.name || !user.email || !user.password) {
            return res.status(400).json({ error: "name, email and password are required" });
        }
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.status(200).json({
            message: "Login successful",
            user: { _id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}