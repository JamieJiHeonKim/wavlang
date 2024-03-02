const express = require('express');
const router = express.Router()
const { validateUser, validate } = require('../middleware/validator');
const { isResetTokenValid } = require('../middleware/user');

const { googleSigninController, googleSignupController, createUser, signIn, verifyEmail, forgotPassword, resetPassword } = require('../controllers/userController');

router.post('/google-signin', googleSigninController);
router.post('/google-signup', googleSignupController);
router.post('/new_user', validateUser, validate, createUser);
router.post('/signin', signIn);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/user/reset-password', isResetTokenValid, resetPassword);
router.get('/user/verify-token', isResetTokenValid, (req, res) => {
    res.json({success: true})
})

module.exports = router;