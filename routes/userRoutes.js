const express = require('express');
const { getAllUsersController, registerController, loginController } = require('../controllers/userCtrl');

// router object
const router = express.Router();

// 1. GET USER (POST)
router.get('/all-users', getAllUsersController);

// 2. CREATE USER (POST)
router.post('/register', registerController);

// LOGIN (POST)
router.post('/login', loginController);

module.exports = router;