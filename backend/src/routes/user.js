const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControlller");

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);

module.exports = router;