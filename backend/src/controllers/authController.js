const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, phone, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "name, email and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            address
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Check password matching
        const isMatch = await bcrypt.compare(password, user.password);

        let validPassword = false;
        if (isMatch) {
            validPassword = true;
        } else if (password === user.password) {
            validPassword = true;
        }

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const payload = {
            userId: user._id,
            email: user.email,
            role: user.role
        };

        const secret = process.env.JWT_SECRET || 'fallback_secret_key';
        const token = jwt.sign(payload, secret, { expiresIn: '1d' });

        res.status(200).json({
            message: "Login successful",
            token, // Returning the token
            user: { _id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
