const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, isAdmin, itemController.createItem);
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.put('/:id', verifyToken, isAdmin, itemController.updateItem);
router.delete('/:id', verifyToken, isAdmin, itemController.deleteItem);

module.exports = router;
