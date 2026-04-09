const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        if (!user.name || !user.email || !user.password) {
            return res.status(400).json({ error: "name, email and password are required" });
        }
        await user.save();
        res.status(201).json(user);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
}