const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const authController = require('../controller/authController')

router.post('/signup',authController.signup)
router.post('/login', authController.login)

router.get('/dashboard',authMiddleware, authController.dashboard)


module.exports = router;

