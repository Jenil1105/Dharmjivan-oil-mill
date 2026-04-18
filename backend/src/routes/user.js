const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControlller");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Admin only can see all users
router.get('/', verifyToken, isAdmin, userController.getAllUsers);

// Any authenticated user can get a user by ID
router.get('/:id', verifyToken, userController.getUser);

module.exports = router;