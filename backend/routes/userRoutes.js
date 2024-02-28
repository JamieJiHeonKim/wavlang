const express = require('express');
const router = express.Router()

const { googleSigninController, googleSignupController, signinController } = require('../controllers/userController');

router.post('/google-signin', googleSigninController);
router.post('/google-signup', googleSignupController);
router.post('/', signinController);

module.exports = router;