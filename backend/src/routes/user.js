const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControlller");

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);

module.exports = router;